import { Router } from 'express';
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
  resizeUserPhoto,
} from './../controllers/userController.js';
import {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
} from './../controllers/authController.js';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.use(protect);
router.get('/me', getMe, getUser);
router.patch('/update-password', updatePassword);
router.patch('/update-me', uploadUserPhoto, resizeUserPhoto, updateMe);
router.patch('/delete-me', deleteMe);

router.use(restrictTo('admin'));

router.route('/').get(getAllUsers);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
