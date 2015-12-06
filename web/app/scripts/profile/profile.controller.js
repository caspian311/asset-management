(function() {
  'use strict';

  angular.module('assets.profile')
    .controller('ProfileController', ['$scope', '$http', '$cookies', 'endpoints', ProfileController]);

  function ProfileController(scope, http, cookies, endpoints) {
    http.get(endpoints.userUrl(cookies.getObject('user').id)).success(function(user) {
      scope.firstName = user.firstName;
      scope.lastName = user.lastName;
      scope.primaryPhone = user.primaryPhone;
      scope.secondaryPhone = user.secondaryPhone;
      scope.address = user.address;
      scope.city = user.city;
      scope.state = user.state;
      scope.zip = user.zip;
      scope.password = user.password;
    }).error(function() {
      scope.errorMessage = 'Failed to load user\'s profile information.';
    });
  }
})();
