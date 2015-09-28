(function(){
  angular
    .module('agilegamification')
    .controller('ProjectDashboardController', ProjectDashboardController);

    ProjectDashboardController.$inject = ['$scope','$modal', '$routeParams', 'Project', 'Story', 'Notification', '$auth', 'Category', 'StoryState'];

    function ProjectDashboardController($scope, $modal, $routeParams, Project, Story, Notification, $auth, Category, StoryState){
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
          setPanels(stories);
        }
      );
      $scope.storyStates   = StoryState.query();

      $scope.dragControls  = {
        accept: dropAccept,
        itemMoved: itemMoved,
        orderChanged: orderChanged,
      };

      var modalInstance;

      $scope.panels          = [];
      $scope.user            = $auth.user;
      $scope.isActivePanel   = isActivePanel;
      $scope.togglePanel     = togglePanel;
      $scope.nextState       = nextState;
      $scope.setState        = setState;
      $scope.setNextState    = setNextState;

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
          $scope.stories.push(story);
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
          story.$delete(function(story){
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

      function nextState(state){
        var nextState;
        switch(state){
          case 'Unstarted':
            nextState = 'Start';
            break;

          case 'Started':
            nextState = 'Finish';
            break;

          case 'Finished':
            nextState = 'Deliver';
            break;
        }

        return nextState;
      }

      function setState(state){
        if(state){
          $scope.story.$mark_as({ state_id: state.id}, function(story){
            $scope.story = story;
            $scope.$emit('story:stateChanged', story);
          });
        }
      }

      function setNextState(state){
        $scope.setState(_.where($scope.storyStates, { name: state + 'ed'})[0]);
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

      function setMyWork(stories){
        $scope.myWork  = _.filter(stories, function(story) {
          if(story.owner && story.owner.id == $auth.user.id){
            return story;
          }
        });
      }

      function setBacklog(stories){
        $scope.backlog = _.filter(stories, function(story){
          if(story.priority && story.state.name == "Unstarted"){
            return story;
          }
        });
      }

      function setIcebox(stories){
        $scope.icebox = _.filter(stories, function(story){
          if(!story.priority && story.state.name == "Unstarted"){
            return story;
          }
        });
      }

      function setCurrent(stories){
        $scope.current = _.filter(stories, function(story){
          if(story.estimation && story.state.name != 'Unstarted' && story.state.name != 'Accepted'){
            return story;
          }
        });
      }

      function setPanels(stories){
        setBacklog(stories);
        setIcebox(stories);
        setMyWork(stories);
        setCurrent(stories);
      }

      function openRightPanel(story){
        switch(story.state.name){
          case 'Unstarted':
            var panel = story.priority ? 'backlog' : 'icebox';
            openPanel(panel);
            break;
          case 'Started':
            openPanel('current');
            break;
          case 'Accepted':
            openPanel('done');
            break;
        }
      }

      $scope.$on('story:created', function(event, story){
        setPanels($scope.stories);
        openRightPanel(story);
      });

      $scope.$on('story:deleted', function(event, story){
        setPanels($scope.stories);
      });

      $scope.$on('story:stateChanged', function(event, story){
        setPanels($scope.stories);
        openRightPanel(story);
      });

    }
})();
