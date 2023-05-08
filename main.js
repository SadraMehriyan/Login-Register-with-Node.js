const express = require('express');
const app = express();
const User = require("./user");

const data = []

app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.post("/register", (req, res) => {
  const d = req.body
  const user = new User(d.name, d.email, d.password)
  data.push(user)
  console.log(data)
  res.status(200).end()
})

app.post("/login", (req, res) => {
  const { email, password } = req.body
  const result = data.filter(start)
  function start (element) {
    return element.email==email && element.password==password
  }
  if (result.length === 0) {
    res.status(400).send("Wrong info!")
  } else {
    res.status(200).send("Successful login.")
  }
  });

app.listen(9091, () => {
    console.log("Server Started on Port 9091");
  });
