var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');

app.set('view engine', 'ejs');


var path = require('path');


app.use(express.static(path.join(__dirname+'/public')));
var Server = mongo.Server,
Db = mongo.Db,
BSON = require('mongodb').BSONPure;


var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('players', server);

//var server = new Server('138.197.77.44', 27017, {auto_reconnect:true});
//db = new Db('mean-dev', server);

db.open(function(err, lib){
		if(!err){
			console.log("connected to players database");
			db.collection('players', function(err, collection){
				if(err){
					console.log("the players collection don't exist foo");
					//populateDB();
					console.log(err);
				}
				console.log("looks good");
				
				//console.log(collection.find());
			})
		}
		else{
			console.log(err);
		}
});

findById = function(req, res){
	var id = req.params.id;
	console.log('Retrieving player: ' + id);
	
	/*db.collection('players', function(err, collection){
	//	console.log(collection);
		collection.find({'pitcherId':Number(id)}, function(err, item){
			console.log(err);
			res.send(item);
		})
	});*/
	
	db.collection('players', function(err, collection){
		collection.find({"pitcherId": Number(id)}).toArray(function(error, documents){
			if(err) throw error;
			//console.log(documents);
			res.send(documents);
		})
	})
};

findAll = function(req, res){
	
		db.collection('players', function(err, collection){
		collection.find().toArray(function(err, items){
			console.log("sending out items");
			res.send(items);
			
		});
		//console.log(collection.find());
		//	collection.find();
		
		
		
		});

};



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT ||8080;

var router = express.Router();

app.get('/', function(req, res){
	var id = 453562;
	console.log('Retrieving dashboard for player: ' + id);
	
	var battersList = new Array();
	
	db.collection('batterList', function(err, batterList){
		batterList.find().toArray((e,d) =>{
			battersList=  d;
		});
	});
	
	
	db.collection('players', function(err, collection){
		
		
		collection.find({"pitcherId": Number(id)}).toArray(function(error, documents){
			if(err) throw error;
			
			db.collection('playerList', function (err, playerList){
				if (err) throw error;
				try{
				playerList.find().toArray((e,d) => {
					res.render('dashboard', {
						data: documents,
						list: d,
						batters: battersList
		
					});
				
			})}catch(e){console.log(e.toString());}
			});			
		});	
	});
});


app.get('/dashboard/:id', function(req,res) {
	var id = req.params.id;
	console.log('Retrieving dashboard for player: ' + id);
	
	var battersList = new Array();
	
	db.collection('batterList', function(err, batterList){
		batterList.find().toArray((e,d) =>{
			battersList=  d;
		});
	});
	
	
	db.collection('players', function(err, collection){
		
		
		collection.find({"pitcherId": Number(id)}).toArray(function(error, documents){
			if(err) throw error;
			
			db.collection('playerList', function (err, playerList){
				if (err) throw error;
				try{
				playerList.find().toArray((e,d) => {
					res.render('dashboard', {
						data: documents,
						list: d,
						batters: battersList
		
					});
				
			})}catch(e){console.log(e.toString());}
			});			
		});	
	});
});

app.get('/batter/:id', function(req,res) {
	
	var id = req.params.id;
	console.log('Retrieving batter info for player: ' + id);
	var pitcherList = new Array();
	
	db.collection('playerList', function(err, playerList){
		playerList.find().toArray((e,d) =>{
			pitcherList=  d;
		});
	});
	
	
	db.collection('batters', function(err, collection){
		collection.find({"batterId": Number(id)}).toArray(function(error, documents){
			if(err) throw error;
			
		
				db.collection('batterList', function(err, batterList){
					
				
					if (err) throw error;
					try{
						batterList.find().toArray((e,d) => {
							res.render('batter', {
								data: documents,
								list: pitcherList,
								batters: d
						});
				
				})}catch(e){console.log(e.toString());}
				});
			
			});	
			
			
	
	});
});




app.listen(port);
console.log('Magic happens on port '+ port);
