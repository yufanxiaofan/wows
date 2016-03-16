'use strict';

define(['js/services/authService', 'js/login'], function () {
    var myLoginApp = angular.module('myApp');
    myLoginApp.requires.push('pascalprecht.translate', 'ngCookies', 'authService');

    myLoginApp.config(function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
                                                    prefix: 'languages/',
                                                    suffix: '.json'
                                                });

        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage('en_US');
    });

    myLoginApp.controller('loginCtrl', function ($scope, $rootScope, $http, $window, $location, $cookies, $log, authService, CONFIG) {
        //if there is token(user login), go to dashboard page for authentication
        //if (authService.isValid($cookies)) {
        //    $window.location.href = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/mainPage";
        //    return;
        //}
        $('input').iCheck({
                              checkboxClass: 'icheckbox_square-blue',
                              radioClass: 'iradio_square-blue',
                              increaseArea: '20%' // optional
                          });

        var showError = function (errorMessage) {
            $log.debug(errorMessage);
            $scope.showError = true;
            $scope.errorMessage = errorMessage;
            $scope.$apply();
        };

        //todo::temp fix, should show view after angular translate are fully configured
        setTimeout(function () {
            $("#loginContainer").show();
        }, 200);

        /* login user button handler */
        $scope.login = function () {
            var formData = {};
            var userName = $('#username').val();
            var password = $('#password').val();

            formData['username'] = userName;
            formData['password'] = password;

            var url = CONFIG[CONFIG.NODE_ENV].MANAGEMENT_SERVER_URL;
            $.ajax(
                {
                    type: 'post',
                    data: formData,
                    url: url + '/login'
                }
            ).done(
                function (data) {
                    if (data.token && data.name) {
                        var exp = new Date();
                        //set token expiration time to be 5 hours from now(the same time on server)
                        exp.setSeconds(exp.getSeconds() + 60 * 60 * 5);
                        authService.storeAuth($cookies, data.token, data._id, data.name, data.departments, data.roles, data.language, exp);

                        //Go to dashboard page after user login successfully
                        $window.location.href = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/home";
                    }
                    else {
                        //if there is error, show the error message
                        showError(data.error.message);
                    }
                }
            ).fail(
                function (error) {
                    if (error.responseText) {
                        showError(error.responseText);
                    }
                    else {
                        showError('Service is not available, please try again later.');
                    }
                }
            )
        }
    });
});