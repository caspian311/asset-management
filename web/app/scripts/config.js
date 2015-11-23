(function() {
  'use strict';

  angular.module('assets')
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({ redirectTo: '/home' });
      }]);
})();

