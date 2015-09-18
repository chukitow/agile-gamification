(function(){
  angular
    .module('agilegamification')
    .controller('CommentsController', CommentsController);

    CommentsController.$inject = ['$scope','Comments'];

    function CommentsController($scope, Comments){
      $scope.addComment    = addComment;
      $scope.comments      = Comments.query({ story_id: $scope.story.id });
      $scope.updateComment = updateComment;
      $scope.deleteComment = deleteComment;

      function addComment($event, comment){
        if(comment.content == ""){
          return false;
        }

        $event.target.value = '';

        comment = new Comments({
          content: comment.content,
          story_id: $scope.story.id,
          user_id: $scope.user.id
        });


        comment.$save(function(comment){
          $scope.comments.push(comment);
        });
      }

      function updateComment(comment){
        comment.$update();
      }

      function deleteComment(comment){
        comment = new Comments(comment);
        if(confirm('Are you sure?')){
          comment.$delete(function(comment){
            var index = $scope.comments.indexOf(comment);
            $scope.comments.splice(index, 1);
          });
        }
      }

    }
})();
