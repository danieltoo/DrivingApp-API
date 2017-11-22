'use strict';

var Zone = require('../models/zones');

exports.list_all_zones= function(req, res, next) {
  Zone.find({}, function(err, zone) {
    if (err)
      res.send(err);
    res.json(zone);
  });
};

exports.list_all_zonesOfCampus= function(req, res, next) {
  Zone.find({'refCampus': req.params.idCampus}, function(err, zones) {
    if (err)
      res.send(err);
    res.json(zones);
  });
};

exports.create_zone = function(req, res, next) {
  var new_zone = new Zone(req.body);
  new_zone.save(function(err, zone) {
    if (err)
      res.send(err);
    res.json(zone);
  });
};

exports.read_zone = function(req, res, next) {
  Zone.findOne({ '_id': req.params.zoneId }, function(err, zone) {
    if (err)
      res.send(err);
    res.json(zone);
  });
};

exports.update_zone = function(req, res, next) {
  Zone.findOneAndUpdate({ '_id': req.params.zoneId}, req.body, {new: true}, function(err, zone) {
    if (err)
      res.send(err);
    res.json(zone);
  });
};

exports.delete_zone = function(req, res, next) {
  Zone.findOne({'_id': req.params.zoneyId}, function(err, zone) {
    if(err)
      res.send(err);
    else if(zone){
      zone.status = ['inactive'];
      Zone.update({'_id': req.params.zoneId}, zone, function(err, zone) {
        if (err)
          res.send(err);
        res.json(zone);
      })
      res.json({ message: 'Zone successfully deleted' });
    }
  });
};