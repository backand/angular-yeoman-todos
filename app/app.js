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
    BackandProvider.setAnonymousToken('Your Anonymous Token');
    BackandProvider.setSignUpToken('Your SignUp Token');$httpProvider.interceptors.push('todoHttpInterceptor');
    $urlRouterProvider.otherwise("/");
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
      });
  }]);
