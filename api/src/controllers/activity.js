const { Activity, Country } = require("../db");

const createActivity = async (countryId, activity) => {
  try {
    const country = await Country.findByPk(countryId);
    if (!country) {
      throw new Error("Country not found");
    }
    const newActivity = await Activity.create(activity);
    await country.addActivity(newActivity);
    return newActivity;
  } catch (error) {
    console.log(error);
  }
};

const getActivities = async (activity) => {
  try {
    const activities = await Activity.findAll({
      include: {
        model: Country,
        attributes: {
          include: ["name"],
        },
        through: {
          attributes: [],
        },
      },
    });
    return activities;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createActivity,
  getActivities,
};
