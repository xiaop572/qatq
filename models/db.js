const {
  Sequelize
} = require("sequelize");
const sequelize = new Sequelize("mysql", "root", "xiaop1314", {
  host: "123.56.79.153",
  dialect: "mysql",
  logging: (msg) => {
    console.log(msg, "登录成功")
  },
});
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})()
module.exports = sequelize;