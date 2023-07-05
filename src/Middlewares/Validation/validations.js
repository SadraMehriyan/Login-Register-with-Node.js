const validator = require("Validator");
const User = require("../../Database/Models/user");

class Validations {
  validateRegister(req, res, next) {
    const user = new User(req.body.name, req.body.email, req.body.password, "");
    req.info = user;

    const rules = {
      name: "required|string",
      email: "required|email",
      password: "required|string|min:6",
    };

    const v = validator.make(user, rules);

    if (v.fails()) {
      const errors = v.getErrors();
      return res.status(400).send(errors).end();
    }
    next();
  }

  validateLogin(req, res, next) {
    const user = new User("", req.body.email, req.body.password, "");
    req.info = user;

    const rules = {
      email: "required|email",
      password: "required|string|min:6",
    };

    const v = validator.make(user, rules);

    if (v.fails()) {
      const errors = v.getErrors();
      return res.status(400).send(errors).end();
    }
    next();
  }

  validateDelete(req, res, next) {
    const user = new User("", "", "", req.params.id);
    req.info = user;

    const rules = {
      id: "required|integer",
    };

    const v = validator.make(user, rules);

    if (v.fails()) {
      const errors = v.getErrors();
      return res.status(400).send(errors).end();
    }
    next();
  }
}

module.exports = new Validations();