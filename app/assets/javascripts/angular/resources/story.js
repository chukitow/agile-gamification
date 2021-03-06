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
        update: {
          method: 'PUT'
        },
        move: {
          method: 'PUT',
          url: '/api/v1/projects/:project_id/stories/:id/move'
        },
        change_category: {
          method: 'PUT',
          url: '/api/v1/projects/:project_id/stories/:id/change_category'
        },
        mark_as: {
          method: 'PUT',
          url: '/api/v1/projects/:project_id/stories/:id/mark_as'
        }
      });
    }

})();
