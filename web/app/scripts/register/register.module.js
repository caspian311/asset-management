(function() {
  'use strict';

  angular.module('assets.register', ['ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
          templateUrl: 'scripts/register/register.html',
          controller: 'RegisterController'
        });
      }]);
})();
