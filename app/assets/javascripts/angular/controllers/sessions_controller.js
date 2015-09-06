(function(){
  angular
    .module('agilegamification')
    .controller('SessionsController', SessionsController);

    SessionsController.$inject = ['$scope', '$auth', '$location'];

    function SessionsController($scope, $auth, $location){

      $scope.submitLogin = submitLogin;

      function submitLogin(user){
        $auth.submitLogin(user)
        .then(function(res) {
          $location.path('/projects');
        })
        .catch(function(res) {
          $scope.loginError = res.errors[0];
        });
      }
    }
})();
