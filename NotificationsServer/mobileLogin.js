//mobileLogin.js
exports.login = async  (req,res) => { 
  if(req.body.email === "mi@email.com" && req.body.password === 'pass'){
    res.status(200).json({token : "Mi token", idUser:"0000001"})
  }else {
    if (req.body.email !== "mi@email.com"){
      res.status(404).send("The email you've entered doesn't match any account")
    }else {
       res.status(404).send("The password you've entered is incorrect")
    } 
  }
}