const help = require('../models/help');
const moment = require('moment')
const wxUser = require('../models/wxUser');
exports.isHelp = async function (obj) {
    const ins = await help.findOne({
        where: {
            openid: obj.openid,
            helpid: obj.superior
        }
    })
    if (ins) {
        const insJson = ins.toJSON()
        const nowTime = moment().startOf('day').utc().format('X');
        if (nowTime > insJson.helpTime) {
            return true;
        }
        return false;
    }
    return true;
}
exports.help = async function (obj) {
    const nowTime = moment().startOf('day').utc().format('X');
    const ins = await help.findOne({
        where: {
            openid: obj.openid,
            helpid: obj.superior
        }
    })
    const userIns = await wxUser.findOne({
        where: {
            openid: obj.superior
        }
    })
    console.log(userIns,"UserIns")
    userIns.smokeCardNumber += 1;
    userIns.save()
    if (!ins) {
        await help.create({
            openid: obj.openid,
            helpid: obj.superior,
            helpTime: nowTime
        })
        return true;
    }
    const insJson = ins.toJSON();
    if (insJson.helpTime < nowTime) {
        ins.helpTime = nowTime;
        ins.save();
        return true;
    }
}