(function(){

  angular
    .module('agilegamification')
    .factory('Category', Category);

    Category.$inject = ['$resource'];

    function Category($resource){
      return $resource('/api/v1/categories');
    }

})();
