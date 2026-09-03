class PostRepository {
  constructor(db) {
    this.db = db;
  }

  create(title, content, status, userId) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
          INSERT INTO posts (title, content, status, user_id)
          VALUES (?, ?, ?, ?)
        `,
        [title, content, status, userId],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        },
      );
    });
  }

  // ALL PUBLISHED POSTS
  // Shows posts from all users + author name
  getAll(search, limit, offset) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT
          posts.id,
          posts.user_id,
          posts.title,
          posts.content,
          posts.status,
          posts.created_at,
          posts.updated_at,
          users.name AS author_name
        FROM posts
        INNER JOIN users
          ON posts.user_id = users.id
        WHERE posts.status = 'published'
      `;

      let params = [];

      if (search) {
        sql += `
          AND (
            posts.title LIKE ?
            OR posts.content LIKE ?
            OR users.name LIKE ?
          )
        `;

        const searchValue = `%${search}%`;

        params.push(
          searchValue,
          searchValue,
          searchValue,
        );
      }

      sql += `
        ORDER BY posts.id DESC
        LIMIT ? OFFSET ?
      `;

      params.push(limit, offset);

      this.db.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  // MY POSTS
  // Only logged-in user's posts
  getMyPosts(userId, status, search, limit, offset) {
    return new Promise((resolve, reject) => {
      let sql = `
        SELECT
          posts.id,
          posts.user_id,
          posts.title,
          posts.content,
          posts.status,
          posts.created_at,
          posts.updated_at,
          users.name AS author_name
        FROM posts
        INNER JOIN users
          ON posts.user_id = users.id
        WHERE posts.user_id = ?
      `;

      let params = [userId];

      // published OR draft
      if (status) {
        sql += ` AND posts.status = ?`;
        params.push(status);
      }

      if (search) {
        sql += `
          AND (
            posts.title LIKE ?
            OR posts.content LIKE ?
          )
        `;

        const searchValue = `%${search}%`;

        params.push(
          searchValue,
          searchValue,
        );
      }

      sql += `
        ORDER BY posts.id DESC
        LIMIT ? OFFSET ?
      `;

      params.push(limit, offset);

      this.db.query(sql, params, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(result);
      });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
          SELECT
            posts.id,
            posts.user_id,
            posts.title,
            posts.content,
            posts.status,
            posts.created_at,
            posts.updated_at,
            users.name AS author_name
          FROM posts
          INNER JOIN users
            ON posts.user_id = users.id
          WHERE posts.id = ?
        `,
        [id],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result[0]);
        },
      );
    });
  }

  update(id, title, content, status) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
          UPDATE posts
          SET title = ?, content = ?, status = ?
          WHERE id = ?
        `,
        [title, content, status, id],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        },
      );
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
          DELETE FROM posts
          WHERE id = ?
        `,
        [id],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        },
      );
    });
  }
}

module.exports = PostRepository;