'use strict';

var User = require('../models/user');

exports.list_all_users= function(req, res, next) {
  User.find({}, function(err, user) {
    if (err)
      res.status(400).send(err);
    res.json(user);
  });
};

exports.create_user = function(req, res, next) {
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.status(400).send(err);
    res.json(user);
  });
};

exports.read_user = function(req, res, next) {
  User.findOne({ 'idUser': req.params.userId }, function(err, user) {
    if (err)
      res.status(400).send(err);
    res.json(user);
  });
};

exports.update_user = function(req, res, next) {
  User.findOneAndUpdate({ 'idUser': req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.status(400).send(err);
    res.json(user);
  });
};

exports.delete_user = function(req, res, next) {
  User.findOne({'idUser': req.params.userId}, function(err, user) {
    if(err)
      res.status(400).send(err);
    else if(user){
      user.status = ['inactive'];
      User.update({'idUser': req.params.userId}, user, function(err, user) {
        if (err)
          res.status(400).send(err);
        console.log("El usuario ha pasado a estado inactivo");
      })
      res.json({ message: 'User successfully deleted' });
    }
  });
};