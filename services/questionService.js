const questionnaire = require('../models/questionnaire')
exports.addQuestion = async function (obj) {
    obj.answer=JSON.stringify(obj.answer);
    const ins = await questionnaire.create(obj);
    if (!ins) return false;
    return ins.toJSON();
}
exports.getQuestion = async function (obj) {
    const ins = await questionnaire.findOne({
        where: {
            openid: obj.openid
        }
    })
    if (!ins) return false;
    return ins.toJSON()
}