'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:ChangePasswordCtrl
     * @description
     * # ChangePasswordCtrl
     * Backand change password controller -
     * change password for signed in user (with old password) and for forgot password (with token)
     */

    angular.module('mytodoApp')
        .controller('ChangePasswordCtrl', ['AuthService', '$location', ChangePasswordCtrl]);

    function ChangePasswordCtrl(AuthService, $location) {
        var self = this;

        function init() {
            self.token = $location.search().token;
        }

        self.update = function () {
            self.error = null;
            self.success = null;

            if (self.newPassword != self.confirmPassword) {
                self.error = 'Password must match';
            }
            else {
                self.token ?
                    AuthService.resetPassword(self.newPassword, self.token)
                        .then(changePasswordSuccess, changePasswordError) :
                    AuthService.changePassword(self.oldPassword, self.newPassword)
                        .then(changePasswordSuccess, changePasswordError)
            }
        };

        function changePasswordSuccess() {
            self.oldPassword = self.newPassword = self.confirmPassword = null;
            self.success = 'Password was changed successfully.';
        }

        function changePasswordError(response) {
            self.error = response && response.data || 'Unknown error from server';
        }

        init();
    }

})();