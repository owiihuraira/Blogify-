const logger = require("../utils/logger");

const loggerMiddleware = (req, res) => {
  logger.info(`${req.method} ${req.url}`);
};

module.exports = loggerMiddleware;