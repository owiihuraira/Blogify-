const jwt = require("jsonwebtoken");

const RevokedTokenRepository = require("../repositories/revokedToken.repository");
const db = require("../database/database");

const revokedTokenRepository = new RevokedTokenRepository(db);

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ================= CHECK AUTH HEADER =================

  if (!authHeader) {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Authorization token is required",
      }),
    );

    return;
  }

  // ================= GET TOKEN =================

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.writeHead(401, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Invalid authorization format",
      }),
    );

    return;
  }

  const token = parts[1];

  // ================= VERIFY JWT =================

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ================= CHECK REVOKED TOKEN =================

    const isRevoked = await revokedTokenRepository.isTokenRevoked(token);

    if (isRevoked) {
      res.writeHead(401, {
        "Content-Type": "application/json",
      });

      res.end(
        JSON.stringify({
          message: "Token has been revoked",
        }),
      );

      return;
    }

    // ================= SET USER =================

    req.user = {
      id: decoded.id,
      exp: decoded.exp,
    };

    // Save original token
    // Logout controller will need it
    req.token = token;

    // Continue request
    next();
  } catch (error) {
    console.error("AUTH ERROR:", error);

    res.writeHead(401, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Invalid or expired token",
      }),
    );
  }

  console.log("AUTH HEADER:", req.headers.authorization);
  console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);
};

module.exports = authMiddleware;
