const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  nationality: {
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
  const User = mongoose.model('user', UserSchema);
  module.exports = User;