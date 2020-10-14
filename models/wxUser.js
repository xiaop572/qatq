const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "wxUser", {
        openid: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false
        },
        headimgurl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);