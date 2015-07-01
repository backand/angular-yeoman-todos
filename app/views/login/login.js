'use strict';
(function() {
    /**
     * @ngdoc function
     * @name todoApp.controller:LoginCtrl
     * @description
     * # LoginCtrl
     * Backand login control - need to implement in order to get the token for authentication
     */

    angular.module('mytodoApp')
        .controller('LoginCtrl', ['Backand','$cookieStore','$location','$state', LoginCtrl]);

    function LoginCtrl(Backand, $cookieStore, $location, $state) {
        var self = this;
        function init() {
            self.username = '';
            self.password = '';
            self.appName = 'todousers1';
            self.firstName = '';
            self.lastName = '';
            self.newUser = false;
        }

        self.signIn = function () {
            self.error = null;
            self.success = null;
            if (self.newUser) {
                Backand.signup(self.firstName, self.lastName, self.username, self.password, self.password)
                    .then(
                    function (response) {
                        //check status of the sign in
                        switch(response.data.currentStatus){
                            case 1: // The user is ready to sign in
                                $location.path('/login');
                                $state.reload();
                                break;
                            case 2: //The system is now waiting for the user to respond a verification email.
                                self.success = 'Please check your email to continue';
                                break;
                            case 3: //The user signed up and is now waiting for an administrator approval.
                                self.success = 'Please wait for the administrator to approve the sign up';
                                break;
                        }


                    },
                    function (response) {
                        console.log(response);
                        self.error = response && response.data || 'Unknown error from server';
                    }
                );
            }
            else {
                Backand.signin(self.username, self.password, self.appName)
                    .then(
                    function () {
                        $cookieStore.put('username', self.username);
                        $location.path('/');
                    },
                    function (response) {
                        console.log(response);
                        self.error = response && response.data || 'Unknown error from server';
                    }
                );
            }
        }
        init();
    }


})();