// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
//require MySQL
var mysql = require('mysql');

//connect to mySQL database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'Reservations',
  multipleStatements : true
});

connection.connect();
//database query, customer view

// Sets up the Express App

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// People who want to eat (DATA)

var customers = [
	{
		customerName: "",
		phoneNumber: "",
		customerEmail: "",
		customerID: ""
	}
]

// Routes
// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res){
	// connection.query('SELECT * FROM customers', function(err, results) {
	//   if (err) throw err;
	 
	//   for (var i = 0; i < results.length; i++) {

	//   }
	console.log(__dirname);
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/view.html'));


})

// Create New Characters - takes in JSON input
// Going to let customers enter their information to get a table.
app.post('/api/new', function(req, res){

	// req.body hosts is equal to the JSON post sent from the user
	var newcharacter = req.body;

	console.log(newcharacter);

	// We then add the json the user sent to the character array
	characters.push(newcharacter);

	// We then display the JSON to the users
	res.json(newcharacter);
})

// // $(".submit").on("click", function(){

// // 	// Here we grab the form elements
// // 	var newReservation = {
// // 		customerName: $('#reserve_name').val().trim(),
// // 		phoneNumber: $('#reserve_phone').val().trim().replace(/-/g,""),
// // 		customerEmail: $('#reserve_email').val().trim(),
// // 		customerID: $('#reserve_uniqueID').val().trim()
// // 	};

// // 	console.log(newReservation);

// // 			var currentURL = window.location.origin;

// // 		    $.post(currentURL + "/api/tables", newReservation,
// // 		    function(data){

// // 		    	// If a table is available... tell user they are booked.
// // 		    	if(data == true){
// // 		    		alert("Yay! You are officially booked!")
// // 		    	}

// // 		    	// If a table is available... tell user they on the waiting list.
// // 		    	if(data == false){
// // 		    		alert("Sorry you are on the wait list")
// // 		    	}

// // 		    	// Clear the form when submitting
// // 	    		$('#reserve_name').val("");
// // 				$('#reserve_phone').val("");
// // 				$('#reserve_email').val("");
// // 				$('#reserve_uniqueID').val("");

// // 		    });

// // 	return false;

// 	});

// Search for Specific Character (or all characters) - provides JSON
//Need to change this to show tables, not search for customers
app.get('/api/:customers?', function(req, res){

	var chosen = req.params.customers;

	if(chosen){
		console.log(chosen);

		for (var i=0; i <customers.length; i++){

			if (chosen == customers[i].routeName){
				res.json(customers[i]);
				return;
			}
		}

		res.json(false);
	}

	else{
		res.json(customers);
	}
})



// Starts the server to begin listening 

app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})