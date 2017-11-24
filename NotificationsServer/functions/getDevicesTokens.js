var deviceTokens = require('../../API/models/deviceNotification')

module.exports = async function getDevicesTokens(devicesList) {
	console.log("determinando tokens de devices")
	var TokensList = []

	await deviceTokens.find({}, async (err, deviceNot) => {
		await devicesList.map( async (dev) => {
			await deviceNot.map((devNot) => {
				if (dev === devNot.refDevice) 
					TokensList.push(devNot.fcmToken)
			})
		})
	})
	console.log("determinando tokens de devices")
	return TokensList
}