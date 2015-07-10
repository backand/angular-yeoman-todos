'use strict';
(function () {
  /**
   * @ngdoc function
   * @name todoApp.controller:MainCtrl
   * @description
   * # MainCtrl
   * Main controller of the todoApp fot viewing and adding to do items
   */
  angular.module('mytodoApp')
    .controller('HeaderCtrl', ['$state', 'AuthService', HeaderCtrl]);

  function HeaderCtrl($state, AuthService) {
    var self = this;

    self.currentUser = AuthService.currentUser.name;

    self.UserDetails =  AuthService.currentUser;

    /**
     * Logout from Backand
     */
    self.logout = function () {
      AuthService.logout();
      $state.go('login');
    };

  }

})();
