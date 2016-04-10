var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
//var encrypt = require('./../modules/encrypt');
var dbUser = require('./../dbModules/dbUser');
var env = require('./../config/env');
var jwtSecret = env.config().socketSecret;

/* GET home page. */
router.get('/', function (req, res, next) {
    //res.render('index', {title: 'Express'});
    res.send('ok');
});

router.post('/login', function (req, res, next) {

    if (!req.body.username || !req.body.password) {
        res.json({success: false, error: "Incorrect login data"});
        return;
    }

    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        dbUser.login(username, password).then(
            function (data) {
                if (data) {
                    var user = {
                        _id: data._id,
                        name: data.name,
                        password: data.password
                    };
                    var token = jwt.sign(user, jwtSecret, {expiresIn: 60 * 60 * 5});
                    res.json(
                        {
                            success: true,
                            token: token,
                            name: data.name
                        }
                    );
                }
                else{
                    res.json({success: false, error: "Invalid name or password"});
                }
            },
            function (err) {
                res.json({success: false, error: err});
            }
        );
    }
    else {
        res.json({success: false, error: {name: "DataError", message: "Incorrect data"}});
    }
});

module.exports = router;
