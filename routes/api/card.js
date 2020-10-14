const express = require("express");
const router = express.Router();
const request = require('request');
const cardService = require('../../services/cardService')
router.post('/getCardList', async (req, res) => {
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
module.exports = router;