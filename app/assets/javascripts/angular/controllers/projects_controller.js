(function(){
  angular
    .module('agilegamification')
    .controller('ProjectsController', ProjectsController);

    ProjectsController.$inject = ['$scope', '$auth', '$location'];

    function ProjectsController($scope, $auth, $location){
    }
})();
