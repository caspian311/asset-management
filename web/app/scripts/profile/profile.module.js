(function() {
  'use strict';

  angular.module('assets.profile', ['ngRoute', 'assets.endpoints'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/profile', {
        templateUrl: 'scripts/profile/profile.html',
        controller: 'ProfileController'
      });
    }]);;
})();
