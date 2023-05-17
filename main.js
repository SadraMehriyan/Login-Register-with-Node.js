const express = require('express');
const mysql = require('mysql');
const User = require('./user');
const app = express();
const Validator = require('Validator');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Guillotin3#',
  database: 'db'
});

db.connect((err) => {
  if (err) {
    console.log("mysql error ~>", err);
  } else {
    console.log("connected!")
  }
});

app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.post("/register", validate, registerUser);

function registerUser(req, res) {
  // const d = req.body
  // const data = new User(d.name, d.email, d.password)
  const data = req.info
  db.query("INSERT INTO customer SET ?", {name: data.name, email: data.email, password: data.password}, (err, result) => {
    if(err) {
      return res.status(400).send(err).end();
    } else {
      return res.status(200).send(result).end();
    }
  });
}

app.post("/login", validate, loginUser);

function loginUser(req, res) {
  db.query("SELECT * FROM customer WHERE email = ?;", [req.info.email], (err, result) => {
    if(!err){
      if(result){
        if(result[0].password == req.info.password) {
          return res.status(200).send(result).end();
        } else {
          return res.status(402).send("email or password doesn`t mach!").end();
        }
      }
      return res.status(400).send("email or password doesn`t mach!");
    }
    return res.status(400).send(err).end();
});
}

function validate (req, res, next) {
  const user = new User(req.body.name, req.body.email, req.body.password)
  req.info = user

  const rules = {
    name: "required",
    email: "required|string|email",
    password: "required|string|min:6"
  };

  const v = Validator.make(user, rules);

  if (v.fails()) {
    const errors = v.getErrors();
    return res.status(400).send(errors).end();
  }
  next()
}

app.delete("/delete/:id", deleteUser)

function deleteUser(req, res) {
  const delid = req.params.id;
  db.query("DELETE FROM customer WHERE id=?", delid, (err, result) => {
    if(err) {
      res.status(400).send(err).end();
    } else {
      if(result.affectedRows == 0) {
        return res.status(400).send("id not exist").end();
      } else {
        return res.status(200).send("deleted").end();
      }
    }
  })
}

app.listen(9091, () => {
    console.log("Server Started on Port 9091");
  });
