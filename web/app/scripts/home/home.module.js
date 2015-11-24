(function() {
  'use strict';

  angular.module('assets.home', ['ngCookies', 'ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
          templateUrl: 'scripts/home/home.html',
          controller: 'HomeCtrl'
        });
      }]);
})();
