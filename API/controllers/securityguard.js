'use strict';

var SecurityGuard = require('../models/securityguard');

exports.list_all_sg= function(req, res, next) {
   SecurityGuard.find({}, function(err, sg) {
    if (err)
      res.status(400).send(err);
    res.json(sg);
  });
};

exports.create_sg = function(req, res, next) {
  var new_sg = new SecurityGuard(req.body);
  new_sg.save(function(err, sg) {
    if (err)
      res.status(400).send(err);
    res.json(sg);
  });
};

exports.read_sg = function(req, res, next) {
  SecurityGuard.findOne({ 'idUser': req.params.sgId }, function(err, sg) {
    if (err)
      res.status(400).send(err);
    res.json(sg);
  });
};

exports.update_sg = function(req, res, next) {
  SecurityGuard.findOneAndUpdate({ 'idUser': req.params.sgId}, req.body, {new: true}, function(err, sg) {
    if (err)
      res.status(400).send(err);
    res.json(sg);
  });
};

exports.delete_sg = function(req, res, next) {
  SecurityGuard.findOne({'idUser': req.params.sgId}, function(err, sg) {
    if(err)
      res.status(400).send(err);
    else if(sg){
      sg.status = ['inactive'];
      SecurityGuard.update({'idUser': req.params.sgId}, sg, function(err, sg) {
        if (err)
          res.status(400).send(err);
        console.log("El guardia de seguridad ha pasado a estado inactivo");
      })
      res.json({ message: 'SecurityGuard successfully deleted' });
    }
  });
};