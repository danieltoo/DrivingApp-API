
var cb = require('ocb-sender')
var ngsi = require('ngsi-parser')

module.exports = async function getDevicesOnCampus(location) {
	console.log("devices en el campus")
	let devicesList = []
	if (location !== undefined){
		let query = ngsi.createQuery({
		  id: ".*",
		  type: "Device",
		  options: "keyValues"
		})

		await cb.getWithQuery(query)
		.then(async (result) => {
			
		    await result.map((device) =>{ 
		    	console.log(device.id)
		    	devicesList.push(device.id)
		    })
		})
		.catch((err) => console.log(err))
	}
	return devicesList
}

//georel : "coveredBy",
		  //geometry:"polygon",
		  //coords : location,