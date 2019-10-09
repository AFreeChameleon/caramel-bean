const fs = require('fs');

exports.makeTemplate = (name) => {
if (fs.existsSync(`./views/partials/${name}`)) {
    console.log('View already exists. Please name it something else');
} else {
    fs.writeFileSync(`./views/partials/${name}.ejs`, '');
}
}