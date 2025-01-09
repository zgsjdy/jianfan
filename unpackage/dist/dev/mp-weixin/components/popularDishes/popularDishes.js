"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _easycom_announcement2 = common_vendor.resolveComponent("announcement");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_listPopu2 = common_vendor.resolveComponent("listPopu");
  (_easycom_announcement2 + _easycom_uni_icons2 + _easycom_listPopu2)();
}
const _easycom_announcement = () => "../announcement/announcement.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_listPopu = () => "../listPopu/listPopu.js";
if (!Math) {
  (_easycom_announcement + _easycom_uni_icons + _easycom_listPopu)();
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
    let openorData = {};
    let popular = { Aname: "热门菜数据" };
    let popularimg = { Aname: "热门菜img数据" };
    popular.data = ["加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中...", "加载中..."];
    popularimg.data = "../../static/imgs/pipeizhong.png";
    utils_getSysInf.yun("jianfandata", "jfSysContentsData").then((res) => {
      popular.data = res[0].popularDishes;
      popularimg.data = res[0].popularDishesimg;
      swiperData = Object.assign(swiperData, res[3]);
      listpopuData = Object.assign(listpopuData, res[4]);
      openorData = Object.assign(openorData, res[5]);
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
        a: common_vendor.p({
          noticeOpenor: common_vendor.unref(openorData)
        }),
        b: common_vendor.f(common_vendor.unref(swiperData).popularDishesSwiper, (itme, index, i0) => {
          return {
            a: itme[1],
            b: common_vendor.o(($event) => navimgload(index), index),
            c: common_vendor.t(itme[0]),
            d: `/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=${itme[0]}`,
            e: index
          };
        }),
        c: common_vendor.n(common_vendor.unref(swiclass)),
        d: common_vendor.s(`opacity: ${common_vendor.unref(swiclass) === "" ? 1 : 0};`),
        e: common_vendor.p({
          type: "search",
          size: "3vh",
          color: "#924BDA"
        }),
        f: common_vendor.p({
          type: "settings",
          size: "4.3vh",
          color: "#fff"
        }),
        g: common_vendor.n(common_vendor.unref(tsanim)),
        h: common_vendor.f(common_vendor.unref(popular).data, (itme, index, i0) => {
          return {
            a: common_vendor.t(itme),
            b: `/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=${itme}`,
            c: index
          };
        }),
        i: common_vendor.n(common_vendor.unref(tsanim)),
        j: common_vendor.n(common_vendor.unref(tsanim)),
        k: common_vendor.unref(popularimg).data,
        l: common_vendor.n(common_vendor.unref(goToData).QJScreenOnce.botNavAnimClass),
        m: common_vendor.s(`opacity: ${common_vendor.unref(goToData).QJScreenOnce.botNavAnimClass === "" ? 1 : 0};`),
        n: common_vendor.p({
          listpopuData: common_vendor.unref(listpopuData)
        }),
        o: common_vendor.r("tipArea", {
          tipAreadata: {
            goTo: common_vendor.unref(goToData).QJpopularchVmeSel[0],
            tsanim: common_vendor.unref(tsanim),
            tishianim
          }
        }),
        p: common_vendor.unref(popfloatimg)[common_vendor.unref(goToData).analyseStyle.countDown],
        q: common_vendor.unref(animationData)[common_vendor.unref(goToData).analyseStyle.countDown % 2 === 0 ? 0 : 1],
        r: common_vendor.t(common_vendor.unref(goToData).analyseStyle.countDown),
        s: common_vendor.o(($event) => closeAndConfirm("取消")),
        t: common_vendor.o(($event) => closeAndConfirm("确认")),
        v: common_vendor.o(() => {
        }),
        w: common_vendor.s(common_vendor.unref(goToData).analyseStyle),
        x: common_vendor.o(reviseAnalyStyle)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e2e3c586"]]);
wx.createComponent(Component);
