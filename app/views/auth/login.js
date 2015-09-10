'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */

    angular.module('mytodoApp')
        .controller('LoginCtrl', ['AuthService', '$state', LoginCtrl]);

    function LoginCtrl(AuthService, $state) {
        var self = this;

        self.appName = AuthService.appName;
        self.appNameExists = !!self.appName;
        self.error = $state.params.error;
        self.socialProviders = AuthService.getSocialProviders();

        self.authenticate = function () {
            self.error = null;
            self.success = null;

            if (!self.appNameExists) {
                AuthService.setAppName(self.appName);
            }

            if (self.newUser) {
                self.signUp();
            } else {
                self.signIn();
            }
        };

        self.signUp = function () {
            AuthService.signUp(self.firstName, self.lastName, self.username, self.password)
                .then(
                function (response) {
                    //check status of the sign in
                    switch (response.data.currentStatus) {
                        case 1: // The user is ready to sign in
                            $state.go('todos');
                            break;
                        case 2: //The system is now waiting for the user to respond a verification email.
                            self.success = 'Please check your email to continue';
                            break;
                        case 3: //The user signed up and is now waiting for an administrator approval.
                            self.success = 'Please wait for the administrator to approve the sign up';
                            break;
                    }
                }, showError
            );
        };

        self.signIn = function () {
            AuthService.signIn(self.username, self.password)
                .then(
                function () {
                    $state.go('todos');
                },

                showError
            );
        };

        function showError(error) {
            self.error = error && error.data || error.error_description || 'Unknown error from server';
        }

        function gotoTodos() {
            $state.go('todos');
        }

        self.socialSignIn = function (provider) {
            if (!self.appNameExists) {
                AuthService.setAppName(self.appName);
            }

            self.newUser ?
                AuthService.socialSignUp(provider.name)
                    .then(gotoTodos, showError) :
                AuthService.socialSignIn(provider.name)
                    .then(gotoTodos, showError);
        };

    }


})();