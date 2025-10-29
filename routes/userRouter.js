import { Router } from 'express';
import slugify from 'slugify';

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
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

router.post(`/${slugify('Forgot Password', { lower: true })}`, forgotPassword);
router.patch(`/${slugify('Reset Password', { lower: true })}/:token`, resetPassword);
router.patch(`/${slugify('Update Password', { lower: true })}`, protect, updatePassword);
router.patch(`/${slugify('Update Me', { lower: true })}`, protect, updateMe);
router.patch(`/${slugify('Delete Me', { lower: true })}`, protect, deleteMe);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
