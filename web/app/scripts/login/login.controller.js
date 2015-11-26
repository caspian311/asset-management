(function() {
  'use strict';

  angular.module('assets.login').controller('LoginCtrl', 
      ['$scope', '$http', '$location', 'endpoints', LoginCtrl]);

  function LoginCtrl(scope, $http, $location, endpoints) {
    scope.signinButtonEnabled = true;

    scope.goRegister = function() {
      $location.path('/register');
    };
    scope.signin = function() {
      scope.signinButtonEnabled = false;

      $http.post(endpoints.authUrl, { email: scope.email, password: scope.password })
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
      $location.path('/home');
    }
  }
})();

