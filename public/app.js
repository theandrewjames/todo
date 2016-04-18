var app = angular.module("todo", []);

app.controller("homeController", home);
app.$inject = ["$http"];

function home($http) {
  var vm = this;
  vm.message = "Welcome home";

  var user = $http.get("http://localhost:1337/user");
  user.then(function(info) {
    vm.user = info.data;
  })
}

app.controller("todoController", todo);
app.$inject = ["$http"];

function todo($http) {
  var vm = this;
  activate();
  function activate() {
    getTodos();
  }
  function getTodos() {
    var todos = $http.get("http://localhost:1337/todos/Andrew");
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
    todo.thing = item;

    var added = $http.post("http://localhost:1337/todos/add/", todo);
    added.then(function() {
        getTodos();
    })
  }

}
