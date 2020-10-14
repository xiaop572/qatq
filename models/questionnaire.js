const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "question", {
        openid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);