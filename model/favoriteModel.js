import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
});

const FavoriteModel = mongoose.model("Favorite", favoriteSchema);

export default FavoriteModel;