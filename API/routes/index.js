'use strict';

  var express     = require('express')
  var app         = express();
  //Import the controllers
  var userController           = require('../controllers/user');
  var userContactController    = require('../controllers/usercontact');
  var userContextController    = require('../controllers/usercontext');
  var sgController             = require('../controllers/securityguard');
  var adminController          = require('../controllers/admin');
  var companyController        = require('../controllers/company');
  var zoneController           = require('../controllers/zones');
  var campusController         = require('../controllers/campus');
  var buildingController       = require('../controllers/building');
  var streetParkingController  = require('../controllers/streetparking');
  var alertController          = require('../controllers/alert');
  var deviceController         = require('../controllers/deviceNotification');

  //Import Services to Mobile App
  var alertsService = require('../services/alertsService')
  var devicesService = require('../services/devicesService');

  // Test route to make sure everything is working (accessed at GET http://localhost:4000/api)
  app.route('/')
    .get((req, res, next) => {
      res.json({ message: 'Welcome to API RESTFul Web Application' })
    });
  //AUTHENTICATION ROUTES
  /* The authentication routes will be here*/

  //USER  ROUTES
  app.route('/user')
    .get(userController.list_all_users)
    .post(userController.create_user);

  app.route('/user/:userId')
    .get(userController.read_user)
    .put(userController.update_user)
    .delete(userController.delete_user);
  
  //USER CONTACT ROUTES
  app.route('/userContact')
    .get(userContactController.list_all_usersContacts)
    .post(userContactController.create_userContact);

  app.route('/userContact/:userContactId')
    .get(userContactController.read_userContact)
    .put(userContactController.update_userContact)
  
  
  //ADMINISTRATOR ROUTES
  app.route('/administrator')
    .get(adminController.list_all_admins)
    .post(adminController.create_admin);

  app.route('/administrator/:adminId')
    .get(adminController.read_admin)
    .put(adminController.update_admin)
    .delete(adminController.delete_admin);

  //COMPANY ROUTES
  app.route('/company')
    .get(companyController.list_all_companies)
    .post(companyController.create_company);

  app.route('/company/:companyId')
    .get(companyController.read_company)
    .put(companyController.update_company)
    .delete(companyController.delete_company);
  
  /*app.route('/context/campus/coords/:campusQuery')
    .get(url+'/entities', function(req,res){
      req.p
    })*/

  //USER CONTEXT ROUTES
  app.route('/userContext')
    .get(userContextController.list_all_usersContext)
    .post(userContextController.create_userContext);

  app.route('/userContext/:userContextId')
    .get(userContextController.read_userContext)
    .put(userContextController.update_userContext)


  //SECURITY GUARD ROUTES
  app.route('/securityGuard')
    .get(sgController.list_all_sg)
    .post(sgController.create_sg);

  app.route('/securityGuard/:sgId')
    .get(sgController.read_sg)
    .put(sgController.update_sg)
    .delete(sgController.delete_sg);

  //ZONE ROUTES

  app.route('/zones')
    .get(zoneController.list_all_zones)
    .post(zoneController.create_zone);

  app.route('/zones/:zoneId')
    .get(zoneController.read_zone)
    .put(zoneController.update_zone)
    .delete(zoneController.delete_zone);

  //CAMPUS ROUTES

  app.route('/campus')
    .get(campusController.list_all_campus)
    .post(campusController.create_campus);

  app.route('/campus/:campusId')
    .get(campusController.read_campus)
    .put(campusController.update_campus)
    .delete(campusController.delete_campus);
  
  app.route('/campus/:campusId')
  //BUILDING ROUTES

  app.route('/building')
    .get(buildingController.list_all_buildings)
    .post(buildingController.create_building);

  app.route('/building/:buildingId')
    .get(buildingController.read_building)
    .put(buildingController.update_building)
    .delete(buildingController.delete_building); 

  //STREET PARKING ROUTES

  app.route('/streetparking')
    .get(streetParkingController.list_all_streetparkings)
    .post(streetParkingController.create_streetparking);

  app.route('/streetparking/:streetparkingId')
    .put(streetParkingController.update_streetparking)
    .delete(streetParkingController.delete_streetparking); 

  //STREET PARKING ROUTES

  app.route('/alerts')
    .get(alertController.list_all_alerts)
    .post(alertController.create_alert);

  app.route('/alerts/:alertId')
    .put(alertController.update_alert)
    .delete(alertController.delete_alert); 

   //Device Notification Routes

  app.route('/deviceNotification')
    .get(deviceController.list_all_devices)
    .post(deviceController.create_device);

  app.route('/deviceNotification/:id')
    .get(deviceController.read_device)
    .put(deviceController.update_device);


  //Return the Alerts on a Campus
  app.route('/alerts/:campus')
    .get(alertsService.alertsCampus)
  
  //Return the Devices on a Campus
  app.route('/devices/:campus')
    .get(devicesService.devicesCampus)


  module.exports = app;
