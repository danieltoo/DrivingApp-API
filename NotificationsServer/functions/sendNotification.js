
var admin = require("firebase-admin")
var serviceAccount = require("../../config/driving-monitoring-firebase-adminsdk-tadcu-59e9660808.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://driving-monitoring.firebaseio.com"
});

module.exports = async function sendNotification(tokensList , notification) {
	console.log("enviando notificación")

	await admin.messaging().sendToDevice(tokensList, notification)
	  .then(function(response) {
	    console.log("Successfully sent message:", response);
	  })
	  .catch(function(error) {
	    console.log("Error sending message:", error);
	  });
	  console.log("enviando notificación")
	return
}