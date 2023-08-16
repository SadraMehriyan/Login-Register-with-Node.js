const jwt = require("jsonwebtoken");
const secret_key = process.env.JWT_SECRET_KEY;
const expiration_time = "3d";

class JWTHandler {
  static sign(object, expiration = expiration_time) {
    return jwt.sign(object, secret_key, { expiresIn: expiration });
  }

  static verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret_key, (error, decoded) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(decoded);
        }
      });
    }).catch((error) => {
      return error.message;
    });
  }
  
}
module.exports = JWTHandler;
