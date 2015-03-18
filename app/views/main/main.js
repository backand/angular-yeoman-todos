'use strict';
(function() {
    /**
     * @ngdoc function
     * @name todoApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Main controller of the todoApp fot viewing and adding to do items
     */

    function MainCtrl($cookieStore, Backand, BackandService, $window) {
        var self = this;

        /**
         * init by reading the to do list from the database
         */
        function init() {
            BackandService.tableName = 'todo';
            readTodoList();
        }

        /**
         * Read the to do list from the database
         */
        function readTodoList(){
            BackandService.readAll().then(onReadListSuccess, errorHandler);
        }

        /**
         * Success promise call with the lit data
         * @param data
         */
        function onReadListSuccess(todos){
            self.todos = todos;
        }

        /**
         * Update item in the database
         * @param todo
         */
        self.updateTodo = function (todo){
            BackandService.update(todo.id, todo).then(null, errorHandler);
        };

        /**
         * Add new item
         */
        self.addTodo = function () {
            BackandService.create({description: self.todo}).then(onAddTodoSuccess, errorHandler);
            self.todo = '';
        };

        /**
         * Success promise call with the new item added
         * @param data
         */
        function onAddTodoSuccess(todo){
            self.todos.push(todo);
        }

        /**
         * Remove item from the database and from the list
         * @param todo
         */
        self.removeTodo = function (todo) {
            BackandService.delete(todo.id).then(function() {
                self.todos.splice(self.todos.indexOf(todo), 1);
            }, errorHandler);
        };

        /**
         * Handle promise error call
         * @param error
         * @param message
         */
        function errorHandler(error) {
            console.log(error);
        }

        /**
         * toggle completion of todo
         */
        self.toggleTodo = function (todo) {
            self.updateTodo(todo);
        }

        self.logout = function () {
            Backand.signout();
            $cookieStore.remove(Backand.configuration.tokenName);
            $window.location.reload();
        }

        init();
    }

    angular.module('mytodoApp').controller('MainCtrl', MainCtrl);
})();
