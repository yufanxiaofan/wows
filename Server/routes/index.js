var jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();

//var encrypt = require('./../modules/encrypt');
//var dbAdminInfo = require('./../db_modules/dbAdminInfo');
var env = require('./../config/env');
var jwtSecret = env.config().socketSecret;
var memCache = require('memory-cache');

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
    var userpassword = req.body.password;

    if (username && userpassword) {
        dbAdminInfo.getFullAdminInfo({adminName: username}).then(
            function (doc) {
                if (!doc || !encrypt.validateHash(doc.password, userpassword)) {
                    res.json({
                        success: false,
                        error: {name: "InvalidPassword", message: "Password or user name is not correct!"}
                    });
                }
                else {
                    //find all the admin user's departments roles
                    if (doc && doc.roles) {
                        var profile = {
                            _id: doc._id,
                            adminName: doc.adminName,
                            password: doc.password,
                            //roles: doc.roles
                        };
                        //store admin user's all roles information to cache
                        memCache.put(doc.adminName, doc.roles, 1000 * 60 * 60 * 5);
                        var token = jwt.sign(profile, jwtSecret, {expiresIn: 60 * 60 * 5});
                        res.json({
                            success: true,
                            token: token,
                            _id: doc._id,
                            adminName: doc.adminName,
                            roles: doc.roles,
                            departments: doc.departments,
                            language: doc.language
                        });
                        var logData = {
                            adminName: doc.adminName,
                            action: "login",
                            level: constSystemLogLevel.ACTION };
                        dblog.createSystemLog(logData);
                    }
                    else {
                        res.json({success: false, error: {name: "DBError", message: "Incorrect DB data"}});
                    }
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
