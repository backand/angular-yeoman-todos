/**
 * Created by Itay Herskovits  on 2/1/15.
 */
(function () {

    function TodoService($http, $cookieStore, Backand) {

        var self = this;
        var baseUrl = Backand.getApiUrl() + '/1/table/data/';

        self.tableName = null;

        self.readAll = function () {
            return $http({
                method: 'GET',
                url: baseUrl + self.tableName
            }).then(function(response) {
                return response.data.data;
            });
        };

        self.readOne = function (id) {
            return $http({
                method: 'GET',
                url: baseUrl + self.tableName + '/' + id
            }).then(function(response) {
                return response.data;
            });
        };

        self.create = function (data) {
            return $http({
                method: 'POST',
                url : baseUrl + self.tableName,
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
                url : baseUrl + self.tableName + '/' + id,
                data: data
            }).then(function(response) {
                return response.data;
            });
        };

        self.delete = function (id) {
            return $http({
                method: 'DELETE',
                url : baseUrl + self.tableName + '/' + id
            })
        };

        self.logout = function(){
            Backand.signout();
        }

    }

    angular.module('mytodoApp')
        .service('TodoService', ['$http', '$cookieStore', 'Backand', TodoService]);
}());
