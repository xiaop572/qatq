// 同步所有模型
require("./wxUser");
require("./questionnaire");
const sequelize = require("./db");
sequelize.sync({ alter: true }).then(() => {
  console.log("所有模型同步完成");
});
