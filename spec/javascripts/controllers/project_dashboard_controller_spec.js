(function(){
  describe('ProjectDashboardController', function(){
    var scope, $http, location, createController, Project, Story;

    beforeEach(module('agilegamification'));

    beforeEach(inject(function ($controller, $rootScope, $injector, $location, Notification) {
      $http         = $injector.get('$httpBackend');
      scope         = $rootScope.$new();
      location      = $location;
      Project       = $injector.get('Project');
      notification  = $injector.get('Notification');
      Story         = $injector.get('Story');

      $controller('ProjectDashboardController', {
        $scope: scope,
        $routeParams: { id: 1 }
      });

      $http.expectGET("/api/v1/projects/1") 
        .respond(200, {id: 1, name: 'Project 1'});

      $http.expectGET("/api/v1/projects/1/stories") 
        .respond(200, [{ id: 1, name: 'Story 1', priority: true }]);

      $http.flush();

    }));

    afterEach(function(){
      $http.verifyNoOutstandingExpectation();
      $http.verifyNoOutstandingRequest();
    });

    it('retrives the project', function(){
      expect(scope.project).toBeDefined();
    });

    it('retrives stories of the project', function(){
      expect(scope.stories).toBeDefined();
    });

    it('clasify the stories into the backlog', function(){
      expect(scope.backlog.length).toEqual(1);
    });

    it('clasify the stories into the icebox', function(){
      expect(scope.icebox.length).toEqual(0);
    });

    it('creates a new story resource on when the modal is open', function(){
      scope.addStoryModal(true);

      expect(scope.story).toEqual(new Story({
        project_id: 1,
        priority: true
      }));
    });

    it('creates a new story and add it to the backlog', function(){
      scope.addStoryModal(true);

      var story = new Story({
        project_id: 1,
        priority: true,
        name: 'New story'
      });

      $http.whenPOST('/api/v1/projects/1/stories')
        .respond(200, story);
      scope.createStory(story);
      $http.flush();

      expect(scope.backlog.length).toEqual(2);
    });

    it('assings the story when the modal is opened', function(){
      var story = new Story({
        id: 2,
        project_id: 1,
        priority: true,
        name: 'Story'
      });

      $http.expectGET('/api/v1/stories/2/comments')
        .respond([{}]);

      scope.viewStory(story);
      $http.flush();

      expect(scope.story).toEqual(story);
    });

    it('deletes the story', function(){
      spyOn(notification, 'success');
      spyOn(window, 'confirm').and.callFake(function () {
           return true;
      });

      var story = new Story({
        id: 2,
        project_id: 1,
        priority: true,
        name: 'Story'
      });

      $http.expectGET('/api/v1/stories/2/comments')
        .respond([{}]);

      scope.viewStory(story);
      $http.flush();

      $http.expectDELETE('/api/v1/projects/1/stories/2')
      .respond(200, story);

      scope.removeStory(story);
      $http.flush();

      expect(notification.success).toHaveBeenCalledWith('Story removed');
    });

    it('estimates stories', function(){
      spyOn(scope,'updateStory');
      var story = new Story({
        id: 2,
        project_id: 1,
        priority: true,
        name: 'Story'
      });

      $http.expectGET('/api/v1/stories/2/comments')
        .respond([{}]);

      scope.viewStory(story);
      $http.flush();

      scope.estimateStory(5);

      expect(scope.updateStory).toHaveBeenCalledWith(story);
    });

    it('detects when a panel is open', function(){
      scope.panels = ['icebox'];

      expect(scope.isActivePanel('icebox')).toEqual(true);
    });

    it('toggle the panel', function(){
      scope.panels = ['icebox'];
      scope.togglePanel('icebox');

      expect(scope.panels).toEqual([]);
    });
  });
})();
