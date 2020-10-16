const express = require("express");
const router = express.Router();
const request = require('request');
const wxUserSer = require('../../services/wxUserService')
const cardSer = require('../../services/cardService')
let AppID = "wx94dd8f9eaa2710a8"
let AppSecret = "369e9af70eb0a3caf88ec0d42ecf91e4"
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const crypto = require('crypto');
var url = require("url");
var querystring = require("querystring");
router.get('/login', async (req, res) => {

    var arg = url.parse(req.url).query;

    //将arg参数字符串反序列化为一个对象
    var params = querystring.parse(arg);
    if (params.superior) {
        res.cookie('superior', params.superior)
    }

    var routerPath = 'api/wx/get_wx_access_token';
    var return_uri = 'http%3A%2F%2Flpc.natapp1.cc%2F' + routerPath;
    var scope = 'snsapi_userinfo';
    res.redirect('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + AppID + '&redirect_uri=' + return_uri + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect')
})
router.get('/get_wx_access_token', function (req, res, next) {
    // 第二步：通过code换取网页授权access_token
    var code = req.query.code;
    console.log(req.cookies, "cookies")
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
                            console.log(req.cookies.superior, "有吗")
                            if (req.cookies.superior) {
                                res.redirect(301, 'http://lpc.natapp1.cc/?openid=' + userinfo.openid + '&superior=' + req.cookies.superior);
                            } else {
                                res.redirect(301, 'http://lpc.natapp1.cc/?openid=' + userinfo.openid);
                            }

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
router.post('/getUserCount', async (req, res) => {
    if (!req.body.openid) {
        res.send({
            code: '500',
            msg: "openid不存在"
        })
        return false;
    }
    const ins = await wxUserSer.getUserCount(req.body)
    res.send({
        code: '200',
        data: {
            count: ins
        }
    })
})
router.post('/getWxSignature', async (req, res) => {
    let ticket;
    if (!req.body.url) {
        res.send({
            code: '500',
            msg: "url不存在"
        })
        return false;
    }
    if (myCache.get('access_token')) {
        const access_token = myCache.get('access_token');
        ticket = await getticket(access_token);
        const ret = createSign(ticket, req.body.url)
        res.send({
            code: '200',
            data: ret
        })
    } else {
        request.get({
            url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${AppID}&secret=${AppSecret}`
        }, async function (error, response, body) {
            const obj = JSON.parse(body)
            myCache.set('access_token', obj.access_token, 7200)
            ticket = await getticket(obj.access_token);
            const ret = createSign(ticket, req.body.url)
            res.send({
                code: '200',
                data: ret
            })
        })
    }
})

function getticket(access_token) {
    return new Promise((res, rej) => {
        let ticket;
        if (myCache.get('ticket')) {
            ticket = myCache.get('ticket')
            res(ticket)
        } else {
            request.get({
                url: "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi"
            }, async (err, resp, body) => {
                ticket = JSON.parse(body).ticket;
                myCache.set('ticket', ticket, 7200)
                res(ticket)
            })
        }
    })
}

function createSign(ticket, urls) {
    var ret = {
        nonceStr: createNonceStr(),
        jsapi_ticket: ticket,
        timestamp: createTimestamp(),
        url: urls
    };
    var string = raw(ret)
    console.log(string)
    ret.signature = sha1(string)
    ret.appId = AppID;
    return ret;
}

function createNonceStr() {
    return Math.random().toString(36).substr(2, 15)
}

function createTimestamp() {
    return parseInt(new Date().getTime() / 1000) + ''
}

function raw(args) {
    var keys = Object.keys(args)
    keys = keys.sort()
    var newArgs = {}
    keys.forEach(function (key) {
        newArgs[key.toLowerCase()] = args[key]
    })

    var string = ''
    for (var k in newArgs) {
        string += '&' + k + '=' + newArgs[k]
    }
    string = string.substr(1)
    return string
}
// sha1加密
function sha1(str) {
    let shasum = crypto.createHash("sha1")
    shasum.update(str)
    str = shasum.digest("hex")
    return str
}
module.exports = router;