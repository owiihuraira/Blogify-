const postService = require("../services/post.service");

const { validatePost } = require("../validators/post.validator");

const {
  successResponse,
  errorResponse,
} = require("../utils/response");

const createPost = (req, res) => {
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

      // Convert JSON string into JavaScript object
      const data = JSON.parse(body);

      // Validate post data
      const errors = validatePost(data);

      if (errors.length > 0) {
        errorResponse(
          res,
          "Validation failed",
          400,
          errors
        );

        return;
      }

      // Get logged-in user's ID from JWT
      const userId = req.user.id;

      // Call service
      const result = await postService.createPost(
        data,
        userId
      );

      // Send success response
      successResponse(
        res,
        result,
        "Post created successfully",
        201
      );

    } catch (error) {
      console.error("CREATE POST ERROR:", error);

      errorResponse(
        res,
        error.message,
        400
      );
    }
  });
};

const getAllPosts = async (req, res) => {
  try {
    const url = new URL(
      req.url,
      `http://${req.headers.host}`
    );

    const page =
      url.searchParams.get("page") || 1;

    const limit =
      url.searchParams.get("limit") || 10;

    const search =
      url.searchParams.get("search") || "";

    // IMPORTANT:
    // Your service function is findAllPosts
    const result = await postService.getAllPosts(
      page,
      limit,
      search
    );

    successResponse(
      res,
      result,
      "Posts fetched successfully",
      200
    );

  } catch (error) {
    console.error("GET POSTS ERROR:", error);

    errorResponse(
      res,
      error.message,
      500
    );
  }
};

const getPostById = async (req, res, id) => {
  try {
    const post = await postService.getPostById(id);

    successResponse(
      res,
      post,
      "Post fetched successfully",
      200
    );

  } catch (error) {
    console.error("GET POST ERROR:", error);

    const statusCode =
      error.message === "Post not found"
        ? 404
        : 500;

    errorResponse(
      res,
      error.message,
      statusCode
    );
  }
};

const updatePost = (req, res, id) => {
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

      // Convert JSON string into JavaScript object
      const data = JSON.parse(body);

      // Validate post data
      const errors = validatePost(data);

      if (errors.length > 0) {
        errorResponse(
          res,
          "Validation failed",
          400,
          errors
        );

        return;
      }

      // Update post
      const result = await postService.updatePost(
        id,
        data,
        req.user.id
      );

      successResponse(
        res,
        result,
        "Post updated successfully",
        200
      );

    } catch (error) {
      console.error("UPDATE POST ERROR:", error);

      let statusCode = 400;

      if (error.message === "Post not found") {
        statusCode = 404;
      }

      if (
        error.message ===
        "You can only update your own post"
      ) {
        statusCode = 403;
      }

      errorResponse(
        res,
        error.message,
        statusCode
      );
    }
  });
};

const deletePost = async (req, res, id) => {
  try {
    const result = await postService.deletePost(
      id,
      req.user.id
    );

    successResponse(
      res,
      result,
      "Post deleted successfully",
      200
    );

  } catch (error) {
    console.error("DELETE POST ERROR:", error);

    let statusCode = 500;

    if (error.message === "Post not found") {
      statusCode = 404;
    }

    if (
      error.message ===
      "You can only delete your own post"
    ) {
      statusCode = 403;
    }

    errorResponse(
      res,
      error.message,
      statusCode
    );
  }
};

const getMyPosts = async (req, res) => {
  try {
    const url = new URL(
      req.url,
      `http://${req.headers.host}`,
    );

    const page =
      url.searchParams.get("page") || 1;

    const limit =
      url.searchParams.get("limit") || 10;

    const search =
      url.searchParams.get("search") || "";

    const status =
      url.searchParams.get("status") || "";

    // Logged-in user's ID
    const userId = req.user.id;

    const result = await postService.getMyPosts(
      userId,
      status,
      page,
      limit,
      search,
    );

    successResponse(
      res,
      result,
      "My posts fetched successfully",
      200,
    );
  } catch (error) {
    console.error(
      "GET MY POSTS ERROR:",
      error,
    );

    errorResponse(
      res,
      error.message,
      500,
    );
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
};