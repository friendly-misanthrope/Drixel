const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PhotoSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please give your new photo a title"],
    minLength: [3, "Photo title must be at least 3 characters"]
  },
  url: {
    type: String
  },
  containingAlbum: {
    type: Schema.Types.ObjectId,
    ref: "Album"
  }
})

module.exports = mongoose.model('Photo', PhotoSchema)