const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const loggerMiddleware = require("./middleware/logger.middleware");

const app = (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );

  // Request logging
  loggerMiddleware(req, res);

  // CORS preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Home route
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Blog API Server is running",
      }),
    );

    return;
  }

  // Auth routes
  if (req.url.startsWith("/api/auth")) {
    authRoutes(req, res);
    return;
  }

  // Post routes
  if (req.url.startsWith("/api/posts")) {
    postRoutes(req, res);
    return;
  }

  // 404
  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      message: "Route not found",
    }),
  );
};

module.exports = app;