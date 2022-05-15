const mongoose = require('mongoose');
var AutoIncrement = require("mongoose-sequence")(mongoose);


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userId: {
    type: Number,
    unique: true,
    required: false
  },
});

userSchema.plugin(AutoIncrement, {
  id: "userId_seq",
  inc_field: "userId"
});

module.exports = mongoose.model('users', userSchema);