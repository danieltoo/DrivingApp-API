var fetch = require('node-fetch');
var config = require('../../config/config')

module.exports = async function sendNotification(tokensList , body) {
	console.log("enviando- notificación" + tokensList.length)
	var  options = {
	    method: 'POST',
	    headers: {
	        "Content-Type":"application/json",
	        "Authorization":`key=${config.fcm}`
	    }
	}
	await tokensList.map((token) => {
		body.to = token
		options.body = JSON.stringify(body)
		fetch('http://fcm.googleapis.com/fcm/send', options)
		    .then(function(res) {              
		        if(res.status >= 200 && res.status <= 208){
		           console.log(res.statusText)
		        }else{
		          console.log(res.statusText)
		        }
		        
		    })
		    .catch((err) => {
		        console.log(`Ha ocurrido un error en la búsqueda de la entidad: ${err}`)
		    });
	})
	return
}