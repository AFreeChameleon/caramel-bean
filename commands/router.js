exports.makeRouter = (name) => {
    const fs = require('fs');

if (fs.existsSync(`./routes/${name}`)) {
    console.log('Router  exists');
} else {

fs.writeFileSync(`./routes/${name}.js`, `// Controllers
const express = require('express');
const router = express.Router();

module.exports = router;
`);

}
}