const { exec } = require("child_process");
const fs = require("fs");

exports.initReact = async name => {
  exec("npm i -g create-react-app", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
    } else {
      exec("npx create-react-app " + name, async (error, stdout, stderr) => {
        if (error) {
          console.log(error);
        } else {
          let reactPackage = await JSON.parse(
            fs.readFileSync(`./${name}/package.json`).toString()
          );
          reactPackage.proxy = "http://localhost:3000";
          await fs.writeFileSync(
            `./${name}/package.json`,
            JSON.stringify(reactPackage)
          );
        }
      });
    }
  });
};

exports.buildReact = async () => {};
