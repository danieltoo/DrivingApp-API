//UserContactModel
// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Configurar un nuevo modelo moongoose and pass it using module.exports
var UserContactSchema = new Schema({
  idContact:{
    type: String,
    required: true,
    unique: true
  },  
  refUser:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: [String],
    required: true
  },
  dateCreated:{
    type: Date,
    default: Date.now
  },
  dateModified:{
    type: Date,
    default: Date.now
  }
},
{
  collection: 'UserContactModel'
});

module.exports = mongoose.model('UserContact', UserContactSchema);