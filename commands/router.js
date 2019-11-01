const fs = require("fs");

exports.makeRouter = name => {
  if (fs.existsSync(`./routes/${name}.js`)) {
    console.log("Router already exists");
  } else {
    console.log(`Creating ./routes/${name}.js...`);
    fs.writeFileSync(
      `./routes/${name}.js`,
      `// Controllers\nconst express = require('express');\nconst router = express.Router();\n\nmodule.exports = router;`
    );
    console.log(`Created ${name}.js`);
  }
};

exports.removeRouter = name => {
  if (fs.existsSync(`./routes/${name}.js`)) {
    console.log(`Deleting ./routes/${name}.js...`);
    fs.unlinkSync(`./routes/${name}.js`);
    console.log(`Deleted ${name}.js!`);
  } else {
    console.log(`${name}.js Does not exist. please try again`);
  }
};
