const express = require("express");
const router = express.Router();
const {
  getCountries,
  getCountryById,
  getCountryByName,
} = require("../controllers/country");

router.get("/", async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const country = await getCountryByName(name);
      res.status(200).json(country);
    } else {
      const countries = await getCountries();
      res.status(200).json(countries);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const country = await getCountryById(id);
    if (country) {
      res.status(200).json(country);
    } else {
      res.status(404).json({ message: "Country not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
