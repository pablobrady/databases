var db = require('../db');
var appServer = require('../app.js');




module.exports = {
  messages: {
    get: function (req, res) {
		console.log("CONTROLLER : messages : GET");
		db.query('SELECT * from Users LIMIT 1', function(err, rows, fields) {
	        console.log("SQL RESULT: @ 46" + JSON.stringify(rows ));
	        db.end();
	     	if (!err)
	        console.log('The solution is: ', rows);
	      	else
	        console.log('Error while performing Query.');
      });           
    }, // a function which produces all the messages
    post: function (req, res) {
		console.log("CONTROLLER : messages : POST");
		//console.log( 'username: ', req.body );

			//console.log("CONTROLLER : users : POST");
		// var currentUserName = "";
		// db.query('SELECT id from Users where Name = ' + req.body.username + ' LIMIT 1', function(err, rows, fields) {
	 //        console.log("SQL RESULT: @ 26 " + rows[0]);
	 //        currentUserName = rows[0];
	 //        db.end();
	 //     	if (!err)
	 //        console.log('The solution is: ', rows);
	 //      	else
	 //        console.log('Error while performing Query.');
  //     	});       

		var params = [req.body.message, 0];
		var queryString = 'INSERT INTO Messages (Content,  Date) values ( ?, ? )';

		db.query(queryString, params, function(err, result) {
	        console.log("SQL RESULT: @ 35.");
	        // db.end();
	     	if (!err) {
	        	console.log('The solution is @35 is ok');
	        	console.log('result', result)
	        } else {
	        	console.log('Error while performing Query.');
	        	console.log(err);
	      	}

		});
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (req, res) {
		console.log("CONTROLLER : users : GET");
    },
    post: function (req, res) {
    	console.log( 'username: ', req.body.username );

		console.log("CONTROLLER : users : POST");
		db.query('INSERT INTO Users (Name) values ("' + req.body.username + '")', function(err, result) {
	        console.log("SQL RESULT: @ 64.");
	        db.end();
	     	if (!err)
	        	console.log('The solution is ok');
	      	else
	        	console.log('Error while performing Query.');
		});
    }
  }
};