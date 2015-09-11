(function(){
  angular
    .module('agilegamification')
    .run(XeditableOptions);

    XeditableOptions.$inject = ['editableOptions'];

    function XeditableOptions(editableOptions){
      editableOptions.theme = 'bs3';
    }
})();
