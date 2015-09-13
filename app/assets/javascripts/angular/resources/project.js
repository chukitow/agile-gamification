(function(){

  angular
    .module('agilegamification')
    .factory('Project', Project);

    Project.$inject = ['$resource'];

    function Project($resource){
      return $resource('/api/v1/projects/:id', null,{
        query: { method: 'GET', isArray: false },
        update: { method: 'PUT' }
      });
    }

})();
