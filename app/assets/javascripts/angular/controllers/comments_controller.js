(function(){
  angular
    .module('agilegamification')
    .controller('CommentsController', CommentsController);

    CommentsController.$inject = ['$scope','Comments'];

    function CommentsController($scope, Comments){
      $scope.addComment    = addComment;
      $scope.updateComment = updateComment;
      $scope.deleteComment = deleteComment;

      function addComment($event, comment){
        if(comment.content == ""){
          return false;
        }

        comment = new Comments({
          content: comment.content,
          story_id: $scope.story.id,
          user_id: $scope.user.id
        });

        comment.$save(function(res){
          $event.target.value = '';
          $scope.story.comments.push(res.comment);
        });
      }

      function updateComment(comment){
        comment = new Comments(comment);
        comment.$update();
      }

      function deleteComment(comment){
        if(confirm('Are you sure?')){
          comment = new Comments(comment);

          comment.$delete(function(res){
            var index = $scope.story.comments.indexOf(comment);
            $scope.story.comments.splice(index, 1);
          });
        }
      }

    }
})();
