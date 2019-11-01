const fs = require("fs");

exports.makeController = (routeName, controllerName) => {
  if (!fs.existsSync(`./controllers/${controllerName}.js`)) {
    const routerContent = fs
      .readFileSync(`./routes/${routeName}.js`)
      .toString()
      .replace(
        `// Controllers`,
        `// Controllers\nconst ${controllerName} = require('../controllers/${controllerName}')`
      );

    fs.writeFileSync(`./routes/${routeName}.js`, routerContent);
    fs.writeFileSync(`./controllers/${controllerName}.js`, "");
  } else {
    console.log(
      "The controller already exists. The command should follow: \n npm run makeController <routeName> <controllerName>"
    );
  }
};

exports.removeController = (routeName, controllerName) => {
  if (fs.existsSync(`./controllers/${controllerName}.js`)) {
    fs.unlinkSync(`./controllers/${controllerName}.js`);
    const routerContent = fs
      .readFileSync(`./routes/${routeName}.js`)
      .toString()
      .replace(
        `\nconst ${controllerName} = require('../controllers/${controllerName}')`,
        ""
      );
    fs.writeFileSync(`./routes/${routeName}.js`, routerContent);
  } else {
    console.log(
      "This controller doesn't exist. Please check the name of the controller you put in"
    );
  }
};
