from flask import Flask, render_template
import os

app = Flask(__name__)

# changing jinja delimiters so won't interfere with AngularJS
app.jinja_env.variable_start_string = '[['
app.jinja_env.variable_end_string = ']]'

app1_name = "Floor Votes"
app1_dir = "floorvotes"

@app.route('/')
def index():
  return render_template('index.html',
                         app1_name = app1_name,
                         app1_dir = app1_dir)


@app.route('/floorvotes')
def index():
  return render_template('index.html')

if __name__ == "__main__":
  # Bind to PORT if defined, otherwise default to 5000.
  port = int(os.environ.get('PORT', 5000))
  app.run(host='0.0.0.0', port=port)
