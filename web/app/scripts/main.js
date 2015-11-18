(function() {

var app = angular.module('app', ['ngRoute', 'assetControllers']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginCtrl'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);

var assetControllers = angular.module('assetControllers', []);

assetControllers.controller('LoginCtrl', function($scope) {
  $scope.signin = function() {
    console.log('logging in with: ' + $scope.email + '/' + $scope.password);
  }
});

})();
