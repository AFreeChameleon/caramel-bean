const fs = require("fs");
const { exec } = require("child_process");
const reqpro = require("request-promise");
const url = {
  auth: {
    config: {
      auth:
        "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/auth/config/auth.js",
      keys:
        "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/auth/config/keys.js",
      passport:
        "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/auth/config/passport.js"
    },
    models: {
      user:
        "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/auth/models/User.js"
    },
    routes: {
      auth:
        "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/auth/routes/auth.js"
    },
    controllers: {
      user:
        "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/auth/controllers/userController.js"
    }
  },
  views: {
    login:
      "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/views/login.ejs",
    register:
      "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/views/register.ejs",
    dashboard:
      "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/views/dashboard.ejs",
    partials: {
      messages:
        "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/views/partials/messages.ejs"
    }
  },
  templates: {
    makeauth:
      "https://raw.githubusercontent.com/BeansJS/caramel-bean-template/master/templates/makeauth.txt"
  }
};

exports.removeAuth = () => {
  fs.rmdirSync("./auth");
};

exports.initAuth = () => {
  if (!fs.existsSync("./auth")) {
    // DIR making
    fs.mkdirSync("./auth");
    fs.mkdirSync("./auth/controllers");
    fs.mkdirSync("./auth/models");
    fs.mkdirSync("./auth/routes");
    fs.existsSync("./views/partials")
      ? console.log("making partials folder...")
      : fs.mkdirSync("./views/partials");
    fs.mkdirSync("./auth/config");
    // !DIR making

    // Config file making
    reqpro(url.auth.config.auth)
      .then(html => {
        console.log("Creating ./auth/config/auth.js...");
        fs.writeFileSync("./auth/config/auth.js", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    reqpro(url.auth.config.passport)
      .then(html => {
        console.log("Creating ./auth/config/passport.js...");
        fs.writeFileSync("./auth/config/passport.js", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    reqpro(url.auth.config.keys)
      .then(html => {
        console.log("Creating ./auth/config/keys.js...");
        fs.writeFileSync("./auth/config/keys.js", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    // !Config file making

    // Model file making
    reqpro(url.auth.models.user)
      .then(html => {
        console.log("Creating ./auth/models/User.js...");
        fs.writeFileSync("./auth/models/User.js", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    // !Model file making

    // Controller file making
    reqpro(url.auth.controllers.user)
      .then(html => {
        console.log("Creating ./auth/controllers/user.js...");
        fs.writeFileSync("./auth/controllers/user.js", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    // !Controller file making

    // Route making
    reqpro(url.auth.routes.auth)
      .then(html => {
        console.log("Creating ./auth/routes/auth.js...");
        fs.writeFileSync("./auth/routes/auth.js", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    // !Route making

    // Views making
    reqpro(url.views.dashboard)
      .then(html => {
        console.log("Creating ./views/dashboard.ejs...");
        fs.writeFileSync("./views/dashboard.ejs", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    reqpro(url.views.login)
      .then(html => {
        console.log("Creating ./views/login.ejs...");
        fs.writeFileSync("./views/login.ejs", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    reqpro(url.views.register)
      .then(html => {
        console.log("Creating ./views/register.ejs...");
        fs.writeFileSync("./views/register.ejs", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    reqpro(url.views.partials.messages)
      .then(html => {
        console.log("Creating ./views/partials/messages.ejs...");
        fs.writeFileSync("./views/partials/messages.ejs", html);
        console.log("Finished!");
      })
      .catch(err => console.log(err));
    // !Views making

    // DB Making
    console.log(
      "Please input your MongoDB URI, input nothing if you don't have one"
    );
    let standard_input = process.stdin;
    standard_input.setEncoding("utf8");
    standard_input.on("data", data => {
      fs.writeFileSync(
        "./auth/config/keys.js",
        `module.exports = {
                MongoURI: '${data.trim()}'
            }`
      );

      // Dependency Installing
      console.log("Installing Dependencies");
      exec(
        "npm i mongoose connect-flash express-session passport bcryptjs passport-local",
        (err, stdout, stderr) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Success!");
            process.exit();
          }
        }
      );
    });
    // !DB Making

    // SLAPPING IN FUNCTIONALITY IN SERVER.JS
    let mainApp = {
      all: fs.readFileSync("./server.js").toString()
    };
    reqpro(url.templates.makeauth)
      .then(html => {
        mainApp.all = html;
        mainApp.requirements = html.replace(
          "// Routes",
          `// Routes\napp.use('/auth', userRoutes);`
        );
      })
      .catch(err => console.log(err));
    fs.writeFileSync("./server.js", mainApp.requirements);
    // !SLAPPING IN FUNCTIONALITY IN SERVER.JS
  } else {
    console.log(
      "There's already a folder named auth. Please remove it or name it something else before trying again"
    );
  }
};
