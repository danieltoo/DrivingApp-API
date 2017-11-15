var Alert = require('../API/models/alert');
var Campus = require('../API/models/campus');
var deviceTokens = require('../API/models/deviceNotification');

var cb = require('ocb-sender')
cb.config('http://207.249.127.149',1026,'v2')
var PointOnCampus = require('../API/functions/PointOnCampus')

exports.notify = async function(req, res, next) {
	//var new_alert = new Alert(req.body['data']);
	let alert = req.body['data'][0]
	/*Detectar campus donde se genera la alerta*/
	let isOnCampus = false
	let campusID = ""
	let campLocation = []

	await Campus.find({}, async function(err, campus) { //saco la lista de campus
		if (err)
	      res.send(err);
	  	if (campus != null){ 
	  		campus.map(( camp ) => {
	  			if(PointOnCampus(JSON.parse("["+alert.location+"]"),camp.location)){
	  				isOnCampus = true
	  				campusID = camp["_id"]
	  				campLocation = camp["location"]
	  			}
	  		})
	  	}  	
	});


	console.log(isOnCampus , campusID)

	/*Determinar lista de dispositivos en el campus*/
	let devicesList = []
	if (isOnCampus){
		await cb.queryEntitiesOnArea(campLocation ,".*","Device",true)
		.then((result) =>{
		    result.map((device) => devicesList.push(device.id))
		})
	}

	console.log("Lista de dispositivos ")
	console.log(devicesList)

	/*Determinar lista tokens de los dispositivos para envar a Firebase*/

	let TokensList = []

	

	
	/*Almacenar la alerta*/
	/*new_alert.save(function(err, alert) {
	  if (err)
		res.status(500).send(err);
	  res.json(alert);
	});*/

	/*Enviar sockets por el canal del campus*/
 	var socketio = req.app.get('socketio');
 	socketio.sockets.emit('campus', req.body);

 	res.status(200).send("OK")
};

