(function() {
  'use strict';

  var endpoint = 'http://asset-management.lvh.me/api/auth/session';

  angular.module('assets.login').controller('LoginCtrl', ['$scope', '$http', '$location', LoginCtrl]);

  function LoginCtrl(scope, $http, $location) {
    scope.signinButtonEnabled = true;

    scope.signin = function() {
      scope.signinButtonEnabled = false;

      $http.post(endpoint, { email: scope.email, password: scope.password })
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

