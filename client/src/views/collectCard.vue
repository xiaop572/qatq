<template>
  <div class="collectCard">
    <img src="../assets/topCity.png" alt class="topCity" />
    <img src="../assets/cardCaption.png" alt class="cardCaption" />
    <template v-if="successCard">
      <div class="rule">
        <img src="../assets/ruleBg.png" alt class="ruleBg" />
        <p class="successP">感谢您参与藤桥平安建设,支持平安建设。</p>
      </div>
    </template>
    <template v-else>
      <div class="countDown">
        活动倒计时：
        <span>{{ time.d }}</span>
        天
        <span>{{ time.h }}</span>时
        <span>{{ time.m }}</span>分
        <span>{{ time.s }}</span>秒
      </div>
      <div class="rule">
        <!-- <img src="../assets/ruleBg.png" alt class="ruleBg" /> -->
        <h4>活动规则:</h4>
        <p>1.关注“平安藤桥”微信公众号，点击链接参与活动；</p>
        <p>2.参与者每天有三次抽卡机会，分享好友，通过好友助力可获得抽卡机会</p>
        <p>集齐9张卡片可得“平安藤桥”卡，获得一次抽奖机会，人人有机会拿大奖。</p>
        <p>3.政府机关工作人员不享受相关奖励。</p>
        <h4>奖品设置:</h4>
        <p>一等奖1名，奖品：电动车1辆（价值4000元）。</p>
        <p>二等奖100名，奖品：平安藤桥电动车头盔（价值60元）。</p>
        <p>三等奖150名，话费20元。</p>
        <p>参与奖300名，话费10元。</p>
      </div>
    </template>
    <div class="gather-card-box">
      <template v-if="successCard">
        <div class="card-box">
          <div class="card-item success">
            <img :src="successCard.src" alt />
            <span>{{ successCard.number }}</span>
            <p>已集齐卡片,等开奖!</p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="card-box">
          <div class="card-item" v-for="(item, index) in cardList" :key="index">
            <img :src="item.src" alt @click="enlarge(item.src)" />
            <span>{{ item.number }}</span>
          </div>
        </div>
        <div class="gather-btn-list">
          <div class="gather-btn" @click="getCard">开始抽卡 x{{ smokeCardNumber }}</div>
          <div class="gather-btn" @click="changeGuvis">求助好友</div>
        </div>
      </template>
      <p class="person-count">
        当前参与人数
        <span>{{ userCount }}</span>人
      </p>
    </div>
    <!-- <div class="noLuckyDraw">未集齐卡片无法抽奖</div> -->
    <div class="luckyDraw" v-if="successCard && gameState">已集满,12月20号开奖</div>
    <div class="luckyDraw" v-if="successCard && !gameState" @click="choujiang">立即开奖</div>
    <div class="noLuckyDraw" v-if="!successCard && gameState">未集齐卡片无法抽奖</div>
    <div class="noLuckyDraw" v-if="!successCard && !gameState">活动已结束</div>
    <div class="getCard" v-if="getCardDis">
      <h2 class="get-card-caption">恭喜您获得一张卡片</h2>
      <div class="card">
        <img :src="cardSrc" alt v-if="cardShow" />
      </div>
      <div class="furl-card" @click="putCardBag" v-if="cardShow">收入卡包</div>
    </div>
    <div class="guidance" v-if="guVis" @click="changeGuvis">
      <img src="../assets/guidance.png" />
      <span>请点击右上角将它发送给指定朋友</span>
    </div>
    <div class="successCardRemin" v-if="drawCardsuc">
      <img src="../assets/10.jpg" />
      <div
        class="furl-card"
        @click="
          drawCardsuc = false;
          sucBtn = false;
        "
        v-if="sucBtn"
      >恭喜集满卡片!</div>
    </div>
    <div class="successCardRemin" v-if="enlargeVis" @click="enlargeVis=false">
      <img :src="enlargeImgSrc" class="enlargeImg" />
    </div>
    <div class="successCardRemin" v-if="DrawPrizeVis">
      <div class="drawPrizeBox">
        <template v-if="award.type==='code'">
          <h4>恭喜中奖</h4>
          <p>{{award.prizeName}}</p>
          <div class="prozeCode">
            <input ref="copyNode" :value="award.code" class="copyInput" />
            <span class="copy" @click="execCommand">复制</span>
          </div>
          <div class="furl-card" @click="
          DrawPrizeVis = false;
        ">确定</div>
        </template>
        <template v-if="award.type==='adress'">
          <h4>恭喜中奖</h4>
          <p>{{award.prizeName}}</p>
          <template v-if="!award.name && !award.phone && !award.cardId">
            <van-form @submit="onSubmit">
              <van-field
                v-model="form.name"
                name="name"
                placeholder="姓名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="form.phone"
                name="phone"
                placeholder="手机号码"
                type="number"
                :rules="[{ required: true, message: '请填写手机号' }]"
              />
              <van-field
                type="number"
                v-model="form.cardId"
                name="cardId"
                placeholder="身份证号码"
                :rules="[{ required: true, message: '请填写身份证号码' }]"
              />
              <p
                class="notice"
              >奖品领取地点：凭相关信息和中奖截图到地点：藤桥镇渔藤路288号藤桥镇社会矛盾纠纷调处化解中心1号窗口领取，联系电话：0577—55883780。</p>
              <van-button round block type="info" native-type="submit" class="furl-card">提交</van-button>
            </van-form>
          </template>
          <template v-else>
            <van-field v-model="award.name" name="name" placeholder="姓名" readonly />
            <van-field
              v-model="award.phone"
              name="phone"
              placeholder="手机号码"
              type="number"
              readonly
            />
            <van-field type="number" v-model="award.cardId" name="cardId" readonly />
            <p
              class="notice"
            >奖品领取地点：凭相关信息和中奖截图到地点：藤桥镇渔藤路288号藤桥镇社会矛盾纠纷调处化解中心1号窗口领取，联系电话：0577—55883780。</p>
            <div class="furl-card" @click="
          DrawPrizeVis = false;
        ">确定</div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import moment from "moment";
