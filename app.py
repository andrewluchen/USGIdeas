from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# changing jinja delimiters so won't interfere with AngularJS
app.jinja_env.variable_start_string = '{['
app.jinja_env.variable_end_string = ']}'

#Floor Votes Idea

import ideas.floorvotes.floorvotes as floorvotes

floorvotes_name = "Floor Votes"
floorvotes_path = "floorvotes"

floorvotes.new_item("Test Item", "dummy item", "")
floorvotes.new_item("Test Item 2", "<div id=\"output\"><span class=\"xbbcode-b\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>", "")

@app.route('/' + floorvotes_path)
def floorvotes_index():
  return render_template('floorvotes/floorvotes_index.html',
                         floorvotes_path = floorvotes_path,
                         itemlist = reversed(floorvotes.itemlist))

@app.route('/' + floorvotes_path + '/item/' + "<int:item_id>")
def floorvotes_item(item_id):
  item = floorvotes.get_item(item_id)
  if (item == None):
    return "Does Not Exist"
  return render_template('floorvotes/floorvotes_item.html',
                         floorvotes_path = floorvotes_path,
                         item = item)

@app.route('/' + floorvotes_path + '/user/' + "<username>")
def floorvotes_user(username):
  user = floorvotes.get_user(username)
  if (user == None):
    return "Does Not Exist"
  return render_template('floorvotes/floorvotes_user.html',
                         user = user)

@app.route('/' + floorvotes_path + '/vote', methods = ['PUT'])
def floorvotes_vote():
  req_json = request.get_json()
  floorvotes.put_vote(req_json['item_id'], req_json['username'], req_json['vote'])
  return ""

# Main Index

@app.route('/')
def index():
  return render_template('index.html',
                         floorvotes_name = floorvotes_name,
                         floorvotes_path = floorvotes_path)

if __name__ == "__main__":
  # Bind to PORT if defined, otherwise default to 5000.
  port = int(os.environ.get('PORT', 5000))
  app.debug = True
  app.run(host='0.0.0.0', port=port)
