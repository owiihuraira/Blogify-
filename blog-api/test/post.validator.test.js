const { validatePost } = require("../src/validators/post.validator");

describe("validatePost", () => {
  test("should return no errors for valid post", () => {
    const data = {
      title: "Learning Node.js",
      content: "I am learning Node.js APIs.",
      status: "published",
    };

    const errors = validatePost(data);

    expect(errors).toEqual([]);
  });

  test("should require title", () => {
    const data = {
      title: "",
      content: "Some content",
      status: "published",
    };

    const errors = validatePost(data);

    expect(errors).toContain("Title is required");
  });

  test("should require content", () => {
    const data = {
      title: "My Post",
      content: "",
      status: "published",
    };

    const errors = validatePost(data);

    expect(errors).toContain("Content is required");
  });

  test("should require status", () => {
    const data = {
      title: "My Post",
      content: "Some content",
      status: "",
    };

    const errors = validatePost(data);

    expect(errors).toContain("Status is required");
  });

  test("should reject invalid status", () => {
    const data = {
      title: "My Post",
      content: "Some content",
      status: "private",
    };

    const errors = validatePost(data);

    expect(errors).toContain(
      "Status must be either draft or published"
    );
  });
});