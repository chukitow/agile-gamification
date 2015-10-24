(function(){

  angular
    .module('agilegamification')
    .factory('Project', Project);

    Project.$inject = ['$resource'];

    function Project($resource){
      return $resource('/api/v1/projects/:id', { id: '@id'},{
        update: { method: 'PUT' },
        add_member: {
          method: 'POST',
          url: '/api/v1/projects/:id/add_member'
        }
      });
    }

})();
