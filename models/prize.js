const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "prize", {
        prizeName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        openid:{
            type: DataTypes.STRING,
            allowNull: true
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        cardId:{
            type: DataTypes.STRING,
            allowNull: true
        },
        type:{
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);