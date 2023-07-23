const User = require('../models/user.model')
const secret_key = process.env.SECRET_KEY
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

////////// * BEGIN AUTHENTICATION * //////////
module.exports.registerUser = async(req, res) => {
  // Check if email entered by user already exists in DB
  try{
    const potentialUser = await User.findOne({
      email: req.body.email
    })
    // if email already exists in DB, send message asking user to login instead
    if (potentialUser) {
      res.status(418).json({error: {
        errors: {
          email: {
            message: "This email already has an account associated with it. Please login or choose another email."
          }
        }
      }})
    } else {
      const newUser = await User.create(req.body)

      // generate user token and store the id/email of the newly registered user
      const userToken = jwt.sign({_id: newUser._id}, secret_key, {expiresIn: '2h'})

      // sending user and cookie back to client. Cookie arguments are keyName & value to assign it, http only allowed,
      // maxAge is cookie expiration in ms.
      res.status(201).cookie('userToken', userToken, {httpOnly: true, secure: true, sameSite: 'strict', maxAge: 2 * 60 * 60 * 1000}).json(newUser)
    }
  }
  catch(err){
    res.status(400).json({error: err})
  }
}