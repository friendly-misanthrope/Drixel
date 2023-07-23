const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AlbumSchema = new Schema({
  albumName: {
    type: String,
    required: [true, "Please enter a name for your new photo album"],
    minLength: [3, "Album name must be at least 3 characters"]
  },
  albumDescription: {
    type: String
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  photos: [{
    type: Schema.Types.ObjectId,
    ref: "Photo"
  }]
})

module.exports = mongoose.model('Album', AlbumSchema)