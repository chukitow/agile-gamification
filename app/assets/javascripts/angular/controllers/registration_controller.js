(function(){
  angular
    .module('agilegamification')
    .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['$scope', '$auth', '$location'];

    function RegistrationController($scope, $auth, $location){

      $scope.submitRegistration = submitRegistration;

      function submitRegistration(user){
        $auth.submitRegistration(user)
        .then(function(res){
          $location.path('/projects');
        })
        .catch(function(res){
          $scope.registrationErrors = res.data.errors.full_messages;
        });
      }
    }
})();
