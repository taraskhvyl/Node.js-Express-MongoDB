const express = require("express");
const {getAllTours, createTour, deleteTour, getTour, updateTour, aliasTopTours, getTourStats, getMonthlyPlans } = require("../controllers/tourController");
const authController = require("../controllers/authController");

const router = express.Router();

// router.param('id', checkID);

router
  .route('/top-5-cheap')
  .get(aliasTopTours, getAllTours)

router
  .route('/tour-stats')
  .get(getTourStats)

router
  .route('/monthly-plan/:year')
  .get(getMonthlyPlans)

router
  .route('/')
  .get(authController.protect, getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour
  )

module.exports = router;
