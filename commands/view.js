const fs = require("fs");

exports.makeView = name => {
  if (fs.existsSync(`./views/${name}.ejs`)) {
    console.log("View already exists. Please name it something else");
  } else {
    console.log(`Creating ./views/${name}.ejs...`);
    fs.writeFileSync(`./views/${name}.ejs`, "");
    console.log("Finished!");
  }
};

exports.removeView = name => {
  if (fs.existsSync(`./views/${name}.ejs`)) {
    console.log(`Removing ${name}.ejs...`);
    fs.unlinkSync(`./views/${name}.ejs`);
    console.log("Finished!");
  } else {
    console.log(
      `${name}.ejs does not exist, please check the name before trying again.`
    );
  }
};
