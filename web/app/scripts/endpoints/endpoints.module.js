(function() {
  'use strict';

  angular.module('assets.endpoints', []).factory('endpoints', [function() {
      var baseUrl = 'http://asset-management.lvh.me/api';
      
      return {
        authUrl: baseUrl + '/auth/session',
        userUrl: baseUrl + '/user'
      };
    }]);
})();
