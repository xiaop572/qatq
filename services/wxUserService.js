const wxUser = require('../models/wxUser');
const moment=require('moment')
exports.addUser = async function (obj) {
    obj.loginTime=moment().utc().unix().toString();
    console.log(obj)
    const ins = await wxUser.create(obj);
    if (!ins) return false;
    return ins.toJSON();
}
exports.getUser = async function (openid) {
    const ins = await wxUser.findOne({
        where: {
            openid: openid
        }
    })
    if (!ins) return false;
    return ins.toJSON()
}