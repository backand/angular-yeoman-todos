'use strict';

angular.module('mytodoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.sortable',
  'LocalStorageModule',
  'common.interceptors.http',
  'backand'
])
  .config(['$stateProvider','$httpProvider', '$urlRouterProvider', function($stateProvider, $httpProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
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
