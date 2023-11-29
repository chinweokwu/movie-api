import mongoose from "mongoose";

const listSchema = new mongoose.schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String
  },
  genre: {
    type: String
  },
  content: {
    type: Array
  }
}, {timestamps: true})

const ListModel = mongoose.model("List", listSchema)

export default ListModel