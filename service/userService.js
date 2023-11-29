import UserModel from "../model/userModel.js";

export const getUsersService = async () => {
  try {
    const users = await UserModel.find({}, '-password');
    return users;
  } catch (error) {
    throw new Error("Unable to fetch users.");
  }
};

export const getUserService = async (id) => {
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Unable to fetch the user.");
  }
};

export const deleteUserService = async (id) => {
  try {
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Unable to delete the user.");
  }
};

export const updateUserService = async (userId, userData) => {
  try {
    if (!userData || (!userData.username && !userData.email)) {
      throw new Error("Invalid request. Provide at least one valid field to update.");
    }

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        username: userData.username,
        email: userData.email,
      },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error("Unable to update the user.");
  }
};

export const userStatsService = async () => {
  try {
    const data = await UserModel.aggregate([
      {
        $project: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return data;
  } catch (error) {
    throw new Error("Unable to retrieve user statistics.");
  }
};
