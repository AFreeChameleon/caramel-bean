const fs = require('fs');
exports.makeController = (routeName, controllerName) => {
    if (!fs.existsSync(`./controllers/${controllerName}Controller.js`)) {
        const routerContent = 
            fs.readFileSync(`./routes/${routeName}.js`)
            .toString()
            .replace(`// Controllers`, `// Controllers
    const ${controllerName}Controller = require('../controllers/${controllerName}Controller')`);

        fs.writeFileSync(`./routes/${routeName}.js`, routerContent);
        fs.writeFileSync(`./controllers/${controllerName}Controller.js`, '');

    } else {
        console.log('The controller already exists. The command should follow: \n npm run makeController <routeName> <controllerName>');
    }
}