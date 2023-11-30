import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImg: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    required: true,
    default: "user"
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Favorite",
    },
  ],
},
{ timestamps: true  }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;