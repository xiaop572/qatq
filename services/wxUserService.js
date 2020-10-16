const wxUser = require('../models/wxUser');
const moment = require('moment')
exports.addUser = async function (obj) {
    obj.loginTime = moment().utc().unix().toString();
    obj.smokeCardNumber = 3;
    const ins = await wxUser.create(obj);
    if (!ins) return false;
    return ins.toJSON();
}
exports.getUser = async function (obj) {
    const ins = await wxUser.findOne({
        where: {
            openid: obj.openid
        }
    })
    if (!ins) return false;
    return ins.toJSON()
}
exports.getFirstCardNumber = async function (obj, nowTime) {
    const ins = await wxUser.findOne({
        where: {
            openid: obj.openid
        }
    })
    const insJson = ins.toJSON()
    if (nowTime > insJson.loginTime) {
        ins.loginTime = nowTime;
        ins.smokeCardNumber += 3;
    }
    await ins.save();
    if (!ins) return false;
    return ins.toJSON()
}
exports.consumeCardNum = async function (obj) {
    const ins = await wxUser.findOne({
        where: {
            openid: obj.openid
        }
    })
    const insJson = ins.toJSON();
    if (insJson.smokeCardNumber > 0) {
        ins.smokeCardNumber--;
        ins.save();
        return ins.toJSON();
    } else {
        return false;
    }
}
exports.getUserCount = async function (obj) {
    const ins = await wxUser.count();
    return ins;
}