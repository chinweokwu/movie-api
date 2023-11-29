import ListModel from '../model/listModel.js';
import { 
  createListService,
  deleteListService
} from '../service/movieService.js';

export const createList = async (req, res) => {
  try {
    const newList = await createListService(req.body);
    res.status(201).json(newList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteList = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedList = await deleteListService(id);

    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(deletedList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getList = async (req, res) => {
  try {
    const { type, genre, page, limit } = req.query;

    const list = await getListItems(type, genre, page, limit);

    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};