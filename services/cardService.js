const card = require('../models/card')
exports.add = async function (obj) {
    console.log(obj)
    const ins = await card.create({
        openid:obj.openid
    });
    if (!ins) return false;
    return ins.toJSON();
}

exports.getCardList = async function (obj) {
    const ins = await card.findOne({
        openid:obj.openid
    });
    if (!ins) return false;
    return ins.toJSON();
}