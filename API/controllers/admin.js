'use strict';

var Admin = require('../models/administrator');

exports.list_all_admins = function(req, res, next) {
  Admin.find({}, function(err, admin) {
    if (err)
      res.send(err);
    res.json(admin);
  });
};

exports.create_admin = function(req, res, next) {
  var new_admin = new Admin(req.body);
  new_admin.save(function(err, admin) {
    if (err)
      res.send(err);
    res.json(admin);
  });
};

exports.read_admin = function(req, res, next) {
  Admin.findOne({ 'idAdministrator': req.params.adminId }, function(err, admin) {
    if (err)
      res.send(err);
    res.json(admin);
  });
};

exports.update_admin = function(req, res, next) {
  Admin.findOneAndUpdate({ 'idAdministrator': req.params.adminId}, req.body, {new: true}, function(err, admin) {
    if (err)
      res.send(err);
    res.json(admin);
  });
};

exports.delete_admin = function(req, res, next) {
  Admin.findOne({'idAdministrator': req.params.adminId}, function(err, admin) {
    if(err)
      res.send(err);
    else if(user){
      admin.status = ['inactive'];
      Admin.update({'idAdministrator': req.params.adminId}, admin, function(err, admin) {
        if (err)
          res.send(err);
        res.json(admin);
      })
      res.json({ message: 'Administrator successfully deletedd' });
    }
  });
};