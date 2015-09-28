(function(){
  describe('CommentsController', function(){
    var scope, $http, location, createController, Project;

    beforeEach(module('agilegamification'));

    beforeEach(inject(function ($controller, $rootScope, $injector, $location) {
      $http         = $injector.get('$httpBackend');
      scope         = $rootScope.$new();
      location      = $location;
      Project       = $injector.get('Project');
      notification  = $injector.get('Notification');
      Story         = $injector.get('Story');
      Comments      = $injector.get('Comments');

      $http.whenGET('/api/auth/validate_token')
      .respond(200, { email: 'test@example.com' });

      $controller('ProjectDashboardController', {
        $scope: scope,
        $routeParams: { id: 1 }
      });

      $http.expectGET("/api/v1/projects/1")
        .respond(200, {id: 1, name: 'Project 1'});

      $http.whenGET("/api/v1/story_states")
        .respond(200, [{ id: 1, name: 'Unstarted'}]);

      $http.whenGET("/api/v1/categories")
        .respond(200, [{ id: 1, name: 'Feature'}]);

      $http.expectGET("/api/v1/projects/1/stories")
        .respond(200, [{ id: 1, name: 'Story 1', priority: true, state: { name: 'Unstarted' }}]);

      $http.flush();

      var story = new Story({
        id: 2,
        project_id: 1,
        priority: true,
        name: 'Story'
      });

      $http.whenGET('/api/v1/stories/2/comments')
        .respond([{ id: 1, content: 'This is a comment'}]);

      scope.viewStory(story);


      $controller('CommentsController', {
        $scope: scope,
        $routeParams: { id: 1 }
      });

      $http.flush();

    }));

    afterEach(function(){
      $http.verifyNoOutstandingExpectation();
      $http.verifyNoOutstandingRequest();
    });

    it('retrives the comments',function(){
      expect(scope.comments).toBeDefined();
    });

    it('returns false if the comment content is empty',function(){
      var ev = {
        target: {
          value: 'fake value'
        }
      };

      expect(scope.addComment(ev, { content: ''})).toEqual(false);
    });

    it('returns false if the comment content is empty',function(){
      var ev = {
        target: {
          value: 'fake value'
        }
      };

      expect(scope.addComment(ev, { content: ''})).toEqual(false);
    });

    it('add the new comment', function(){
      $http.whenPOST('/api/v1/stories/2/comments')
        .respond(201, { id: 2, content: 'This is a new Comment'});

      var ev = {
        target: {
          value: 'fake value'
        }
      };

      scope.addComment(ev, new Comments({contnet: 'This is a new Comment'}));

      $http.flush();

      expect(scope.comments.length).toEqual(2);
    });

    it('deletes comments', function(){
      spyOn(window, 'confirm').and.callFake(function () {
           return true;
      });

      var comment = { id: 1, content: 'This is a Comment', story_id: 2};
      $http.whenDELETE('/api/v1/stories/2/comments/1')
        .respond(200, comment);

      scope.deleteComment(new Comments(comment));

      $http.flush();

      expect(scope.comments.length).toEqual(0);
    });
  });
})();
