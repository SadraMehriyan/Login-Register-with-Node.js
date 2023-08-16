const express = require("express");
const validations = require("../Middlewares/Validation/validations");
const controller = require("../Controllers/controller.js");
const JwtAuth = require("../Middlewares/Validation/jwt")

class MainRouter {
  constructor() {
    this.router = express.Router();
    this.config();
  }

  config() {
    this.router.post("/register", validations.validateRegister, controller.registerUser);
    this.router.post("/login", validations.validateLogin, controller.loginUser);
    this.router.delete("/delete", JwtAuth.jwtValidation , validations.validateDelete, controller.deleteUser);
    this.router.put("/edit", JwtAuth.jwtValidation, validations.validateEdit, controller.editUser);
  }

  getRoutes() {
    return this.router;
  }
}

module.exports = new MainRouter();