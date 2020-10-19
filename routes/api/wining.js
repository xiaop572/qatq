const express = require("express");
const router = express.Router();
const request = require('request');
const cardService = require('../../services/cardService')
const wxUserSer = require('../../services/wxUserService')
const helpService = require('../../services/helpService')
const winingService = require('../../services/winingService')
const moment = require('moment')
router.post('/getWining', async (req, res) => {
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "参数出错"
        })
        return false;
    }
    const ins = await winingService.getWining(req.body,'50元话费');
    res.send({
        code: '200',
        data: {
            state: ins
        }
    })
})
module.exports = router