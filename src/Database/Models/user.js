"use strict";
class User {
  constructor(name, email, password, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}

module.exports = User;