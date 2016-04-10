var db = db.getSiblingDB("admin");

db.system.users.remove({"_id": "userdb.adminwows"});

var db = db.getSiblingDB("userdb");

db.createUser({user: "adminwows", pwd: "passwordwows", roles: [{role: "readWrite", db: "admindb"}]});
db.auth("adminwows", "passwordwows");


db.user.remove({"adminName": "admin"});
db.user.insert({
    "name": "admin",
    "password": "123456",
    "firstName": "admin",
    "lastName": "admin"
});



