(function() {
  'use strict';

  function httpInterceptor($q, $location, Backand) {
    return {

      requestError: function(rejection) {
        return $q.reject(rejection);
      },
      response: function(response) {
        return response;
      },
      responseError: function(rejection) {
        if ((rejection.config.url + "").indexOf('token') === -1) {
          // When using refresh token, on 401 responses
          // Backand SDK manages refreshing the session and re-sending the requests
          if (rejection.status === 401 && !Backand.isManagingRefreshToken()) {
            var errorMessage =
                Backand.getUsername() ?
                    'The session has expired, please sign in again.' :
                    null;
            $location.path('/login');
          }
        }
        return $q.reject(rejection);
      }
    };
  }

  angular.module('mytodoApp.config.interceptors', [])
    .factory('todoHttpInterceptor', ['$q', '$location','Backand', httpInterceptor]);
})();
