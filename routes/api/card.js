const express = require("express");
const router = express.Router();
const request = require('request');
const cardService = require('../../services/cardService')
const wxUserSer = require('../../services/wxUserService')
const moment = require('moment')
const config = require('../../config')
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
    console.log(config)
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "openid不存在"
        })
        return false;
    }
    const consumeState = await wxUserSer.consumeCardNum(req.body);
    if (!consumeState) {
        res.send({
            code: '400',
            msg: '没有抽卡次数'
        })
        return;
    }
    let ran;
    if (moment().unix() > moment(config.ProbaTime).unix()) {
        const ins = await cardService.getCardList(req.body);
        let i = 1;
        let drawArr = []
        delete ins.id;
        delete ins.openid;
        delete ins.successCard;
        for (let item in ins) {
            if (ins[item] === 0) {
                for (let j = 0; j < 5; j++) {
                    drawArr.push(i)
                }
            } else {
                // drawArr.push(i)
            }
            i++;
        }
        let length = drawArr.length;
        let num = Math.floor(Math.random() * length);
        ran = drawArr[num];
    } else {
        ran = Math.ceil(Math.random() * 706 / 100);
        if (ran > 700 && ran < 703) {
            ran = 8;
        } else if (ran > 703) {
            ran = 9
        }
    }
    await cardService.abstractCard(req.body, ran);
    res.send({
        code: '200',
        data: {
            num: ran,
            smokeCardNumber: consumeState.smokeCardNumber
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