import express from 'express';
const router = express.Router();
import authenticateUser from '../middleware/auth.js';
import rateLimiter from 'express-rate-limit';

import { register, login, updateUser } from '../controllers/authController.js';

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP address, pl try after 15 min',
});

router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
router.route('/updateUser').patch(authenticateUser, updateUser);

export default router;
