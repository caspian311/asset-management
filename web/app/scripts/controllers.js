(function() {
  'use strict';

  var assetControllers = angular.module('assetControllers', []);

  assetControllers.controller('LoginCtrl', ['$scope', function(scope) {
    scope.signin = function() {
      console.log('logging in with: ' + scope.email + '/' + scope.password);
    }
  }]);

})();

