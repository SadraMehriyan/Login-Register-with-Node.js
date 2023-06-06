const db = require("./database");

module.exports = function runDB() {
  db.connect((err) => {
    if (err) {
      console.log("mysql error ~>", err);
      exit(0);
    } else {
      console.log("connected");
    }
  });
};