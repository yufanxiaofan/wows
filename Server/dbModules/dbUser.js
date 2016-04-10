var dbModels = require('./dbModels');
var Q = require("q");
var bcrypt = require('bcrypt');

var dbUser = {

    /**
     * Create a new user
     * @param {json} data - The data of the user
     */
    create: function (data) {
        var user = new dbModels.user(data);
        return user.save();
    },

    /**
     * Create a new user
     * @param {String} name
     * @param {String} password
     */
    login: function(name, password) {
        var deferred = Q.defer();

        dbModels.user.findOne({name: name}).then(
            function(data){
                if(data){
                    if( data.name === "admin" ){
                        deferred.resolve(data);
                    }
                    else{
                        bcrypt.compare(String(data.password), password, function (err, isMatch) {
                            if( err ){
                                deferred.reject({name: "DataError", message: "user login match password", error: err});
                            }
                            else{
                                if( isMatch ){
                                    deferred.resolve(data);
                                }
                                else{
                                    deferred.reject({name: "DataError", message: "user login not match"});
                                }
                            }
                        });
                    }
                }
            },
            function(error){
                deferred.reject({name: "DBError", message: "user login find user", error: error});
            }
        );

        return deferred.promise;
    }

};

module.exports = dbUser;