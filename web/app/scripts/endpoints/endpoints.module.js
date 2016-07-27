(function() {
  'use strict';

  angular.module('assets.endpoints', []).factory('endpoints', [function() {
      return {
        authUrl: 'api/session',
        userUrl: 'api/user'
      };
    }]);
})();
