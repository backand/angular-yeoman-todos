'use strict';
(function() {
    /**
     * @ngdoc function
     * @name todoApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Main controller of the todoApp fot viewing and adding to do items
     */

    function MainCtrl($state, $cookieStore, TodoService) {
        var self = this;

        self.currentUserInfo = null;
        self.currentUser = null;
        self.signInTitle = "Sign In";
        self.error = null;
        /**
         * init by reading the to do list from the database
         */
        function init() {
            
            TodoService.tableName = 'todo';
            readTodoList();

            self.currentUser = TodoService.getCurrentUser();
            if (self.currentUser) {
                getCurrentUserInfo();
                self.signInTitle = "Log out";
            }
        }

        /**
         * Read the to do list from the database
         */
        function readTodoList() {
            clearError();
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
            clearError();
            TodoService.update(todo.Id, todo).then(null, errorHandler);
        };

        /**
         * Add new item
         */
        self.addTodo = function () {
            clearError();
            TodoService.create({ description: self.todo, createdBy: self.currentUserInfo.Id }).then(onAddTodoSuccess, errorHandler);
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
            clearError();
            TodoService.delete(todo.Id).then(function () {
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
            if (error) {
                if (error.data && error.data.split) {
                    var msg = error.data.split(':');
                    self.error = msg[msg.length - 1];
                }
                else {
                    self.error = JSON.stringify(error);
                }
            }
            else {
                self.error == "Unexpected failure";
            }
        }

        function clearError() {
            self.error = null;
        }

        function getCurrentUserInfo() {
            return TodoService.getCurrentUserInfo().then(function (data) {
                self.currentUserInfo = data;
            });
        }

        self.getCurrentUserName = function () {
            if (!self.currentUser)
                return "Guest";
            if (self.currentUserInfo)
                return self.currentUserInfo.name;
            else
                return null;
            
        }

        
        init();
    }

    angular.module('mytodoApp').controller('MainCtrl', MainCtrl);
})();
