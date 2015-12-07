(function() {
  'use strict';

  angular.module('assets.profile')
    .controller('ProfileController', ['$scope', '$http', '$cookies', 'endpoints', ProfileController]);

  function ProfileController(scope, http, cookies, endpoints) {
    http.get(userUrl()).success(function(user) {
      scope.user = {
        firstName: user.first_name,
        lastName: user.last_name,
        primaryPhone: user.primary_phone_number,
        secondaryPhone: user.secondary_phone_number,
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
      http.put(userUrl(), scope.user).success(function() {
        scope.successMessage = 'Profile successfully updated.';
      }).error(function() {
        scope.errorMessage = 'An error occurred trying to update your Profile.';
      });
    };

    function userUrl() {
      return endpoints.userUrl(cookies.getObject('user').id);
    }
  }
})();
