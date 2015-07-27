'use strict';
(function () {
    /**
     * @ngdoc function
     * @name todoApp.controller:HeaderCtrl
     * @description
     * # HeaderCtrl
     * Header controller of the todoApp, identifying the current user
     */
    angular.module('mytodoApp')
        .controller('HeaderCtrl', ['$state', 'AuthService', HeaderCtrl]);

    function HeaderCtrl($state, AuthService) {
        var self = this;

        self.currentUser = AuthService.currentUser;

        /**
         * Logout from Backand
         */
        self.logout = function () {
            AuthService.logout();
            $state.go('login');
        };

    }

})();
