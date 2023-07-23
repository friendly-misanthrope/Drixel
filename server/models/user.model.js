const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')
const Album = require('./album.model')

const UserSchema = new Schema({
  firstName : {
    type: String,
    required: [true, "First name is required"],
    minLength: [2, "First name must be at least 2 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minLength: [2, "Last name must be at least 2 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [isEmail, "Please enter a valid email address"]
  },
  password: {
    type:String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"]
  },
  albums: [{
    type: Schema.Types.ObjectId,
    ref: "Album"
  }]

},{ timestamps: true })

module.exports = mongoose.model('User', UserSchema)