import { Router } from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import { createReview, deleteReview, getAllReviews } from '../controllers/reviewController.js';

const router = Router({ mergeParams: true });

router.route('/').get(getAllReviews).post(protect, restrictTo('user'), createReview);
router.route('/:id').delete(deleteReview);

export default router;
