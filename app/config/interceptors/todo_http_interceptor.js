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
    .factory('todoHttpInterceptor', ['$cookieStore','$q', '$location', '$injector', todoHttpInterceptor]);
})();
