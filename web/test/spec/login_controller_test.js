(function () {
  'use strict';

  describe('LoginCtrl', function () {
    var scope, controller, httpBackend;

    beforeEach(module('assetControllers'));

    beforeEach(inject(function(_$httpBackend_, $controller) {
      scope = {};
      httpBackend = _$httpBackend_;
      controller = $controller('LoginCtrl', {$scope: scope});
    }));

    describe('#signin', function () {
      it('should submit email and pass to backend', function ($controller) {
        
        scope.email = 'given email';
        scope.password = 'given password';
        scope.signin();

        httpBackend.expectPOST('/auth/session', { email: 'given email', password: 'given password' });
      });
    });
  });
})();
