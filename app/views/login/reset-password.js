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
        .controller('ResetCtrl', ['Backand','$location','$state', ResetCtrl]);

    function ResetCtrl(Backand, $location, $state) {
        var self = this;
        function init() {
            self.token = $location.search().token;
            self.sendEmail = !angular.isDefined(self.token);
            self.appName = 'todousers1';

        }

        self.reset = function () {
            self.error = null;
            self.success = null;

            if (self.sendEmail) {
                Backand.requestResetPassword(self.username,self.appName)
                    .then(
                    function () {
                        self.success = 'Please check your email to continue';
                    },
                    function (response) {
                        console.log(response);
                        self.error = response && response.data || 'Unknown error from server';
                    }
                )
            }
            else {
                if(self.newPassword != self.confirmPassword) {
                    self.error = 'Password must match';
                }
                else
                Backand.resetPassword(self.newPassword,self.token)
                    .then(
                    function () {
                        $location.path('/login');
                        $state.reload();
                    },
                    function (response) {
                        console.log(response);
                        self.error = response && response.data || 'Unknown error from server';
                    }
                )
            }
        }
        init();
    }


})();