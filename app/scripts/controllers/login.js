'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Backand login control - need to implement in order to get the token for authentication
 */

angular.module('mytodoApp')
    .controller('LoginCtrl', function ($scope, $cookieStore, Backand, $location) {

        $scope.username = 'guest@backand.com';
        $scope.password = 'guest1234';
        $scope.appName  = 'prod1103';

        $scope.signIn = function() {
            Backand.signin($scope.username, $scope.password, $scope.appName)
                .then(
                function (token) {
                    //save the token in the cookie
                    $cookieStore.put(Backand.configuration.tokenName, token);
                    $location.path('/');
                },
                function (data, status, headers, config) {
                    console.log(data);
                }
            );
        }

    });
