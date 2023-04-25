const express = require('express');
const app = express();

app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

const data = []

app.post("/register", (req, res) => {
  data.push(req.body)
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
