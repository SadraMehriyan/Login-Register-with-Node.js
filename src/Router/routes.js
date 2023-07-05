const express = require("express");
const validations = require("../Middlewares/Validation/validations");
const controller = require("../Controllers/controller.js");

class MainRouter {
  constructor() {
    this.router = express.Router();
    this.config();
  }

  config() {
    this.router.post("/register", validations.validateRegister, controller.registerUser);
    this.router.post("/login", validations.validateLogin, controller.loginUser);
    this.router.delete("/delete/:id", validations.validateDelete, controller.deleteUser);
  }

  getRoutes() {
    return this.router;
  }
}

module.exports = new MainRouter();