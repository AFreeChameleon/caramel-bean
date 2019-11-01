const fs = require("fs");
const reqpro = require("request-promise");
const url = {
  templates: {
    models: {
      makemodel:
        "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/templates/makemodel.txt"
    }
  }
};

exports.makeModel = name => {
  if (fs.existsSync("./models")) {
    if (fs.existsSync(`./models/${name}`)) {
      console.log("model already exists. Please name it something else");
    } else {
      console.log(`Creating ./views/${name}.js...`);
      fs.writeFileSync(`./views/${name}.js`, "");
      console.log("Finished!");
    }
  } else {
    console.log("Creating model directory...");
    fs.mkdirSync("./models");

    reqpro(url.templates.models.makemodel)
      .then(html => {
        console.log(`Creating ./models/${name}.js...`);
        fs.writeFileSync(`./models/${name}.js`, html);
      })
      .catch(err => console.log(err));
  }
  console.log("Finished!");
};

exports.removeModel = name => {
  if (fs.existsSync(`./models/${name}.js`)) {
    console.log(`Deleting ./models/${name}.js...`);
    fs.unlinkSync(`./models/${name}.js`);
    console.log("Finished!");
  } else {
    console.log(
      `./models/${name}.js does not exist. please check the name and try again`
    );
  }
};
