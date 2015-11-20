(function() {
  'use strict';

  var assetControllers = angular.module('assetControllers', []);

  assetControllers.controller('LoginCtrl', ['$scope', '$http', function(scope, $http) {
    scope.signin = function() {
      scope.signinButtonEnabled = false;

      $http.post('/auth/session', { email: scope.email, password: scope.password }).error(function() {
        scope.status = 'Login failed'
        scope.email = '';
        scope.password = '';
      }).then(function() {
        scope.signinButtonEnabled = true;
      });
    }
  }]);

})();

