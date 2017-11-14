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
    type: Schema.Types.Mixed,
    required: true,
  },
  subCategory:{
    type: Schema.Types.Mixed,
    required: true
  },
  location:{
    type: Schema.Types.Mixed,
    required: true
  },
  address:{
    type: Schema.Types.Mixed
  },
  dateObserved:{
    type: Schema.Types.Mixed,
    required: true
  },
  validFrom:{
    type: Schema.Types.Mixed
  },
  validTo:{
    type: Schema.Types.Mixed
  },
  description:{
    type: Schema.Types.Mixed
  },
  alertSource:{
    type: Schema.Types.Mixed,
    required: true
  },
  data:{
    type: Schema.Types.Mixed
  },
  severity:{
    type: Schema.Types.Mixed,
    required: true
  }
},
{
  collection: 'AlertModel'
});

module.exports = mongoose.model('Alert', AlertSchema);
