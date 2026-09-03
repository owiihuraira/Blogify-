const postController = require("../controllers/post.controller");
const authMiddleware = require("../middleware/auth.middleware");

const postRoutes = (req, res) => {
  const url = new URL(
    req.url,
    `http://${req.headers.host}`,
  );

  const pathname = url.pathname;

  // GET MY POSTS
  // GET /api/posts/my
  // GET /api/posts/my?status=published
  // GET /api/posts/my?status=draft
  if (
    req.method === "GET" &&
    pathname === "/api/posts/my"
  ) {
    authMiddleware(req, res, () => {
      postController.getMyPosts(req, res);
    });

    return;
  }

  // GET SINGLE POST
  // GET /api/posts/:id
  if (
    req.method === "GET" &&
    pathname.startsWith("/api/posts/")
  ) {
    const id = pathname.split("/")[3];

    postController.getPostById(req, res, id);

    return;
  }

  // GET ALL PUBLISHED POSTS
  // GET /api/posts
  if (
    req.method === "GET" &&
    pathname === "/api/posts"
  ) {
    postController.getAllPosts(req, res);

    return;
  }

  // CREATE POST
  // POST /api/posts
  if (
    req.method === "POST" &&
    pathname === "/api/posts"
  ) {
    authMiddleware(req, res, () => {
      postController.createPost(req, res);
    });

    return;
  }

  // UPDATE POST
  // PUT /api/posts/:id
  if (
    req.method === "PUT" &&
    pathname.startsWith("/api/posts/")
  ) {
    const id = pathname.split("/")[3];

    authMiddleware(req, res, () => {
      postController.updatePost(req, res, id);
    });

    return;
  }

  // DELETE POST
  // DELETE /api/posts/:id
  if (
    req.method === "DELETE" &&
    pathname.startsWith("/api/posts/")
  ) {
    const id = pathname.split("/")[3];

    authMiddleware(req, res, () => {
      postController.deletePost(req, res, id);
    });

    return;
  }

  res.writeHead(404, {
    "Content-Type": "application/json",
  });

  res.end(
    JSON.stringify({
      message: "Post route not found",
    }),
  );
};

module.exports = postRoutes;