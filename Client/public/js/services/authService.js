'use strict';

define([], function () {

    var authService = function () {

        this.token = null;
        this.adminId = null;
        this.adminName = null;
        this.department = null;
        this.roleData = null;
        this.allActions = null;
        this.language = null;

        this.cookieTokenKey = 'sinonet-management-token';
        this.cookieAdminIdKey = 'sinonet-management-adminId';
        this.cookieAdminNameKey = 'sinonet-management-adminName';
        this.cookiePolicyKey = 'sinonet-management-role';
        this.cookieDepartmentKey = 'sinonet-management-departments';
        this.cookieLanguageKey = 'sinonet-management-language';

        this.$get = function () {
            return this;
        };

        //get all actions data from server
        this.getAllActions = function ($socket) {
            var self = this;
            $socket.emit("getAllActions");
            $socket.once("_getAllActions", function (data) {
                if (data.success) {
                    self.allActions = data.data;
                }
            });
        };

        /**
         * Get category for socket action
         */
        this.getSocketActionCategory = function (actionName) {
            if (this.allActions) {
                for (var key in this.allActions) {
                    if (this.allActions[key][actionName]) {
                        return key;
                    }
                }
            }
            return null;
        };

        this.storeAuth = function ($cookies, token, adminId, adminName, department, roleData, language, exp) {
            $cookies.put(this.cookieTokenKey, token, {
                expires: exp,
                //secure: true
            });
            $cookies.put(this.cookieAdminIdKey, adminId, {
                expires: exp,
                //secure: true
            });
            $cookies.put(this.cookieAdminNameKey, adminName, {
                expires: exp,
                //secure: true
            });
            $cookies.put(this.cookiePolicyKey, JSON.stringify(roleData), {
                expires: exp,
                //secure: true
            });
            $cookies.put(this.cookieDepartmentKey, JSON.stringify(department), {
                expires: exp,
                //secure: true
            });
            $cookies.put(this.cookieLanguageKey, language, {
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
            if (!this.adminId) {
                this.adminId = $cookies.get(this.cookieAdminIdKey);
            }
            if (!this.adminName) {
                this.adminName = $cookies.get(this.cookieAdminNameKey);
            }
            if (!this.roleData) {
                this.roleData = $cookies.get(this.cookiePolicyKey);
                this.roleData = this.roleData ? JSON.parse(this.roleData) : this.roleData;
            }
            if (!this.department) {
                this.department = $cookies.get(this.cookieDepartmentKey);
                this.department = this.department ? JSON.parse(this.department) : this.department;
            }
            if (!this.language) {
                this.language = $cookies.get(this.cookieLanguageKey);
            }
            console.log("this.roleData", this.roleData);
            return (this.token && this.adminName && this.department && this.department.length > 0) ? true : false;
        };

        this.isAdmin = function(){
            for( var i = 0; i < this.department.length; i++ ){
                if(!this.department[i].parent){
                    return true;
                }
            }
            return false;
        };

        this.departmentId = function(){
            console.log("this.department", this.department);
            return this.department.length > 0 ? this.department[0]._id : null;
        };

        this.logout = function ($cookies) {
            // remove cookies when logout
            $cookies.remove(this.cookieTokenKey);
            $cookies.remove(this.cookieAdminIdKey);
            $cookies.remove(this.cookieAdminNameKey);
            $cookies.remove(this.cookiePolicyKey);
            $cookies.remove(this.cookieDepartmentKey);
            $cookies.remove("SRVNAME");
        };

        this.checkViewPermission = function (category, subCategory, viewName) {
            if (this.roleData && this.roleData.length > 0) {
                for (var i = 0; i < this.roleData.length; i++) {
                    if (!this.roleData[i].views) {
                        continue;
                    }
                    //if views is all, means has all permissions
                    if (this.roleData[i].views["all"]) {
                        return true;
                    }

                    var categoryViews = this.roleData[i].views[category];
                    //if views category is all, means has all permissions for this category
                    //or it is header check
                    if ((categoryViews && categoryViews["all"]) || (categoryViews && !subCategory && !viewName) ){
                        return true;
                    }

                    if( subCategory && categoryViews){
                        var subCategoryViews = categoryViews[subCategory];
                        //if views sub category is all, means has all permissions for this sub category
                        //or it is sub header check
                        if ((subCategoryViews && subCategoryViews["all"]) || (subCategoryViews && !viewName)) {
                            return true;
                        }
                        //check each views in sub category
                        if(subCategoryViews && viewName && subCategoryViews[viewName]){
                            return true;
                        }
                    }

                    //for (var key in this.roleData[i].views) {
                    //    if (key == category && this.roleData[i].views[key] && this.roleData[i].views[key][viewName]) {
                    //        return true;
                    //    }
                }
            }
            return false
        };

        this.checkActionPermission = function (actionName) {
            //todo::disable the action check for now, will refactor it later
            return true;
            //check roles actions data
            for (var i = 0; i < this.roleData.length; i++) {
                if (!this.roleData[i].actions) {
                    continue;
                }
                //if actions is all, means has all permissions
                if (this.roleData[i].actions["all"]) {
                    return true;
                }
                //if action category is all, means has all the permission for this category
                var actionCategory = this.getSocketActionCategory(actionName);
                if( !actionCategory ){
                    return true;
                }

                if (this.roleData[i].actions[actionCategory] && this.roleData[i].actions[actionCategory]["all"]) {
                    return true;
                }
                //check each actions
                //for (var key in this.roleData[i].actions[actionCategory]) {
                //    if (this.roleData[i].actions[key] && (this.roleData[i].actions[key][actionName] || this.roleData[i].actions[key]["all"])) {
                //        return true;
                //    }
                //}
                var valid = false;
                if(!this.roleData[i].actions[actionCategory]) return true;
                //if (!this.roleData[i].actions[actionCategory].hasOwnProperty('length')) {
                //    return false;
                //}
                $.each(this.roleData[i].actions[actionCategory], function (i, v) {
                    if (i == actionName && v == true) {
                        valid = true;
                        return true;
                    }
                    else {
                        return true;
                    }
                })
                if (valid)return true;
            }
            return false
        };

        this.updateRoleDataFromServer = function ($scope, $cookies, $route) {
            $scope.AppSocket.emit("getFullAdminInfo", {adminName: this.adminName});
            var self = this;
            $scope.AppSocket.once("_getFullAdminInfo", function (data) {
                //update role data if role data is changed
                if (data && data.success && data.data.roles && (JSON.stringify(data.data.roles) !== JSON.stringify(self.roleData))) {
                    var exp = new Date();
                    //set token expiration time to be 5 hours from now(the same time on server)
                    exp.setSeconds(exp.getSeconds() + 60 * 60 * 5);
                    $cookies.put(self.cookiePolicyKey, JSON.stringify(data.data.roles), {
                        expires: exp,
                        //secure: true
                    });
                    self.roleData = data.data.roles;

                    //force page refresh when permission changed
                    $route.reload();
                }
            });
        };
    };

    var authApp = angular.module('authService', []);

    //Must be a provider since it will be injected into module.config()
    authApp.provider('authService', authService);

});
