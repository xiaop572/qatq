<template>
  <div id="app">
    <router-view></router-view>
    <div class="help" v-if="helpVis">
      <div class="help-main">
        <img :src="helpObj.headimgurl" alt />
        <p>{{ helpObj.nickname }}</p>
        <div class="helpBtn" @click="helpFriend">{{ helpMsg }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { Dialog } from "vant";
export default {
  data() {
    return {
      helpVis: false,
      helpMsg: "为TA助力",
      getCardDi: false,
      helpObj: {},
      helpstate: false
    };
  },
  methods: {
    getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
    isFill() {
      const superior = this.getQueryVariable("superior");
      let user = localStorage.getItem("userInfo");
      const userData = JSON.parse(user);
      axios
        .post("/api/question/get", {
          openid: userData.openid
        })
        .then(res => {
          if (res.data.code === "400") {
            if (superior) {
              this.$router.push("/collectCard?superior=" + superior);
            } else {
              this.$router.push("/collectCard");
            }
          } else if (res.data.code === "200") {
            if (superior) {
              this.$router.push("/?superior=" + superior);
            } else {
              this.$router.push("/");
            }
          } else if (res.data.code !== "200") {
            localStorage.clear();
            if (superior) {
              location.href = "/api/wx/login?superior=" + superior;
            } else {
              location.href = "/api/wx/login";
            }
          }
        });
    },
    getSign() {
      let user = localStorage.getItem("userInfo");
      const userData = JSON.parse(user);
      axios
        .post("/api/wx/getWxSignature", {
          url: location.href.split("#")[0]
        })
        .then(res => {
          this.sign = res.data.data;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: this.sign.appId, // 必填，公众号的唯一标识
            timestamp: this.sign.timestamp, // 必填，生成签名的时间戳
            nonceStr: this.sign.nonceStr, // 必填，生成签名的随机串
            signature: this.sign.signature, // 必填，签名
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
          });
          wx.ready(function() {
            //需在用户可能点击分享按钮前就先调用
            wx.updateAppMessageShareData({
              title: "藤桥镇派送“平安福利”啦！", // 分享标题
              desc: "快来为我助力集“平安卡”", // 分享描述
              link: "http://pa.lin526.cn/?superior=" + userData.openid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "http://pa.lin526.cn/pingan.jpg", // 分享图标
              success: function() {
                // 设置成功
              }
            });
            wx.updateTimelineShareData({
              title: "藤桥镇派送“平安福利”啦！", // 分享标题
              link: "http://pa.lin526.cn/?superior=" + userData.openid, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: "http://pa.lin526.cn/pingan.jpg", // 分享图标
              success: function() {
                // 设置成功
              }
            });
          });
        });
    },
    preventWear() {
      if (this.getCardDi) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    helpFriend() {
      if (!this.helpstate) {
        this.helpstate = true;
        let user = JSON.parse(localStorage.getItem("userInfo"));
        const superior = this.getQueryVariable("superior");
        if (user.openid && superior) {
          axios
            .post("/api/help/help", {
              openid: user.openid,
              superior
            })
            .then(res => {
              if (res.data.code === "200") {
                Dialog.alert({
                  title: "集卡有礼",
                  message: "助力成功!"
                });
              } else {
                Dialog.alert({
                  title: "集卡有礼",
                  message: "不能为自己助力!"
                });
              }
              this.helpVis = false;
              this.getCardDi = false;
            });
        }
      }
    },
    isHelp() {
      const superior = this.getQueryVariable("superior");
      if (superior) {
        let user = localStorage.getItem("userInfo");
        console.log(user);
        axios
          .post("/api/help/isHelp", {
            openid: JSON.parse(user).openid,
            superior
          })
          .then(res => {
            if (res.data.code === "200") {
              if (res.data.data.state) {
                axios
                  .post("/api/wx/getUserInfo", {
                    openid: superior
                  })
                  .then(ress => {
                    if (ress.data.code !== "500") {
                      this.helpObj = ress.data;
                      console.log(this.helpObj);
                      this.helpVis = res.data.data.state;
                      this.getCardDi = res.data.data.state;
                    }
                  });
              } else {
                this.helpVis = res.data.data.state;
                this.getCardDi = res.data.data.state;
              }
            }
          });
      }
    },
    isAttention(data) {
      axios.post("/api/wx/attention", data).then(res => {
        if (res.data.code !== "200") {
          const superior = this.getQueryVariable("superior");
          if (superior) {
            this.$router.push("/attention?superior=" + superior);
          } else {
            this.$router.push("/attention");
          }
        }
      });
    }
  },
  mounted() {
    const openid = this.getQueryVariable("openid");
    const superior = this.getQueryVariable("superior");
    let user = localStorage.getItem("userInfo");
    if (!user) {
      if (openid) {
        axios
          .post("/api/wx/getUserInfo", {
            openid
          })
          .then(res => {
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            // this.isAttention(res.data);//是否需要关注公众号
            this.isFill();
            this.getSign();
            if (superior) {
              this.isHelp();
            }
          });
      } else {
        if (superior) {
          location.href = "/api/wx/login?superior=" + superior;
        } else {
          location.href = "/api/wx/login";
        }
      }
    } else {
      // this.isAttention(JSON.parse(user)); //是否需要关注公众号
      this.isFill();
      this.getSign();
      if (superior) {
        this.isHelp();
      }
    }
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  -webkit-overflow-scrolling: touch;
}

html,
body,
#app {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-size: 0.32rem;
}

.help {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  z-index: 20;
  overflow: hidden;

  .help-main {
    border-radius: 0.2rem;
    width: 4rem;
    height: 4.4rem;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 22;
    background: #f07958;
    text-align: center;
    img {
      width: 1.6rem;
      height: 1.6rem;
      object-fit: cover;
      margin-top: 0.3rem;
      border-radius: 50%;
    }
    p {
      text-align: center;
      font-size: 0.26rem;
    }
  }

  .helpBtn {
    width: 2.77rem;
    height: 0.93rem;
    background: url("./assets/gatherBtnBg.png") no-repeat;
    background-size: cover;
    border-radius: 0.47rem;
    line-height: 0.93rem;
    font-size: 0.29rem;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #f02334;
    margin: 0.4rem auto 0 auto;
  }
}
</style>