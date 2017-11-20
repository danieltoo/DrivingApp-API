'use strict';

var User = require('../models/user');

exports.list_all_users= function(req, res, next) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.create_user = function(req, res, next) {
  console.log(req.body)
  var new_user = new User(req.body);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.read_user = function(req, res, next) {
  User.findOne({ 'idUser': req.params.userId }, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_user = function(req, res, next) {
  User.findOneAndUpdate({ 'idUser': req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.delete_user = function(req, res, next) {
  User.findOne({'idUser': req.params.userId}, function(err, user) {
    if(err)
      res.send(err);
    else if(user){
      user.status = ['inactive'];
      User.update({'idUser': req.params.userId}, user, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      })
      res.json({ message: 'User successfully deleted' });
    }
  });
};