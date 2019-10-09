const fs = require('fs');
const { exec } = require('child_process');

exports.initAuth = () => {
    const fs = require('fs');
    const { exec } = require('child_process');
    
    if(!fs.existsSync('./auth')) {
        // DIR making
        fs.mkdirSync('./auth');
        fs.mkdirSync('./auth/controllers');
        fs.mkdirSync('./auth/models');
        fs.mkdirSync('./auth/routes');
        fs.mkdirSync('./views/partials');
        fs.mkdirSync('./auth/config');
        // !DIR making
    
        // Config file making
        fs.writeFileSync('./auth/config/auth.js', `
        module.exports = {
            ensureAuthenticated: (req, res, next) => {
                if (req.isAuthenticated()) {
                    return next();
                }
                req.flash('error_msg', 'Please log in to view');
                res.redirect('/auth/login');
            }
        }`);
    
    
    
    
        fs.writeFileSync('./auth/config/passport.js', `
        const localStrategy = require('passport-local').Strategy;
        const mongoose = require('mongoose');
        const bcrypt = require('bcryptjs');
        
        // Load User Model
        const User = require('../models/User');
        
        module.exports = passport => {
            passport.use(
                new localStrategy({ usernameField: 'email', }, (email, password, done) => {
                    // Match User
                    User.findOne({ email: email })
                    .then(user => {
                        if (!user) {
                            return done(null, false, { message: 'That email is not registered' });
                        }
        
                        // Match Password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, { message: 'Credentials Incorrect' });
                            }
                        });
                    })
                    .catch(err => console.log(err));
                })
            );
        
            passport.serializeUser((user, done) => {
                done(null, user.id);
            });
        
            passport.deserializeUser((id, done) => {
                User.findById(id, (err, user) => {
                    done(err, user);
                });
            })
        }`);
        // !Config file making
    
        // Model file making
        fs.writeFileSync('./auth/models/User.js', `
        const mongoose = require('mongoose');
    
        const UserSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },    
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        });
        
        const User = mongoose.model('User', UserSchema);
        
        module.exports = User;`);
        // !Model file making
    
        // Controller file making
        fs.writeFileSync('./auth/controllers/userController.js', `
        const bcrypt = require('bcryptjs');
        const passport = require('passport');
        // User model
        const User = require('../models/User');
        
        exports.GetRegister = (req, res) => {
            res.render('register');
        }
        
        exports.GetLogin = (req, res) => {
            res.render('login');
        }
        
        exports.PostRegister = (req, res) => {
            const { name, email, password, password2 } = req.body;
            let errors = [];
        
            // Check required fields
            if (!name || !email || !password || !password2) {
                errors.push({
                    msg: 'Please fill in all fields'
                });
            }
        
            // Check passwords match
            if (password !== password2) {
                errors.push({
                    msg: 'Passwords do not match'
                });
            }
        
            // Check password length
            if (password.length < 6) {
                errors.push({
                    msg: 'Password should be at least 6 characters'
                });
            }
        
            if (errors.length > 0) {
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                // Validation passed
                User.findOne({ email: email })
                    .then(user => {
                        if (user) {
                            // User exists
                            errors.push({
                                msg: 'Email is already in use'
                            });
                            res.render('register', {
                                errors,
                                name,
                                email,
                                password,
                                password2
                            });
                        } else {
                            const newUser = new User({
                                name,
                                email,
                                password
                            });
                            
                            // Hash Password
                            bcrypt.genSalt(10, (err, salt) => 
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
        
                                    // Set pwd to hashed
                                    newUser.password = hash;
        
                                    // Save the user
                                    newUser.save()
                                        .then(user => {
                                            req.flash('success_msg', 'You are now registered and can log in!');
                                            res.redirect('/auth/login');
                                        })
                                        .catch(err => console.log(err));
                                }));
        
        
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
        
        exports.PostLogin = (req, res, next) => {
            passport.authenticate('local', {
                successRedirect: '/auth/dashboard',
                failureRedirect: '/auth/login',
                failureFlash: true
            })(req, res, next);
        }
        
        exports.GetLogout = (req, res) => {
            req.logout();
            req.flash('success_msg', 'Successfully logged out!');
            res.redirect('/auth/login');
        }
    
        exports.GetDashboard = (req, res) => {
            res.render('dashboard', {
                name: req.user.name
            });
        }`);
        // !Controller file making
    
        // Route making
        fs.writeFileSync('./auth/routes/auth.js', `
        const express = require('express');
        const router = express.Router();
        const userController = require('../controllers/userController');
        const { ensureAuthenticated } = require('../config/auth');
    
        router.get('/login', userController.GetLogin);
        router.get('/register', userController.GetRegister);
    
        // Register Handler
        router.post('/register', userController.PostRegister);
    
        // Login Handler
        router.post('/login', userController.PostLogin);
    
        // Logout Handler
        router.get('/logout', userController.GetLogout);
    
        // Dashboard
        router.get('/dashboard', ensureAuthenticated, userController.GetDashboard);
    
        module.exports = router;`);
        // !Route making
    
        // Views making
        fs.writeFileSync('./views/dashboard.ejs', `<h1 class="mt-4">Dashboard</h1>
        <p class="lead mb-3">Welcome <%= name %></p>
        <a href="/auth/logout" class="btn btn-secondary">Logout</a>`);
        fs.writeFileSync('./views/login.ejs', `<div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>
                <% include ./partials/messages %>
                <form action="/auth/login" method="POST">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          class="form-control"
                          placeholder="Enter Email"
                        />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          class="form-control"
                          placeholder="Enter Password"
                        />
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Login</button>
                </form>
                <p class="lead mt-4">
                    No Account? <a href="/auth/register">Register</a>
                </p>
                </div>
            </div>
        </div>`);
        fs.writeFileSync('./views/register.ejs', `<div class="row mt-5">
        <div class="col-md-6 m-auto">
            <div class="card card-body">
                <h1 class="text-center mb-3">
                    <i class="fas fa-user-plus"></i> Register
                </h1>
                <% include ./partials/messages %>
                <form action="/auth/register" method="POST">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input
                        type="name"
                        id="name"
                        name="name"
                        class="form-control"
                        placeholder="Enter Name"
                        value="<%= typeof name != 'undefined' ? name : '' %>"
                        />
                  </div>
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      class="form-control"
                      placeholder="Enter Email"
                      value="<%= typeof email != 'undefined' ? email : '' %>"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      class="form-control"
                      placeholder="Create Password"
                      value="<%= typeof password != 'undefined' ? password : '' %>"
                    />
                  </div>
                  <div class="form-group">
                    <label for="password2">Confirm Password</label>
                    <input
                      type="password"
                      id="password2"
                      name="password2"
                      class="form-control"
                      placeholder="Confirm Password"
                      value="<%= typeof password2 != 'undefined' ? password2 : '' %>"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">
                    Register
                  </button>
                </form>
                <p class="lead mt-4">Have An Account? <a href="/auth/login">Login</a></p>
                </div>
            </div>
        </div>`);
        fs.writeFileSync('./views/partials/messages.ejs', `<% if(typeof errors != 'undefined') { %>
            <% errors.forEach(function(error) { %>
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <%= error.msg %>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            <% }); %>
        <% } %>
        
        <% if(success_msg != '') { %>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <%= success_msg %>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        <% } %>
        
        <% if(error_msg != '') { %>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <%= error_msg %>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        <% } %>
        
        <% if(typeof error != 'undefined') { %>
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <%= typeof error == 'undefined' ? null : error %>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
        <% } %>`);
        // !Views making
    
        // DB Making
        console.log('Please input your MongoDB URI');
        let standard_input = process.stdin;
        standard_input.setEncoding('utf8');
        standard_input.on('data', (data) => {
            fs.writeFileSync('./auth/config/keys.js', `module.exports = {
                MongoURI: '${data.trim()}'
            }`);
            
            // Dependency Installing
            console.log('Installing Dependencies');
            exec('npm i mongoose connect-flash express-session passport bcryptjs passport-local', (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Success!');
                process.exit();
            }
        });
        });
        // !DB Making
    
    
    
        // SLAPPING IN FUNCTIONALITY IN SERVER.JS
        let mainApp = {
            all: fs.readFileSync('./server.js').toString()
        }
    
        mainApp.requirements = mainApp['all'].replace('//!Requirements', `//!Requirements
    const userRoutes = require('./auth/routes/auth');
    const passport = require('passport');
    const mongoose = require('mongoose');
    const flash = require('connect-flash');
    const session = require('express-session');
    //!Requirements
    // Passport Config
    require('./auth/config/passport')(passport);
    // DB Config
    db = require('./auth/config/keys').MongoURI;
    // Connection to Mongo
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));
    // Express Session
    app.use(session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    }));
    // Passport Middleware
    app.use(passport.initialize());
    app.use(passport.session());
    // Connect Flash
    app.use(flash());
    // Global Vars
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        next();
    });
        `).replace('// Routes', `// Routes
    app.use('/auth', userRoutes);
        `);
        fs.writeFileSync('./server.js', mainApp.requirements);
        // !SLAPPING IN FUNCTIONALITY IN SERVER.JS
        
        
    } else {
        console.log('There\'s already a folder named auth. Please remove it or name it something else before trying again');
    }
}