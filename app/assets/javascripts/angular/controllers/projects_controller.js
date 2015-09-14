(function(){
  angular
    .module('agilegamification')
    .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$scope', '$auth', '$location', '$modal', 'Project'];

    function ProjectsController($scope, $auth, $location, $modal, Project){

      $scope.openModal     = openModal;
      $scope.createProject = createProject;
      Project.query(function(res){
        $scope.projects = res.projects;
      });

      var modalInstance;

      function openModal() {
        $scope.project = new Project();

        modalInstance = $modal.open({
          animation: false,
          templateUrl: 'projects/form.html',
          size: 'md',
          scope: this
        });
      }

      function createProject(project){
        project.$save(function(project){
          $scope.projects.push(project);
          modalInstance.close();
        });
      }
    }
})();
