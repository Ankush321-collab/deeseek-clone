// config/index.js
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  jwt_user_password: process.env.JWT_SECRET,
};
