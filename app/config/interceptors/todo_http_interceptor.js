(function() {
  'use strict';

  function todoHttpInterceptor($cookieStore, $q, $location, $injector) {
    return {
      requestError: function(rejection) {
        return $q.reject(rejection);
      },
      response: function(response) {
        return response;
      },
      responseError: function (rejection) {
        if ((rejection.config.url + "").indexOf('token') === -1) {
            if (rejection.status === 401) {
                $location.path('/login');
                return $q.reject(rejection);
            }
        }
        return $q.reject(rejection);
      }
    };
  }

  angular.module('mytodoApp.config.interceptors', [])
    .factory('todoHttpInterceptor', ['$cookieStore','$q', '$location', '$injector', todoHttpInterceptor]);
})();
