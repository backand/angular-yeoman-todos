'use strict';
(function() {
    /**
     * @ngdoc function
     * @name todoApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Main controller of the todoApp fot viewing and adding to do items
     */

    function MainCtrl($state, TodoService) {
        var self = this;

        /**
         * init by reading the to do list from the database
         */
        function init() {
            TodoService.name = 'todo';
            readTodoList();
        }

        /**
         * Read the to do list from the database
         */
        function readTodoList(){
            TodoService.readAll().then(onReadListSuccess, errorHandler);
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
            TodoService.update(todo.Id, todo).then(null, errorHandler);
        };

        /**
         * Add new item
         */
        self.addTodo = function () {
            TodoService.create({description: self.todo}).then(onAddTodoSuccess, errorHandler);
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
            TodoService.delete(todo.Id).then(function() {
                self.todos.splice(self.todos.indexOf(todo), 1);
            }, errorHandler);
        };

        /**
         * Logout from Backand
         */
        self.logout = function () {
            TodoService.logout();
            $state.go('login');
        }

        /**
         * Handle promise error call
         * @param error
         * @param message
         */
        function errorHandler(error) {
            console.log(error);
        }

        init();
    }

    angular.module('mytodoApp').controller('MainCtrl', MainCtrl);
})();
