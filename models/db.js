const { Sequelize } = require("sequelize");
const { sqlLogger } = require("../logger");
const sequelize = new Sequelize("myschooldb", "root", "ybybdwyJ42.", {
  host: "localhost",
  dialect: "mysql",
  logging: (msg) => {
      console.log(msg)
  },
});

module.exports = sequelize;
