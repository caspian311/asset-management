(function() {
  'use strict';

  angular.module('assets.register', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
          templateUrl: 'scripts/register/register.html',
          controller: 'RegisterController'
        });
      }]);
})();
