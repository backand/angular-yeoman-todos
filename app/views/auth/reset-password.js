'use strict';
(function() {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */

    angular.module('mytodoApp')
        .controller('ResetPasswordCtrl', ['AuthService', '$location', '$state', ResetPasswordCtrl]);

    function ResetPasswordCtrl(AuthService, $location, $state) {
        var self = this;
        function init() {
            self.token = $location.search().token;
            self.sendEmail = !angular.isDefined(self.token);
        }

        self.reset = function () {
            self.error = null;
            self.success = null;

            if (self.sendEmail) {
                AuthService.requestResetPassword(self.username)
                    .then(
                    function () {
                        self.success = 'Please check your email to continue';
                    },
                    function (response) {
                        self.error = response && response.data || 'Unknown error from server';
                    }
                )
            }
            else {
                if(self.newPassword != self.confirmPassword) {
                    self.error = 'Password must match';
                }
                else
                    AuthService.resetPassword(self.newPassword, self.token)
                    .then(
                    function () {
                        $state.go('login');
                    },
                    function (response) {
                        self.error = response && response.data || 'Unknown error from server';
                    }
                )
            }
        };

        init();
    }


})();