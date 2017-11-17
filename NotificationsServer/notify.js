var admin = require("firebase-admin")

var Alert = require('../API/models/alert')
var Campus = require('../API/models/campus')
var deviceTokens = require('../API/models/deviceNotification')

var PointOnCampus = require('../API/functions/PointOnCampus')
var serviceAccount = require("../config/driving-monitoring-firebase-adminsdk-tadcu-59e9660808.json");
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')
cb.config('http://207.249.127.149',1026,'v2')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://driving-monitoring.firebaseio.com"
});

exports.notify = async (req, res, next) => {
	//var new_alert = new Alert(req.body['data']);

	let alert = req.body['data'][0]

	/*Detectar campus donde se genera la alerta*/

	let campus = await determinateCampus(alert.location)

	if (campus !== {}) {

		/*Determinar lista de dispositivos en el campus*/
		let devicesList = await getDevicesOnCampus(campus.location)
		

		if (devicesList.length > 0 ) {


			console.log("Lista de dispositivos ")
			console.log(devicesList)

			/*Determinar lista tokens de los dispositivos para enviar a Firebase*/

			let TokensList = await getDevicesTokens(devicesList)

			if ( TokensList.length > 0 ){

				console.log("Lista de tokens de dispositivos")
				console.log(TokensList)


				/*Enviar la lista de tokens a firebase */
				let notification = {
				  notification: {
				    title: alert.category,
				    body: alert.description
				  }
				};

				await sendNotification(TokensList , notification)
				

			}else {
				console.log("No se encontraron tokens :(")
			}
		}else {
			console.log("No se encuentran dispositivos en el campus")
		}
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



async function determinateCampus( location ){

	let isOnCampus = false
	let campusID = ""
	let campLocation = []

	let result = {} 

	await Campus.find({}, async (err, campus) => { //saco la lista de campus
		if (err)
	      error = err
	  	if (campus != null){

	  		await campus.map(( camp ) => {
	  			if(PointOnCampus(JSON.parse("["+location+"]"),camp.location)){
	  				result["id"] = camp["_id"]
	  				result["location"] = camp["location"]
	  			}
	  		})


	  	}  	
	})

	return result 
}

async function getDevicesOnCampus(location) {
	let devicesList = []

		let query = ngsi.createQuery({
		  id: ".*",
		  type: "Device",
		  georel : "coveredBy",
		  geometry:"polygon",
		  coords : location,
		  options: "keyValues"
		})

		await cb.getWithQuery(query)
		.then(async (result) => {
		    await result.map((device) =>{ 
		    	devicesList.push(device.id)
		    })
		})
	return devicesList
}

async function getDevicesTokens(devicesList) {
	var TokensList = []

	await deviceTokens.find({}, async (err, deviceNot) => {
		await devicesList.map( async (dev) => {
			await deviceNot.map((devNot) => {
				if (dev === devNot.refDevice) 
					TokensList.push(devNot.fcmToken)
			})
		})
	})

	return TokensList
}

async function sendNotification(TokensList , notification) {

	await admin.messaging().sendToDevice(TokensList, notification)
	  .then(function(response) {
	    console.log("Successfully sent message:", response);
	  })
	  .catch(function(error) {
	    console.log("Error sending message:", error);
	  });


	return
	 

}