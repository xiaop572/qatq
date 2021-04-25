const prize = require('../models/prize')
exports.getPrizeList = async function () {
    const ins = await prize.findAll({
        where: {
            openid: null
        }
    })
    console.log(ins)
    if (!ins || ins.length == 0) return false;
    return ins
}
exports.updatePrize = async function (p,openid) {
    const ins = await prize.findOne({
        where: {
            id: p.id
        }
    })
    ins.openid=openid;
    ins.save()
    return ins.toJSON()
}
exports.getPrize=async function(obj){
    const ins = await prize.findOne({
        where: {
            openid: obj.openid
        }
    })
    if (!ins) return false;
    return ins.toJSON()
    
}
exports.updatePrizeInfo = async function (p,obj) {
    console.log(obj)
    const ins = await prize.findOne({
        where: {
            id: p.id
        }
    })
    ins.name=obj.name;
    ins.phone=obj.phone;
    ins.cardId=obj.cardId;
    ins.save()
    return ins.toJSON()
}
exports.updatePrizeInfo2 = async function (p,obj) {
    console.log(obj)
    const ins = await prize.findOne({
        where: {
            id: p.id
        }
    })
    ins.phone=obj.phone;
    ins.save()
    return ins.toJSON()
}