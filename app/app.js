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
    //BackandProvider.setAnonymousToken('9d137024-89a7-4930-a1ec-09d489e1aeb0');
    BackandProvider.setAnonymousToken('c3b61359-6843-440b-8a39-1d54f5b907be');
    BackandProvider.setSignUpToken('035F6716-4E87-46FB-A8C9-2C5212A37E80');
    BackandProvider.setApiUrl('http://localhost:4109/backapi');
    $httpProvider.interceptors.push('todoHttpInterceptor');
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
