import datetime

class Item(object):
  
  def __init__(self, item_id=None, name=None, html=None, password=None):
    self.item_id = item_id
    self.name = name
    self.html = html
    self.password = password
    self.rollcall = RollCall(self)
    self.active = True
  
  def is_password(self, password):
    return self.password == password
  
  def add_vote(self, user, vote):
    voteObj = self.rollcall.add_vote(user, vote)
    user.voting_record[self.item_id] = voteObj

class Vote(object):
  
  Aye = "Aye"
  Nay = "Nay"
  Present = "Present"
  
  def __init__(self, item, user, vote, timestamp):
    self.item = item
    self.user = user
    self.vote = vote
    self.timestamp =timestamp

class User(object):
  
  def __init__(self, username=None):
    self.username = username
    self.voting_record = dict()
  
  def get_ayes(self):
    ayes = []
    for i in sorted(self.voting_record.keys()):
      if (self.voting_record[i].vote == Vote.Aye):
        ayes.append(self.voting_record[i].item)
    return ayes
  
  def get_nays(self):
    nays = []
    for i in sorted(self.voting_record.keys()):
      if (self.voting_record[i].vote == Vote.Nay):
        nays.append(self.voting_record[i].item)
    return nays
  
  def get_presents(self):
    present = []
    for i in sorted(self.voting_record.keys()):
      if (self.voting_record[i].vote == Vote.Present):
        present.append(self.voting_record[i].item)
    return present

class RollCall(object):
  
  def __init__(self, item):
    self.item = item
    self.voteslist = []
  
  def add_vote(self, user, vote):
    self.voteslist = [castvote for castvote in self.voteslist if castvote.user != user]
    timestamp = datetime.datetime.now()
    voteObj = Vote(self.item, user, vote, timestamp.strftime("%Y-%m-%d %H:%M"))
    self.voteslist.append(voteObj)
    return voteObj
  
  def get_rollcount(self):
    ayes = 0
    nays = 0
    presents = 0
    for vote in self.voteslist:
      if vote.vote == Vote.Aye:
        ayes += 1
      if vote.vote == Vote.Nay:
        nays += 1
      if vote.vote == Vote.Present:
        presents += 1
    return (ayes, nays, presents)
      
  
  def length(self):
    return len(self.voteslist)
  
  def nth(self, n):
    return self.voteslist[n]

#main

itemlist = []
userdict = dict()

def new_item(name, html, password):
  newvote = Item(len(itemlist), name, html, password)
  itemlist.append(newvote)

def put_vote(itemnumber, username, vote):
  if itemnumber >= len(itemlist):
    return
  if not (username in userdict.keys()):
    userdict[username] = User(username=username)
  item = itemlist[itemnumber]
  item.add_vote(userdict[username], vote)

def get_item(itemnumber):
  if (itemnumber < len(itemlist)):
    return itemlist[itemnumber]
  return None

def get_user(username):
  if (username in userdict.keys()):
    return userdict[username]
  return None
