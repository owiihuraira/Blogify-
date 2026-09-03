const PostRepository = require("../repositories/post.repository");

const db = require("../database/database");

const postRepository = new PostRepository(db);

const createPost = async (data, userId) => {
  const { title, content, status } = data;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  if (!status) {
    throw new Error("Status is required");
  }

  const result = await postRepository.create(
    title,
    content,
    status,
    userId,
  );

  return {
    title: title,
    content: content,
    postId: result.insertId,
  };
};


// ALL PUBLISHED POSTS
const getAllPosts = async (page, limit, search) => {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const offset = (pageNumber - 1) * limitNumber;

  const posts = await postRepository.getAll(
    search,
    limitNumber,
    offset,
  );

  return {
    page: pageNumber,
    limit: limitNumber,
    posts,
  };
};


// MY POSTS
const getMyPosts = async (
  userId,
  status,
  page,
  limit,
  search,
) => {
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const offset = (pageNumber - 1) * limitNumber;

  const posts = await postRepository.getMyPosts(
    userId,
    status,
    search,
    limitNumber,
    offset,
  );

  return {
    page: pageNumber,
    limit: limitNumber,
    posts,
  };
};


const getPostById = async (id) => {
  const post = await postRepository.findById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  return post;
};


const updatePost = async (id, data, userId) => {
  const { title, content, status } = data;

  if (!title || !content || !status) {
    throw new Error(
      "Title, content and status are required",
    );
  }

  const post = await postRepository.findById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user_id !== userId) {
    throw new Error(
      "You can only update your own post",
    );
  }

  await postRepository.update(
    id,
    title,
    content,
    status,
  );

  return {
    data: data,
    postId: id,
  };
};


const deletePost = async (id, userId) => {
  const post = await postRepository.findById(id);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.user_id !== userId) {
    throw new Error(
      "You can only delete your own post",
    );
  }

  await postRepository.delete(id);

  return;
};


module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  getPostById,
  updatePost,
  deletePost,
};