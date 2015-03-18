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
            });
        };

        self.readOne = function (id) {
            return $http({
                method: 'GET',
                url: Backand.configuration.apiUrl + baseUrl + self.tableName + '/' + id
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
            })
        };

        self.update = function (id, data) {
            return $http({
                method: 'PUT',
                url : Backand.configuration.apiUrl + baseUrl + self.tableName + '/' + id,
                data: data
            })
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
