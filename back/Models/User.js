const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  name:String,
  email:String,
  password:String,
  bio:String,
  address:String,
  image:String,
  isMember:Boolean,
  isVerified:Boolean,
  isLongTermUser:Boolean,
  isCarPoolingRightNow:Boolean
},{timestamps:true});

const User = mongoose.model('User', userSchema);

module.exports = User