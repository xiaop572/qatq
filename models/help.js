const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "help", {
        openid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        helpid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        helpTime: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);