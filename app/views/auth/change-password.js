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
        .controller('ChangePasswordCtrl', ['$state', 'AuthService', ChangePasswordCtrl]);

    function ChangePasswordCtrl($state, AuthService) {
        var self = this;
        function init() {
            self.appName = 'todousers1';
            self.currentUserInfo = AuthService.currentUser.name || $state.go('login');
        }

        self.update = function () {
            self.error = null;
            self.success = null;

            if(self.newPassword != self.confirmPassword) {
                self.error = 'Password must match';
            }
            else {
                AuthService.changePassword(self.oldPassword, self.newPassword)
                    .then(
                    function () {
                        self.oldPassword = self.newPassword = self.confirmPassword = null;
                        self.success = 'Password was changed successfully.';
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