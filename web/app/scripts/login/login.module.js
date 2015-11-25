(function() {
  'use strict';

  angular.module('assets.login', ['ngRoute', 'assets.endpoints'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
          templateUrl: 'scripts/login/login.html',
          controller: 'LoginCtrl'
        });
      }]);
})();
