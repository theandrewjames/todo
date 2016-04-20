var app = angular.module("todo");

app.controller("homeController", home);
app.$inject = ["$http", "userService"];

function home($http, userService) {
  var vm = this;
  vm.message = "Welcome home";

  var user = $http.get("http://localhost:1337/user");
  user.then(function(info) {
    vm.user = info.data;
  })
  var current = userService.getUser();
  current.then(function(info) {
    vm.current = info.data;
  })
}
