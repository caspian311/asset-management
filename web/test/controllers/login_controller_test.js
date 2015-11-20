(function () {
  'use strict';

  describe('LoginCtrl', function () {
    var scope, controller, httpBackend
      , authRequestHandler;

    beforeEach(module('assetControllers'));

    beforeEach(inject(function($httpBackend, $controller) {
      scope = {};
      httpBackend = $httpBackend;
      authRequestHandler = httpBackend.when('POST', '/auth/session');

      controller = $controller('LoginCtrl', {$scope: scope});
    }));

    afterEach(function() {
      //httpBackend.verifyNoOutstandingExpectation();
      //httpBackend.verifyNoOutstandingRequest();
    });

    describe('#signin', function () {
      function verifyLoginButtonBehavior() {
          it('disable signin button while submitting', function() {
              authRequestHandler.respond(200, {});

              scope.signinButtonEnabled = true;

              scope.signin();

              expect(scope.signinButtonEnabled).to.be.false; 

              httpBackend.flush();

              expect(scope.signinButtonEnabled).to.be.true; 
          });
      }

      describe('successful login', function() {
        beforeEach(function() {
          authRequestHandler.respond(200, {});
        });

        it('should submit email and pass to backend', function () {
          scope.email = 'given email';
          scope.password = 'given password';
          
          httpBackend.expectPOST('/auth/session', { email: 'given email', password: 'given password' });

          scope.signin();
          httpBackend.flush();
        });

        it('should redict me to home page', function () {
          scope.signin();
          httpBackend.flush();

          // todo
        });

        verifyLoginButtonBehavior();
      });

      describe('invalid login', function() {
        beforeEach(function() {
          authRequestHandler.respond(401, { 'message': 'Login failed' });
        });

        it('should show login failed method when an error status comes back', function () {
          scope.signin();
          httpBackend.flush();

          expect(scope.status).to.equal('Login failed');
        });

        it('should ', function () {
          scope.email = 'bad email';
          scope.password = 'bad password';

          httpBackend.expectPOST('/auth/session');

          scope.signin();
          httpBackend.flush();

          expect(scope.email).to.be.empty;
          expect(scope.password).to.be.empty;
        });
      });
    });
  });

})();
