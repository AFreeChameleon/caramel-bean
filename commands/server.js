const { exec } = require("child_process");

exports.start = () => {
  exec("nodemon server.js");
};
