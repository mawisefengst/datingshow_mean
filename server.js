var express = require("express"),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require("mongoose"),
	meetupsController = require("./server/controllers/meetups-controller"),
	path = require("path");


// Build the connection string 
var dbURI = 'mongodb://localhost:27017/mean'; 

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

mongoose.connection.on('data', function (doc) {
  // do something with the mongoose document
  console.log(doc);
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
//app.use(bodyParser.json())

app.use(bodyParser.json({limit: '5mb'}));

app.use("/js", express.static(__dirname + "/client/js"));
app.use("/css", express.static(__dirname + "/client/css"));
app.use("/upload", express.static(__dirname + "/server/upload"));

app.get("/",function (req,res) {
	res.sendFile(__dirname  + "/client/view/index.html");
})

app.get("/registrant", meetupsController.list);
app.post("/registrant", meetupsController.create);
global.appRoot = path.resolve(__dirname);


app.listen(3000,function(){
	console.log("I am listening")
})	


