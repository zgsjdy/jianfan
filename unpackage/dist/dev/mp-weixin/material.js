"use strict";
const common_vendor = require("./common/vendor.js");
const utils_getSysInf = require("./utils/getSysInf.js");
const stores_counter = require("./stores/counter.js");
const _sfc_main = {
  __name: "material",
  props: {
    // 这个名字要和传过来的值名一样
    pageIndex: {
      type: Number,
      default: -1
    },
    pageheight: {
      type: Number,
      default: 100
    },
    coenindex: {
      type: Number,
      default: -1
    }
  },
  setup(__props) {
    const goToData = stores_counter.useBotNarStor();
    const { menheight, statusBarHeight } = utils_getSysInf.getTobBotMar("top");
    const { positScreen, botHeight, botSafeHeight } = utils_getSysInf.getTobBotMar("bot");
    const propsZ = __props;
    let materData;
    if (goToData.QJpopularchVmeSel[propsZ.pageIndex].vmtype === "蔬菜") {
      materData = goToData.QJpopularchVmeSel[propsZ.pageIndex];
    } else if (goToData.QJpopularchVmeSel[propsZ.pageIndex].vmtype === "肉类") {
      materData = goToData.QJpopularchVmeSel[propsZ.pageIndex].meat[propsZ.coenindex];
    } else {
      console.log("material组件数据获取错误！");
    }
    let anmidata = common_vendor.reactive({ botNavAnimClass: "000" });
    common_vendor.onMounted(() => {
      if (propsZ.pageIndex === 1) {
        anmidata.botNavAnimClass = "leftboxanim";
      } else if (propsZ.pageIndex === 2) {
        anmidata.botNavAnimClass = "rightboxanim";
      }
      setTimeout(() => {
        anmidata.botNavAnimClass = "";
      }, 1990);
    });
    let conjishu = 0;
    if (goToData.QJpopularchVmeSel[propsZ.pageIndex].vmtype === "蔬菜") {
      goToData.QJcVanmiArr[0] = new Array(materData.vegetables.length).fill(null);
    } else if (goToData.QJpopularchVmeSel[propsZ.pageIndex].vmtype === "肉类") {
      goToData.QJcVanmiArr[1] += materData.vegetables.length;
      goToData.QJcVanmiArr[goToData.QJcVanmiArr.length - 1] = new Array(goToData.QJcVanmiArr[1]).fill(null);
      conjishu = goToData.QJcVanmiArr.length - 1;
    }
    function clickOnTheOrder(index, crid) {
      if (goToData.QJcVanmiArr[conjishu][index] !== "cVanmiArr") {
        goToData.QJcVanmiArr[conjishu][index] = "cVanmiArr";
        goToData.QJnavBardata.push(materData.vegetables[crid]);
      } else if (goToData.QJcVanmiArr[conjishu][index] !== "cVanmiArrCancel") {
        goToData.QJcVanmiArr[conjishu][index] = "cVanmiArrCancel";
        let indexid = goToData.QJnavBardata.findIndex((person) => person.cVname === materData.vegetables[crid].cVname);
        goToData.QJnavBardata.splice(indexid, 1);
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(materData).vegetables, (itme, index, i0) => {
          return {
            a: itme.cVurl,
            b: common_vendor.t(itme.cVname),
            c: common_vendor.n(common_vendor.unref(goToData).QJcVanmiArr[common_vendor.unref(conjishu)][itme.id - 1]),
            d: common_vendor.s(`opacity: ${common_vendor.unref(goToData).QJcVanmiArr[common_vendor.unref(conjishu)][itme.id - 1] === null ? 1 : 0};`),
            e: common_vendor.o(($event) => clickOnTheOrder(itme.id - 1, index), itme.id),
            f: itme.id
          };
        }),
        b: common_vendor.n(common_vendor.unref(anmidata).botNavAnimClass),
        c: common_vendor.s(`opacity: ${common_vendor.unref(anmidata).botNavAnimClass === "" ? 1 : 0}; 
	background-image: linear-gradient(to bottom, ${propsZ.pageIndex === 1 ? "#dfffe4 0%, #ffffff00 100%" : "#dfdfff 0%, #ffffff00 100%"});`),
        d: common_vendor.s(`height: calc(${propsZ.pageheight}vh - ${common_vendor.unref(menheight) + common_vendor.unref(statusBarHeight) + common_vendor.unref(botHeight) + 16}px);`)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-feb63700"]]);
exports.MiniProgramPage = MiniProgramPage;
