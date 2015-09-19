(function(){
  describe('RegistrationController', function(){
    var scope, $http, location, createController;

    beforeEach(module('agilegamification'));


    beforeEach(inject(function ($controller, $rootScope, $injector, $location) {
      $http    = $injector.get('$httpBackend');
      scope    = $rootScope.$new();
      location = $location;

      $controller('RegistrationController', { $scope: scope });
    }));

    afterEach(function(){
      $http.verifyNoOutstandingExpectation();
      $http.verifyNoOutstandingRequest();
    });

    it('signs up the user', function () {
      $http.whenPOST('/api/auth')
        .respond(201, { email: 'test@example.com' });

      spyOn(location, 'path');

      var user = {
        email: 'test@example.com',
        password: '12345678',
        password_confirmation: '12345678'
      };

      scope.submitRegistration(user);
      $http.flush();

      expect(location.path).toHaveBeenCalledWith('/projects');
    });
  });
})();
