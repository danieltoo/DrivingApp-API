'use strict';

var Company = require('../models/company');

exports.list_all_companies= function(req, res, next) {
  Company.find({}, function(err, company) {
    if (err)
      res.status(400).send(err);
    res.json(company);
  });
};

exports.create_company = function(req, res, next) {
  var new_company = new Company(req.body);
  new_company.save(function(err, company) {
    if (err)
      res.status(400).send(err);
    res.json(company);
  });
};

exports.read_company = function(req, res, next) {
  Company.findOne({ 'id': req.params.companyId }, function(err, company) {
    if (err)
      res.status(400).send(err);
    res.json(company);
  });
};

exports.update_company = function(req, res, next) {
  Company.findOneAndUpdate({ 'id': req.params.companyId}, req.body, {new: true}, function(err, company) {
    if (err)
      res.status(400).send(err);;
    res.json(company);
  });
};

exports.delete_company = function(req, res, next) {
  Company.findOne({'id': req.params.companyId}, function(err, company) {
    if(err)
      res.status(400).send(err);
    else if(company){
      company.status = false;
      Company.update({'id': req.params.companyId}, company, function(err, company) {
        if (err)
          res.status(400).send(err);
        console.log("La compañia ha pasado a estado inactivo");
      })
      res.json({ message: 'Company successfully deleted' });
    }
  });
};