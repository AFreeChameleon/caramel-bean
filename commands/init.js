const fs = require('fs');
const { exec } = require('child_process');

exports.init = () => {   
    // Making server.js
    fs.writeFileSync('./server.js', `//Requirements
    const express = require('express');
    const app = express();
    const expressLayouts = require('express-ejs-layouts');
    const PORT = process.env.PORT || 3000;
    const indexRoutes = require('./routes/index');
    //!Requirements
    
    // EJS
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    
    // Bodyparser
    app.use(express.urlencoded({ extended: false }));
    
    // Routes
    app.use(indexRoutes);
    
    app.listen(PORT, console.log(\`Server started on: \${PORT}\`));`);
    // !Making server.js
    
    // Making controllers
    fs.mkdirSync('./controllers');
    fs.writeFileSync('./controllers/indexController.js', `exports.GetIndex = (req, res) => {
        res.render('welcome');
    }
    
    `);
    // !Making controllers
    
    // Making routes
    fs.mkdirSync('./routes');
    fs.writeFileSync('./routes/index.js', `
    const indexController = require('../controllers/indexController');
    const express = require('express');
    const router = express.Router();
    
    // Welcome Page
    router.get('/', indexController.GetIndex);
    
    module.exports = router;
    `);
    // !Making routes
    
    //Making views
    fs.mkdirSync('./views');
    fs.mkdirSync('./views/partials');
    fs.writeFileSync('./views/welcome.ejs', `<div class="row mt-5">
    <div class="col-md-6 m-auto">
        <div class="card card-body text-center">
            <!-- <h1><i class="fab fa-node-js fa-3x"></i></h1> -->
            <p class="h4 mb-4">Welcome to Caramel Bean!</</p>
        </div>
    </div>
    </div>`);
    fs.writeFileSync('./views/layout.ejs', `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>NodeJS Passport App</title>
        <link rel="stylesheet" href="https://bootswatch.com/4/journal/bootstrap.css">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    </head>
    <body>
        <div class="container">
            <%- body %>
        </div>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
    </html>`);
    
    console.log('Installing Dependencies');
    exec('npm i express express-ejs-layouts ejs nodemon', (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Success!');
        }
    });
    
}