const authService = require("../services/auth.service");

const {
  validateRegister,
  validateLogin,
} = require("../validators/auth.validator");

const {
  successResponse,
  errorResponse,
} = require("../utils/response");

const register = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      // Check empty body
      if (!body) {
        errorResponse(
          res,
          "Request body is required",
          400
        );

        return;
      }

      // Convert JSON string → JavaScript object
      const data = JSON.parse(body);

      // Validate request data
      const errors = validateRegister(data);

      if (errors.length > 0) {
        errorResponse(
          res,
          "Validation failed",
          400,
          errors
        );

        return;
      }

      // Business logic
      const result = await authService.registerUser(data);

      // Success response
      successResponse(
        res,
        result,
        "User registered successfully",
        201
      );

    } catch (error) {
      console.error("REGISTER ERROR:", error);

      errorResponse(
        res,
        error.message,
        400
      );
    }
  });
};

const login = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      // Convert JSON string → JavaScript object
      const data = JSON.parse(body);

      // Validate request data
      const errors = validateLogin(data);

      if (errors.length > 0) {
        errorResponse(
          res,
          "Validation failed",
          400,
          errors
        );

        return;
      }

      // Business logic
      const result = await authService.loginUser(data);

      // Success response
      successResponse(
        res,
        result,
        "Login successful",
        200
      );

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      errorResponse(
        res,
        error.message,
        401
      );
    }
  });
};

const profile = async (req, res) => {
  try {
    const user = await authService.getCurrentUser(
      req.user.id
    );

    successResponse(
      res,
      user,
      "Current user fetched successfully",
      200
    );

  } catch (error) {
    console.error("PROFILE ERROR:", error);

    errorResponse(
      res,
      error.message,
      404
    );
  }
};

// ================= LOGOUT =================

const logout = async (req, res) => {
  try {
    // JWT token expiry time
    const expiresAt = new Date(
      req.user.exp * 1000
    );

    // Revoke current token
    await authService.logoutUser(
      req.token,
      expiresAt
    );

    // Success response
    successResponse(
      res,
      null,
      "Logout successful",
      200
    );

  } catch (error) {
    console.error("LOGOUT ERROR:", error);

    errorResponse(
      res,
      error.message,
      500
    );
  }
};

module.exports = {
  register,
  login,
  profile,
  logout,
};