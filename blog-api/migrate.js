require("dotenv").config();

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

const migrationsDir = path.join(__dirname, "migrations");

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  console.log("Connected to MySQL");

  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of files) {
    console.log(`Running: ${file}`);  

    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, "utf8");

    try {
      await connection.beginTransaction();

      await connection.query(sql);

      await connection.commit();

      console.log(`Completed: ${file}`);
    } catch (error) {
      await connection.rollback();

      console.error(`Failed: ${file}`);
      console.error(error.message);

      await connection.end();

      process.exit(1);
    }
  }

  await connection.end();

  console.log("All migrations completed.");
}

migrate();