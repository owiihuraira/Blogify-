const bcrypt = require("bcryptjs");

const { generateToken } = require("../utils/jwt");
const UserRepository = require("../repositories/user.repository");
const db = require("../database/database");

const RevokedTokenRepository = require("../repositories/revokedToken.repository");

const revokedTokenRepository = new RevokedTokenRepository(db);

const userRepository = new UserRepository(db);

const registerUser = async (data) => {
  const { name, email, password } = data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await userRepository.createUser(
    name,
    email,
    hashedPassword
  );

  return {
    name,
    email,
    userId: result.insertId,
  };
};

const loginUser = async (data) => {
  const { email, password } = data;

  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user.id);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

const getCurrentUser = async (userId) => {
    const user = await userRepository.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

const logoutUser = async (token, expiresAt) => {
  await revokedTokenRepository.revokeToken(
    token,
    expiresAt
  );

  return {
    message: "Logout successful",
  };
};

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
};