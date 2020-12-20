const express = require("express");
const router = express.Router();
const request = require('request');
const cardService = require('../../services/cardService')
const wxUserSer = require('../../services/wxUserService')
const helpService = require('../../services/helpService')
const winingService = require('../../services/winingService')
const prizeService = require('../../services/prizeService')
const moment = require('moment')
const config = require('../../config')
router.post('/getWining', async (req, res) => {
    if (moment().unix() < moment(config.gameEnd).unix()) {
        res.send({
            code: '500',
            msg: "活动还未结束"
        })
        return false;
    }
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "参数出错"
        })
        return false;
    }
    let ins = await prizeService.getPrize(req.body);
    if (!ins) {
        const card = await cardService.getCardList(req.body)
        if (card.successCard) {
            let prizes = await prizeService.getPrizeList();
            if (!prizes) {
                res.send({
                    code: '500',
                    msg: "出错或奖品已抽完"
                })
                return;
            }
            const num = Math.floor(Math.random() * prizes.length);
            ins = await prizeService.updatePrize(prizes[num], req.body.openid)
        }
    }
    res.send({
        code: '200',
        data: {
            state: ins
        }
    })
})
router.post('/prizeInfomation', async (req, res) => {
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "参数出错"
        })
        return false;
    }
    const ins = await prizeService.getPrize(req.body)
    if (!ins) {
        res.send({
            code: '500',
            msg: "参数出错"
        })
        return false;
    }
    if (ins.name && ins.phone && ins.cardId) {
        res.send({
            code: '300',
            msg: "信息已填写"
        })
        return false;
    }
    const inss =await prizeService.updatePrizeInfo(ins, req.body)
    res.send({
        code: '200',
        msg: "提交成功"
    })
})
router.post('/prizeInfomation2', async (req, res) => {
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "参数出错"
        })
        return false;
    }
    const ins = await prizeService.getPrize(req.body)
    if (!ins) {
        res.send({
            code: '500',
            msg: "参数出错"
        })
        return false;
    }
    if (ins.name && ins.phone && ins.cardId) {
        res.send({
            code: '300',
            msg: "信息已填写"
        })
        return false;
    }
    const inss =await prizeService.updatePrizeInfo2(ins, req.body)
    res.send({
        code: '200',
        msg: "提交成功"
    })
})
module.exports = router