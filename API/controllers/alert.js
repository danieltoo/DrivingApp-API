'use strict';

var Alert = require('../models/alert');

exports.list_all_alerts = function(req, res, next) {
  Alert.find({}, function(err, alert) {
    if (err)
      res.status(400).send(err);
    res.json(alert);
  });
};

exports.create_alert = function(req, res, next) {
  var new_alert = new Alert(req.body['data'][0]);
  new_alert.save(function(err, alert) {
    if (err)
      res.status(400).send(err);;
    res.json(alert);
  });
};

exports.read_alert = function(req, res, next) {
  Alert.findOne({ 'id': req.params.alertId }, function(err, alert) {
    if (err)
      res.status(400).send(err);
    res.json(alert);
  });
};

exports.update_alert = function(req, res, next) {
  Alert.findOneAndUpdate({ 'id': req.params.alertId }, req.body, { new: true }, function(err, alert) {
    if (err)
      res.status(400).send(err);
    res.json(alert);
  });
};

exports.delete_alert= function(req, res, next) {
  Alert.remove({'id': req.params.alertId}, function(err, alert) {
    if (err)
      res.status(400).send(err);
    res.json({ message: 'Alert successfully deleted' });
  });
};