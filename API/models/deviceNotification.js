// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Configurar un nuevo modelo moongoose and pass it using module.exports
var deviceSchema = new Schema({
    fcmToken:{
        type: String,
        unique: true,
        required: true
    },
    refDevice:{
        type: String,
        unique: true,
        required: true
    }
},
{
  collection: 'deviceModel'
});


  
module.exports = mongoose.model('Device', deviceSchema);
