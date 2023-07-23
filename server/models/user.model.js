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

// * Mongoose Middleware
// Set virtual confirmPassword field to value in form input
UserSchema.virtual('confirmPassword')
  .get(() => this.confirmPassword)
  .set(val => this.confirmPassword = val)

// Validate that passwords match
UserSchema.pre('validate', (next) => {
  if (this.password !== this.confirmPassword){
    this.invalidate('confirmPassword', 'Passwords must match')
  }
  next()
})

UserSchema.pre('save', (next) => {
  bcrypt.hash(this.password, 10)
    .then((hash) => {
      this.password = hash
      next()
    })
})

module.exports = mongoose.model('User', UserSchema)