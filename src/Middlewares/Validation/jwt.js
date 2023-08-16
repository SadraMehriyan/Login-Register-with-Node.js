const JWTHandler = require("../../Utils/Verification/Jwt/jwt");

class JwtAuth {
  jwtValidation(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (token) {
      JWTHandler.verify(token).then(() => {
          next();
        }).catch((error) => {
          res.status(400).send(error);
        });
    } else {
      return res.status(400).send("token didn't verify");
    }
  }
}

module.exports = new JwtAuth;
