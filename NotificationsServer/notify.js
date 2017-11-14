var Alert = require('../API/models/alert');
var Campus = require('../models/campus');
var cb = require('ocb-sender')
cb.config('http://207.249.127.149',1026,'v2')
var PointOnCampus = require('../functions/PointOnCampus')

exports.notify = async function(req, res, next) {
	var new_alert = new Alert(req.body['data']);

	/*Detectar campus donde se genera la alerta*/

	let isOn
	Campus.find({}, async function(err, campus) { //saco la lista de campus
		if (err)
	      res.send(err);
	  	if (campus != null){ 
	  		
	  	}  	
	});

	/*Determinar lista de dispositivos en el campus*/
	/*Almacenar la alerta*/
	new_alert.save(function(err, alert) {
	  if (err)
		res.send(err);
	  res.json(alert);
	});

	/*Enviar sockets por el canal del campus*/
 	var socketio = req.app.get('socketio');
 	socketio.sockets.emit('campus', req.body);

 	res.status(200).send("OK")
};

