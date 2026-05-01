import User from '../models/Users.js';

// Read user by username
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUsersByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;
    const users = await User.find(
      { username: { $regex: username, $options: 'i' } },
      { _id: 1, username: 1 },
    );
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
