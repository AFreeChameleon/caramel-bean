#!/usr/bin/env node
const auth = require('./commands/auth');
const controller = require('./commands/controller');
const init = require('./commands/init');
const model = require('./commands/model');
const react = require('./commands/react');
const router = require('./commands/router');
const template = require('./commands/template');
const view = require('./commands/view');
const server = require('./commands/server');

const commands = {
    auth: {
        init: auth.initAuth
    },
    controller: {
        make: controller.makeController
    },
    init: init.init,
    model: {
        make: model.makeModel
    },
    react: {
        init: react.initReact
    },
    router: {
        make: router.makeRouter
    },
    template: {
        make: template.makeTemplate
    },
    view: {
        make: view.makeView
    },
    server: {
        start: server.start
    }
}

const args = process.argv;

// Filter through what the user wants
try {
    if (args.length == 3) {
        commands[args[2]]();
    } else if (args.length == 4) {
        commands[args[2]][args[3]]();
    } else if (args.length == 5) {
        commands[args[2]][args[3]](args[4]);
    } else if (args.length == 6) {
        commands[args[2]][args[3]](args[4], args[5]);
    } else {
        console.log('Too many arguments :( please check the docs and try again');
    }
} catch (err) {
    console.log('caramel-bean ERROR:');
    console.log(err);
}