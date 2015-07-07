(function () {

  angular.module('mytodoApp')
    .service('AuthService', ['CONSTS', '$http', '$cookieStore', '$q', 'Backand', AuthService]);

  function AuthService(CONSTS, $http, $cookieStore, $q, Backand) {

    var self = this;
    var baseUrl = Backand.getApiUrl() + '/1/objects/';
    self.appName = CONSTS.appName || '';
    self.currentUser = {};

    getUserDetails();

    function getUserDetails () {
      self.currentUser.name = getCurrentUser();
      if (self.currentUser.name) {
        getCurrentUserInfo()
          .then(function (data) {
            self.currentUser.details = data;
          });
      }
    }

    self.setAppName = function (newAppName) {
      self.appName = newAppName;
    };

    self.signIn = function (username, password) {
      return Backand.signin(username, password, self.appName)
        .then(function (response) {
          $cookieStore.put('username', username);
          getUserDetails();
          return response;
        });
    };

    self.signUp = function (firstName, lastName, username, password) {
      var deferred = $q.defer();
      Backand.signup(firstName, lastName, username, password, password)
        .then(function (signUpResponse) {

          if (signUpResponse.data.currentStatus === 1) {
            self.signIn(username, password)
              .then(function (signInResponse) {
                deferred.resolve(signUpResponse);
              }, function (error) {
                deferred.reject(error)
              });

          } else {
            deferred.resolve(signUpResponse);
          }
        },
        function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    self.changePassword = function (oldPassword, newPassword) {
      return Backand.changePassword(oldPassword, newPassword)
    };

    self.requestResetPassword = function (username) {
      return Backand.requestResetPassword(username, self.appName)
    };

    self.resetPassword = function (password, token) {
      return Backand.resetPassword(password, token)
    };

    self.logout = function(){
      Backand.signout().then(function () {
        $cookieStore.remove('username');
        angular.copy({}, self.currentUser);
      });
    };

    function getCurrentUser () {
      return $cookieStore.get('username');
    }

    function getCurrentUserInfo () {
      return $http({
        method: 'GET',
        url: baseUrl + "users",
        params: { filter: JSON.stringify([{ fieldName: "email", operator: "contains", value: self.currentUser.name }]) }
      }).then(function (response) {
        if (response.data && response.data.data && response.data.data.length == 1)
          return response.data.data[0];
      });
    }

  }

}());
