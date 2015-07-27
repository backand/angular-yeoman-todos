(function () {
    'use strict';

    function todoHttpInterceptor($q, $injector) {
        return {
            requestError: function (rejection) {
                return $q.reject(rejection);
            },
            response: function (response) {
                return response;
            },
            responseError: function (rejection) {
                if ((rejection.config.url + "").indexOf('token') === -1) {
                    if (rejection.status === 401) {
                        $injector.get('$state').go('login', {error: 'The session has expired, please sign in again.'}, {reload: true});
                        $injector.get('AuthService').logout();
                    }
                }
                return $q.reject(rejection);
            }
        };
    }

    angular.module('mytodoApp.config.interceptors', [])
        .factory('todoHttpInterceptor', ['$q', '$injector', todoHttpInterceptor]);
})();
