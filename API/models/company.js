// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Configurar un nuevo modelo moongoose and pass it using module.exports
var CompanySchema = new Schema({
  idCompany:{
    type: String,
    //unique: true,
    required: true
  },
  name:{
    type: String,
    unique: true,
    required:true
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
  collection: 'CompanyModel'
});
module.exports = mongoose.model('Company', CompanySchema);
