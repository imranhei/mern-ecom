const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    // minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // minlength: 3
  },
  password: {
    type: String,
    required: true,
    // minlength: 3
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "superadmin"],
  },
});


const User = mongoose.model("User", userSchema);
module.exports = User;