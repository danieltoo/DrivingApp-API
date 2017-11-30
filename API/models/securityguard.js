// Instancia de  mongoose and mongoose.Schema
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
// Configurar un nuevo modelo moongoose and pass it using module.exports
var SecurityGuardSchema = new Schema({
  id:{
    type: String,
    required: true,
    unique: true
  },
  type:{
    type: String,
    required: true,
    default: "SecurityGuard"
  },
  refCompany:{
    type: String,
    //required: true
  },
  refCampus:{
    type: String,
    //required: true,
  },
  refZone:{
    type: String,
    //required: true
  },
  phoneNumber:{
    type: [String]
    //required: true,
    //unique: true
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
  password:{
    type: String,
    //required: true
  },
  refDevices:{
    type: [String]
    //required: true
  },
  checkInTime:{
    type:String,
    required: true
  },
  departureTime:{
    type: String,
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
    type: Boolean,
    default: true
  }
},
{
  collection: 'SecurityGuardModel'
});

SecurityGuardSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

SecurityGuardSchema.methods.validPassword = function(password) {
return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('SecurityGuard', SecurityGuardSchema);
