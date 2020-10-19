const wining = require('../models/wining')
exports.getWining = async function (obj, prize) {
    const ins = await wining.findOne({
        where: {
            openid: obj.openid
        }
    })
    if (!ins) {
        await wining.create({
            openid: obj.openid,
            prize: prize
        })
        const newins = await wining.findOne({
            where: {
                openid: obj.openid
            }
        })
        return newins.toJSON();
    };

    return ins.toJSON();
}