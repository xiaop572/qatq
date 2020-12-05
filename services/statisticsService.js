const statistics = require('../models/statistics')
exports.addCount = async function () {
    const ins = await statistics.findOne({
        where: {
            id:1
        }
    })
    console.log(ins.visitors)
    ins.visitors += 1;
    ins.save()
}