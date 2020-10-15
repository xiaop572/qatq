const express = require("express");
const router = express.Router();
const request = require('request');
const cardService = require('../../services/cardService')
const wxUserSer = require('../../services/wxUserService')
const moment = require('moment')
router.post('/getCardList', async (req, res) => {
    console.log(req.body.openid)
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "openid不存在"
        })
        return false;
    }
    const ins = await cardService.getCardList(req.body);
    delete ins.id;
    delete ins.openid;
    res.send({
        code: '200',
        data: ins
    });
})
//抽取卡片
router.post('/abstractCard', async (req, res) => {
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "openid不存在"
        })
        return false;
    }
    const ran = Math.ceil(Math.random() * 850 / 100);
    await cardService.abstractCard(req.body, ran);
    res.send({
        code: '200',
        data: {
            num:ran
        }
    })
})
//首次进去获取卡片次数
router.post('/firstCardNumber', async (req, res) => {
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "openid不存在"
        })
        return false;
    }
    const nowTime = moment().startOf('day').utc().format('X');
    const ins = await wxUserSer.getFirstCardNumber(req.body, nowTime);
    res.send({
        code: 200,
        data: {
            smokeCardNumber: ins.smokeCardNumber
        }
    })
})
module.exports = router;