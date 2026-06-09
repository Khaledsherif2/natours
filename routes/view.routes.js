const express = require('express');
const viewsController = require('../controllers/view.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.use(viewsController.alert);

router.get('/me', authController.protect, viewsController.getAccount);
router.get('/my-tours', authController.protect, viewsController.getMyTours);
router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData,
);

router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.use(authController.isLoggedIn);

router.get('/tour/:slug', viewsController.getTour);
router.get('/signup', viewsController.getSignupForm);
router.get('/login', viewsController.getLoginForm);

module.exports = router;
