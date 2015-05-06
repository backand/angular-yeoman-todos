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
            self.username = '';
            self.password = '';
            self.appName = '';
            self.firstName = '';
            self.lastName = '';
            self.newUser = false;
        }

        self.signIn = function () {
            self.error = null;
            self.success = null;
            if (self.newUser) {
                Backand.signup(self.firstName, self.lastName, self.username, self.password, self.password)
                    .then(
                    function (response) {
                        console.log(response);
                        self.success = 'Please check your email to continue';
                    },
                    function (response) {
                        console.log(response);
                        self.error = response && response.data || 'Unknown error from server';
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
                    function (response) {
                        console.log(response);
                        self.error = response && response.data || 'Unknown error from server';
                    }
                );
            }
        }
        init();
    }

    angular.module('mytodoApp')
        .controller('LoginCtrl', LoginCtrl);
})();