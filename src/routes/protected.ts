import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/users', auth, (req, res) => {
  console.log('req', req);
  res.status(200);
  // res.json({
  // 	message: `Welcome, user with ID ${req.user.id}`,
  // });
});

export default router;
