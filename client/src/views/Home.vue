<template>
  <div class="home">
    <img src="../assets/topCity.png" alt class="topCity" />
    <img src="../assets/wenCaption.png" alt class="wenCaption" />
    <p class="hint">请您根据参与活动的真实感受，回答下面的问题</p>
    <div class="topic-box" v-for="(item, index) in topicList" :key="index">
      <h4 class="topic-title">{{ item.title }}</h4>
      <template v-if="item.type === 'radio'">
        <van-radio-group v-model="answers[index].value" icon-size="0.3rem" checked-color="#3366cc">
          <van-radio
            v-for="(ans, index) in item.answer"
            :key="index"
            :name="ans.value"
            
          >{{ ans.name }}</van-radio>
        </van-radio-group>
      </template>
      <template v-else>
        <van-checkbox-group
          v-model="answers[index].value"
          icon-size="0.3rem"
          checked-color="#3366cc"
        >
          <van-checkbox
            v-for="(ans, index) in item.answer"
            :key="index"
            :name="ans.value"
            shape="square"
          >{{ ans.name }}</van-checkbox>
        </van-checkbox-group>
        <p class="extra">
          <input type="text" v-model="answers[index].extra" placeholder="请输入其他原因" />
        </p>
        <!-- <van-field v-model="answers[index].extra" label-width="40px" placeholder="请输入其他原因"/> -->
      </template>
    </div>
    <div class="btn" @click="submit">提交</div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import axios from "axios";
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      radio: "1",
      value: "",
      result: [],
      answers: [
        {
          title: "Q1、您觉得本地的社会治安状况如何?（单选）",
          value: "",
          serial:1
        },
        {
          title: "Q2、您觉得本地的生产安全状况如何?（单选）",
          value: "",
           serial:2
        },
        {
          title: "Q3、您觉得本地的食品药品安全吗?（单选）",
          value: "",
           serial:3
        },
        {
          title: "Q4、您觉得本地的生态环境安全吗?（单选）",
          value: "",
           serial:4
        },
        {
          title: "Q5、当前哪类问题最影响您的安全感？（多选）",
          value: [],
          extra: "",
           serial:5
        },
        {
          title:
            "Q6、您或您的家人是否参与过平安创建活动？［比如：平安志愿者、平安红袖章、平安巡防、矛盾纠纷调解，平安宣传（包括制作、发放、张贴相关宣传资料，编排、演出相关文艺节目等），疫情防控，禁毒、禁赌、扫黄，消防演习、应急演练，主动报警、制止或向有关单位报告发生在身边的违法犯罪行为（如偷盗、抢劫、斗殴等事件）以及公共安全问题（如消防、交通、食品药品、市政设施等），平安爆料（通过微信或电话等）、填写平安建设有关问卷调查］(单选)",
          value: "",
           serial:6
        },
        {
          title: "Q7、对于电信网络诈骗，您知晓哪些类型？(多选)",
          value: [],
          extra: "",
           serial:7
        },
        {
          title: "Q8、您知晓哪些措施可以防范电信网络诈骗？(多选)",
          value: [],
          extra: "",
           serial:8
        },
        {
          title: "Q9、您对本地政府开展的扫黑除恶专项斗争工作满意吗？(单选)",
          value: "",
           serial:9
        },
        {
          title: "Q10、您对本地政府开展的疫情防控工作满意吗？(单选)",
          value: "",
           serial:10
        }
      ],
      topicList: [
        {
          title: "Q1、您觉得本地的社会治安状况如何？（单选）",
          type: "radio",
          answer: [
            {
              name: "安全(推荐选择)",
              value: "安全"
            },
            {
              name: "比较安全",
              value: "比较安全"
            },
            {
              name: "不太安全",
              value: "不太安全"
            },
            {
              name: "不安全",
              value: "不安全"
            }
          ]
        },
        {
          title: "Q2、您觉得本地的生产安全状况如何?（单选）",
          type: "radio",
          answer: [
            {
              name: "安全(推荐选择)",
              value: "安全"
            },
            {
              name: "比较安全",
              value: "比较安全"
            },
            {
              name: "不太安全",
              value: "不太安全"
            },
            {
              name: "不安全",
              value: "不安全"
            }
          ]
        },
        {
          title: "Q3、您觉得本地的食品药品安全吗?（单选）",
          type: "radio",
          answer: [
            {
              name: "安全(推荐选择)",
              value: "安全"
            },
            {
              name: "比较安全",
              value: "比较安全"
            },
            {
              name: "不太安全",
              value: "不太安全"
            },
            {
              name: "不安全",
              value: "不安全"
            }
          ]
        },
        {
          title: "Q4、您觉得本地的生态环境安全吗?（单选）",
          type: "radio",
          answer: [
            {
              name: "安全(推荐选择)",
              value: "安全"
            },
            {
              name: "比较安全",
              value: "比较安全"
            },
            {
              name: "不太安全",
              value: "不太安全"
            },
            {
              name: "不安全",
              value: "不安全"
            }
          ]
        },
        {
          title: "Q5、当前哪类问题最影响您的安全感？（多选）",
          type: "checkbox",
          answer: [
            {
              name: "刑事治安案件",
              value: "刑事治安案件"
            },
            {
              name: "生产安全事故",
              value: "生产安全事故"
            },
            {
              name: "食品药品安全问题",
              value: "食品药品安全问题"
            },
            {
              name: "环境污染问题",
              value: "环境污染问题"
            },
            {
              name: "电信网络诈骗案件",
              value: "电信网络诈骗案件"
            },
            {
              name: "无(推荐选择)",
              value: "无"
            }
          ],
          extra: true
        },
        {
          title:
            "Q6.您或您的家人是否参与过平安创建活动？［比如：平安志愿者、平安红袖章、平安巡防、矛盾纠纷调解，平安宣传（包括制作、发放、张贴相关宣传资料，编排、演出相关文艺节目等），疫情防控，禁毒、禁赌、扫黄，消防演习、应急演练，主动报警、制止或向有关单位报告发生在身边的违法犯罪行为（如偷盗、抢劫、斗殴等事件）以及公共安全问题（如消防、交通、食品药品、市政设施等），平安爆料（通过微信或电话等）、填写平安建设有关问卷调查］(单选)",
          type: "radio",
          answer: [
            {
              name: "参与过(推荐选择)",
              value: "参与过"
            },
            {
              name: "没有参与",
              value: "没有参与"
            },
            {
              name: "不了解",
              value: "不了解"
            }
          ]
        },
        {
          title: "Q7、对于电信网络诈骗，您知晓哪些类型？(多选)",
          type: "checkbox",
          answer: [
            {
              name: "不了解",
              value: "不了解"
            },
            {
              name: "信贷理财(推荐选择)",
              value: "信贷理财"
            },
            {
              name: "假冒身份(推荐选择)",
              value: "假冒身份"
            },
            {
              name: "购物消费(推荐选择)",
              value: "购物消费"
            },
            {
              name: "冒充公检法(推荐选择)",
              value: "冒充公检法"
            },
            {
              name: "平台理财(推荐选择)",
              value: "平台理财"
            },
            {
              name: "婚恋交友(推荐选择)",
              value: "婚恋交友"
            },
            {
              name: "招聘兼职(推荐选择)",
              value: "招聘兼职"
            },
            {
              name: '"杀猪盘"诈骗(推荐选择)',
              value: '"杀猪盘"诈骗'
            }
          ],
          extra: true
        },
        {
          title: "Q8、您知晓哪些措施可以防范电信网络诈骗？(多选)",
          type: "checkbox",
          answer: [
            {
              name: "不了解",
              value: "不了解"
            },
            {
              name: "不轻信未经核实的经济利益诱惑(推荐选择)",
              value: "不轻信未经核实的经济利益诱惑(推荐选择)"
            },
            {
              name: "不轻信未经核实的网络交友(推荐选择)",
              value: "不轻信未经核实的网络交友"
            },
            {
              name: "不透露个人隐私信息(推荐选择)",
              value: "不透露个人隐私信息"
            },
            {
              name: "未经核实不转账(推荐选择)",
              value: "未经核实不转账"
            },
            {
              name: '关注"温州防诈骗"公众号(推荐选择)',
              value: '关注"温州防诈骗"公众号'
            }
          ],
          extra: true
        },
        {
          title: "Q9、您对本地政府开展的扫黑除恶专项斗争工作满意吗？(单选)",
          type: "radio",
          answer: [
            {
              name: "满意(推荐选择)",
              value: "满意"
            },
            {
              name: "一般",
              value: "一般"
            },
            {
              name: "不满意",
              value: "不满意"
            },
            {
              name: "不了解",
              value: "不了解"
            }
          ]
        },
        {
          title: "Q10、您对本地政府开展的疫情防控工作满意吗？(单选)",
          type: "radio",
          answer: [
            {
              name: "满意(推荐选择)",
              value: "满意"
            },
            {
              name: "一般",
              value: "一般"
            },
            {
              name: "不满意",
              value: "不满意"
            },
            {
              name: "不了解",
              value: "不了解"
            }
          ]
        }
      ]
    };
  },
  methods: {
    submit() {
      let user = localStorage.getItem("userInfo");
      let openid = JSON.parse(user).openid;
      for (let i = 0; i < this.answers.length; i++) {
        console.log(Object.prototype.toString.call(this.answers[i].value));
        if (
          (Object.prototype.toString.call(this.answers[i].value) ===
            "[object String]" &&
            this.answers[i].value == "") ||
          (Object.prototype.toString.call(this.answers[i].value) ===
            "[object Array]" &&
            this.answers[i].value.length === 0 &&
            this.answers[i].extra == "")
        ) {
          Dialog.alert({
            title: "问卷调查",
            message: `请填写第${i + 1}题`
          });
          return false;
        }
      }
      console.log(this.answers)
      axios
        .post("/api/question/add", {
          openid: openid,
          answer: this.answers
        })
        .then(res => {
          console.log(res);
          if (res.data.code === "200") {
            Dialog.alert({
              title: "问卷调查",
              message: "提交成功"
            });
            this.$router.push("collectCard");
          } else {
            Dialog.alert({
              title: "问卷调查",
              message: "提交失败"
            });
          }
        });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.home {
  .topCity {
    width: 100%;
  }

  .wenCaption {
    width: 4.8rem;
    margin-top: 0.06rem;
  }

  .hint {
    color: #666;
    font-size: 0.24rem;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }

  .extra {
    text-align: left;
    font-size: 0.26rem;

    input {
      padding: 5px;
      color: #333;
      border: 1px solid #eee;
      outline: none;
      background: none;
      width: 6rem;
    }
  }

  .van-field {
    color: #333;
    font-size: 0.26rem;
    padding: 0;
  }

  .topic-box {
    width: 7rem;
    margin: auto;
    background-color: #ffffff;
    min-height: 3rem;
    box-sizing: border-box;
    padding: 0.39rem 0.3rem;
    border-radius: 0.2rem;
    margin-bottom: 0.5rem;

    .topic-title {
      text-align: left;
      font-size: 0.28rem;
      font-weight: 400;
      color: #343434;
      margin: 0;
    }

    .van-radio,
    .van-checkbox {
      margin: 10px 0;
      font-size: 0.26rem;
      color: #333;
    }
  }

  .btn {
    width: 7rem;
    background-color: #3366cc;
    margin: 0 auto 1rem auto;
    height: 0.9rem;
    line-height: 0.9rem;
    color: #fff;
    box-shadow: 0px 0px 0.45rem 0.06rem rgba(51, 102, 204, 0.1);
    border-radius: 0.2rem;
  }

  background-image: url("../assets/BgTexture.png"), url("../assets/shanBg.png");
  background-repeat: repeat-y, no-repeat;
  background-position: top, bottom;
  background-size: 7.5rem auto, 100% auto;
  background-color: #f7f7f7;
  overflow: hidden;
}
</style>