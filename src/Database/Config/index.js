const sequelize = require("./database");

module.exports = async function runDataBase() {
  sequelize.sync().then(() => {
    console.log("Connected");
  }).catch((err) => {
    console.error("MySQL error ~>", err);
    exit(0);
  })
};