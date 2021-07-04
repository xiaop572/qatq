const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "wining", {
        openid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prize: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);