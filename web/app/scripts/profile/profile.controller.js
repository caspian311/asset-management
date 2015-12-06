(function() {
  'use strict';

  angular.module('assets.profile')
    .controller('ProfileController', ['$scope', '$http', '$cookies', 'endpoints', ProfileController]);

  function ProfileController(scope, http, cookies, endpoints) {
    http.get(userUrl()).success(function(user) {
      scope.user = {
        firstName: user.firstName,
        lastName: user.lastName,
        primaryPhone: user.primaryPhone,
        secondaryPhone: user.secondaryPhone,
        address: user.address,
        city: user.city,
        state: user.state,
        zip: user.zip,
        password: user.password
      };
    }).error(function() {
      scope.errorMessage = 'Failed to load user\'s profile information.';
    });

    scope.update = function() {
      http.put(userUrl(), scope.user).success(function() {});
    };

    function userUrl() {
      return endpoints.userUrl(cookies.getObject('user').id);
    }
  }
})();
