'use strict';

angular.module('mytodoApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.sortable',
  'LocalStorageModule',
  'mytodoApp.config.interceptors',
  'mytodoApp.config.consts',
  'backand',
  'satellizer'
])
  .config(['$stateProvider', '$httpProvider', '$urlRouterProvider', 'BackandProvider', 'CONSTS',
    function ($stateProvider, $httpProvider, $urlRouterProvider, BackandProvider, CONSTS) {
      BackandProvider.manageDefaultHeaders();
      BackandProvider.setAnonymousToken(CONSTS.anonymousToken);
      BackandProvider.setSignUpToken(CONSTS.signUpToken);
      BackandProvider.setAppName(CONSTS.appName);

      $httpProvider.interceptors.push('todoHttpInterceptor');

      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state('main', {
          url: '/',
          abstract: true,
          templateUrl: 'views/main/header.html',
          controller: 'HeaderCtrl as header'
        })
        .state('todos', {
          url: '',
          parent: 'main',
          templateUrl: 'views/main/todoList.html',
          controller: 'TodoListCtrl as todoList'
        })
        .state('changePassword', {
          url: 'changePassword',
          parent: 'main',
          templateUrl: 'views/auth/change-password.html',
          controller: 'ChangePasswordCtrl as changePassword'
        })
        .state('login', {
          url: '/login',
          templateUrl: 'views/auth/login.html',
          controller: 'LoginCtrl as login',
          params: {
            error: null
          }
        })
        .state('resetPassword', {
          url: '/resetPassword',
          templateUrl: 'views/auth/reset-password.html',
          controller: 'ResetPasswordCtrl as resetPassword'
        });
    }])
  .config(function($authProvider) {

    $authProvider.facebook({
      clientId: '624059410963642'
    });

    $authProvider.google({
      clientId: '701238333050-gk8n3m7aar07hkhm6jucontidpha1mqd.apps.googleusercontent.com'
    });

    $authProvider.github({
      clientId: '0ba2600b1dbdb756688b'
    });

    //$authProvider.baseUrl = 'https://backand.com/apps/'
    //$authProvider.signupRedirect = '';
  });
