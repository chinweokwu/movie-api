import {
  addToFavoritesService,
  removeFromFavoritesService,
} from "../service/favoriteService";

export const addToFavorites = async (req, res) => {
  const userId = req.user.id;
  const movieId = req.params.movieId;

  try {
    const result = await addToFavoritesService(userId, movieId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromFavorites = async (req, res) => {
  const userId = req.user.id;
  const movieId = req.params.movieId;

  try {
    const result = await removeFromFavoritesService(userId, movieId);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
