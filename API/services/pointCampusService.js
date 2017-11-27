var PointOnCampus = require('../../NotificationsServer/functions/pointOnCampus');

exports.pointCampus= function (req,res) {
    let body = ngsi.createQuery(req.body);
    console.log(body);
    let salida = PointOnCampus(body[0], body[1]);
    res.json({ isOnCampus: salida});
}