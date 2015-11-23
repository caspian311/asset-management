(function() {
  'use strict';

  angular.module('assets.login', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
          templateUrl: 'scripts/login/login.html',
          controller: 'LoginCtrl'
        });
      }]);
})();
