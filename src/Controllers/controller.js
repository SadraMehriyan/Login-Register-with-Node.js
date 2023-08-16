const bcrypt = require("bcrypt");
const User = require("../Database/Models/user");
const PasswordHash = require("../Utils/Hash/hasher");
const express = require("express");
const cookieParser = require("cookie-parser");
const JWTHandler = require("../Utils/Verification/Jwt/jwt");

const app = express();

app.use(cookieParser());

class Controller {
  async registerUser(req, res) {
    const data = req.body;

    await PasswordHash.hashPassword(data.password).then(async function (hash) {
        const params = {user_name: data.name, email: data.email, password: hash};
        await User.create(params).then((result) => {
            return res.status(200).send(result);
          }).catch((error) => {
            return res.status(400).send(error);
          });
      }).catch((error) => {
        return res.status(400).send(error);
      });
  }

  async loginUser(req, res) {
    const data = req.body;

    User.findOne({ where: { email: data.email } }).then((user) => {
        if (user) {
          const password_validate = bcrypt.compareSync(data.password, user.password);
          if (password_validate) {
            const accessToken = JWTHandler.sign({username: user.user_name, userid: user.id});

            return res.status(200).send({ massage: "Logged in", payload: { token: accessToken } });
          } else {
            return res.status(400).send("email or password doesn`t mach!");
          }
        } else {
          return res.status(400).send("email or password doesn`t mach!");
        }
      }).catch((error) => {
        return res.status(400).send(error);
      });
  }

  deleteUser(req, res) {
    const data = req.body;

    User.destroy({ where: { id: data.id } }).then((result) => {
        if (!result) {
          return res.status(400).send("user is not exist");
        } else {
          if (result.affectedRows == 0) {
            return res.status(400).send("id not exist");
          } else {
            return res.status(200).send("deleted");
          }
        }
      }).catch((error) => {
        return res.status(400).send(error);
      });
  }

  async editUser(req, res) {
    const data = req.body;

    User.findOne({ where: { id: data.id } }).then((user) => {
        if (user) {
          User.update({ user_name: req.body.name }, { where: { id: data.id } }).then(() => {
              return res.status(200).send("user edited");
            }).catch((error) => {
              return res.status(400).send(error);
            });
        } else {
          return res.status(400).send("id not exist");
        }
      }).catch((error) => {
        return res.status(400).send(error);
      });
  }
}

module.exports = new Controller();
