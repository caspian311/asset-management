(function() {
  'use strict';

  var endpoint = 'http://asset-management.lvh.me/api/user';
  angular.module('assets.register').controller('RegisterController', ['$scope', '$http', RegisterController]);

  function RegisterController(scope, $http) {
    activate();

    scope.register = function() {
      $http.post(endpoint, payload());
    }

    function payload() {
      return {
        'firstName': scope.firstName,
        'lastName': scope.lastName,
        'email': scope.email,
        'password': scope.password
      };
    }

    function activate() {
      scope.registerButtonEnabled = false;
      scope.$watch('[firstName, lastName, email, password, confirmPassword]', 
          function() { 
            scope.registerButtonEnabled = allFieldArePresent() && isPasswordConfirmed();
          }, true);
    }

    function isPasswordConfirmed() {
      return scope.password === scope.confirmPassword;
    }

    function allFieldArePresent() {
      return scope.firstName.length > 0 && 
            scope.lastName.length > 0 && 
            scope.email.length > 0 && 
            scope.password.length > 0 && 
            scope.confirmPassword.length > 0;
    }

  }
})();


