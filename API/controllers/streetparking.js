'use strict';

var StreetParking = require('../models/streetparking');

exports.list_all_streetparkings= function(req, res, next) {
  StreetParking.find({}, function(err, streetparking) {
    if (err)
      res.send(err);
    res.json(streetparking);
  });
};

exports.create_streetparking = function(req, res, next) {
  var new_streetparking = new StreetParking(req.body);
  new_streetparking.save(function(err, streetparking) {
    if (err)
      res.send(err);
    res.json(streetparking);
  });
};

exports.read_streetparking = function(req, res, next) {
  StreetParking.findOne({ '_id': req.params.streetparkingId }, function(err, streetparking) {
    if (err)
      res.send(err);
    res.json(streetparking);
  });
};

exports.update_streetparking = function(req, res, next) {
  StreetParking.findOneAndUpdate({ '_id': req.params.streetparkingId }, req.body, {new: true}, function(err, streetparking) {
    if (err)
      res.send(err);
    res.json(streetparking);
  });
};

exports.delete_streetparking = function(req, res, next) {
    StreetParking.findOne({'_id': req.params.streetparkingId }, function(err, streetparking) {
    if(err)
      res.send(err);
    else if(streetparking){
      streetparking.status = ['inactive'];
      StreetParking.update({'_id': req.params.streetparkingId }, streetparking, function(err, streetparking) {
        if (err)
          res.send(err);
        res.json(streetparking);
      })
      res.json({ message: 'StreetParking successfully deleted' });
    }
  });
};