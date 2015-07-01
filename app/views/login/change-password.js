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
        .controller('ChangeCtrl', ['Backand','$location','$state','TodoService', ChangeCtrl]);

    function ChangeCtrl(Backand, $location, $state, TodoService) {
        var self = this;
        function init() {
            self.appName = 'todousers1';
            self.currentUserInfo = TodoService.getCurrentUser();
        }

        self.update = function () {
            self.error = null;
            self.success = null;

            if(self.newPassword != self.confirmPassword) {
                self.error = 'Password must match';
            }
            else {
                Backand.changePassword(self.oldPassword,self.newPassword)
                    .then(
                    function () {
                        $location.path('/');
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