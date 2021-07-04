const express = require("express");
const router = express.Router();
const request = require('request');
const questionService = require('../../services/questionService')
const wxUserService = require('../../services/wxUserService')
const statisticsService = require('../../services/statisticsService')
const moment = require('moment')
router.post('/add', async (req, res) => {
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "openid不存在"
        })
        return false;
    }
    let answerState = true;
    console.log(req.body)
    req.body.answer.forEach(item => {
        switch (item.serial) {
            case 1:
            case 2:
            case 3:
            case 4:
                if (item.value !== '安全') {
                    answerState = false;
                }
                break;
            case 5:
                if (!item.value.indexOf('无') < 0) {
                    answerState = false;
                }
                break;
            case 6:
                if (item.value !== '参与过') {
                    answerState = false;
                }
                break;
            case 7:
                if (item.value.length == 1 && item.value[0] === '不知道') {
                    answerState = false;
                }
                break;
            case 8:
                if (item.value.length == 1 && item.value[0] === '都不知道') {
                    answerState = false;
                }
                break
            case 9:
                if (item.value !== '很满意') {
                    answerState = false;
                }
                break
            case 10:
                if (item.value !== '6月26日') {
                    answerState = false;
                }
                break
            case 11:
            case 12:
                if (item.value.length == 1 && item.value[0] === '不了解') {
                    answerState = false;
                }
                break;
            case 13:
            case 14:
                if (item.value !== '满意') {
                    answerState = false;
                }
                break;
        }
    })
    if (answerState) {
        await wxUserService.setFillArch(req.body)
    }
    await wxUserService.updateAnswerTime(req.body);
    const ins = await questionService.addQuestion(req.body);
    if (ins) {
        res.send({
            code: '200',
            msg: '提交成功'
        })
    } else {
        res.send({
            code: '400',
            msg: '提交失败'
        })
    }
})
// router.post('/get', async (req, res) => {
//     if (!req.body.openid) {
//         res.send({
//             code: '500',
//             msg: "openid不存在"
//         })
//         return false;
//     }
//     const ins = await wxUserService.getUser(req.body);
//     if (ins.fillArch) {
//         res.send({
//             code: '400',
//             msg: "已经提交过问卷"
//         })
//     } else {
//         res.send({
//             code: '200',
//             msg: "还未提交"
//         })
//     }
// })
router.post('/get', async (req, res) => {
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "openid不存在"
        })
        return false;
    }
    const nowTime = moment().startOf('day').utc().format('X');
    console.log(nowTime)
    const ins = await wxUserService.getUser(req.body);
    await statisticsService.addCount();
    console.log(ins.answerTime,"时间");
    if (!ins.answerTime || ins.answerTime < nowTime) {
        res.send({
            code: '200',
            msg: "还未提交"
        })
    } else {
        res.send({
            code: '400',
            msg: "已经提交过问卷"
        })
    }
    // if (ins.fillArch) {
    //     res.send({
    //         code: '400',
    //         msg: "已经提交过问卷"
    //     })
    // } else {
    //     res.send({
    //         code: '200',
    //         msg: "还未提交"
    //     })
    // }
})
module.exports = router;