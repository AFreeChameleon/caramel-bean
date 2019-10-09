const fs = require('fs');

exports.makeView = (name) => {
if (fs.existsSync(`./views/${name}`)) {
    console.log('View already exists. Please name it something else');
} else {
    fs.writeFileSync(`./views/${name}.ejs`, '');
}
}