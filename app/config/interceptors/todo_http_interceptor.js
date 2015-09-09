(function () {
    'use strict';

    function todoHttpInterceptor($q) {
        return {
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                return response;
            },
            responseError: function (rejection) {
                return $q.reject(rejection);
            }
        };
    }

    angular.module('mytodoApp.config.interceptors', [])
        .factory('todoHttpInterceptor', ['$q', todoHttpInterceptor]);
})();
