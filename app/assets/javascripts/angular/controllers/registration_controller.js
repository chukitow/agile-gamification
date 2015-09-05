(function(){
  angular
    .module('agilegamification')
    .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['$scope', '$auth', '$location'];

    function RegistrationController($scope, $auth){

      $scope.submitRegistration = submitRegistration;

      function submitRegistration(user){
        $auth.submitRegistration(user)
        .catch(function(res){
          $scope.registrationErrors = res.data.errors.full_messages;
        });
      }


      $scope.$on('auth:registration-email-success', function(ev, message) {
      });
    }
})();
