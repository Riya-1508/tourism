const mongoose = require("mongoose");
const { Schema } = mongoose;

const HotelSchema = new Schema({
  hotelname: {
    type: String,
    // required: true,
  },
  ownername: {
    type: String,
    // required: true,
  },
  hoteladdress: {
    type: String,
    // required: true,
  },
 
 gstno: {
    type: String,
    // required: true,
    unique: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true,
  },

  password: {
    type: String,
    // required: true,
  },
  confirmpassword: {
    type: String,
    // required: true,
  },
});
const Hotels = mongoose.model("hotels", HotelSchema);
module.exports = Hotels;
