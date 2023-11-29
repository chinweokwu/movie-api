import {
  getUsersService,
  getUserService,
  deleteUserService,
  updateUserService,
  userStatsService,
} from '../service/userService.js';

export const getUsers = async (req, res) => {
  try {
    const users = await getUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserService(id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUserService(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error.message);
    if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({ message: "Server error. Unable to delete the user." });
    }
  }
};

export const updateUser = async (req, res) => {
  const { _id } = req.user;

  try {
    const updatedUser = await updateUserService(_id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error.message);
    if (error.message === "Invalid request. Provide at least one valid field to update") {
      res.status(400).json({ message: "Invalid request. Provide at least one valid field to update." });
    } else if (error.message === "User not found") {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const userStats = async (req, res) => {
  try {
    const data = await userStatsService();
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
