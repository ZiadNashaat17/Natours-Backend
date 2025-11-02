import { Router } from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  createReview,
  deleteReview,
  getAllReviews,
  setTourUserId,
  updateReview,
} from '../controllers/reviewController.js';

const router = Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(protect, restrictTo('user'), setTourUserId, createReview);
router.route('/:id').patch(updateReview).delete(deleteReview);

export default router;
