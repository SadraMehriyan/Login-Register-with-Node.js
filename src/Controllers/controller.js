const bcrypt = require("bcrypt");
const db = require("../Database/Config/database");
const PasswordHash = require("../Utils/Hash/hasher");
const express = require("express");
const cookieParser = require("cookie-parser")
const token = require("../Utils/Verification/Jwt/jwt");

const app = express();

app.use(cookieParser());

class Controller {
  registerUser(req, res) {
    const data = req.info;

    PasswordHash.hashPassword(data.password).then(function (hash) {
      db.query("INSERT INTO customer SET ?", { name: data.name, email: data.email, password: hash }, (err, result) => {
            if (err) {
              return res.status(400).send(err);
            } else {
              return res.status(200).send(result);
            }
          }
        );
      }).catch((error) => {
        return res.status(400).send(error);
      });
  }

  loginUser(req, res) {
    const data = req.info;

    db.query("SELECT * FROM customer WHERE email = ?", [req.info.email], (err, user) => {
        if (err) {
          return res.status(400).send(err);
        }
        if (user.length) {
          bcrypt.compare(req.info.password, user[0].password).then(function (result) {
              if (result) {
                const accessToken = token.createTokens(data.name, data.id);

                res.cookies("access-token", accessToken, {
                  maxAge: 60 * 60 * 24 * 30 * 1000,
                });

                return res.status(200).send("Logged in");
              } else {
                return res.status(400).send("email or password doesn`t mach!");
              }
            }).catch(function (error) {
              return res.status(400).send(error);
            });
        } else {
          return res.status(400).send("email or password doesn`t mach!");
        }
      }
    );
  }

  deleteUser(req, res) {
    const delid = req.params.id;

    db.query("DELETE FROM customer WHERE id = ?", delid, (err, result) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        if (result.affectedRows == 0) {
          return res.status(400).send("id not exist").end();
        } else {
          return res.status(200).send("deleted").end();
        }
      }
    });
  }

  profile(res) {
    res.json("profile")
  };

}

module.exports = new Controller();