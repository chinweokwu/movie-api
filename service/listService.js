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

