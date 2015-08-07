var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  if(req.url.substr(-1) == '/' && req.url.length > 1)
    res.redirect(301, req.url.slice(0, -1));
  else
    next();
});


// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Index

app.get('/', function(request, response) {
  response.render('index.html');
});

// Floor Votes

var floorvotes = require('./ideas/floorvotes');
floorvotes.new_item("Test Item", "dummy item", "");
floorvotes.new_item("Test Item 2", "<div id=\"output\"><span class=\"xbbcode-b\">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span>\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>", "");
floorvotes.put_vote(1, "Chen", floorvotes.Vote.RED, floorvotes.Vote.AYE);

app.get('/floorvotes', function(request, response) {
  response.render('floorvotes/index.html');
});
app.get('/floorvotes/api', function(request, response) {
  response.json({itemlist : floorvotes.itemlist});
});
app.post('/floorvotes', function(request, response) {
  floorvotes.new_item("Temporary Title", request.body.body_html, "");
  response.json({itemlist : floorvotes.itemlist});
});

app.get('/floorvotes/item/:item_id', function(request, response) {
  response.render('floorvotes/item.html');
});
app.get('/floorvotes/item/:item_id/api', function(request, response) {
  var item_id = request.params.item_id;
  response.json({item : floorvotes.get_item(item_id)});
});
app.put('/floorvotes/item/:item_id', function(request, response) {
  var body = request.body;
  floorvotes.put_vote(body.item_id, body.username, body.party, body.vote);
  response.json({item : floorvotes.get_item(body.item_id)});
});

app.get('/floorvotes/user/:username', function(request, response) {
  response.render('floorvotes/user.html');
});
app.get('/floorvotes/user/:username/api', function(request, response) {
  var username = request.params.username;
  var user = floorvotes.get_user(username);
  if (user == -1) {
    response.json({user : user});
    return;
  }
  response.json({user : user, itemlist : floorvotes.itemlist,
    ayes : user.ayes(), nays : user.nays(), presents : user.presents(),
  });
});

// MAIN

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
