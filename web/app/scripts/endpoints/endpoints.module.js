(function() {
  'use strict';

  angular.module('assets.endpoints', []).factory('endpoints', [function() {
      var baseUrl = 'http://asset-management.lvh.me/api';
      
      return {
        authUrl: baseUrl + '/session',
        userUrl: function(id) { return baseUrl + '/user/' + id; }
      };
    }]);
})();
