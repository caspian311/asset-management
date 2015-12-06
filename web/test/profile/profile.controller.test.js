(function() {
  'use strict';

  describe('ProfileController', function() {
    var scope, httpBackend, userUrl, cookies, controller;

    beforeEach(module('assets.profile'));

    beforeEach(inject(function($rootScope, $httpBackend, $controller, $injector) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      userUrl = $injector.get('endpoints').userUrl;
      cookies = { getObject: sinon.stub() };
      controller = $controller;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    var userId = 123
      , firstName = 'first name'
      , lastName = 'lastName'
      , primaryPhone = 'primaryPhone'
      , secondaryPhone = 'secondaryPhone'
      , address = 'address'
      , city = 'city'
      , state = 'state'
      , zip = 'zip'
      , password = 'password';

    describe('initially', function() {

      beforeEach(function() {
        cookies.getObject.withArgs('user').returns({ id: userId });

        controller('ProfileController', { $scope: scope, $cookies: cookies });
      });

      it('pulls profile data from backend', function() {
          httpBackend.when('GET', userUrl(userId)).respond(200, 
            { 
              firstName: firstName,
              lastName: lastName,
              primaryPhone: primaryPhone,
              secondaryPhone: secondaryPhone,
              address: address,
              city: city,
              state: state,
              zip: zip,
              password: password
            });
          httpBackend.flush();

          expect(scope.user.firstName).to.eq(firstName);
          expect(scope.user.lastName).to.eq(lastName);
          expect(scope.user.secondaryPhone).to.eq(secondaryPhone);
          expect(scope.user.primaryPhone).to.eq(primaryPhone);
          expect(scope.user.address).to.eq(address);
          expect(scope.user.city).to.eq(city);
          expect(scope.user.state).to.eq(state);
          expect(scope.user.zip).to.eq(zip);
          expect(scope.user.password).to.eq(password);
      });

      it('shows error if cant retieve data', function() {
          httpBackend.when('GET', userUrl(userId)).respond(404, { });
          httpBackend.flush();

          expect(scope.errorMessage).to.eq('Failed to load user\'s profile information.');
      });
    });

    describe('#update', function() {
      beforeEach(function() {
        cookies.getObject.withArgs('user').returns({ id: userId });

        controller('ProfileController', { $scope: scope, $cookies: cookies });

        httpBackend.when('GET', userUrl(userId)).respond(200, { });
        httpBackend.when('PUT', userUrl(userId)).respond(201, { });
      });

      it('send data to backend', function() {
          scope.user = {};
          scope.user.firstName = firstName;
          scope.user.lastName = lastName;
          scope.user.secondaryPhone = secondaryPhone;
          scope.user.primaryPhone = primaryPhone;
          scope.user.address = address;
          scope.user.city = city;
          scope.user.state = state;
          scope.user.zip = zip;
          scope.user.password = password;
          
          httpBackend.expect('PUT', userUrl(userId), {
              firstName: firstName,
              lastName: lastName,
              primaryPhone: primaryPhone,
              secondaryPhone: secondaryPhone,
              address: address,
              city: city,
              state: state,
              zip: zip,
              password: password
          });

          scope.update();
          httpBackend.flush();
      });
    });
  });
})();
