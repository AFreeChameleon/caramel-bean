# Caramel Bean

### Added features

- Removed indentation errors (hopefully)

## Introduction

Caramel Bean is a templating tool that I use to create a starter template for projects rather than having to write out a bunch of code I already have before, but rather than just cloning a repo, this is more of a building block style. Similar to the artisan command PHP uses.

## Installation

Just install it as a global module since it is on npm

```bash
npm i -g caramel-bean
```

## init

```bash
caramel init
```

This will create a starter template for you. This should be run in the directory after the directory is initialised.

We firstly create a server.js file which is the main file and add code that creates a very basic server through the express module.

Then we create a controllers directory, this contains the controller code, splitting up the router and controller code. Inside of the controller directory there will be an indexController.js file with one route leading to the welcome (home) page.

Thirdly we create a routes directory, this is the directory that determines which directories in webpages lead to what. Inside of this directory, we made an index.js file which contains one route which connects the / route to the controller function that renders the welcome page.

After that, we create a views directory which is the directory the server.js file will read from when asking the controllers to render a page. Two files are created, one is the layout.ejs which is a standard template with bootstrap 4, font awesome, jquery, popper.js, boostrap.js; and the other is welcome.ejs which is the file that will be rendered when you visit the / route.

Dependencies installed:

- express
- express-ejs
- express-ejs-layouts
- ejs
- nodemon

## server

```bash
npm start
```

This will start the server on the port in server.js (default is 3000)

## auth

### init

```bash
caramel auth init
```

This will add passport authentication into the project for you, accounts are stored in MongoDB so you will have to add your URL which looks something like this:

```bash
mongodb+srv://<username>:<password>@<databasename>-g5han.mongodb.net/test?retryWrites=true&w=majority
```

The directories that are made are:

- /auth
- /auth/controllers
- /auth/models
- /auth/routes
- /views/partials
- /auth/config

To start off with, in the /auth/config/ directory we make a file called auth.js which has a function called ensureAuthenticated which checks if the current user is authenticated and if they aren't, redirect them back to /auth/login. Secondly, in the /auth/config directory, passport.js with a couple of utility functions, such as matching the passwords instead of decrypting.

Then in the /auth/models directory, User.js is made with a mongoose schema being made in there with the fields, please feel free to change the fields to better suit your application however, in future installments on caramel-bean, there will be a json file to read from to give easy access.

For the controller making, in /auth/controllers, a userController.js file is made which contains rendering for the register, login and dashboard (page that shows up after authentication), it also has the code for handling the registration, login and logout functions.

Then in the /auth/routes directory, the auth.js file contains the routing code for the login, register, logout and dashboard directories.

In the /views directory, the login, register and dashboard pages will be made and in the /views/partials directory, an ejs file which detects whether the authentication functions went well or not.

Finally, in the /auth/config directory, your mongodb uri will be entered into a file called keys.js

Dependencies Installed:

- mongoose
- connect-flash
- express-session
- passport
- bcryptjs
- passport-local

### remove

```bash
caramel auth remove
```

## react

```bash
caramel react init <react-app-name>
```

This command basically installs the create-react-app package globally (sorry :P) and then runs

```bash
npx create-react-app <react-app-name>
```

We will add a bunch more integration because react is awesome and anyone who says otherwise is wrong >:( !

## model

```bash
caramel model make <model-name>
```

Creates a mongoose model under the name specified in the /models directory

## router

```bash
caramel router make <router-name>
```

Creates a file in the /routes directory under the name specified with the code to get started

## controller

```bash
caramel controller make <controller-name>
```

Creates a file in the /controller directory under the name specified

## view

```bash
caramel view make <view-name>
```

Creates a file in the /views directory under the name specified

## template

```bash
caramel template make <template-name>
```

Creates a file in the /views/partials directory under the name specified
