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
        },
        loginTime:{
            type:DataTypes.STRING,
            allowNull:false
        },
        smokeCardNumber:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0
        },
        fillArch:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);