(function () {
  'use strict';

  describe('LoginCtrl', function () {
    var scope, controller, httpBackend
      , authRequestHandler, location, authUrl;

    beforeEach(module('assets.login'));

    beforeEach(inject(function($httpBackend, $controller, $injector) {
      authUrl = $injector.get('endpoints').authUrl;
      scope = {};
      httpBackend = $httpBackend;
      authRequestHandler = httpBackend.when('POST', authUrl);
      location = { path: sinon.spy() };

      controller = $controller('LoginCtrl', {$scope: scope, $location: location});
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe('#goRegister', function () {
      it('should redirect user to the registation page', function() {
        scope.goRegister();

        assert(location.path.calledWith('/register'), 'did not redirect to registration page');
      });
    });

    describe('#signin', function () {
      describe('successful login', function() {
        beforeEach(function() {
          authRequestHandler.respond(200, {});
        });

        it('should submit email and pass to backend', function () {
          scope.email = 'given email';
          scope.password = 'given password';
          
          httpBackend.expectPOST(authUrl, { email: 'given email', password: 'given password' });

          scope.signin();
          httpBackend.flush();
        });

        it('should redict me to home page', function () {
          scope.signin();
          httpBackend.flush();

          expect(location.path.called).to.be.true;
          assert(location.path.calledWith('/home'), 'did not redirect home');
        });

        it('disable signin button while submitting', function() {
            authRequestHandler.respond(200, {});

            scope.signinButtonEnabled = true;

            scope.signin();
            expect(scope.signinButtonEnabled).to.be.false; 

            httpBackend.flush();
            expect(scope.signinButtonEnabled).to.be.true; 
        });
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

        it('should clear out the form', function () {
          scope.email = 'bad email';
          scope.password = 'bad password';

          httpBackend.expectPOST(authUrl);

          scope.signin();
          httpBackend.flush();

          expect(scope.email).to.be.empty;
          expect(scope.password).to.be.empty;
        });
      });
    });
  });

})();
