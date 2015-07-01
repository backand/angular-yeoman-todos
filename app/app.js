'use strict';

angular.module('mytodoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.sortable',
  'LocalStorageModule',
  'mytodoApp.config.interceptors',
  'backand'
])
  .config(['$stateProvider','$httpProvider', '$urlRouterProvider', 'BackandProvider', function($stateProvider, $httpProvider, $urlRouterProvider, BackandProvider) {
    BackandProvider.manageDefaultHeaders();
    BackandProvider.setAnonymousToken('89aa260f-1995-4d58-8466-fa3bfbcb6db2');
    BackandProvider.setSignUpToken('27d6fc59-d0cd-491a-8c4e-02383f3b7e3c');

    BackandProvider.setApiUrl('http://api.backand.info:8099');

    $httpProvider.interceptors.push('todoHttpInterceptor');
    $stateProvider
      .state('todos', {
        url: '/',
        templateUrl: 'views/main/main.html',
        controller: 'MainCtrl as vm'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'LoginCtrl as vm'
      })
      .state('change', {
        url: '/change',
        templateUrl: 'views/login/change-password.html',
        controller: 'ChangeCtrl as vm'
      })
      .state('reset', {
        url: '/reset',
        templateUrl: 'views/login/reset-password.html',
        controller: 'ResetCtrl as vm'
      });
      $urlRouterProvider.otherwise("/");
    }]);
