import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/Users.js';
import config from '../config/config.js';

const { JWT_SECRET } = config;

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({
      token,
      user: { id: user._id, username: user.username },
    });
  } catch (error) {
    next(error);
  }
};
