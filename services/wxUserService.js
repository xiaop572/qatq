const wxUser = require('../models/wxUser')
exports.addUser = async function (obj) {
    const ins = await wxUser.create(obj);
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