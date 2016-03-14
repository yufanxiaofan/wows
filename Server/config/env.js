//for local development environment
var localConfig = {
    mode: "local",
    socketServerUrl : 'localhost',
    db: {
        userDBUrl: 'adminsinonet:passwordsinonet@localhost:27017/admindb/',
        playerDBUrl: 'playersinonet:passwordsinonet@localhost:27017/playerdb/',
        logsDBUrl: 'localhost:27017/logsdb'
    },
    socketSecret : 'aO5GIR8Sk5a70XCAfecsDIHZ3D5hVSIvHkudBLCE',
    redisUrl : 'localhost',
    redisPort : '6379',
    clientAPIServerUrl : "ws://localhost:9280"
};

//for aws-development
var devConfig = {
    mode: "development",
    db: {
        adminDBUrl: 'adminsinonet:passwordsinonet@ec2-54-169-3-146.ap-southeast-1.compute.amazonaws.com:27017/admindb/',
        playerDBUrl: 'playersinonet:passwordsinonet@ec2-54-169-3-146.ap-southeast-1.compute.amazonaws.com:27017/playerdb/',
        logsDBUrl: 'ec2-54-169-3-146.ap-southeast-1.compute.amazonaws.com:27017/logsdb'
    },
    socketSecret : 'aO5GIR8Sk5a70XCAfecsDIHZ3D5hVSIvHkudBLCE',
    redisUrl : 'ec2-54-169-3-146.ap-southeast-1.compute.amazonaws.com',
    redisPort : '6379',
    clientAPIServerUrl : "ws://ec2-54-255-174-69.ap-southeast-1.compute.amazonaws.com:9280"
};

//for testing
var qaConfig = {
    mode: "qa",
    socketServerUrl : 'ec2-52-77-244-176.ap-southeast-1.compute.amazonaws.com',
    db: {
        adminDBUrl: 'adminsinonet:passwordsinonet@ec2-52-77-244-176.ap-southeast-1.compute.amazonaws.com:27017/admindb/',
        playerDBUrl: 'playersinonet:passwordsinonet@ec2-52-77-244-176.ap-southeast-1.compute.amazonaws.com:27017/playerdb/',
        logsDBUrl: 'ec2-52-77-244-176.ap-southeast-1.compute.amazonaws.com:27017/logsdb'
    },
    socketSecret : 'aO5GIR8Sk5a70XCAfecsDIHZ3D5hVSIvHkudBLCE',
    redisUrl : 'ec2-54-169-3-146.ap-southeast-1.compute.amazonaws.com',
    redisPort : '6379',
    clientAPIServerUrl : "ws://ec2-54-255-174-69.ap-southeast-1.compute.amazonaws.com:9280"
};

var testAPIConfig = {
    mode: "local",
    socketServerUrl : 'localhost',
    db: {
        adminDBUrl: 'ec2-54-169-233-78.ap-southeast-1.compute.amazonaws.com:27017/admindb/',
        playerDBUrl: 'ec2-54-169-233-78.ap-southeast-1.compute.amazonaws.com:27017/playerdb/',
        logsDBUrl: 'ec2-54-169-233-78.ap-southeast-1.compute.amazonaws.com:27017/logsdb'
    },
    socketSecret : 'aO5GIR8Sk5a70XCAfecsDIHZ3D5hVSIvHkudBLCE',
    redisUrl : 'localhost',
    redisPort : '6379',
    clientAPIServerUrl : "ws://ec2-54-255-174-69.ap-southeast-1.compute.amazonaws.com:9280"
};

//for release production
var prodConfig = {
    mode: "production",
    db: {
        adminDBUrl: 'adminsinonet:passwordsinonet@localhost:27017/admindb/',
        playerDBUrl: 'playersinonet:passwordsinonet@localhost:27017/playerdb/',
        logsDBUrl: 'ec2-54-169-206-213.ap-southeast-1.compute.amazonaws.com:27017/logsdb'
    },
    socketSecret : 'aO5GIR8Sk5a70XCAfecsDIHZ3D5hVSIvHkudBLCE',
    redisUrl : 'localhost',
    redisPort : '6379',
    clientAPIServerUrl : "ws://ec2-54-255-174-69.ap-southeast-1.compute.amazonaws.com:9280"
};

//env parameters
var env = {
    //env mode development, qa or production
    mode : process.env.NODE_ENV || 'local',

    config : function() {
        //config settings
        switch (this.mode) {
            case 'local':
                return localConfig;

            case 'development':
                return devConfig;

            case 'qa':
                return qaConfig;

            case 'api':
                return testAPIConfig;

            case 'production':
                return prodConfig;

            default:
                return devConfig;
        }
    }
};

module.exports = env;