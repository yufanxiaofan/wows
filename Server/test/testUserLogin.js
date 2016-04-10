var should = require('should');
var socketConnection = require('../testModules/socketConnection');

describe("Test login", function () {

    it('Should login and create socket connection', function (done) {
        socketConnection.createConnection().then(function (client) {
            client.connected.should.equal(true);
            done();
        }).done();
    });

});