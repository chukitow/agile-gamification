(function(){

  angular
    .module('agilegamification')
    .factory('Comments', Comments);

    Comments.$inject = ['$resource'];

    function Comments($resource){
      return $resource('/api/v1/stories/:story_id/comments/:id',{
        story_id: '@story_id',
        id: '@id',
      },
      {
        update: { method: 'PUT' }
      });
    }

})();
