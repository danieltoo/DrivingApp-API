var deviceTokens = require('../../API/models/deviceNotification')

module.exports = async function getDevicesTokens(devicesList) {
	console.log("tokens de devices")
	var TokensList = []


	await deviceTokens.find({}, async (err, deviceNot) => {
		await devicesList.map( async (dev) => {
			await deviceNot.map((devNot) => {
				if (dev === devNot.refDevice){ 
					console.log("Device encontrado"+devNot.refDevice)
					TokensList.push(devNot.fcmToken)
				}
			})
		})
	})
	return TokensList
}