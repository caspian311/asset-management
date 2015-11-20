(function() {
  'use strict';

  angular.module('assetControllers', []).controller('LoginCtrl', ['$scope', '$http', LoginController]);

  function LoginController(scope, $http) {
    scope.signinButtonEnabled = true;

    scope.signin = function() {
      scope.signinButtonEnabled = false;

      $http.post('/auth/session', { email: scope.email, password: scope.password })
        .success(loginSuccess)
        .error(loginFailed);
    }

    function loginFailed() {
      scope.status = 'Login failed'
      scope.email = '';
      scope.password = '';
      scope.signinButtonEnabled = true;
    }

    function loginSuccess() {
      scope.signinButtonEnabled = true;
    }
  }
})();

