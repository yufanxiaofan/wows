'use strict';

define([], function () {

    var authService = function () {

        this.token = null;
        this.userId = null;
        this.userName = null;

        this.cookieTokenKey = 'wows-token';
        this.cookieUserIdKey = 'wows-userId';
        this.cookieUserNameKey = 'wows-userName';

        this.$get = function () {
            return this;
        };

        this.storeAuth = function ($cookies, token, id, name, exp) {
            $cookies.put(this.cookieTokenKey, token, {
                expires: exp,
                //secure: true
            });
            $cookies.put(this.cookieUserIdKey, id, {
                expires: exp,
                //secure: true
            });
            $cookies.put(this.cookieUserNameKey, name, {
                expires: exp,
                //secure: true
            });
        };

        this.updateLanguage = function($cookies, language){
            $cookies.put(this.cookieLanguageKey, language);
        };

        this.isValid = function ($cookies) {
            if (!this.token) {
                this.token = $cookies.get(this.cookieTokenKey);
            }
            if (!this.userId) {
                this.userId = $cookies.get(this.cookieUserIdKey);
            }
            if (!this.userName) {
                this.userName = $cookies.get(this.cookieUserNameKey);
            }

            return (this.token && this.userId && this.userName ) ? true : false;
        };

        this.logout = function ($cookies) {
            // remove cookies when logout
            $cookies.remove(this.cookieTokenKey);
            $cookies.remove(this.cookieUserIdKey);
            $cookies.remove(this.cookieUserNameKey);
        };


    };

    var authApp = angular.module('authService', []);

    //Must be a provider since it will be injected into module.config()
    authApp.provider('authService', authService);

});
