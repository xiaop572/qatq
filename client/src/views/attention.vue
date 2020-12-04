<template>
  <div class="attentionBox">
    <!-- <img src="../assets/cardCaption.png" alt class="cardCaption" /> -->
    <img src="../assets/qrcode.png" alt class="qrocde"/>
    <p class="tishi">
      
      <span>长按关注</span>"平安藤桥"公众号
    </p>
    <p class="tishi">才能参加集卡活动</p>
    <p class="tishi">
      若已关注,请直接点击
      <span>跳过</span>
    </p>
    <div class="guanBox">
      <!-- <div class="guanBtn" @click="guanzhu">关注</div> -->
      <div class="yiguanBtn" @click="yiguanzhu">跳过</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Dialog } from "vant";
export default {
  methods: {
    guanzhu() {
      window.location.href =
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5NDk0OTI5NA==&scene=124#wechat_redirect";
    },
    yiguanzhu() {
      let user = localStorage.getItem("userInfo");
      const superior = this.getQueryVariable("superior");
      const userData = JSON.parse(user);
      axios.post("/api/wx/attention", userData).then(res => {
        if (res.data.code !== "200") {
          Dialog({ message: "您还未关注" });
        } else {
          this.$router.push("/");
        }
      });
    },

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
    }
  }
};
</script>

<style  lang="less" scoped>
.cardCaption {
  width: 100%;
}
.attentionBox {
  height: auto;
  min-height: 100%;
  background-color: #fbd8c8;
  background-image: url("../assets/attentionBg.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;
  overflow: hidden;
  .tishi {
    font-size: 0.4rem;
    font-weight: bold;
    margin: 0.2rem 0;
    span {
      color: red;
    }
  }
  .guanBox {
    text-align: center;
    margin-top: 0.6rem;
  }
  .guanBtn {
      font-weight: bold;
    height: 0.8rem;
    width: 30%;
    background: #ffb695;
    border: 2px solid #ff6e56;
    color: #f54837;
    line-height: 0.8rem;
    border-radius: 0.4rem;
    display: inline-block;
    margin: 0 0.4rem;
  }
  .yiguanBtn {
    height: 0.8rem;
    width: 60%;
    background: #ffffff;
    color: #f54837;
    line-height: 0.8rem;
    border-radius: 0.4rem;
    display: inline-block;
    margin: 0 0.4rem;
    border: 2px solid #ffffff;
    font-weight: bold;
  }
  .qrocde{
      margin-top: 1rem;
      widows: 90%;
  }
}
</style>