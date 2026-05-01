import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/users', auth, (req, res) => {
  res.status(200);
});

export default router;
