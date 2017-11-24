
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

module.exports = async function getDevicesOnCampus(location) {
	console.log("determinando devices en el campus")
	let devicesList = []
	if (location !== undefined){
		let query = ngsi.createQuery({
		  id: ".*",
		  type: "Device",
		  //georel : "coveredBy",
		  //geometry:"polygon",
		  //coords : location,
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
	console.log("terminó de determinando devices campus")
	return devicesList
}