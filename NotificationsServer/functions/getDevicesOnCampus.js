
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')
cb.config('http://207.249.127.149',1026,'v2')

module.exports = async function getDevicesOnCampus(location) {
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