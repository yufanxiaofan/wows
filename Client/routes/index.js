var express = require('express');
var router = express.Router();

/*
 * GET home page /login page
 */

router.get('/', function (req, res) {
    res.render('new-login');
});

router.get('/login', function (req, res) {
    res.render('new-login');
});

module.exports = router;
