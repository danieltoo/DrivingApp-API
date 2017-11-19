
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

cb.config('http://207.249.127.149',1026,'v2')
.then((result) => console.log(result))
.catch((err) => console.log(err))

module.exports = async function getDevicesOnCampus(location) {
	let devicesList = []
	if (location !== undefined){
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
			console.log(result)
		    await result.map((device) =>{ 
		    	devicesList.push(device.id)
		    })
		})
		.catch((err) => console.log(err))
	}
	
	return devicesList
}