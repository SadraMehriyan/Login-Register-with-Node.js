const validator = require("Validator");

class Validations {
  validateRegister(req, res, next) {
    const user = { ...req.body };

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
    const user = { ...req.body };

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
    const user = { ...req.body };

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

  validateEdit(req, res, next) {
    const user = { ...req.body };

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
