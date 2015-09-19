(function(){
  angular
    .module('agilegamification')
    .controller('ProjectSettingsController', ProjectSettingsController);

    ProjectSettingsController.$inject = ['$scope', '$routeParams', 'Project', 'Notification', '$location'];

    function ProjectSettingsController($scope, $routeParams, Project, Notification, $location){
      $scope.updateProject  = updateProject;
      $scope.deleteProject  = deleteProject;
      $scope.project        = Project.get({ id: $routeParams.id });

      function updateProject(project){
        project.$update({ id: project.id}, function(res){
          Notification.success('Settings updated');
        });
      }

      function deleteProject(project){
        if(confirm('Are you sure?')){
          project.$delete({ id: project.id }, function(res){
            Notification('Project deleted');
            $location.path('/projects');
          });
        }
      }
    }
})();
