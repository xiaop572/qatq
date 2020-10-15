const sequelize = require("./db");
const {
    DataTypes
} = require("sequelize");
module.exports = sequelize.define(
    "card",{
        openid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        anquanCard: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        fanweiCard: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        kexueCard:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        jiaoguiCard:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        fanzhaCard:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        shigongCard:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        shipingCard:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        fenleiCard:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        zhianCard:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        successCard:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        }
    }, {
        createdAt: false,
        updatedAt: false,
    }
);