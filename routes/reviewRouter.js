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

router.route('/').get(getAllReviews).post(protect, restrictTo('user'), setTourUserId, createReview);
router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

export default router;
