class RevokedTokenRepository {
  constructor(db) {
    this.db = db;
  }

  // Save a revoked JWT token
  revokeToken(token, expiresAt) {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO revoked_tokens (token, expires_at)
        VALUES (?, ?)
      `;

      this.db.query(
        sql,
        [token, expiresAt],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result);
        }
      );
    });
  }


  // Check whether a token has been revoked
  isTokenRevoked(token) {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id
        FROM revoked_tokens
        WHERE token = ?
        LIMIT 1
      `;

      this.db.query(
        sql,
        [token],
        (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(result.length > 0);
        }
      );
    });
  }
}


module.exports = RevokedTokenRepository;