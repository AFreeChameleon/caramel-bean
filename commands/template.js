const fs = require("fs");

exports.makeTemplate = name => {
  if (fs.existsSync(`./views/partials/${name}.ejs`)) {
    console.log("View already exists. Please name it something else");
  } else {
    console.log(`Creating ./views/partials/${name}.ejs...`);
    fs.writeFileSync(`./views/partials/${name}.ejs`, "");
    console.log(`Created ${name}.ejs`);
  }
};

exports.removeTemplate = name => {
  if (fs.existsSync(`./views/partials/${name}.ejs`)) {
    console.log(`Removing ${name}.ejs`);
    fs.unlinkSync(`./views/partials/${name}.ejs`);
    console.log("Finished!");
  } else {
    console.log(
      `${name}.ejs does not exist, please check the name of the template before trying again.`
    );
  }
};
