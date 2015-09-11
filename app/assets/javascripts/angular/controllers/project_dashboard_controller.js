(function(){
  angular
    .module('agilegamification')
    .controller('ProjectDashboardController', ProjectDashboardController);

    ProjectDashboardController.$inject = ['$scope','$modal', '$routeParams', 'Project', 'Story', 'Notification'];

    function ProjectDashboardController($scope, $modal, $routeParams, Project, Story, Notification){
      $scope.addStoryModal = addStoryModal;
      $scope.createStory   = createStory;
      $scope.viewStory     = viewStory;
      $scope.updateStory   = updateStory;
      $scope.removeStory   = removeStory;
      $scope.project       = Project.get({ id: $routeParams.id });
      $scope.stories       = Story.query({ project_id: $routeParams.id });
      $scope.dragControls  = {
        accept: dropAccept,
        itemMoved: itemMoved,
        orderChanged: orderChanged,
      };
      var modalInstance;

      function addStoryModal(){
        $scope.story = new Story({ project_id: $scope.project.id });

        modalInstance = $modal.open({
          animation: false,
          templateUrl: 'stories/new.html',
          size: 'lg',
          scope: this
        });
      }

      function createStory(story){
        story.$save(function(story){
          $scope.stories.push(story);
          modalInstance.close();
        });
      }

      function viewStory(story){
        modalInstance = $modal.open({
          animation: false,
          templateUrl: 'stories/show.html',
          size: 'lg',
          scope: this
        });
      }

      function updateStory(story){
        story.$update(function(story){
        });
      }

      function removeStory(story){
        if(confirm('Are you sure?')){
          story.$delete(function(res){
            var index = $scope.stories.indexOf(story);
            $scope.stories.splice(index, 1);
            Notification.success('Story removed');
            modalInstance.close();
          });
        }
      }

      function dropAccept(sourceItemHandleScope, destSortableScope){
        return true;
      }

      function itemMoved(event){
      }

      function orderChanged(event){
        var story = $scope.stories[event.dest.index];

        story.$move({ position: event.dest.index + 1});
      }

    }
})();
