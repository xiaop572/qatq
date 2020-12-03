// 同步所有模型
require("./help");
require("./wining");
require("./wxUser");
require("./questionnaire");
require("./card");
require("./prize");
const sequelize = require("./db");
sequelize.sync({ alter: true }).then(() => {
  console.log("所有模型同步完成");
});
