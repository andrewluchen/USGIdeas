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
  
  $scope.onTextChange = function () {
    var result = XBBCODE.process({
      text: $scope.body_bbcode,
      removeMisalignedTags: false,
      addInLineBreaks: false
    });
    $scope.body_html = result.html;
  }
  
  $scope.submit_new = function () {
    $http.post(window.location.href, {'body_html':$scope.body_html}).
    success(function (response) {
      $scope.itemlist = response.itemlist.reverse();
    });
  }
  
  $scope.getHtml = function(html){
    return $sce.trustAsHtml(html);
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
  
  var RED = {name : 'Republican', color : 'danger'};
  var BLUE = {name : 'Democrat', color : 'info'};
  var GREEN = {name : 'Independent', color : 'success'};
  var AYE = {name : 'Aye'};
  var NAY = {name : 'Nay'};
  var PRESENT = {name : 'Present'};
  
  $scope.party_types = [BLUE, RED, GREEN];
  $scope.vote_types = [AYE, NAY, PRESENT];
  $scope.username = "";
  $scope.user_party = GREEN;
  $scope.user_vote = AYE;
  
  $scope.submit = function() {
    $http.put(window.location.href,{'item_id':$scope.item.item_id,
              'username': $scope.username, 'party':$scope.user_party.name, 'vote':$scope.user_vote.name}).
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
  
  $scope.party_color = function(party) {
    if (party == BLUE.name)
      return BLUE.color;
    if (party == RED.name)
      return RED.color;
    if (party == GREEN.name)
      return GREEN.color;
  }
  
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