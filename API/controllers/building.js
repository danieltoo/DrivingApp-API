'use strict';

var Building = require('../models/building');

exports.list_all_buildings= function(req, res, next) {
  Building.find({}, function(err, building) {
    if (err)
      res.status(400).send(err);
    res.json(building);
  });
};

exports.create_building = function(req, res, next) {
  var new_building = new Building(req.body);
  new_building.save(function(err, building) {
    if (err)
      res.status(400).send(err);
    res.json(building);
  });
};

exports.read_building = function(req, res, next) {
  Building.findOne({ '_id': req.params.buildingId }, function(err, building) {
    if (err)
      res.status(400).send(err);
    res.json(building);
  });
};

exports.update_building = function(req, res, next) {
  Building.findOneAndUpdate({ '_id': req.params.buildingId}, req.body, {new: true}, function(err, building) {
    if (err)
      res.status(400).send(err);
    res.json(building);
  });
};

exports.delete_building = function(req, res, next) {
   Building.findOne({'_id': req.params.buildingId}, function(err, building) {
    if(err)
      res.status(400).send(err);
    else if(building){
      building.status = ['inactive'];
      Building.update({'_id': req.params.buildingId}, building, function(err, building) {
        if (err)
          res.status(400).send(err);
        console.log("El edificio ha pasado a estado inactivo");
      })
      res.json({ message: 'Building successfully deleted' });
    }
  });
};