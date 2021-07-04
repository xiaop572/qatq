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
        <template v-if="item.extra">
          <p class="extra">
            <input type="text" v-model="answers[index].extra" placeholder="请输入其他原因" />
          </p>
        </template>

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
          serial: 1
        },
        {
          title: "Q2、您觉得本地的生产安全状况如何?（单选）",
          value: "",
          serial: 2
        },
        {
          title: "Q3、您觉得本地的食品药品安全吗?（单选）",
          value: "",
          serial: 3
        },
        {
          title: "Q4、您觉得本地的生态环境安全吗?（单选）",
          value: "",
          serial: 4
        },
        {
          title: "Q5、您觉得本地的交通安全状况如何?（单选）",
          value: "",
          serial: 5
        },
        {
          title:
            "Q6、 您觉得本地的消防安全状况如何?（单选）",
          value: "",
          serial: 6
        },
        {
          title:
            "Q7、请问您关注的前三位社会安全问题是?（选三项）",
          value: [],
          serial: 7
        },
        {
          title: "Q8、您或您的家人是否参与过平安鹿城建设活动?(多选)",
          value: [],
          extra: "",
          serial: 8
        },
        {
          title: "Q9、您知道以下哪些属于电信网络诈骗？(多选)",
          value: [],
          extra: "",
          serial: 9
        },
        {
          title: "Q10、您知道以下哪些措施可以防范电信网络诈骗？(多选)",
          value: [],
          extra: "",
          serial: 10
        },
        {
          title: "Q11、您觉得本地区新冠肺炎疫情防控工作是否到位，存在哪些问题？(多选)",
          value: [],
          extra: "",
          serial: 11
        },
        {
          title: "Q12、疫情防控唯一的有效预防措施是？",
          value: "",
          serial: 12
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
              name: "基本安全",
              value: "基本安全"
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
              name: "基本安全",
              value: "基本安全"
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
              name: "基本安全",
              value: "基本安全"
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
              name: "基本安全",
              value: "基本安全"
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
          title: "Q5、您觉得本地的交通安全状况如何?（单选）",
          type: "radio",
          answer: [
            {
              name: "安全(推荐选择)",
              value: "安全"
            },
            {
              name: "基本安全",
              value: "基本安全"
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
          title: "Q6、您觉得本地的消防安全状况如何?（单选）",
          type: "radio",
          answer: [
            {
              name: "安全(推荐选择)",
              value: "安全"
            },
            {
              name: "基本安全",
              value: "基本安全"
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
          title:
            "Q7.请问您关注的前三位社会安全问题是？（选三项）",
          type: "checkbox",
          answer: [
            {
              name: "社会治安",
              value: "社会治安"
            },
            {
              name: "消防安全",
              value: "消防安全"
            },
            {
              name: "生产安全",
              value: "生产安全"
            },
            {
              name: "食品药品安全",
              value: "载货超大超重"
            },
            {
              name: "交通安全",
              value: "交通安全"
            },
            {
              name: "网络信息安全",
              value: "网络信息安全"
            },
            {
              name: "生态环境安全",
              value: "生态环境安全"
            },
            {
              name: "公共卫生安全(含医疗事故、疫情等)",
              value: "公共卫生安全(含医疗事故、疫情等)"
            },
          ],
          extra: false
        },
        {
          title: "Q8.您或您的家人是否参与过平安鹿城建设活动?(多选)",
          type: "checkbox",
          answer: [
            {
              name: "没有参加",
              value: "没有参加"
            },
            {
              name: "参与过疫情防控、矛盾纠纷调解、平安巡防、安全检查、维持公共秩序等志愿活动",
              value: "参与过疫情防控、矛盾纠纷调解、平安巡防、安全检查、维持公共秩序等志愿活动"
            },
            {
              name: "参与过平安宣传资料发放、编排演出相关文艺节目、平安建设问卷调查等",
              value: "参与过平安宣传资料发放、编排演出相关文艺节目、平安建设问卷调查等"
            },
            {
              name: "参与过禁毒、禁赌、扫黄  □参与过消防演习、应急演练",
              value: "参与过禁毒、禁赌、扫黄  □参与过消防演习、应急演练"
            },
            {
              name: "制止或报告违法犯罪行为及公共安全问题（如消防、交通、食品药品、生态环境、市政设施安全等）",
              value: "制止或报告违法犯罪行为及公共安全问题（如消防、交通、食品药品、生态环境、市政设施安全等）"
            }
          ],
          extra: true
        },
        {
          title: "Q9、您知道以下哪些属于电信网络诈骗？(多选)",
          type: "checkbox",
          answer: [
            {
              name: "不知道",
              value: "不知道"
            },
            {
              name: "公检法电话要求转账",
              value: "公检法电话要求转账"
            },
            {
              name: "网上兼职刷单",
              value: "网上兼职刷单"
            },
            {
              name: "直播间炒股",
              value: "直播间炒股"
            },
            {
              name: "网络贷款",
              value: "网络贷款"
            },
            {
              name: "网络赌博",
              value: "网络赌博"
            },
            {
              name: "交友婚恋为由参与虚拟货币投资",
              value: "交友婚恋为由参与虚拟货币投资"
            },
            {
              name: "退款退费退税，要求先付保证金",
              value: "退款退费退税，要求先付保证金"
            },
            {
              name: '"杀猪盘"诈骗',
              value: '"杀猪盘"诈骗'
            }
          ],
          extra: true
        },
        {
          title: "Q10、您知道以下哪些措施可以防范电信网络诈骗？(多选)",
          type: "checkbox",
          answer: [
            {
              name: "不知道",
              value: "不知道"
            },
            {
              name: "不轻信未经核实的经济利益诱惑",
              value: "不轻信未经核实的经济利益诱惑"
            },
            {
              name: "不轻信未经核实的网络交友",
              value: "不轻信未经核实的网络交友"
            },
            {
              name: "不透露个人隐私信息",
              value: "不透露个人隐私信息"
            },
            {
              name: "未经核实不转账",
              value: "未经核实不转账"
            },
            {
              name: '关注"温州防诈骗"公众号',
              value: '关注"温州防诈骗"公众号'
            }
          ],
          extra: true
        },
        {
          title: "Q11、您觉得本地区新冠肺炎疫情防控工作是否到位，存在哪些问题？(多选)",
          type: "checkbox",
          answer: [
            {
              name: "落实到位",
              value: "落实到位"
            },
            {
              name: "防控措施落实不够到位",
              value: "防控措施落实不够到位"
            },
            {
              name: "防疫知识宣传不够到位",
              value: "防疫知识宣传不够到位"
            },
            {
              name: "统筹推进疫情防控和经济发展不够到位（没有处理好疫情防控和经济发展的关系）",
              value: "统筹推进疫情防控和经济发展不够到位（没有处理好疫情防控和经济发展的关系）"
            },
          ],
          extra: true
        },
        {
          title: "Q12、疫情防控唯一的有效预防措施是？",
          type: "radio",
          answer: [
            {
              name: "接种新冠疫苗",
              value: "接种新冠疫苗"
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
      console.log(this.answers);
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
    text-align:left;
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