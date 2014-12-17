// Config

var local = require('./config/local');


// Utility

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var logger = require('./util/logger.js');


// Session

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var sessionRedis = new RedisStore(local.session.redis);

// Init express

var app = express();

// Port

app.set('port', local.port);

app.on('error', function(err) {
    console.error(err);
});


// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// app.use(express.methodOverride());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser(local.key.cookie));
app.use(session({
    store: sessionRedis,
    secret: local.key.session,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
}));

app.use(express.static(__dirname + "/public"));

// Enviroment Configuration

if (app.get('env') === 'development') {
    app.use(require('morgan')('short', {
        "stream": logger.stream
    }));
    app.use(errorhandler());
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    app.enable('view cache');
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}


// Routing

var api = {
    basic: require('./routes/basic')
};

app.get('/', api.basic.index);


module.exports = app;