const fs = require("fs");
const reqpro = require("request-promise");
const url = JSON.parse(fs.readFileSync("./urls.json"));

exports.init = () => {
  if (fs.existsSync("./package.json")) {
    let packageJson = JSON.parse(fs.readFileSync("./package.json").toString());
    packageJson.scripts.start = "nodemon server.js";
    fs.writeFileSync("./package.json", JSON.stringify(packageJson));
  } else {
    reqpro(url.packages)
      .then(html => {
        console.log("No package.json was found, making a new one");
        fs.writeFileSync("./package.json", html);
      })
      .catch(err => console.log(err));
  }
  // Making server.js
  reqpro(initUrl.server)
    .then(html => {
      console.log("Making ./server.js");
      fs.writeFileSync("server.js", html);
    })
    .catch(err => console.log(err));
  // !Making server.js

  // Making controllers
  fs.mkdirSync("./controllers");
  reqpro(url.controllers.index).then(html => {
    console.log("Making ./controllers/indexController.js");
    fs.writeFileSync("./controllers/indexController.js", html);
  });
  // !Making controllers

  // Making routes
  fs.mkdirSync("./routes");
  reqpro(initUrl.routes.index).then(html => {
    console.log("Loading ./routes/index.js");
    fs.writeFileSync("./routes/index.js", html);
  });
  // !Making routes

  //Making views
  fs.mkdirSync("./views");
  fs.mkdirSync("./views/partials");
  reqpro(url.views.welcome)
    .then(html => {
      console.log("Loading ./views/welcome.ejs");
      fs.writeFileSync("./views/welcome.ejs", html);
    })
    .catch(err => console.log(err));
  reqpro(url.views.welcome)
    .then(html => {
      console.log("Loading ./views/layout.ejs");
      fs.writeFileSync("./views/layout.ejs", html);
    })
    .catch(err => console.log(err));
};
