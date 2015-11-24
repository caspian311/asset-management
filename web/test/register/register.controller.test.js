(function () {
  'use strict';

  describe('RegisterController', function () {
    var scope;

    beforeEach(module('assets.register'));

    beforeEach(inject(function($controller) {
      scope = {};
      $controller('HomeCtrl', { $scope: scope, $location: location, $cookies: cookies });
    }));

    describe('all information is filled out', function() {
      it('should enable the register button');
    });

    describe('#register', function () {
      it('should create the user');
    });
  });

})();
