//for local development environment
var localConfig = {
    mode: "local",
    socketServerUrl : 'localhost',
    db: {
        userDBUrl: 'adminwows:passwordwows@localhost:27017/userdb/',
    },
    socketSecret : 'aO5GIR8Sk5a70XCAfecsDIHZ3D5hVSIvHkudBLCE',
    redisUrl : 'localhost',
    redisPort : '6379'
};

//for aws-development
var devConfig = {
    mode: "development",
    db: {
        userDBUrl: 'adminwows:passwordwows@ec2-54-169-106-29.ap-southeast-1.compute.amazonaws.com:27017/userdb/'
    },
    socketSecret : 'aO5GIR8Sk5a70XCAfecsDIHZ3D5hVSIvHkudBLCE',
    redisUrl : 'ec2-52-77-211-70.ap-southeast-1.compute.amazonaws.com',
    redisPort : '6379'
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


            default:
                return devConfig;
        }
    }
};

module.exports = env;