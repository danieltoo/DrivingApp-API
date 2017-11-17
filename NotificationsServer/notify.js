var Alert = require('../API/models/alert')

var determinateCampus = require('./functions/determinateCampus')
var getDevicesOnCampus = require('./functions/getDevicesOnCampus')
var getDevicesTokens = require('./functions/getDevicesTokens')
var sendNotification = require('./functions/sendNotification')

exports.notify = async (req, res, next) => {
	let socketio = req.app.get('socketio');
	let alert = req.body['data'][0]
	let campus = await determinateCampus(alert.location)//Detectar campus donde se genera la alerta
	if (campus !== {}) {
		socketio.sockets.emit(campus.id, alert); //Envia la nueva alerta a los dispositivos abiertos
		var new_alert = new Alert(alert);
		new_alert.save(function (err, alert) { //Almacena alerta en la base de datos
			if (err)
				console.log(err)
		})
		let devicesList = await getDevicesOnCampus(campus.location) //Determinar lista de dispositivos en el campus
		if (devicesList.length > 0 ) {
			let tokensList = await getDevicesTokens(devicesList) //Determinar lista tokens de los dispositivos para enviar a Firebase
			if ( tokensList.length > 0 ){
				let notification = {
				  notification: {
				    title: alert.category,
				    body: alert.description
				  }
				};
				await sendNotification(tokensList , notification) // Enviar la lista de tokens a firebase 
			}else {
				console.log("No se encontraron tokens :(")
			}
		}else {
			console.log("No se encuentran dispositivos en el campus")
		}
	}else {
		console.log("Se encuentra fuera del area")
	}
 	res.status(200).send("OK")
};









