const validatePost = (data) => {
  const errors = [];

  if (!data.title || data.title.trim() === "") {
    errors.push("Title is required");
  }

  if (!data.content || data.content.trim() === "") {
    errors.push("Content is required");
  }

  if (!data.status || data.status.trim() === "") {
    errors.push("Status is required");
  } else if (
    data.status !== "draft" &&
    data.status !== "published"
  ) {
    errors.push("Status must be either draft or published");
  }

  return errors;
};

module.exports = {
  validatePost,
};