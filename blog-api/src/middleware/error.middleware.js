const logger = require("../utils/logger");

const errorHandler = (error, res) => {
  logger.error(error.message);

  let statusCode = 500;

  if (error.message === "Post not found") {
    statusCode = 404;
  }

  if (error.message === "You can only update your own post") {
    statusCode = 403;
  }

  if (error.message === "You can only delete your own post") {
    statusCode = 403;
  }

  if (error.code === "ER_DUP_ENTRY") {
    statusCode = 409;
  }

  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      message: error.message || "Internal server error",
    }),
  );
};

module.exports = errorHandler;