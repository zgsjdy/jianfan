"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const stores_counter = require("../../stores/counter.js");
const _sfc_main = {
  __name: "botNavBar",
  setup(__props) {
    const { positScreen, botHeight, botSafeHeight } = utils_getSysInf.getTobBotMar("bot");
    const goToData = stores_counter.useBotNarStor();
    function goToTabPage(id = null) {
      switch (id) {
        case 0:
          goToData.setanim(id, "cvcv", "cvcvZC", 0);
          goToData.setBotNar(id, 3, 0);
          break;
        case 1:
          goToData.setanim(id, "cvcv", "cvcvZC", 1);
          goToData.setBotNar(id, 4, 1);
          if (goToData.QJnavBardata.length !== 0) {
            if (goToData.analyseStyle.top !== "0vh" && goToData.analyseStyle.opacity === 0) {
              goToData.analyseStyle = Object.assign(goToData.analyseStyle, {
                top: "0vh",
                transform: "scale(1,1)",
                opacity: 1
              });
              goToData.analyseStyle.countDown = 5;
              goToData.analyseStyle.countDownterufals = setInterval(() => {
                goToData.analyseStyle.countDown--;
              }, 1e3);
            }
          }
          break;
        case 2:
          goToData.setanim(id, "cvcv", "cvcvZC", 2);
          goToData.setBotNar(id, 5, 2);
          break;
        default:
          throw new Error("参数错误，只能是整数类型下标0开始，默认false");
      }
    }
    setTimeout(() => {
      goToData.QJScreenOnce.botNavAnimClass = "";
    }, 1490);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(goToData).goTo.gtSrc, (itme, index, i0) => {
          return {
            a: common_vendor.n(common_vendor.unref(goToData).goTo.animationslDataZC[index]),
            b: common_vendor.s(`filter: blur(${common_vendor.unref(goToData).goTo.animationslDataZC[index] === "cvcvZC" ? 0 : 3}px);`),
            c: itme,
            d: common_vendor.n(common_vendor.unref(goToData).goTo.animationslData[index]),
            e: common_vendor.t(common_vendor.unref(goToData).goTo.gtText[index]),
            f: common_vendor.o(($event) => goToTabPage(index), index),
            g: index
          };
        }),
        b: common_vendor.n(common_vendor.unref(goToData).QJScreenOnce.botNavAnimClass),
        c: common_vendor.s(`
	top: ${common_vendor.unref(positScreen)}px;
	height:${common_vendor.unref(botHeight)}px;
	padding-bottom: ${common_vendor.unref(botSafeHeight)}px;
	opacity: ${common_vendor.unref(goToData).QJScreenOnce.botNavAnimClass === "" ? 1 : 0};`),
        d: common_vendor.s(`width: 100vw; height: ${common_vendor.unref(botHeight) + 1}px;`)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79eeece5"]]);
wx.createComponent(Component);
