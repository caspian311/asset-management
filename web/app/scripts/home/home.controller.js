(function() {
  'use strict';

  angular.module('assets.home').controller('HomeCtrl', ['$scope', '$location', '$cookies', HomeCtrl]);

  function HomeCtrl(scope, $location, $cookies) {
    activate();

    function activate() {
      var user = $cookies.getObject('user');

      if (user === undefined) {
        $location.path('/login');
      } else {
        scope.username = user.name.replace('+', ' ');
      }
    }
  }
})();


