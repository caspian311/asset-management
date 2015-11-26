(function () {
  'use strict';

  describe('RegisterController', function () {
    var scope, httpBackend, createUserRequestHandler, 
      userUrl, location;

    beforeEach(module('assets.register'));

    beforeEach(inject(function($rootScope, $httpBackend, $controller, $injector) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      userUrl = $injector.get('endpoints').userUrl;
      createUserRequestHandler = httpBackend.when('POST', userUrl);
      location = { path: sinon.spy() };

      $controller('RegisterController', { $scope: scope, $location: location });
    }));

    describe('initially', function() {
      it('should disable the register button', function() {
        expect(scope.registerButtonEnabled).to.be.false;
      });
    });

    describe('all information is filled out correctly', function() {
      it('should enable the register button', function() {
        scope.firstName = 'first';
        scope.lastName = 'last';
        scope.email = 'email';
        scope.password = 'password';
        scope.confirmPassword = 'password';

        scope.$digest();

        expect(scope.registerButtonEnabled).to.be.true;
      });
    });

    describe('passwords do not match', function() {
      it('should disable the register button', function() {
        scope.firstName = 'first';
        scope.lastName = 'last';
        scope.email = 'email';
        scope.password = 'password';
        scope.confirmPassword = 'not password';

        scope.$digest();

        expect(scope.registerButtonEnabled).to.be.false;
      });
    });

    describe('#register', function () {
      beforeEach(function() {
        createUserRequestHandler.respond(201, {});
      });

      afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
      });

      it('should create the user', function() {
        var firstName = 'first';
        var lastName = 'last';
        var email = 'email';
        var password = 'password';

        scope.firstName = firstName;
        scope.lastName = lastName;
        scope.email = email;
        scope.password = password;
        scope.confirmPassword = password;

        var expectedPayload = {
          'first_name': firstName,
          'last_name': lastName,
          'email': email,
          'password': password
        };
        httpBackend.expectPOST(userUrl, expectedPayload);

        scope.register();
        httpBackend.flush();
      });

      it('should redirect to login page', function() {
        scope.register();
        httpBackend.flush();

        expect(location.path.called).to.be.true;
        assert(location.path.calledWith('/login'), 'did not redirect to login');
      });
    });
  });

})();
