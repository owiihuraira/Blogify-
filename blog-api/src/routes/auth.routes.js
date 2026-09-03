const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const authRoutes = (req, res) => {
  if (req.method === "POST" && req.url === "/api/auth/register") {
    authController.register(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/auth/login") {
    authController.login(req, res);
    return;
  }

  if (req.method === "POST" && req.url === "/api/auth/logout") {
    authMiddleware(req, res, () => {
      authController.logout(req, res);
    });

    return;
  }

  if (req.method === "GET" && req.url === "/api/auth/profile") {
    authMiddleware(req, res, () => {
      authController.profile(req, res);
    });

    return;
  }

  return false;
};

module.exports = authRoutes;
