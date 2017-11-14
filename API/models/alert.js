// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Configurar un nuevo modelo moongoose and pass it using module.exports
var AlertSchema = new Schema({
  id:{
    type: String,
    required: true,
    unique: true
  },
  type:{
    type: String
  },
  category:{
    type: String,
    required: true,
  },
  subCategory:{
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  address:{
    type: String
  },
  dateObserved:{
    type: String,
    required: true
  },
  validFrom:{
    type: String
  },
  validTo:{
    type: String
  },
  description:{
    type: String
  },
  alertSource:{
    type: String,
    required: true
  },
  data:{
    type: String
  },
  severity:{
    type: String,
    required: true
  }
},
{
  collection: 'AlertModel'
});

module.exports = mongoose.model('Alert', AlertSchema);
