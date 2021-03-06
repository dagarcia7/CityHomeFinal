//Set up automatically by express generator
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


//Needed to set up MongoDB and user sessions
var mongo = require('mongodb');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongooseSession = require('mongoose-session');


//Setting up different routes for the app
var routes = require('./routes/index');
var users = require('./routes/users');
var objects = require('./routes/objects');

var app = express();

/**
Code to connect to database. In the connection string,
the port number to connect to mongo and mongod instnaces 
can be changed (default is 27017). If changed from default port, 
must launch mongod/mongo instnaces by specifying new port
with --port PORT_NUMBER command.
**/
var connection_string = 'localhost:2000/cityhome2';
mongoose.connect('mongodb://' + connection_string);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongoose connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Part of setting up session for the user
app.use(session({
    secret: 'mysecret',
    resave: true,
    saveUninitialized: true,
    store: mongooseSession(mongoose)
}));

//Part of setting up routes and sessions for the app. 
app.use('/users', users);
app.use('/objects', objects);
app.use('/', routes);
app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

//Code used to set up sessions for user. 
app.use(function(req, res, next) {
    if (req.session.user) {
        users.findOne({
            _id: req.session.user._id
        }, function(err, user) {
            if(user) {
                req.currentUser = user;
            } else {
                delete req.session.user;
            }
            next();
        });
    } else {
        next();
    }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
