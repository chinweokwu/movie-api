import mongoose from "mongoose";

const movieSchema = new mongoose.schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  img: {
    type: String
  },
  imgTitle: {
    type: String
  },
  imgThumbnails: {
    type: String
  },
  trailer: {
    type: String
  },
  video: {
    type: String
  },
  year: {
    type: String
  },
  duration: {
    type: Number
  },
  genre: {
    type: String
  },
  isSeries: {
    type: Boolean,
    default: false
  }
},
  { timestamps: true}
)

const MovieModel = mongoose.model("Movie", movieSchema)

export default MovieModel;