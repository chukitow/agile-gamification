(function(){

  angular
    .module('agilegamification', [
      'ngRoute',
      'templates',
      'ng-token-auth',
      'ui.bootstrap',
      'ngResource',
      'ui-notification',
      'xeditable',
      'as.sortable'
    ])
    .config(RoutesDraw);

    RoutesDraw.$inject = ['$routeProvider', '$locationProvider'];

    function RoutesDraw($routeProvider, $locationProvider){
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

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
        .when('/projects/:id/settings',{
          templateUrl: 'projects/settings.html',
          controller: 'ProjectSettingsController',
          resolve: {
            auth: SessionMiddleWare
          }
        })
        .when('/projects/:id/dashboard',{
          templateUrl: 'projects/dashboard.html',
          controller: 'ProjectDashboardController',
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
        return true;
      })
      .catch(function(){
        $location.path('/sign_in');
      });
    }

})();


$(document).ready(function() {
  angular.bootstrap(document, ['agilegamification']);
});
