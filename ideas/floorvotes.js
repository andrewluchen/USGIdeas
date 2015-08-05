var Item = {
  Item : function Item(item_id, name, html, password) {
    this.item_id = item_id;
    this.name = name;
    this.html = html;
    this.rollcall = new RollCall.RollCall();
    this.active = true;
    
    this.add_vote = function(user, party, vote) {
      this.rollcall.add_vote(user, party, vote);
      user.voting_record[this.item_id] = vote;
    };
    
    this.is_password = function(password) {
      return this.password == password;
    };
  }
};

var RollCall = {
  RollCall : function RollCall() {
    this.votelist = [];
    
    this.add_vote = function(user, party, vote) {
      this.votelist = this.votelist.filter(function(value) {
        return value.user != user;
      });
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; // January is 0!
      var yyyy = today.getFullYear();
      var hour = today.getHours();
      var minutes = today.getMinutes();
      var timestamp = mm+'/'+dd+'/'+yyyy+'  '+hour+':'+minutes;
      var voteObj = new Vote.Vote(user, party, vote, timestamp);
      this.votelist.push(voteObj);
    };
    
    this.get_rollcount = function () {
      var ayes = 0;
      var nays = 0;
      var presents = 0;
      
      for (var i = 0; i < this.votelist.length; i++) {
        if (this.votelist[i].vote = Vote.Aye) {
          ayes++;
        }
        if (this.votelist[i].vote = Vote.Nay) {
          nays++;
        }
        if (this.votelist[i].vote = Vote.Present) {
          presents++;
        }
      }
            return Count(ayes, nays, presents);
    };
    
    this.nth = function (i) {
      return this.voteslist[i];
    };
  }
};

var Vote = {
  AYE: "Aye",
  NAY: "Nay",
  PRESENT: "Present",
  
  BLUE: "Democrat",
  RED: "Republican",
  GREEN: "Independent",
  
  Vote : function Vote(user, party, vote, timestamp) {
    this.party = party;
    this.vote = vote;
    this.user = user;
    this.timestamp = timestamp;
  }
};

var Count = {
  Count : function Count(ayes, nays, presents) {
    this.ayes = ayes;
    this.nays = nays;
    this.presents = presents;
  }
};

var User = {
  User : function User(username) {
    this.username = username;
    this.voting_record = {};
    
    this.ayes = function () {
      var ayes = [];
      var ids = Object.keys(this.voting_record).map(function(value) {
        return parseInt(value);
      });
      for(var i = 0; i < ids.length; i++) {
        if (this.voting_record[ids[i]] == Vote.AYE) {
          ayes.push({item_id : ids[i], name : itemlist[i].name});
        }
      };
      return ayes;
    };
    this.nays = function () {
      var nays = [];
      var ids = Object.keys(this.voting_record).map(function(value) {
        return parseInt(value);
      });
      for(var i = 0; i < ids.length; i++) {
        if (this.voting_record[ids[i]] == Vote.NAY) {
          nays.push({item_id : ids[i], name : itemlist[i].name});
        }
      };
      return nays;
    };
    this.presents = function () {
      var presents = [];
      var ids = Object.keys(this.voting_record).map(function(value) {
        return parseInt(value);
      });
      for(var i = 0; i < ids.length; i++) {
        if (this.voting_record[ids[i]] == Vote.PRESENT) {
          presents.push({item_id : ids[i], name : itemlist[i].name});
        }
      };
      return presents;
    };
  }
};

var itemlist = [];
var userdict = {};

var new_item = function(name, html, password) {
  var item = new Item.Item(itemlist.length, name, html, password);
  itemlist.push(item);
  return this;
};

var put_vote = function (item_id, username, party, vote) {
  if (item_id < itemlist.length) {
    if (!(username in userdict)) {
      userdict[username] = new User.User(username);
    }
    item = itemlist[item_id];
    item.add_vote(userdict[username], party, vote);
  }
};

var get_item = function (item_id) {
  if (item_id < itemlist.length) {
    return itemlist[item_id];
  }
  return -1;
};

var get_user = function (username) {
  if (username in userdict) {
    return userdict[username];
  }
  return -1;
};

module.exports = {
  itemlist : itemlist,
  userdict : userdict,
  Item : Item,
  Vote : Vote,
  Count : Count,
  User : User,
  RollCall : RollCall,
  new_item : new_item,
  put_vote : put_vote,
  get_item : get_item,
  get_user : get_user,
}