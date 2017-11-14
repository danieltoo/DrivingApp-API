//STREET PARKING MODEL
// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Configurar un nuevo modelo moongoose and pass it using module.exports
var StreetParkingSchema = new Schema({
    /*idStreetParking:{
        type: String,
        unique: true,
        required: true
    },*/
    type:{
        type: String,
        default: "StreetParking"
    },
    refZone:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required:true,
        unique: true
    },
    location:{
        type: [Schema.Types.Mixed],
        required: true,
        unique: true
    },
    description:{
        type: String
    },
    category:{
        type: String,
        default: "private"
    },
    parkingMode:{
        type: [{
            type: String,
            enum: ['perpendicularParking', 'parallelParking', 'echelonParking']
          }],
        default: ['parallelParking']
    },
    totalSpotNumber:{
        type: Number
    },
    dateCreated:{
        type: Date,
        default: Date.now
    },
    dateModified:{
        type: Date,
        default: Date.now
    },
    status:{
        type: [{
          type: String,
          enum: ['active', 'inactive']
        }],
        default: ['active']
    },
},
{
  collection: 'StreetParkingModel'
});

module.exports = mongoose.model('StreetParking', StreetParkingSchema);