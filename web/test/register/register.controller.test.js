(function () {
  'use strict';

  var endpoint = 'http://asset-management.lvh.me/api/user';

  describe('RegisterController', function () {
    var scope, httpBackend, createUserRequestHandler;

    beforeEach(module('assets.register'));

    beforeEach(inject(function($rootScope, $httpBackend, $controller) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      createUserRequestHandler = httpBackend.when('POST', endpoint);

      $controller('RegisterController', { $scope: scope });
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
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
          'password': password
        };
        httpBackend.expectPOST(endpoint, expectedPayload);

        scope.register();
        httpBackend.flush();
      });
    });
  });

})();
