angular.module('myApp', [])
.constant('CONFIG', {"NODE_ENV":"local","local":{"MANAGEMENT_SERVER_URL":"http://localhost:8000","STATISTICS_SERVER_URL":"http://localhost:8080"},"development":{"MANAGEMENT_SERVER_URL":"http://ec2-54-169-3-146.ap-southeast-1.compute.amazonaws.com:8000","STATISTICS_SERVER_URL":"http://ec2-54-169-3-146.ap-southeast-1.compute.amazonaws.com:8080"}});
