import { Router } from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  setTourUserId,
  updateReview,
} from '../controllers/reviewController.js';

const router = Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllReviews).post(restrictTo('user'), setTourUserId, createReview);
router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('user', 'admin'), updateReview)
  .delete(restrictTo('user', 'admin'), deleteReview);

export default router;
