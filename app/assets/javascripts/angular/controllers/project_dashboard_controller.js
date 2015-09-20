(function(){
  angular
    .module('agilegamification')
    .controller('ProjectDashboardController', ProjectDashboardController);

    ProjectDashboardController.$inject = ['$scope','$modal', '$routeParams', 'Project', 'Story', 'Notification', '$auth', 'Category'];

    function ProjectDashboardController($scope, $modal, $routeParams, Project, Story, Notification, $auth, Category){
      $scope.addStoryModal = addStoryModal;
      $scope.createStory   = createStory;
      $scope.viewStory     = viewStory;
      $scope.updateStory   = updateStory;
      $scope.removeStory   = removeStory;
      $scope.estimateStory = estimateStory;
      $scope.setCategory   = setCategory;
      $scope.project       = Project.get({ id: $routeParams.id });
      $scope.categories    = Category.query();
      $scope.stories       = Story.query({ project_id: $routeParams.id },

        function(stories){
          $scope.backlog = _.where(stories, { priority: true });
          $scope.icebox  = _.where(stories, { priority: false });
        }
      );

      $scope.dragControls  = {
        accept: dropAccept,
        itemMoved: itemMoved,
        orderChanged: orderChanged,
      };

      var modalInstance;

      $scope.panels          = [];
      $scope.isActivePanel   = isActivePanel;
      $scope.togglePanel     = togglePanel;
      $scope.user            = $auth.user;

      function addStoryModal(priority){
        $scope.story = new Story({
          project_id: $scope.project.id,
          priority: priority
        });

        modalInstance = $modal.open({
          animation: false,
          templateUrl: 'stories/new.html',
          size: 'lg',
          scope: this
        });
      }

      function createStory(story){
        story.$save(function(story){
          $scope.$emit('story:created', story);
          modalInstance.close();
        });
      }

      function viewStory(story){
        $scope.story = story;
        modalInstance = $modal.open({
          animation: false,
          templateUrl: 'stories/show.html',
          size: 'lg',
          scope: this
        });
      }

      function updateStory(story){
        story.$update();
      }

      function removeStory(story){
        if(confirm('Are you sure?')){
          story.$delete(function(res){
            var index = $scope.stories.indexOf(story);
            $scope.stories.splice(index, 1);
            $scope.$emit('story:deleted', story);

            Notification.success('Story removed');
            modalInstance.close();
          });
        }
      }

      function estimateStory(points){
        $scope.story.estimation = points;
        $scope.updateStory($scope.story);
      }

      function setCategory(category){
        $scope.story.$change_category({ category_id: category.id}, function(story){
          $scope.story = story;
        });
      }

      function dropAccept(sourceItemHandleScope, destSortableScope){
        return true;
      }

      function itemMoved(event){
        var destination = event.dest.sortableScope.element.attr('ng-model');
        var priority    = destination == "backlog" ? true : false;
        var story       = event.source.itemScope.story;
        story.priority  = priority;

        story.$update(function(story){
          story.$move({ position: event.dest.index + 1});
        });
      }

      function orderChanged(event){
        var story = event.source.itemScope.story;
        story.$move({ position: event.dest.index + 1});
      }

      function isActivePanel(panel){
        return _.contains($scope.panels, panel);
      }

      function togglePanel(panel){
        if(_.contains($scope.panels, panel)){
          $scope.panels = _.without($scope.panels, panel);
        }else{
          openPanel(panel);
        }
      }

      function openPanel(panel){
        if(!_.contains($scope.panels, panel)){
          if($scope.panels.length >= 2){
            $scope.panels.splice(0, 1);
          }
          $scope.panels.push(panel);
        }
      }

      $scope.$on('story:created', function(event, story){
        if(story.priority){
          $scope.backlog.push(story);
        }
        else{
          $scope.icebox.push(story);
          openPanel('icebox');
        }
      });

      $scope.$on('story:deleted', function(event, story){
        if(story.priority){
          var index = $scope.backlog.indexOf(story);
          $scope.backlog.splice(index, 1);
        }
        else{
          var index = $scope.icebox.indexOf(story);
          $scope.icebox.splice(index, 1);
        }
      });

    }
})();
