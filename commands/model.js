const fs = require('fs');

exports.makeModel = (name) => {
if (fs.existsSync('./models')) {
    if (fs.existsSync(`./models/${name}`)) {
        console.log('model already exists. Please name it something else');
    } else {
        fs.writeFileSync(`./views/${name}.js`, '');
    }
} else {
    console.log('Creating model directory...');
    fs.mkdirSync('./models');
    fs.writeFileSync(`./models/${name}.js`, `const mongoose = require('mongoose');
    
    const ${name}Schema = new mongoose.Schema({

    });
    
    const ${name} = mongoose.model('${name}', ${name}Schema);
    module.exports = ${name};`);
}

}