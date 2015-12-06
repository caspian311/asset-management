(function() {
  'use strict';

  describe('ProfileController', function() {
    var scope, httpBackend, userUrl, cookies;

    beforeEach(module('assets.profile'));

    beforeEach(inject(function($rootScope, $httpBackend, $controller, $injector) {
      scope = $rootScope.$new();
      httpBackend = $httpBackend;
      userUrl = $injector.get('endpoints').userUrl;
      cookies = { getObject: sinon.stub() };

      cookies.getObject.withArgs('user').returns({ id: 123 });
      $controller('ProfileController', { $scope: scope, $cookies: cookies });
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    describe('initially', function() {
      it('pulls profile data from backend', function() {
          var firstName = 'first name'
            , lastName = 'lastName'
            , primaryPhone = 'primaryPhone'
            , secondaryPhone = 'secondaryPhone'
            , address = 'address'
            , city = 'city'
            , state = 'state'
            , zip = 'zip'
            , password = 'password';
          httpBackend.when('GET', userUrl(123)).respond(200, 
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

          expect(scope.firstName).to.eq(firstName);
          expect(scope.lastName).to.eq(lastName);
          expect(scope.secondaryPhone).to.eq(secondaryPhone);
          expect(scope.primaryPhone).to.eq(primaryPhone);
          expect(scope.address).to.eq(address);
          expect(scope.city).to.eq(city);
          expect(scope.state).to.eq(state);
          expect(scope.zip).to.eq(zip);
          expect(scope.password).to.eq(password);
      });

      it('shows error if cant retieve data', function() {
          httpBackend.when('GET', userUrl).respond(404, { });
          httpBackend.flush();

          expect(scope.errorMessage).to.eq('Failed to load user\'s profile information.');
      });
    });
  });
})();
