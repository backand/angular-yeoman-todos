/**
 * Created by Itay Herskovits  on 2/1/15.
 */
(function () {

    function TodoService($http, $cookieStore, Backand) {

        var self = this;
        var baseUrl = '/1/objects/';

        self.name = null;

        self.readAll = function () {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + baseUrl + self.name
            }).then(function(response) {
                return response.data.data;
            });
        };

        self.readOne = function (id) {
            return $http({
                method: 'GET',
                url: Backand.getApiUrl() + baseUrl + self.name + '/' + id
            }).then(function(response) {
                return response.data;
            });
        };

        self.create = function (data) {
            return $http({
                method: 'POST',
                url : Backand.getApiUrl() + baseUrl + self.name,
                data: data,
                params: {
                    returnObject: true
                }
            }).then(function(response) {
                return response.data;
            });
        };

        self.update = function (id, data) {
            return $http({
                method: 'PUT',
                url : Backand.getApiUrl() + baseUrl + self.name + '/' + id,
                data: data
            }).then(function(response) {
                return response.data;
            });
        };

        self.delete = function (id) {
            return $http({
                method: 'DELETE',
                url : Backand.getApiUrl() + baseUrl + self.name + '/' + id
            })
        };

        self.logout = function(){
            Backand.signout();
        }

    }

    angular.module('mytodoApp')
        .service('TodoService', ['$http', '$cookieStore', 'Backand', TodoService]);
}());
