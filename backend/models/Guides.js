const mongoose = require("mongoose");
const { Schema } = mongoose;

const GuideSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  licenseno: {
    type: String,
    // required: true,
    unique: true,
  },
  experience: {
    type: String,
    // required: true,
  },
 
  gender: {
    type: String,
    // required: true,
  },
  mobileno: {
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
const Guides = mongoose.model("guides", GuideSchema);
module.exports = Guides;
