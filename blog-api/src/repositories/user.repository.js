class UserRepository {
  constructor(db) {
    this.db = db;
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.db.query("SELECT * FROM users", (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  createUser(name, email, password) {
    return new Promise((resolve, reject) => {
      const sql = `
                INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)
            `;

      this.db.query(sql, [name, email, password], (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  findByEmail(email) {
    return new Promise((resolve, reject) => {
      this.db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result[0]);
        },
      );
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.db.query(
        "SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?",
        [id],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result[0]);
        },
      );
    });
  }

  update(id, title, content, status) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
                UPDATE posts
                SET title = ?, content = ?, status = ?
                WHERE id = ?
            `,
        [title, content, status, id],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        },
      );
    });
  }
}

module.exports = UserRepository;
