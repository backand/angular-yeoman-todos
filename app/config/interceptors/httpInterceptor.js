(function() {
  'use strict';

  function httpInterceptor($cookieStore, $q, $location, $injector) {
    return {
        request: function(config) {
          return $injector.invoke(function(Backand) {
            if ($cookieStore.get('backand_token')) {
                config.headers['Authorization'] = $cookieStore.get('backand_token');
            }
            return config;
          });
      },
      requestError: function(rejection) {
        return $q.reject(rejection);
      },
      response: function(response) {
        return response;
      },
      responseError: function(rejection) {
        return $injector.invoke(function(Backand) {
          //if not sign in screen :
          if ((rejection.config.url+"").indexOf('token') === -1){
            if (rejection.status === 401) {
              $cookieStore.remove('backand_token');
              $location.path('/login');
              return $q.reject(rejection);
            }
          }
          return $q.reject(rejection);
        });
      }
    };
  }

  angular.module('mytodoApp.config.interceptors', [])
    .factory('todoHttpInterceptor', ['$cookieStore','$q', '$location', '$injector', httpInterceptor]);
})();
