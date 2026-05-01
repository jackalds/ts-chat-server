import express from 'express';
import { login, signup } from '../../controllers/auth-controller.js';

const router = express.Router();

// SIGNUP
// POST /api/auth/signup
router.post('/signup', signup);

// LOGIN
// POST /api/auth/login
router.post('/login', login);

export default router;
