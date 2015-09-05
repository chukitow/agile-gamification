(function(){

  angular
    .module('agilegamification', [
      'ngRoute',
      'templates',
      'ng-token-auth'
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
        .otherwise({
          redirectTo: '/'
        });
    }

})();


$(document).ready(function() {
  angular.bootstrap(document, ['agilegamification']);
});
