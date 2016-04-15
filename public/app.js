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

app.$inject = [$http];

function todo($http) {
  vm = this;
  var todos = $http.get("http://localhost:1337/todos/Andrew");
  todos.then(function(todo) {
    vm.list = todo.data
  })
}
