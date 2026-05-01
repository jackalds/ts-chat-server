import express from 'express';
import {
  getAllUsers,
  getUsersByUsername,
} from '../../controllers/user-controller.js';

const router = express.Router();

// get all users
// GET /api/users
router.get('/', getAllUsers);

// get users by username
// GET /api/users/:username
router.get('/:username', getUsersByUsername);

export default router;
