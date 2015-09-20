(function(){
  describe('ProjectsController', function(){
    var scope, $http, location, createController, Project;

    beforeEach(module('agilegamification'));


    beforeEach(inject(function ($controller, $rootScope, $injector, $location) {
      $http    = $injector.get('$httpBackend');
      scope    = $rootScope.$new();
      location = $location;
      Project  = $injector.get('Project');

      $http.whenGET('/api/auth/validate_token')
      .respond(200, { email: 'test@example.com' });

      $controller('ProjectsController', { $scope: scope });

      var projects = [
        { id: 1, name: 'Project example' }
      ];

      $http.whenGET('/api/v1/projects')
        .respond(200, projects);

      $http.flush();
    }));

    afterEach(function(){
      $http.verifyNoOutstandingExpectation();
      $http.verifyNoOutstandingRequest();
    });

    it('retrives all the projects', function(){
      expect(scope.projects).toBeDefined();
    });

    it('create a new resource project', function(){
      scope.openModal();

      expect(scope.project).toEqual(new Project());
    });

    it('creates a new project', function(){
      scope.openModal();

      var project = {
        name: 'Project example'
      };

      $http.whenPOST('/api/v1/projects')
        .respond(200, project);

      scope.createProject(new Project(project));

      $http.flush();

      expect(scope.projects.length).toEqual(2);
    });
  });
})();
