const bcrypt = require("bcrypt");

class PasswordHash {
  static async hashPassword(password) {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  static async checkPassword(password, DBhash) {
    return await bcrypt.compare(password, DBhash);
  }
}

module.exports = PasswordHash;