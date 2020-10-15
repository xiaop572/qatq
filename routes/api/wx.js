const express = require("express");
const router = express.Router();
const request = require('request');
const wxUserSer = require('../../services/wxUserService')
const cardSer=require('../../services/cardService')
let AppID = "wx94dd8f9eaa2710a8"
let AppSecret = "369e9af70eb0a3caf88ec0d42ecf91e4"
router.get('/login', async (req, res) => {
    var routerPath = 'api/wx/get_wx_access_token';
    var return_uri = 'http%3A%2F%2Flpc.natapp1.cc%2F' + routerPath;
    var scope = 'snsapi_userinfo';
    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppID + '&redirect_uri=' + return_uri + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect')
})
router.get('/get_wx_access_token', function (req, res, next) {
    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    request.get({
            url: 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + AppID + '&secret=' + AppSecret + '&code=' + code + '&grant_type=authorization_code',
        },
        function (error, response, body) {
            if (response.statusCode == 200) {
                // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
                //console.log(JSON.parse(body));
                var data = JSON.parse(body)
                var access_token = data.access_token;
                var openid = data.openid;
                request.get({
                        url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN',
                    },
                    async function (error, response, body) {
                        if (response.statusCode == 200) {
                            // 第四步：根据获取的用户信息进行对应操作
                            var userinfo = JSON.parse(body);
                            const ins = await wxUserSer.getUser(userinfo);
                            if (!ins) {
                                await wxUserSer.addUser(userinfo)
                                await cardSer.add(userinfo)
                            }

                            res.redirect(301, 'http://lpc.natapp1.cc/?openid=' + userinfo.openid);
                            res.end()
                            //headimgurl  nickname province openid

                        } else {
                            console.log(response.statusCode);
                        }
                    }
                );
            } else {
                console.log(response.statusCode);
            }
        }
    );
})
router.post('/getUserInfo', async (req, res) => {
    console.log(req.body)
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "openid不存在"
        })
        return false;
    }
    const ins = await wxUserSer.getUser(req.body)
    res.send(ins)
})
module.exports = router;