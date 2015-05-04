'use strict';
(function() {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */
    function LoginCtrl(Backand, $cookieStore, $location) {
        var self = this;
        function init() {
            //self.username = 'relly02@devitout.com';
            //self.password = '123456';
            //self.appName = 'todo36057';
            self.username = 'admin03@devitout.com';
            self.password = '123456';
            self.appName = 'app18';
            self.firstName = '';
            self.lastName = '';
            self.newUser = false;
        }

        self.signIn = function () {
            if (self.newUser) {
                Backand.signup(self.firstName, self.lastName, self.username, self.password, self.password)
                    .then(
                    function (data) {
                        console.log(data);
                        self.error = 'Please check your email to continue';
                    },
                    function (data) {
                        console.log(data);
                        self.error = data && data.error_description || 'Unknown error from server';
                    }
                );
            }
            else {
                Backand.signin(self.username, self.password, self.appName)
                    .then(
                    function () {
                        $cookieStore.put('username', self.username);
                        $location.path('/');
                    },
                    function (data) {
                        console.log(data);
                        self.error = data && data.error_description || 'Unknown error from server';
                    }
                );
            }
        }
        init();
    }

    angular.module('mytodoApp')
        .controller('LoginCtrl', LoginCtrl);
})();