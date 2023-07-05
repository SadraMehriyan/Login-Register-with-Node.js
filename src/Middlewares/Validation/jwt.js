const JwtHandler = require("../../Utils/Verification/Jwt/jwt");
const ErrorResponse = require("../../Utils/Response/Response");

class JwtAuth {

  constructor() {
    this.errorResponse = new ErrorResponse();
  }
  
  jwtValidation = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (typeof token !== "undefined") {
      JwtHandler.verify(token).then((payload) => {
          req.body.userInfo = payload;
          next();
        }).catch((error) => {
          this.errorResponse.client.unAuthorized(res, error);
        });
    } else {
      this.errorResponse.client.unAuthorized(res);
    }
  };
}
module.exports = JwtAuth;
