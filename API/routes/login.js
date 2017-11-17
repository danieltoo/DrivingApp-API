//mobileLogin.js
module.exports = function login (req,res) { 
  if(req.body.email === "mi@email.com" && req.body.password === 'pass'){
    res.status(200).json({token : "Mi token", idUser:"13680224"})
  }else {
    if (req.body.email !== "mi@email.com"){
      res.status(404).send("The email you've entered doesn't match any account")
    }else {
       res.status(404).send("The password you've entered is incorrect")
    } 
  }
}