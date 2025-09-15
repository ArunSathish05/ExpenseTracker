
const   mongoose  = require("mongoose");

const USER = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Invalid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password required"],
  },
  role:{
    type:String,
    default:'USER',
  },
  ispremium:{
    type:Boolean,
    default:false,
  },
  createdAt:{
    type:Date,
    default:new Date()
  }
});

module.exports =mongoose.model('user',USER)