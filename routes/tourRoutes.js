const express = require("express");
const {getAllTours, createTour, deleteTour, getTour, updateTour} = require("../controllers/tourController");

const router = express.Router();

// router.param('id', checkID);

router
  .route('/')
  .get(getAllTours)
  .post(createTour)

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

module.exports = router;
