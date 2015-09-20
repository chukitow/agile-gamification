(function(){
  describe('ProjectSettingsController', function(){
    var scope, $http, location, createController, Project;

    beforeEach(module('agilegamification'));

    beforeEach(inject(function ($controller, $rootScope, $injector, $location, Notification) {
      $http         = $injector.get('$httpBackend');
      scope         = $rootScope.$new();
      location      = $location;
      Project       = $injector.get('Project');
      notification  = $injector.get('Notification');

      $http.whenGET('/api/auth/validate_token')
      .respond(200, { email: 'test@example.com' });

      $controller('ProjectSettingsController', {
        $scope: scope,
        $routeParams: { id: 1 }
      });

      $http.whenGET('/api/v1/projects/1')
        .respond(200, { id: 1, name: 'Project 1'});

      $http.flush();
    }));

    afterEach(function(){
      $http.verifyNoOutstandingExpectation();
      $http.verifyNoOutstandingRequest();
    });

    it('retrives the requested project', function(){
      expect(scope.project).toBeDefined();
    });

    it('updates the project', function(){
      spyOn(notification, 'success');

      var project = new Project({id: 1, name: 'New name'});
      $http.whenPUT('/api/v1/projects/1')
        .respond(200, project);

      scope.updateProject(project);
      $http.flush();

      expect(notification.success).toHaveBeenCalledWith('Settings updated');
    });

    it('deletes the project', function(){
      spyOn(window, 'confirm').and.callFake(function () {
           return true;
      });

      spyOn(location, 'path');

      var project = new Project({id: 1, name: 'New name'});
      $http.whenDELETE('/api/v1/projects/1')
        .respond(200, project);

      scope.deleteProject(project);
      $http.flush();

      expect(location.path).toHaveBeenCalledWith('/projects');
    });

  });
})();
