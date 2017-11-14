//UserModel
// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// Configurar un nuevo modelo moongoose and pass it using module.exports
var UserSchema = new Schema({
  idUser:{
    type: String,
    required: true,
    unique: true
  },
  refCompany:{
    type: String,
    //required: true
  },
  phoneNumber:{
    type: [String]
    //required: true
  },
  name:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  userName:{
    type: String
    //required: true,
    //unique: true
  },
  aliasUser:{
    type: String,
    //required: true,
    //unique: true
  },
  password:{
    type: String,
    //required: true
  },
  dateCreated:{
    type: Date,
    default: Date.now
  },
  dateModified:{
    type: Date,
    default: Date.now
  },
  //ID GENERADO
  refUserContact:{
    type: String,
    //required: true
  },
  refDevices:{
    type: [String],
    //required: true
  },
  refVehicles:{
    type: [String],
    //required: true
  },
  status:{
    type: [{
        type: String,
        enum: ['active', 'inactive']
    }],
    default: ['active']
  },
  role:{
    type: String,
    default: 'final_user'
  }
},
{
  collection: 'UserModel'
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
