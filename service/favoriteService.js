import FavoriteModel from "../model/favoriteModel.js";
import UserModel from "../model/userModel.js";
import MovieModel from "../model/movieModel.js";

export const addToFavoritesService = async (userId, movieId) => {
  try {
    const favorite = await FavoriteModel.create({ user: userId, movie: movieId });

    await UserModel.findByIdAndUpdate(userId, { $push: { favorites: favorite.id } });
    await MovieModel.findByIdAndUpdate(movieId, { $push: { favoritedBy: favorite.id } });

    return { message: "Movie added to favorites successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};

export const removeFromFavoritesService = async (userId, movieId) => {
  try {
    const favorite = await FavoriteModel.findOneAndRemove({ user: userId, movie: movieId });

    if (!favorite) {
      throw new Error("Movie not found in favorites");
    }

    await UserModel.findByIdAndUpdate(userId, { $pull: { favorites: favorite.id } });
    await MovieModel.findByIdAndUpdate(movieId, { $pull: { favoritedBy: favorite.id } });

    return { message: "Movie removed from favorites successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};