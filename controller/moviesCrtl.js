import { 
  getMoviesService,
  createMovieService,
  updateMovieService,
  deleteMovieService,
  getMovieService 
} from '../service/movieService.js';

export const createMovie = async (req, res) => {
  try {
    const newMovie = await createMovieService(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateMovies = async (req, res) => {
  const { id } = req.params;

  try {
    const updateMovie = await updateMovieService(id, req.body);

    if (!updateMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updateMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMovie = await deleteMovieService(id);

    if (!deletedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(deletedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const findMovie = await getMovieService(id);

    if (!findMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(findMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getMovies = async (req, res) => {
  try {
    const filterByFields = ["pages", "sort", "limit", "fields"];
    const queryObj = { ...req.query };
    filterByFields.forEach((el) => delete queryObj[el]);

    const { search, sort, fields, limit, pages } = req.query;

    const movies = await getMoviesService(queryObj, search, sort, fields, limit, pages);

    res.status(200).json(movies);
  } catch (error) {
    console.error(error.message);
    if (error.message === "Page not found") {
      res.status(404).json({ message: "Page not found" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  try {
    const movie = await randomMovie(type);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
