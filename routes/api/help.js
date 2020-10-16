const express = require("express");
const router = express.Router();
const request = require('request');
const cardService = require('../../services/cardService')
const wxUserSer = require('../../services/wxUserService')
const helpService = require('../../services/helpService')
const moment = require('moment')
router.post('/isHelp', async (req, res) => {
    if (!req.body.openid && !req.body.superior) {
        res.send({
            code: '500',
            msg: "参数出错"
        })
        return false;
    }
    const ins = await helpService.isHelp(req.body);
    res.send({
        code: '200',
        data: {
            state: ins
        }
    })
})
router.post('/help', async (req, res) => {
    if (!req.body.openid && !req.body.superior) {
        res.send({
            code: '500',
            msg: "参数出错"
        })
        return false;
    }
    if (req.body.openid === req.body.superior) {
        res.send({
            code: '500',
            msg: "不能给自己助力"
        })
        return false;
    }
    const ins = await helpService.help(req.body);
    res.send({
        code: '200',
        data: {
            state: ins
        }
    })
})
module.exports = router