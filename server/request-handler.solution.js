var utils = require('./utils.solution');

var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'chat'
});
var app = express();

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... \n\n");  
} else {
    console.log("Error connecting database ... \n\n");  
}
});

app.listen(3000);

var objectIdCounter = 1;
var messages = [
  // Note: an initial message is useful for debugging purposes.
  
  {
    text: 'hello world',
    username: 'fred',
    objectId: objectIdCounter
  }
  
];

var actions = {
  'GET': function(request, response){
    // call database to get the message
     console.log("Now testing connecting to ", request.url);
    app.get("/",function(request,response){
    connection.query('SELECT * from Users LIMIT 1', function(err, rows, fields) {
    connection.end();
      if (!err)
        console.log('The solution is: ', rows);
      else
        console.log('Error while performing Query.');
      });
    });

    

    utils.sendResponse(response, {results: messages});
  },
  'POST': function(request, response){
    utils.collectData(request, function(message){
      // call database and to add message
      message.objectId = ++objectIdCounter;
      messages.push(message);
      utils.sendResponse(response, {objectId: message.objectId}, 201);
    });
  },
  'OPTIONS': function(request, response){
    utils.sendResponse(response, null);
  }
};

exports.requestHandler = utils.makeActionHandler(actions);
