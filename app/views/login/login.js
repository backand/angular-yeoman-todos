'use strict';
(function() {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */
    function LoginCtrl($cookieStore, Backand, $location) {
        var self = this;
        function init() {
            self.username = 'guest@backand.com';
            self.password = 'guest1234';
            self.appName  = 'prod1103';
        }

        self.signIn = function() {
            Backand.signin(self.username, self.password, self.appName)
                .then(
                function (token) {
                    //save the token in the cookie
                    $cookieStore.put(Backand.configuration.tokenName, token);
                    $location.path('/');
                },
                function (data) {
                    console.log(data);
                    self.error = data && data.error_description || 'Unkown error from server';
                }
            );
        }
        init();
    }

    angular.module('mytodoApp')
        .controller('LoginCtrl', LoginCtrl);
})();