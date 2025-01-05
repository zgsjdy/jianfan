"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _component_navBarQJ = common_vendor.resolveComponent("navBarQJ");
  _component_navBarQJ();
}
const __default__ = {
  // 分享好友
  onShareAppMessage(e) {
    return {
      title: "简Fan，美食食谱聚集地~~~",
      path: "/pages/index/index"
    };
  },
  // 分享朋友圈
  onShareTimeline(e) {
    return {
      title: "简Fan，美食食谱聚集地~~~"
    };
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "listOfMatches",
  setup(__props) {
    const goToData = stores_counter.useBotNarStor();
    const { menheight, statusBarHeight } = utils_getSysInf.getTobBotMar("top");
    const { botSafeHeight } = utils_getSysInf.getTobBotMar("bot");
    let YMnavBardata = goToData.QJnavBardata;
    common_vendor.onMounted(() => {
      goToData.QJnavBardata = [];
    });
    let regarr = YMnavBardata.map((itme) => itme.cVname);
    let mergearr = "(" + regarr.join("|") + ")" === "()" ? null : "(" + regarr.join("|") + ")";
    let structdData = ["0"];
    let struclass = common_vendor.ref("000");
    utils_getSysInf.fuzzySearch("jianfandata", "jfContentsData", {
      material: mergearr
      //注意这里的正则表达式不用加开头和结尾的/
    }, true).then((res) => {
      structdData = arrayObjectSorting(regarr, res);
      struclass.value = "listcovered";
      setTimeout(() => {
        struclass.value = "";
      }, 2030);
    });
    function arrayObjectSorting(arrOne, resArrTow) {
      let arrOneNum = 0;
      let arrSatisfied = [];
      for (let i = 0; i < resArrTow.length; i++) {
        arrOneNum = 0;
        for (let j = 0; j < resArrTow[i].material.length; j++) {
          for (let k = 0; k < arrOne.length; k++) {
            if (resArrTow[i].material[j] === arrOne[k]) {
              arrOneNum++;
              break;
            }
          }
        }
        let price;
        if (arrOne.length >= resArrTow[i].material.length) {
          price = Math.round(arrOneNum / arrOne.length * 100);
        } else if (arrOne.length <= resArrTow[i].material.length) {
          price = Math.round(arrOneNum / resArrTow[i].material.length * 100);
        }
        let priceAdd;
        if (resArrTow[i].material.length > arrOne.length) {
          priceAdd = "需要增加额外的材料";
        } else if (resArrTow[i].material.length === arrOne.length) {
          if (arrOneNum === arrOne.length) {
            priceAdd = "所有要求符合😁";
          } else {
            priceAdd = "需要更换部分已选材料";
          }
        } else {
          priceAdd = "需要减少部分已选材料";
        }
        let freightStation = { ...resArrTow[i], doAdd: priceAdd, percentage: price };
        arrSatisfied.push(freightStation);
      }
      let transferStation;
      for (let j = arrSatisfied.length - 1; j > 0; j--) {
        for (let i = 0; i < j; i++) {
          if (arrSatisfied[i].percentage < arrSatisfied[i + 1].percentage) {
            transferStation = arrSatisfied[i];
            arrSatisfied[i] = arrSatisfied[i + 1];
            arrSatisfied[i + 1] = transferStation;
          }
        }
      }
      return arrSatisfied;
    }
    function skipToDetails(nameid) {
      common_vendor.index.navigateTo({
        url: "/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=" + nameid
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          backIcons: true,
          navText: "结果",
          pageIndex: -1
        }),
        b: common_vendor.unref(YMnavBardata).length <= 0
      }, common_vendor.unref(YMnavBardata).length <= 0 ? {} : {}, {
        c: common_vendor.unref(YMnavBardata).length > 0
      }, common_vendor.unref(YMnavBardata).length > 0 ? common_vendor.e({
        d: common_vendor.unref(structdData).length <= 0
      }, common_vendor.unref(structdData).length <= 0 ? {} : {}, {
        e: common_vendor.unref(structdData).length > 0
      }, common_vendor.unref(structdData).length > 0 ? {
        f: common_vendor.f(common_vendor.unref(structdData), (itme, index, i0) => {
          return {
            a: itme.topurl,
            b: common_vendor.t(itme.doAdd),
            c: common_vendor.t(itme.name),
            d: common_vendor.t(itme.percentage),
            e: index,
            f: common_vendor.o(($event) => skipToDetails(itme.name), index)
          };
        }),
        g: common_vendor.n(common_vendor.unref(struclass)),
        h: common_vendor.s(`opacity: ${common_vendor.unref(struclass) !== "" ? 0 : 1};`)
      } : {}, {
        i: common_vendor.unref(structdData).length > 0
      }, common_vendor.unref(structdData).length > 0 ? {
        j: common_vendor.n(common_vendor.unref(struclass)),
        k: common_vendor.s(`margin: 0 auto; width: 50%; text-align: center; border-radius: 50px; 
				opacity: ${common_vendor.unref(struclass) !== "" ? 0 : 1};`)
      } : {}, {
        l: common_vendor.s(`height: calc(100vh - ${common_vendor.unref(menheight) + common_vendor.unref(statusBarHeight) + common_vendor.unref(botSafeHeight) + 3}px);`)
      }) : {});
    };
  }
});
_sfc_main.__runtimeHooks = 6;
wx.createPage(_sfc_main);
