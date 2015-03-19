/**
 * Created by Itay Herskovits  on 2/1/15.
 */
(function () {

    function BackandService($http, Backand) {

        var self = this;
        var baseUrl = '/1/table/data/';

        self.tableName = null;

        self.readAll = function () {
            return $http({
                method: 'GET',
                url: Backand.configuration.apiUrl + baseUrl + self.tableName
            }).then(function(response) {
                return response.data.data.map(function(todo) {
                    todo.id = parseInt(todo.id);
                    return todo;
                });
            });
        };

        self.readOne = function (id) {
            return $http({
                method: 'GET',
                url: Backand.configuration.apiUrl + baseUrl + self.tableName + '/' + id
            }).then(function(response) {
                return response.data;
            });
        };

        self.create = function (data) {
            return $http({
                method: 'POST',
                url : Backand.configuration.apiUrl + baseUrl + self.tableName,
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
                url : Backand.configuration.apiUrl + baseUrl + self.tableName + '/' + id,
                data: data
            }).then(function(response) {
                return response.data;
            });
        };

        self.delete = function (id) {
            return $http({
                method: 'DELETE',
                url : Backand.configuration.apiUrl + baseUrl + self.tableName + '/' + id
            })
        };

    }

    angular.module('mytodoApp')
        .service('BackandService', ['$http', 'Backand', BackandService]);
}());
