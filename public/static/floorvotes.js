var app = angular.module('myApp', []);

app.controller('indexCtrl', function($scope, $http, $sce) {
  $scope.dir = "floorvotes";
  
  $scope.itemlist;
  
  var refresh = function() {
    $http.get(window.location.href + '/api').success(function(response) {
      $scope.itemlist = response.itemlist.reverse();
    });
  };
  
  refresh();
  
  $scope.count_votes = function (item) {
    var ayes = 0;
    var nays = 0;
    var presents = 0;
    for (var i = 0; i < item.rollcall.votelist.length; i++) {
      if (item.rollcall.votelist[i].vote == "Aye") {
        ayes++;
      }
    }
    for (var i = 0; i < item.rollcall.votelist.length; i++) {
      if (item.rollcall.votelist[i].vote == "Nay") {
        nays++;
      }
    }
    for (var i = 0; i < item.rollcall.votelist.length; i++) {
      if (item.rollcall.votelist[i].vote == "Present") {
        presents++;
      }
    }
    item.ayes = ayes;
    item.nays = nays;
    item.presents = presents;
  };
  
});

app.controller('itemCtrl', function($scope, $http, $sce) {
  $scope.dir = "floorvotes";
  
  $scope.getHtml = function(html){
    return $sce.trustAsHtml(html);
  };
  
  $scope.item;
  
  var refresh = function() {
    $http.get(window.location.href + '/api').success(function(response) {
      $scope.item = response.item;
      if (response.item == -1) return;
      $scope.count_votes($scope.item);
    });
  };
  
  refresh();
  
  var RED = {name : 'Republican'};
  var BLUE = {name : 'Democrat'};
  var GREEN = {name : 'Independent'};
  var AYE = {name : 'Aye'};
  var NAY = {name : 'Nay'};
  var PRESENT = {name : 'Present'};
  
  $scope.party_types = [BLUE, RED, GREEN];
  $scope.vote_types = [AYE, NAY, PRESENT];
  $scope.username = "";
  $scope.user_party = GREEN.name;
  $scope.user_vote = AYE.name;
  
  $scope.submit = function() {
    $http.put('window.location.href',{'item_id':$scope.item.item_id, 'username': $scope.username, 'party':$scope.user_party, 'vote':$scope.user_vote}).
      success(function (response) {
        $scope.item = response.item;
        $scope.count_votes($scope.item);
    });
  };
  
  $scope.count_votes = function(item) {
    var ayes = 0;
    var nays = 0;
    var presents = 0;
    for (var i = 0; i < item.rollcall.votelist.length; i++) {
      if (item.rollcall.votelist[i].vote == "Aye") {
        ayes++;
      }
    }
    for (var i = 0; i < item.rollcall.votelist.length; i++) {
      if (item.rollcall.votelist[i].vote == "Nay") {
        nays++;
      }
    }
    for (var i = 0; i < item.rollcall.votelist.length; i++) {
      if (item.rollcall.votelist[i].vote == "Present") {
        presents++;
      }
    }
    item.ayes = ayes;
    item.nays = nays;
    item.presents = presents;
  };
  
});

app.controller('userCtrl', function($scope, $http, $sce) {
  $scope.dir = "floorvotes";
  
  $scope.itemist;
  $scope.user;
  
  var refresh = function() {
    $http.get(window.location.href + '/api').success(function(response) {
      $scope.itemlist = response.itemlist;
      $scope.user = response.user;
      if (response.user == -1) return;
      $scope.user.ayes = response.ayes;
      $scope.user.nays = response.nays;
      $scope.user.presents = response.presents;
      console.log(response.ayes);
    });
  };
  
  refresh();
  
});