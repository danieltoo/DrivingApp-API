// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Configurar un nuevo modelo moongoose and pass it using module.exports
var ZoneSchema = new Schema({
    /*idZone:{
        type: String,
        //unique: true,
        //required: true
    },*/
    type:{
        type: String,
        required:true,
        default: "Zone"
    },
    refCampus:{
        type: String,
        //required: true
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
  collection: 'ZoneModel'
});
module.exports = mongoose.model('Zone', ZoneSchema);