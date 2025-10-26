import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from './../controllers/userController.js';
import { signUp, login } from './../controllers/authController.js';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
