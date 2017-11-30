//UserModel
// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// Configurar un nuevo modelo moongoose and pass it using module.exports
var UserSchema = new Schema({
  id:{
    type: String,
    required: true,
    unique: true
  },
  type:{
    type: String,
    required: true,
    default: "User"
  },
  refCompany:{
    type: String,
    //required: true
  },
  phoneNumber:{
    type: [String]
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
  },
  aliasUser:{
    type: String,
  },
  password:{
    type: String,
  },
  dateCreated:{
    type: Date,
    default: Date.now
  },
  dateModified:{
    type: Date,
    default: Date.now
  },
  refUserContact:{
    type: String,
  },
  refDevices:{
    type: [String],
  },
  refVehicles:{
    type: [String],
  },
  status:{
    type: Boolean,
    default: true
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
