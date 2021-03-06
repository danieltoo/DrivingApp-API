'use strict';

var UsersContext = require('../models/userscontext');

exports.list_all_usersContext= function(req, res, next) {
  UsersContext.find({}, function(err, usersContext) {
    if (err)
      res.status(400).send(err);
    res.json(usersContext);
  });
};

exports.create_userContext = function(req, res, next) {
  var new_userContext = new UsersContext(req.body);
  new_userContext.save(function(err, userContext) {
    if (err)
      res.status(400).send(err);
    res.json(userContext);
  });
};

exports.read_userContext = function(req, res, next) {
  UsersContext.findOne({ 'id': req.params.userContextId }, function(err, userContext) {
    if (err)
      res.status(400).send(err);
    res.json(userContext);
  });
};

exports.update_userContext = function(req, res, next) {
  UsersContext.findOneAndUpdate({ 'id': req.params.userContextId}, req.body, {new: true}, function(err, userContext) {
    if (err)
      res.status(400).send(err);
    res.json(userContext);
  });
};
