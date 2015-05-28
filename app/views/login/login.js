'use strict';
(function() {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */
    function LoginCtrl(Backand, $cookieStore, $location, $window) {
        var self = this;
        function init() {
            self.username = 'relly@backand.com';
            self.password = '123456';
            self.appName  = 'app31';
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

        self.google = function(){
            var returnUrl = $location.path('/').$$absUrl;

            var url = "Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=www.google.com&state=rcFNVUMsUOSNMJQZ%2bDTzmpqaGgSRGhUfUOyQHZl6gas%3d";
            window.location = Backand.getApiUrl() + '/api/' + url + "&appname=" + encodeURIComponent(self.appName) + "&returnAddress=" + encodeURIComponent(returnUrl);



        }
    }

    angular.module('mytodoApp')
        .controller('LoginCtrl', LoginCtrl);
})();