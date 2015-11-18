(function() {

var app = angular.module('app', []);

app.controller('LoginCtrl', function($scope) {
  $scope.name = 'monkey';
  $scope.foos = [{ foo: 'bar' }, { foo: 'baz' }];

  $scope.signin = function() {
    console.log('logging in with: ' + $scope.email + '/' + $scope.password);
  }
});

})();
