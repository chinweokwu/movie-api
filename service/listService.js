import ListModel from "../model/listModel.js";

export const createListService = async (listData) => {
  try {
    const newList = await ListModel.create(listData);
    return newList;
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const deleteListService = async (id) => {
  try {
    validMongoDbId(id);
    const deletedList = await ListModel.findOneAndDelete({ _id: id });
    return deletedList;
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

export const getListItems = async (type, genre, page = 1, limit = 10) => {
  try {
    const sampleStage = { $sample: { size: Number(limit) } };
    const matchStage = {};

    if (type) {
      matchStage.type = type;
    }

    if (genre) {
      matchStage.genre = genre;
    }

    const skipStage = { $skip: (Number(page) - 1) * Number(limit) };

    const aggregationPipeline = [
      sampleStage,
      ...(Object.keys(matchStage).length ? [{ $match: matchStage }] : []),
      skipStage,
    ];

    const list = await ListModel.aggregate(aggregationPipeline);

    return list;
  } catch (error) {
    console.error(error);
    throw new Error("Internal server error");
  }
};
