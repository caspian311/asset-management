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
        otherwise({
          redirectTo: '/login'
        });
    }]);
})();

