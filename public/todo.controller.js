var app = angular.module("todo");

app.controller("todoController", todo);
app.$inject = ["$http", "userService"];

function todo($http, userService) {
  var vm = this;
  activate();
  function activate() {
    var current = userService.getUser();
    current.then(function(info) {
      vm.current = info.data.name;
      getTodos(vm.current)
    })
  }
  function getTodos(user) {
    var todos = $http.get("http://localhost:1337/todos/" + user);
    todos.then(function(todo) {
      vm.list = todo.data;
    })
  }

  vm.finished = function(item) {
    var finishedItem = item.thing;
    var removed = $http.delete("http://localhost:1337/todos/delete/" + finishedItem );
    removed.then(function() {
      getTodos();
    })
  }

  vm.add = function(item) {
    var todo = {};
    todo.thing = item[0];
    todo.date = item[1];
    todo.user = vm.current;
    var added = $http.post("http://localhost:1337/todos/add/", todo);
    added.then(function() {
        getTodos();
    })
  }

}
