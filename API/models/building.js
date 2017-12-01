//BUILDING MODEL
// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Configurar un nuevo modelo moongoose and pass it using module.exports
var BuildingSchema = new Schema({
    type:{
        type: String,
        required: true,
        default: "Building"
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
    dateCreated:{
        type: Date,
        default: Date.now
    },
    dateModified:{
        type: Date,
        default: Date.now
    },
    status:{
        type: Boolean,
        default: true
    }   
},
{
  collection: 'BuildingModel'
});

module.exports = mongoose.model('Building', BuildingSchema);