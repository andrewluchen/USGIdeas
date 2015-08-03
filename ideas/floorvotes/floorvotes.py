class Vote(object):
  
  def __init__(self, vote_id=None, name=None, html=None, password=None):
    self.vote_id = vote_id
    self.name = name
    self.html = html
    self.password = password
    self.rollcall = RollCall()
  
  def add_vote(self, user, vote):
    self.rollcall.add_vote(user, vote)
    user.voting_record[vote_id] = (vote, self.name)
  
  def is_password(self, password):
    return self.password == password

class User(object):
  
  def __init__(self, username=None):
    self.username = username
    self.voting_record = dict()
  
  def get_ayes(self):
    ayes = []
    for i in sorted(self.voting_record.keys()):
      if (self.voting_record[i][0] == RollCall.Aye):
        ayes.append(self.voting_record[i][1])
  
  def get_nays(self):
    nays = []
    for i in sorted(self.voting_record.keys()):
      if (self.voting_record[i][0] == RollCall.Nay):
        nays.append(self.voting_record[i][1])
  
  def get_presents(self):
    present = []
    for i in sorted(self.voting_record.keys()):
      if (self.voting_record[i][0] == RollCall.Present):
        present.append(self.voting_record[i][1])

class RollCall(object):
  
  Aye = 0
  Nay = 1
  Present = 2
  
  def __init__(self):
    self.voteslist = []
  
  def add_vote(self, user, vote):
    self.voteslist = [i for i in self.voteslist if i[0] != user]
    self.voteslist.append((user, vote))
  
  def length(self):
    return self.voteslist.length
  
  def nth(self, n):
    return self.voteslist[n]

#main

voteslist = []
userdict = dict()

def put_vote(votenumber, username, vote):
  if votenumber >= voteslist.length:
    return
  if not (username in userdict.keys()):
    userdict[username] = User(username=username)
  vote = voteslist[votenumber]
  vote.add_vote(userdict[username], vote)

def get_vote(votenumber):
  return votelist[votenumber]

def get_user(username):
  return userdict[username]
