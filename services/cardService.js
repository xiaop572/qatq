const card = require('../models/card')
exports.add = async function (obj) {
    console.log(obj)
    const ins = await card.create({
        openid: obj.openid
    });
    if (!ins) return false;
    return ins.toJSON();
}

exports.getCardList = async function (obj) {
    const ins = await card.findOne({
        where: {
            openid: obj.openid
        }
    });
    if (!ins) return false;
    return ins.toJSON();
}
exports.getUserLoginTime = async function (obj) {
    const ins = await card.findOne({
        where: {
            openid: obj.openid
        }
    });
    if (!ins) return false;
    return ins.toJSON();
}
exports.abstractCard = async function (obj, num) {
    const ins = await card.findOne({
        where: {
            openid: obj.openid
        }
    });
    switch (num) {
        case 1:
            ins.anquanCard += 1;
            break;
        case 2:
            ins.fanweiCard += 1;
            break;
        case 3:
            ins.kexueCard += 1;
            break;
        case 4:
            ins.jiaoguiCard += 1;
            break;
        case 5:
            ins.fanzhaCard += 1;
            break;
        case 6:
            ins.shigongCard += 1;
            break;
        case 7:
            ins.shipingCard += 1;
            break;
        case 8:
            ins.fenleiCard += 1;
            break;
        case 9:
            ins.zhianCard += 1;
            break;
    }
    const insJson = ins.toJSON();
    delete insJson.id;
    delete insJson.openid;
    delete insJson.successCard;
    let state = true;
    for (let item in insJson) {
        if (insJson[item] === 0) {
            state = false;
        }
    }
    if (state) {
        for (let item in insJson) {
            ins[item] = 0;
        }
        ins.successCard = 1;
    }
    ins.save();
    return ins.toJSON()
}