(function(){

  angular
    .module('agilegamification', [
      'ngRoute',
      'templates',
      'ng-token-auth',
      'ui.bootstrap',
      'ngResource',
      'ui-notification'
    ])
    .config(RoutesDraw);

    RoutesDraw.$inject = ['$routeProvider', '$locationProvider'];

    function RoutesDraw($routeProvider, $locationProvider){
      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          templateUrl: 'home/index.html',
          controller: 'HomeController',
        })
        .when('/sign_up',{
          templateUrl: 'registration/new.html',
          controller: 'RegistrationController',
          resolve: {
            auth: ['$auth', '$location', function($auth, $location){
              return $auth.validateUser()
              .then(function(res) {
                $location.path('/projects');
              })
              .catch(function(){
                return true;
              });
            }]
          }
        })
        .when('/sign_in',{
          templateUrl: 'sessions/new.html',
          controller: 'SessionsController',
          resolve: {
            auth: SessionMiddleWare
          }
        })
        .when('/sign_out',{
          resolve: {
            auth: ['$auth', '$location', function($auth, $location){
              $auth.signOut()
              .then(function(res) {
                $location.path('/');
              })
              .catch(function(){
                $location.path('/');
              });
            }]
          }
        })
        .when('/projects',{
          templateUrl: 'projects/index.html',
          controller: 'ProjectsController',
          resolve: {
            auth: SessionMiddleWare
          }
        })
        .otherwise({
          redirectTo: '/'
        });
    }

    SessionMiddleWare.$inject = ['$auth', '$location'];

    function SessionMiddleWare($auth, $location){
      return $auth.validateUser()
      .then(function(){
        $location.path('/projects');
      })
      .catch(function(){
        $location.path('/sign_in');
      });
    }

})();


$(document).ready(function() {
  angular.bootstrap(document, ['agilegamification']);
});
