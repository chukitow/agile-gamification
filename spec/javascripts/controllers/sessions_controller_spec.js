(function(){
  describe('SessionsController',function(){
    var scope, $http, location, createController;

    beforeEach(module('agilegamification'));

    beforeEach(inject(function ($controller, $rootScope, $injector, $location) {
      $http    = $injector.get('$httpBackend');
      scope    = $rootScope.$new();
      location = $location;

      $http.whenGET('/api/auth/validate_token')
      .respond(200, { email: 'test@example.com' });

      $controller('SessionsController', { $scope: scope });
    }));

    afterEach(function(){
      $http.verifyNoOutstandingExpectation();
      $http.verifyNoOutstandingRequest();
    });

    it('signs in the user', function (){
      spyOn(location, 'path');

      $http.whenPOST('/api/auth/sign_in')
        .respond(200, { email: 'test@example.com' });

      var user = {
        email: 'test@example.com',
        password: '12345678',
      };

      scope.submitLogin(user);
      $http.flush();

      expect(location.path).toHaveBeenCalledWith('/projects');
    });
  });
})();
