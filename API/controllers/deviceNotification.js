'use strict';

var Device = require('../models/deviceNotification');

exports.list_all_devices = function(req, res, next) {
  Device.find({}, function(err, devices) {
    if (err)
      res.send(err);
    res.json(devices);
  });
};

exports.create_device = function(req, res, next) {
  var new_device = new Device(req.body);
  console.log(req.body)
  /*new_device.save(function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });*/
};

exports.read_device = function(req, res, next) {
  Device.findOne({ '_id': req.params.id }, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
};

exports.update_device = function(req, res, next) {
  Device.findOneAndUpdate({ '_id': req.params.id}, req.body, {new: true}, function(err, device) {
    if (err)
      res.send(err);
    res.json(device);
  });
};

