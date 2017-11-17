
var PointOnCampus = require('./pointOnCampus')
var Campus = require('../../API/models/campus')


module.exports = async function determinateCampus( location ){

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