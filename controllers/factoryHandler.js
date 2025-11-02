import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('Cannot find any document with this ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
