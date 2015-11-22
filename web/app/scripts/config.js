(function() {
  'use strict';

  var app = angular.module('app');

  app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/login', {
          templateUrl: 'partials/login.html',
          controller: 'LoginCtrl'
        }).
        when('/home', {
          templateUrl: 'partials/home.html',
          controller: 'HomeCtrl'
        }).
        otherwise({
          redirectTo: '/login'
        });
    }]);
})();

