//mobileLogin.js
var User = require('../models/user');

module.exports = function login (req,res) { 

User.findOne({ 'email': req.body.email }, function(err, user) {
    if (err){
      res.send(err);
  	}else {
  		if(user !== null){
  	  		if (req.body.password === user.password )
  	  			res.status(200).json({token : "Mi token", idUser:user.idUser})
  	  		else
  	  			res.status(404).send("The password you've entered is incorrect")
  	  	}else 
  	  		res.status(404).send("The email you've entered doesn't match any account")
   	}
 });
}