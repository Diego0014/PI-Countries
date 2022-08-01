require("dotenv").config();
const { GET_COUNTRIES } = process.env;
const axios = require("axios");
const { Country, Activity } = require("../db.js");
const { Op } = require("sequelize");

const addCountriesToDB = async () => {
  try {
    const { data } = await axios.get(GET_COUNTRIES);
    const countries = data.map((country) => {
      return {
        name: country.name.common,
        id: country.cca3,
        flag: country.flags[1],
        continent: country.region,
        capital: country.capital ? country.capital[0] : "No capital found",
        subregion: country.subregion
          ? country.subregion
          : "No subregion to show",
        area: country.area,
        population: country.population,
      };
    });
    await Country.bulkCreate(countries);
  } catch (error) {
    console.log(error);
  }
};

const getCountries = () => {
  try {
    return Country.findAll({
      include: {
        model: Activity,
        attributes: {
          include: ["name"],
        },
        through: {
          attributes: [],
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getCountryById = async (id) => {
  id = id.toUpperCase();
  try {
    const country = await Country.findOne({
      where: { id },
      include: {
        model: Activity,
        attributes: {
          include: ["name"],
        },
        through: {
          attributes: [],
        },
      },
    });
    return country;
  } catch (error) {
    console.log(error);
  }
};

const getCountryByName = async (name) => {
  try {
    const country = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: Activity,
        attributes: {
          include: ["name"],
        },
        through: {
          attributes: [],
        },
      },
    });
    if (country.length === 0) {
      return { message: "No countries found" };
    } else return country;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCountriesToDB,
  getCountryById,
  getCountryByName,
  getCountries,
};