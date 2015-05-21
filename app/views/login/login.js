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
            self.username = 'guest@backand.com';
            self.password = 'guest1234';
            self.appName  = 'prod1103';
        }

        self.signIn = function() {
            Backand.signin(self.username, self.password, self.appName)
                .then(
                function () {
                    $location.path('/');
                },
                function (data) {
                    console.log(data);
                    self.error = data && data.error_description || 'Unknown error from server';
                }
            );
        }
        init();
    }

    angular.module('mytodoApp')
        .controller('LoginCtrl', LoginCtrl);
})();