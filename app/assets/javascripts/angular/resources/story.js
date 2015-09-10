(function(){

  angular
    .module('agilegamification')
    .factory('Story', Project);

    Project.$inject = ['$resource'];

    function Project($resource){
      return $resource('/api/v1/projects/:project_id/stories/:id', {
        project_id: '@project_id',
        id: '@id'
      },
      {
        update: { method: 'PUT' }
      });
    }

})();
