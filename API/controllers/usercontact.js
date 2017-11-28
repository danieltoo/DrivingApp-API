'use strict';

var UserContact = require('../models/usercontact');

exports.list_all_usersContacts= function(req, res, next) {
  UserContact.find({}, function(err, userContact) {
    if (err)
      res.status(400).send(err);
    res.json(userContact);
  });
};

exports.create_userContact = function(req, res, next) {
  var new_userContact = new UserContact(req.body);
  new_userContact.save(function(err, userContact) {
    if (err)
      res.status(400).send(err);
    res.json(userContact);
  });
};

exports.read_userContact = function(req, res, next) {
  UserContact.findOne({ 'idContact': req.params.userContactId }, function(err, userContact) {
    if (err)
      res.status(400).send(err);
    res.json(userContact);
  });
};

exports.update_userContact = function(req, res, next) {
  UserContact.findOneAndUpdate({ 'idContact': req.params.userContactId}, req.body, {new: true}, function(err, userContact) {
    if (err)
      res.status(400).send(err);
    res.json(userContact);
  });
};
/*ESTE MODELO NO TENDRÍA EL MÉTODO DE ELIMIAR UN USUARIO DE CONTACTO
PORQUE QUE AL USUARIO NO SE LE DEBERÍA PERMITIR BORRAR SU USUARIO DE CONTACTO, SOLO ACTUALIZARLO */
