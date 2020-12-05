const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "statistics", {
        visitors: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);