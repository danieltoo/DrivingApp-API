var admin = require("firebase-admin")

var Alert = require('../API/models/alert')
var Campus = require('../API/models/campus')
var deviceTokens = require('../API/models/deviceNotification')

var PointOnCampus = require('../API/functions/PointOnCampus')
var serviceAccount = require("../config/driving-monitoring-firebase-adminsdk-tadcu-59e9660808.json");
var cb = require('ocb-sender')
cb.config('http://207.249.127.149',1026,'v2')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://driving-monitoring.firebaseio.com"
});

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
	  		await campus.map(( camp ) => {
	  			if(PointOnCampus(JSON.parse("["+alert.location+"]"),camp.location)){
	  				isOnCampus = true
	  				campusID = camp["_id"]
	  				campLocation = camp["location"]
	  			}
	  		})
	  	}  	
	});


	console.log(isOnCampus , campusID)

	if (isOnCampus) {

		/*Determinar lista de dispositivos en el campus*/
		let devicesList = []
		if (isOnCampus){
			await cb.queryEntitiesOnArea(campLocation ,".*","Device",true)
			.then((result) =>{
			    result.map((device) =>{ 
			    	devicesList.push(device.id)
			    })
			})
		}

		console.log("Lista de dispositivos ")
		console.log(devicesList)

		/*Determinar lista tokens de los dispositivos para enviar a Firebase*/

		var TokensList = []

		await deviceTokens.find({}, (err, deviceNot) => {
			devicesList.map((dev) => {
				deviceNot.map((devNot) => {
					if (dev === devNot.refDevice) 
						TokensList.push(devNot.fcmToken)
				})
			})
		})

		console.log("Lista de tokens de dispositivos")
		console.log(TokensList)

		/*Enviar la lista de tokens a firebase */
		let notification = {
		  notification: {
		    title: alert.category,
		    body: alert.description
		  }
		};


		await admin.messaging().sendToDevice(TokensList, notification)
		  .then(function(response) {
		    console.log("Successfully sent message:", response);
		  })
		  .catch(function(error) {
		    console.log("Error sending message:", error);
		  });
		  console.log(notification)
	}else {
		console.log("Se encuentra fuera del area")
	}


	

	
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

