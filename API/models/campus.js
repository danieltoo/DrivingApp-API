// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Configurar un nuevo modelo moongoose and pass it using module.exports
var CampusSchema = new Schema({
    type:{
        type: String,
        required:true,
        default: "Campus"
    },
    refOwner:{
        type: String,
        //required: true
    },
    name:{
        type: String,
        required:true,
        unique: true
    },
    address:{
        type: String,
        //required:true,
        //unique: true
    },
    category:{
        type: [String]
    },
    pointMap:{
        type: [Schema.Types.Mixed],
       // required: true,
       // unique: true
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
  collection: 'CampusModel'
});
module.exports = mongoose.model('Campus', CampusSchema);
