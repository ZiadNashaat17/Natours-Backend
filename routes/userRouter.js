import { Router } from 'express';
import slugify from 'slugify';

import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} from './../controllers/userController.js';
import {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} from './../controllers/authController.js';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);

router.get('/me', protect, getMe, getUser);
router.post('forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);
router.patch('update-password', protect, updatePassword);
router.patch('update-me', protect, updateMe);
router.patch('delete-me', protect, deleteMe);

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
