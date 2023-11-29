import MovieModel from "../model/movieModel.js";
import validMongoDbId from "../utils/validMongoDbId.js";

export const createMovieService = async (movieData) => {
  try {
    const newMovie = await MovieModel.create(movieData);
    return newMovie;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const updateMovieService = async (id, movieData) => {
  try {
    validMongoDbId(id);
    const updateMovie = await MovieModel.findOneAndUpdate(
      { _id: id },
      movieData,
      { new: true }
    );
    return updateMovie;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const deleteMovieService = async (id) => {
  try {
    validMongoDbId(id);
    const deletedMovie = await MovieModel.findOneAndDelete({ _id: id });
    return deletedMovie;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const getMovieService = async (id) => {
  try {
    validMongoDbId(id);
    const findMovie = await MovieModel.findById(id);
    return findMovie;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const getMoviesService = async (
  queryObj,
  search,
  sort,
  fields,
  limit,
  pages
) => {
  try {
    let query = MovieModel.find(queryObj);

    if (search) {
      const searchTerms = search.split(" ").join("|");
      query = query.find({ $text: { $search: searchTerms } });
    }

    if (sort) {
      const sortItems = sort.split(",").join(" ");
      query = query.sort(sortItems);
    } else {
      query = query.sort("-createdAt");
    }

    if (fields) {
      const selectedFields = fields.split(",").join(" ");
      query = query.select(selectedFields);
    } else {
      query = query.select("-__v");
    }

    const skip = (pages - 1) * limit;
    query = query.skip(skip).limit(limit);

    if (pages) {
      const count = await MovieModel.countDocuments(queryObj);
      if (skip >= count) {
        throw new Error("Page not found");
      }
    }

    const movies = await query;
    return movies;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const randomMovie = async (type) => {
  try {
    const matchStage = { isSeries: type === "series" };
    const aggregationPipeline = [
      { $match: matchStage },
      { $sample: { size: 1 } },
    ];

    const movie = await MovieModel.aggregate(aggregationPipeline);
    return movie[0];
  } catch (error) {
    throw new Error("Internal server error");
  }
};
