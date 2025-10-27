import { Router } from 'express';
import slugify from 'slugify';

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from './../controllers/userController.js';
import { signUp, login, forgotPassword, resetPassword } from './../controllers/authController.js';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);

router.post(`/${slugify('Forgot Password', { lower: true })}`, forgotPassword);
router.patch(`/${slugify('Reset Password', { lower: true })}/:token`, resetPassword);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
