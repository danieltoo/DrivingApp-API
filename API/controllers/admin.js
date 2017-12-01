'use strict';

var Admin = require('../models/administrator');

exports.list_all_admins = function(req, res, next) {
  Admin.find({}, function(err, admin) {
    if (err)
      res.status(400).send(err);
    res.json(admin);
  });
};

exports.create_admin = function(req, res, next) {
  var new_admin = new Admin(req.body);
  new_admin.save(function(err, admin) {
    if (err)
      res.status(400).send(err);
    res.json(admin);
  });
};

exports.read_admin = function(req, res, next) {
  Admin.findOne({ 'id': req.params.adminId }, function(err, admin) {
    if (err)
      res.status(400).send(err);
    res.json(admin);
  });
};

exports.update_admin = function(req, res, next) {
  Admin.findOneAndUpdate({ 'id': req.params.adminId}, req.body, {new: true}, function(err, admin) {
    if (err)
      res.status(400).send(err);
    res.json(admin);
  });
};

exports.delete_admin = function(req, res, next) {
  Admin.findOne({'id': req.params.adminId}, function(err, admin) {
    if(err)
      res.status(400).send(err);
    else if(user){
      admin.status = false;
      Admin.update({'id': req.params.adminId}, admin, function(err, admin) {
        if (err)
          res.status(400).send(err);
        console.log("El administrador ha pasado a estado inactivo");
      })
      res.json({ message: 'Administrator successfully deletedd' });
    }
  });
};