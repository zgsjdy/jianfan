"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_counter = require("../../stores/counter.js");
const _sfc_main = {
  name: "index",
  setup(props, context) {
    const bottf = stores_counter.useBotNarStor();
    const refcl = common_vendor.ref("index  首页！");
    let gg = common_vendor.ref(-0.1);
    return { refcl, gg, bottf };
  },
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
if (!Array) {
  const _component_navBarQJ = common_vendor.resolveComponent("navBarQJ");
  const _easycom_dfScreenOnce2 = common_vendor.resolveComponent("dfScreenOnce");
  const _easycom_popularDishes2 = common_vendor.resolveComponent("popularDishes");
  const _component_botNavBarQJ = common_vendor.resolveComponent("botNavBarQJ");
  (_component_navBarQJ + _easycom_dfScreenOnce2 + _easycom_popularDishes2 + _component_botNavBarQJ)();
}
const _easycom_dfScreenOnce = () => "../../components/dfScreenOnce/dfScreenOnce.js";
const _easycom_popularDishes = () => "../../components/popularDishes/popularDishes.js";
if (!Math) {
  (_easycom_dfScreenOnce + _easycom_popularDishes)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $setup.bottf.QJScreenOnce.botNav
  }, $setup.bottf.QJScreenOnce.botNav ? {
    b: common_vendor.p({
      navImg: $setup.bottf.goTo.gtSrc[1],
      navText: $setup.bottf.goTo.gtText[1],
      pageIndex: 1
    })
  } : {}, {
    c: $setup.bottf.QJScreenOnce.dfScreen
  }, $setup.bottf.QJScreenOnce.dfScreen ? {} : {}, {
    d: $setup.bottf.QJScreenOnce.botNav
  }, $setup.bottf.QJScreenOnce.botNav ? {
    e: common_vendor.w((data, s0, i0) => {
      return common_vendor.e({
        a: data.tipAreadata.goTo
      }, data.tipAreadata.goTo ? {
        b: common_vendor.n(data.tipAreadata.tsanim),
        c: common_vendor.o(data.tipAreadata.tishianim),
        d: data.tipAreadata.goTo.popularDishesTips
      } : {}, {
        e: i0,
        f: s0
      });
    }, {
      name: "tipArea",
      path: "e",
      vueId: "64d857ed-2"
    })
  } : {}, {
    f: $setup.bottf.QJScreenOnce.botNav
  }, $setup.bottf.QJScreenOnce.botNav ? {} : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
