'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Main controller of the todoApp fot viewing and adding to do items
 */

angular.module('mytodoApp')
  .controller('MainCtrl', function ($scope, $cookieStore, Backand, BackandService) {

    /**
     * init by reading the to do list from the database
     */
    (function init() {
        BackandService.tableName = 'todo';
        readTodoList();
    }());

    /**
     * Read the to do list from the database
     */
    function readTodoList(){
        BackandService.readAll().then(successReadList, errorHandler);
    }

    /**
     * Success promise call with the lit data
     * @param data
     */
    function successReadList(data){
        $scope.todos = data.data.data;
    }

    /**
     * Update item in the database
     * @param todo
     */
    $scope.updateTodo = function (todo){
        BackandService.update(todo.id, todo).then(null, errorHandler);
    };

    /**
     * Add new item
     */
    $scope.addTodo = function () {
        BackandService.create({description: $scope.todo}).then(successAddTodo, errorHandler);
        $scope.todo = '';
    };

    /**
     * Success promise call with the new item added
     * @param data
     */
    function successAddTodo(data){
        $scope.todos.push(data.data);
    }

    /**
     * Remove item from the database and from the scope list
     * @param todo
     */
    $scope.removeTodo = function (todo) {
        $scope.todos.splice($scope.todos.indexOf(todo), 1);
        BackandService.delete(todo.id).then(null, errorHandler);
    };

    /**
     * Handle promise error call
     * @param error
     * @param message
     */
    function errorHandler(error) {
        console.log(error);
    }

  });
