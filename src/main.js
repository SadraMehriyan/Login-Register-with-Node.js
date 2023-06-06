require("dotenv").config();
const express = require("express");
const router = require("./Router/routes.js");
const runDB = require("./Database/Config/config.js");

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: "false" }));
app.use(express.json());

app.use(router.getRoutes());

app.listen(port, () => {
  runDB();
  console.log(`Server Started on Port ${port}`);
});