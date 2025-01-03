"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _easycom_listPopu2 = common_vendor.resolveComponent("listPopu");
  _easycom_listPopu2();
}
const _easycom_listPopu = () => "../listPopu/listPopu.js";
if (!Math) {
  _easycom_listPopu();
}
const _sfc_main = {
  __name: "popularDishes",
  setup(__props) {
    const goToData = stores_counter.useBotNarStor();
    let swiperData = {};
    let swiclass = common_vendor.ref("000");
    function navimgload(id) {
      if (id === 0) {
        swiclass.value = "swianim";
        setTimeout(() => {
          swiclass.value = "";
        }, 1490);
      }
    }
    let listpopuData = common_vendor.reactive({});
    let popular = { Aname: "热门菜数据" };
    let popularimg = { Aname: "热门菜img数据" };
    popular.data = ["加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中..."];
    popularimg.data = "../../static/imgs/pipeizhong.png";
    utils_getSysInf.yun("jianfandata", "jfSysContentsData").then((res) => {
      popular.data = res[0].popularDishes;
      popularimg.data = res[0].popularDishesimg;
      swiperData = Object.assign(swiperData, res[3]);
      listpopuData = Object.assign(listpopuData, res[4]);
      goToData.QJpopularchVmeSel = Object.assign(goToData.QJpopularchVmeSel, res);
    });
    let tsanim = common_vendor.ref("");
    function tishianim() {
      tsanim.value = "tishianim";
    }
    common_vendor.onMounted(() => {
      common_vendor.watch(() => goToData.analyseStyle.countDown, (newValue, oldValue) => {
        if (newValue <= 0) {
          goToData.analyseStyle = Object.assign(goToData.analyseStyle, {
            top: "100vh",
            transform: "scale(0,0)",
            opacity: 0
          });
          clearInterval(goToData.analyseStyle.countDownterufals);
          shuffleArray(false, popfloatimg);
        }
      });
    });
    function reviseAnalyStyle() {
      goToData.analyseStyle = Object.assign(goToData.analyseStyle, {
        top: "100vh",
        transform: "scale(0,0)",
        opacity: 0
      });
      clearInterval(goToData.analyseStyle.countDownterufals);
      shuffleArray(false, popfloatimg);
    }
    function closeAndConfirm(cloCon) {
      if (cloCon === "取消") {
        goToData.analyseStyle = Object.assign(goToData.analyseStyle, {
          top: "100vh",
          transform: "scale(0,0)",
          opacity: 0
        });
        clearInterval(goToData.analyseStyle.countDownterufals);
        shuffleArray(false, popfloatimg);
      } else if (cloCon === "确认") {
        goToData.analyseStyle = Object.assign(goToData.analyseStyle, {
          top: "100vh",
          transform: "scale(0,0)",
          opacity: 0
        });
        clearInterval(goToData.analyseStyle.countDownterufals);
        common_vendor.index.navigateTo({
          url: "/pages/listOfMatches/listOfMatches"
        });
        shuffleArray(false, popfloatimg);
      }
    }
    let popfloatimg = goToData.QJScreenOnceimg.pop;
    function shuffleArray(cun, arr) {
      for (let i = cun || arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    shuffleArray(false, popfloatimg);
    let animationData = common_vendor.reactive([]);
    let animation = common_vendor.index.createAnimation({
      transformOrigin: "50% 50%",
      duration: 1e3,
      timingFunction: "ease",
      delay: 0
    });
    animation.opacity(0.8).scale(0.7, 0.7).step({ duration: 300 });
    animationData[0] = animation.export();
    animation.opacity(1).scale(1, 1).step({ duration: 700 });
    animationData[1] = animation.export();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(swiperData).popularDishesSwiper, (itme, index, i0) => {
          return {
            a: itme[1],
            b: common_vendor.o(($event) => navimgload(index), index),
            c: common_vendor.t(itme[0]),
            d: `/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=${itme[0]}`,
            e: index
          };
        }),
        b: common_vendor.n(common_vendor.unref(swiclass)),
        c: common_vendor.s(`opacity: ${common_vendor.unref(swiclass) === "" ? 1 : 0};`),
        d: common_vendor.n(common_vendor.unref(tsanim)),
        e: common_vendor.f(common_vendor.unref(popular).data, (itme, index, i0) => {
          return {
            a: common_vendor.t(itme),
            b: `/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=${itme}`,
            c: index
          };
        }),
        f: common_vendor.n(common_vendor.unref(tsanim)),
        g: common_vendor.n(common_vendor.unref(tsanim)),
        h: common_vendor.unref(popularimg).data,
        i: common_vendor.n(common_vendor.unref(goToData).QJScreenOnce.botNavAnimClass),
        j: common_vendor.s(`opacity: ${common_vendor.unref(goToData).QJScreenOnce.botNavAnimClass === "" ? 1 : 0};`),
        k: common_vendor.p({
          listpopuData: common_vendor.unref(listpopuData)
        }),
        l: common_vendor.r("tipArea", {
          tipAreadata: {
            goTo: common_vendor.unref(goToData).QJpopularchVmeSel[0],
            tsanim: common_vendor.unref(tsanim),
            tishianim
          }
        }),
        m: common_vendor.unref(popfloatimg)[common_vendor.unref(goToData).analyseStyle.countDown],
        n: common_vendor.unref(animationData)[common_vendor.unref(goToData).analyseStyle.countDown % 2 === 0 ? 0 : 1],
        o: common_vendor.t(common_vendor.unref(goToData).analyseStyle.countDown),
        p: common_vendor.o(($event) => closeAndConfirm("取消")),
        q: common_vendor.o(($event) => closeAndConfirm("确认")),
        r: common_vendor.o(() => {
        }),
        s: common_vendor.s(common_vendor.unref(goToData).analyseStyle),
        t: common_vendor.o(reviseAnalyStyle)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e2e3c586"]]);
wx.createComponent(Component);
