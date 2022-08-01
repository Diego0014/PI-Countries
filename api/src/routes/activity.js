const express = require("express");
const router = express.Router();
const { createActivity, getActivities } = require("../controllers/activity");

router.post("/", async (req, res, next) => {
  try {
    const { countries } = req.body;
    const { name, difficulty, duration, season } = req.body;
    const activity = { name, difficulty, duration, season };
    if (!countries) {
      throw new Error("Country id is required");
    } else if (!name || !difficulty || !duration || !season) {
      console.log(name, difficulty, duration, season, countries);
      throw new Error("All fields are required");
    } else {
      const newActivity = await countries.map((e) =>
        createActivity(e, activity)
      );
      res.status(201).json({
        message: `Activity ${newActivity.name} created successfully for country ${countries}`,
      });
    }
  } catch (error) {
    res.status(204).json("Activity not created, please complete all fields");
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const activities = await getActivities();
    res.status(200).json(activities);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
