// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Configurar un nuevo modelo moongoose and pass it using module.exports
var AdminSchema = new Schema({
    idAdministrator:{
        type: String,
        unique: true,
        required: true
    },
    refCompany:{
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required:true
    },
    lastName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
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
    }
},
{
  collection: 'AdministratorModel'
});

AdminSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
  
AdminSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
  
module.exports = mongoose.model('Admin', AdminSchema);
