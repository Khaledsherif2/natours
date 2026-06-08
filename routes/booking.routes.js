const express = require('express');
const bookingController = require('../controllers/booking.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router({ mergeParams: true });

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession,
);

router.use(authController.protect);

router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
