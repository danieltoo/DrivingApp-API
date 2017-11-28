'use strict';
var Campus = require('../models/campus');

exports.list_all_campus= function(req, res, next) {
  Campus.find({}, function(err, campus) {
    if (err)
      res.status(400).send(err);
    res.json(campus);
  });
};

exports.create_campus = function(req, res, next) {
  var new_campus = new Campus(req.body);
  new_campus.save(function(err, campus) {
    if (err)
      res.status(400).send(err);
    res.json(campus);
  });
};

exports.read_campus = function(req, res, next) {
  Campus.findOne({ '_id': req.params.campusId }, function(err, campus) {
    if (err)
      res.status(400).send(err);
    res.json(campus);
  });
};

exports.update_campus = function(req, res, next) {
  Campus.findOneAndUpdate({ '_id': req.params.campusId}, req.body, {new: true}, function(err, campus) {
    if (err)
      res.status(400).send(err);
    res.json(campus);
  });
};

exports.delete_campus = function(req, res, next) {
  Campus.findOne({'_id': req.params.campusId}, function(err, campus) {
    if(err)
      res.status(400).send(err);
    else if(campus){
      campus.status = ['inactive'];
      Campus.update({'_id': req.params.campusId}, campus, function(err, campus) {
        if (err)
          res.status(400).send(err);
        console.log("El campus ha pasado a estado inactivo");
      })
      res.json({ message: 'Campus successfully deleted' });
    }
  });
};