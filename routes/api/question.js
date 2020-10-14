const express = require("express");
const router = express.Router();
const request = require('request');
const questionService = require('../../services/questionService')
router.post('/add', async (req, res) => {
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
router.post('/get', async (req, res) => {
    if(!req.body.openid){
        res.send({
            code: '500',
            msg: "openid不存在"
        })
        return false;
    }
    const ins = await questionService.getQuestion(req.body);
    if (ins) {
        res.send({
            code: '400',
            msg: "已经提交过问卷"
        })
    } else {
        res.send({
            code: '200',
            msg: "还未提交"
        })
    }
})
module.exports = router;