import { Dialog } from "vant";
export default {
  data() {
    return {
      getCardDis: false,
      cardShow: false,
      cardSrc: "",
      cardList: [],
      smokeCardNumber: 0,
      successCard: null,
      userCount: 0,
      sign: null,
      guVis: false,
      time: {
        d: 0,
        h: 0,
        m: 0,
        s: 0
      },
      timer: null,
      gameState: true,
      drawCardsuc: false,
      sucBtn: false,
      DrawPrizeVis: false,
      enlargeVis: false,
      enlargeImgSrc: "",
      award: {},
      form: {
        name: "",
        phone: "",
        cardId: ""
      }
    };
  },
  methods: {
    onSubmit(values) {
      let user = localStorage.getItem("userInfo");
      const userData = JSON.parse(user);
      Dialog.confirm({
        title: "中奖信息",
        message: "提交后不可修改,确认提交吗？"
      })
        .then(() => {
          axios
            .post("/api/wining/prizeInfomation", {
              ...this.form,
              openid: userData.openid
            })
            .then(res => {
              if (res.data.code === "200") {
                this.DrawPrizeVis = false;
                Dialog({ message: "提交成功" });
              }
            });
        })
        .catch(() => {
          this.DrawPrizeVis = false;
          Dialog({ message: "提交失败" });
        });
    },
    //复制文字
    execCommand() {
      this.$refs.copyNode.select();
      document.execCommand("Copy");
      alert("复制成功");
    },
    //放大卡片
    enlarge(src) {
      this.enlargeVis = true;
      this.enlargeImgSrc = src;
    },
    //抽奖
    choujiang() {
      let user = localStorage.getItem("userInfo");
      const userData = JSON.parse(user);
      axios
        .post("/api/wining/getWining", {
          openid: userData.openid
        })
        .then(res => {
          if (res.data.code === "500") {
            Dialog({ message: "系统出错 请联系0577—55883780" });
            return;
          }
          this.award = res.data.data.state;
          this.DrawPrizeVis = true;
        });
    },
    //抽卡
    getCard() {
      if (!this.gameState) {
        Dialog.alert({
          title: "集卡有礼",
          message: "抽卡时间已结束!"
        });
        return;
      }
      let user = localStorage.getItem("userInfo");
      let src = "";
      const userData = JSON.parse(user);
      axios
        .post("/api/card/abstractCard", {
          openid: userData.openid
        })
        .then(res => {
          if (res.data.code === "200") {
            src = res.data.data.num;
            this.smokeCardNumber = res.data.data.smokeCardNumber;
            this.cardSrc = "";
            this.getCardDis = true;
            this.cardShow = false;
            this.preventWear();

            setTimeout(() => {
              this.cardShow = true;
              this.cardSrc = require(`@/assets/${src}.jpg`);
            }, 3000);
          } else {
            Dialog.alert({
              title: "集卡有礼",
              message: "抽卡次数已用完!"
            });
          }
        });
    },
    //显示分享好友
    changeGuvis() {
      this.guVis = !this.guVis;
      if (this.guVis) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    cd(t1, t2, tg) {
      //相差的毫秒数
      var ms = Date.parse(t1) - Date.parse(t2);
      var minutes = 1000 * 60;
      var hours = minutes * 60;
      var days = hours * 24;
      var years = days * 365;
      //求出天数
      var d = Math.floor(ms / days);
      //求出除开天数，剩余的毫秒数
      ms %= days;
      var h = Math.floor(ms / hours);
      ms %= hours;
      var m = Math.floor(ms / minutes);
      ms %= minutes;
      var s = Math.floor(ms / 1000);
      //返回所需值并退出函数
      switch (tg) {
        case "d":
          if (d < 0) return 0;
          return d;
        case "h":
          if (h < 0) return 0;
          return h;
        case "m":
          if (m < 0) return 0;
          return m;
        case "s":
          if (s < 0) return 0;
          return s;
      }
    },
    putCardBag() {
      this.getCardDis = false;
      this.cardShow = false;
      this.getCardList("extact");
      this.preventWear();
    },
    preventWear() {
      if (this.getCardDis) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
    getCardList(state) {
      let user = localStorage.getItem("userInfo");
      const userData = JSON.parse(user);
      axios
        .post("/api/card/getCardList", {
          openid: userData.openid
        })
        .then(res => {
          if (res.data.code === "200") {
            this.cardList = [];
            const data = res.data.data;
            if (data["successCard"]) {
              if (state) {
                setTimeout(() => {
                  this.drawCardsuc = true;
                  setTimeout(() => {
                    this.sucBtn = true;
                  }, 2200);
                }, 500);
              }
              this.successCard = {
                src: require(`@/assets/10.jpg`),
                number: 1
              };
              return true;
            }
            delete data.successCard;
            let i = 1;
            for (let item in data) {
              if (data[item] > 0) {
                this.cardList.push({
                  src: require(`@/assets/${i}.jpg`),
                  number: data[item]
                });
              } else {
                this.cardList.push({
                  src: require(`@/assets/${i}_${i}.jpg`),
                  number: 0
                });
              }
              i++;
            }
          }
        });
    },
    getCardNumber() {
      let user = localStorage.getItem("userInfo");
      const userData = JSON.parse(user);
      axios
        .post("/api/card/firstCardNumber", {
          openid: userData.openid
        })
        .then(res => {
          this.smokeCardNumber = res.data.data.smokeCardNumber;
        });
    },
    getUserCount() {
      let user = localStorage.getItem("userInfo");
      const userData = JSON.parse(user);
      axios
        .post("/api/wx/getUserCount", {
          openid: userData.openid
        })
        .then(res => {
          this.userCount = res.data.data.count;
        });
    }
  },
  mounted() {
    var t1 = "2020/12/20 0:00";
    this.timer = setInterval(() => {
      this.time.d = this.cd(t1, new Date(), "d");
      this.time.h = this.cd(t1, new Date(), "h");
      this.time.m = this.cd(t1, new Date(), "m");
      this.time.s = this.cd(t1, new Date(), "s");
      if (
        this.time.d == 0 &&
        this.time.h == 0 &&
        this.time.m == 0 &&
        this.time.s == 0
      ) {
        this.gameState = false;
        clearInterval(this.timer);
      }
    }, 1000);
    this.getCardList();
    this.getCardNumber();
    this.getUserCount();
  }
};
</script>
<style lang="less" scoped>
.collectCard {
  height: auto;

  .topCity {
    width: 100%;
  }

  .cardCaption {
    width: 100%;
    margin-top: -2.5rem;
  }

  .successCardRemin {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    z-index: 20;
    overflow: hidden;
    .drawPrizeBox {
      width: 80%;
      padding: 0.3rem 0.3rem 0.6rem 0.3rem;
      background: #fffffb;
      border: 2px solid #ffb695;
      transform: rotateY(0deg) translateY(10vh);
      animation: successCard 2s ease 1;
      margin: auto;
      border-radius: 0.2rem;
      box-sizing: border-box;
    }
    .prozeCode {
      border: 2px solid #ffb695;
      padding: 0.2rem;
      text-align: left;
      position: relative;
      .copy {
        margin-left: 0.2rem;
        position: absolute;
        right: 0.2rem;
      }
    }
    .copyInput {
      outline: none;
      background: none;
      border: none;
    }
    .van-cell {
      padding: 0.2rem 0;
      &::after {
        content: "";
        left: 0;
        right: 0;
      }
    }
    p {
      text-align: left;
      color: #000;
      margin: 0.3rem auto;
    }
    img {
      width: 4rem;
    }
    h4 {
      font-size: 0.5rem;
      color: red;
      margin: 0.3rem auto;
    }
    .enlargeImg {
      width: 4.6rem;
      transform: scale(1);
      transform-origin: center;
      margin: auto;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
    .notice {
      color: #666;
      font-size: 0.24rem;
    }
    .furl-card {
      width: 2.77rem;
      height: 0.93rem;
      background: url("../assets/gatherBtnBg.png") no-repeat;
      background-size: cover;
      border-radius: 0.47rem;
      line-height: 0.93rem;
      font-size: 0.26rem;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #f02334;
      margin: 0.5rem auto 0 auto;
      border: none;
      outline: none;
    }
  }

  .countDown {
    width: 6.3rem;
    height: 0.8rem;
    background-image: url("../assets//countDownBg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: auto;
    line-height: 0.8rem;
    font-size: 0.26rem;
    color: #cb3333;
    font-family: Microsoft YaHei;
    font-weight: 400;

    span {
      color: #fff;
      display: inline-block;
      width: 0.4rem;
      height: 0.4rem;
      background: #cb3333;
      line-height: 0.4rem;
      margin: 0 0.04rem;
    }
  }

  .rule {
    width: 7.16rem;
    min-height: 1.9rem;
    background-color: #fffbd2;
    border-radius: 0.1rem;
    margin: auto;
    position: relative;
    text-align: left;
    color: #ff7933;
    padding-bottom: 0.4rem;
    .successP {
      font-size: 0.4rem;
      width: 4.6rem;
      position: absolute;
      top: 0;
      bottom: 0;
      height: 1.1rem;
      left: 0.4rem;
      margin: auto;
      font-weight: 560;
      font-family: "微软雅黑";
    }
    h4 {
      font-size: 0.26rem;
      margin-left: 0.32rem;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      position: relative;
      z-index: 12;
      top: 0.3rem;
    }

    p {
      font-size: 0.22rem;
      position: relative;
      top: 0.1rem;
      margin: 0.05rem 0.32rem 0 0.32rem;
      z-index: 12;
    }

    .ruleBg {
      position: absolute;
      right: 0.1rem;
      bottom: -0.15rem;
      height: 1.8rem;
    }
  }

  .gather-card-box {
    width: 7.16rem;
    background: #fffbd2;
    border-radius: 0.1rem;
    margin: 0.42rem auto 0 auto;
    padding: 0 0.15rem 0.38rem 0.15rem;
    box-sizing: border-box;

    .card-box {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: flex-start;

      .card-item {
        margin-top: 0.38rem;
        flex: 0 0 20%;
        position: relative;

        img {
          width: 1.1rem;
        }

        span {
          position: absolute;
          right: -0rem;
          top: -0.12rem;
          width: 0.35rem;
          height: 0.35rem;
          background: #cc3333;
          color: #fff;
          border-radius: 0.175rem;
          font-size: 0.18rem;
          font-family: Microsoft YaHei;
          font-weight: 400;
          line-height: 0.35rem;
        }
      }
    }
  }

  .luckyDraw {
    width: 100%;
    height: 1rem;
    background-image: url("../assets/gatherSuccess.png");
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0.6rem auto;
    font-size: 0.3rem;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #f02434;
    line-height: 1.05rem;
    letter-spacing: 3px;
  }

  .noLuckyDraw {
    width: 100%;
    height: 1rem;
    background-image: url("../assets/noCollect.png");
    background-repeat: no-repeat;
    background-size: cover;
    margin: 0.6rem auto;
    font-size: 0.3rem;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #333333;
    line-height: 1.05rem;
    letter-spacing: 3px;
  }

  .gather-btn-list {
    width: 90%;
    display: flex;
    justify-content: space-between;
    margin: 0.38rem auto 0 auto;

    .gather-btn {
      width: 2.77rem;
      height: 0.93rem;
      background: url("../assets/gatherBtnBg.png") no-repeat;
      background-size: cover;
      border-radius: 0.47rem;
      line-height: 0.93rem;
      font-size: 0.29rem;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #f02334;
    }
  }

  .person-count {
    font-size: 0.24rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    margin: 0.25rem 0 0 0;

    span {
      color: #ff3333;
      margin: 0 2px;
    }
  }

  .getCard {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    z-index: 20;
    overflow: hidden;

    .card {
      position: absolute;
      left: 0;
      top: 3rem;
      right: 0;
      margin: auto;
      width: 4rem;
      height: 6rem;
      background: url("../assets/drawCardBg.png") no-repeat;
      background-size: cover;
      animation: rotatePeople 1.5s ease 2;
      border-radius: 0.2rem;
      overflow: hidden;

      img {
        width: 100%;
      }
    }

    .get-card-caption {
      color: #fff;
      position: absolute;
      left: 0;
      top: 2rem;
      right: 0;
      margin: auto;
      letter-spacing: 3px;
      font-size: 0.36rem;
      text-align: center;
    }

    .furl-card {
      width: 2.77rem;
      height: 0.93rem;
      background: url("../assets/gatherBtnBg.png") no-repeat;
      background-size: cover;
      border-radius: 0.47rem;
      line-height: 0.93rem;
      font-size: 0.29rem;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #f02334;
      position: absolute;
      left: 0;
      top: 9.6rem;
      right: 0;
      margin: auto;
    }
  }

  .success {
    margin-top: 0.85rem !important;

    img {
      width: 5rem !important;
      background: #ffb695;
      border: 5px solid #ffffff;
      box-shadow: 7px 6px 16px 0px rgba(252, 78, 59, 0.5);
      border-radius: 0.2rem;
    }

    span {
      display: none;
    }

    p {
      font-size: 0.32rem;
      font-family: Adobe Heiti Std;
      font-weight: bold;
      color: #f02334;
      margin-top: 0.7rem;
    }
  }

  .guidance {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.6);
    top: 0;
    left: 0;
    z-index: 20;
    overflow: hidden;

    img {
      position: absolute;
      z-index: 20;
      top: 0.4rem;
      right: 0.4rem;
      width: 2.6rem;
    }

    span {
      width: 2.6rem;
      color: #fff;
      position: absolute;
      top: 1.2rem;
      right: 2.9rem;
      font-size: 0.36rem;
      font-weight: bold;
    }
  }

  background-color: #fbd8c8;
  background-image: url("../assets/cardBg.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: bottom;
  overflow: hidden;
}

@keyframes rotatePeople {
  0% {
    transform: rotateY(0deg);
  }

  100% {
    transform: rotateY(360deg);
  }
}

@keyframes successCard {
  0% {
    transform: rotateY(0deg) translateY(100vh);
  }

  100% {
    transform: rotateY(360deg) translateY(10vh);
  }
}

@keyframes scaleImg {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>