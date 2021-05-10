const mongoose = require('mongoose')
const { Schema } = mongoose;

const rideSchema = new Schema({
  from: String,
  to: String,
  start: Date,
  end: Date,
  rider:String,
  carPoolingParticipants:[String]
},{timestamps:true});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride