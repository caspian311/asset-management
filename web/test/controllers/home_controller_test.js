(function () {
  'use strict';

  describe('HomeCtrl', function () {
    var scope, location, controller, cookies;

    beforeEach(module('assetControllers'));

    beforeEach(inject(function($controller) {
      scope = {};
      location = { path: sinon.spy() };
      cookies = { getObject: sinon.stub() };
      controller = $controller
    }));

    function init() {
      controller('HomeCtrl', { $scope: scope, $location: location, $cookies: cookies });
    }

    describe('#activate', function () {
      describe('user is logged in', function() {
        beforeEach(function() {
          cookies.getObject.returns({ name: 'John+Doe', email: 'john@doe.com' });

          init();
        });

        it('should not redirect to login page', function() {
          expect(location.path.called).to.be.false;
        });

        it('should grab user data from cookies', function() {
          expect(cookies.getObject.firstCall.args[0]).to.equal('user');
        });

        it('should display user name', function() {
          expect(scope.username).to.equal('John Doe');
        });
      });

      describe('user is not logged in', function() {
        beforeEach(function() {
          cookies.getObject.returns(undefined);

          init();
        });

        it('should redirect to login page', function() {
          assert(location.path.calledWith('/login'));
        });
      });
    });
  });

})();
