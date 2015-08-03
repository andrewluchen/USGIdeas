from flask import Flask, render_template
import os

app = Flask(__name__)

# changing jinja delimiters so won't interfere with AngularJS
app.jinja_env.variable_start_string = '[['
app.jinja_env.variable_end_string = ']]'

#Floor Votes Idea

import ideas.floorvotes.floorvotes

floorvotes_name = "Floor Votes"
floorvotes_path = "floorvotes"

@app.route('/' + floorvotes_path)
def floorvotes():
  return render_template('floorvotes.html')

@app.route('/' + floorvotes_path + '/vote/' + "<int:votenumber>")
def floorvotes_vote(votenumber):
  vote = floorvotes.get_vote(votenumber)
  return render_template('floorvotes_vote.html')

@app.route('/' + floorvotes_path + '/user/' + "<username>")
def floorvotes_user(username):
  user = floorvotes.get_user(username)
  return render_template('floorvotes_user.html',
                         user = user)

# Main Index

@app.route('/')
def index():
  return render_template('index.html',
                         floorvotes_name = floorvotes_name,
                         floorvotes_path = floorvotes_path)

if __name__ == "__main__":
  # Bind to PORT if defined, otherwise default to 5000.
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port)
