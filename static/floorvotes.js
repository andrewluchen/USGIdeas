var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
  $scope.username = ""
  $scope.submitVote = function (item_id, username, vote) {
    $http.put('../vote', {'item_id':item_id, 'username':username, 'vote':vote}).
      success(function (data) {
        location.reload(); 
      });
  }
});
