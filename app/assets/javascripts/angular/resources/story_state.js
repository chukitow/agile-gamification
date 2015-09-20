(function(){

  angular
    .module('agilegamification')
    .factory('StoryState', StoryState);

    StoryState.$inject = ['$resource'];

    function StoryState($resource){
      return $resource('/api/v1/story_states');
    }

})();
