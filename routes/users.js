var express = require('express');
var router = express.Router();
var User = require('../data/models/users');
var Response = require('../utils/response');

var isLoggedInOrInvalidBody = function (req, res) {
    if (req.session.userId) {
        Response.sendErr(res, 403, 'There is already a user logged in.');
        return true;
    } else if (!(req.body.username && req.body.password)) {
        Response.sendErr(res, 400, 'Username or password not provided.');
        return true;
    }
    return false;
};

//LOGIN
router.post('/login', function (req, res) {
    if (isLoggedInOrInvalidBody(req, res)) {
        return;
    }
    var username = req.body.username.toLowerCase();
    if (typeof username === "object") {
        username = JSON.stringify(username);
    }

    var password = req.body.password;
    if (typeof password === "object") {
        password = JSON.stringify(password);
    }

    User.findOne({username: username}, function (err, user) {
        if (user) {
            req.session.userId = user._id;
            var userSimple = {
                username: user.username
            };
            Response.sendSuccess(res, {
                user: userSimple
            });
        } else {
            Response.sendErr(res, 403, 'Username or password invalid.');
        }
    });
});

//LOGOUT
router.post('/logout', Response.restrict, function (req, res) {
    if (req.session.userId) {
        delete req.session.userId;
        Response.sendSuccess(res);
    } else {
        Response.sendErr(res, 403, 'There is no user currently logged in.');
    }
});

//GET Current User
router.get('/current', function (req, res) {
    if (req.session.userId) {
        Response.sendSuccess(res, {
            loggedIn: true,
            user: req.session.userId
        });
    } else {
        Response.sendSuccess(res, {
            loggedIn: false
        });
    }
});

module.exports = router;
