var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const SYSTEM_PARAM = require('./../const/SYSTEM_PARAM');

var userSchema = new Schema({
    //primary key
    name: {type: String, unique: true, required: true, dropDups: true, index: true},
    //email address
    email: String,
    //admin password
    password: String,
    //salt key for password encryption
    salt: String
});

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SYSTEM_PARAM.SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });

});

userSchema.methods.comparePassword = function (psw, cb) {
    bcrypt.compare(psw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = userSchema;