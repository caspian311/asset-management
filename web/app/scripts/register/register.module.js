(function() {
  'use strict';

  angular.module('assets.registger', ['ngCookies'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
          templateUrl: 'scripts/register/register.html',
          controller: 'RegisterController'
        });
      }]);
})();
