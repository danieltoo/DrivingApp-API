//UsersContextModel
// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Configurar un nuevo modelo moongoose and pass it using module.exports
var UsersContextSchema = new Schema({
  /*idUserContext:{
    type: String,
    required: true,
    unique: true
  },*/
  type:{
    type: String,
    required: true,
    default: "UsersContext"
  },
  refUser:{
    type: String,
    //required: true
  },
  refCampus:{
    type: String,
    //required: true
  },
  refZone:{
    type: String,
    //required: true
  },
  refDevice:{
    type: String,
    //required: true
  },
  refVehicle:{
    type: String,
    //required: true
  },
  isActive:{
    type: Boolean,
    default: true
  },
  dateTimeContext:{
    type: Date,
    default: Date.now
  },
  location:{
    type: [Schema.Types.Mixed],
    required: true,
  }
},
{
  collection: 'UsersContextModel'
});

module.exports = mongoose.model('UsersContext', UsersContextSchema);