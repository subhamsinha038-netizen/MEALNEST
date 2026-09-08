const express = require("express");
const router = express.Router();
const {
  getRestaurants,
  getMenuByRestaurant,
} = require("../controllers/restaurantController");

router.get("/", getRestaurants);
router.get("/menu/:id", getMenuByRestaurant);

module.exports = router;``