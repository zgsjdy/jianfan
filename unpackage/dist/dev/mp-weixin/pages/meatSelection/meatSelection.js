"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _component_navBarQJ = common_vendor.resolveComponent("navBarQJ");
  const _easycom_foldingPanel2 = common_vendor.resolveComponent("foldingPanel");
  const _component_botNavBarQJ = common_vendor.resolveComponent("botNavBarQJ");
  (_component_navBarQJ + _easycom_foldingPanel2 + _component_botNavBarQJ)();
}
const _easycom_foldingPanel = () => "../../components/foldingPanel/foldingPanel.js";
if (!Math) {
  _easycom_foldingPanel();
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
  __name: "meatSelection",
  setup(__props) {
    const bottf = stores_counter.useBotNarStor();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          navImg: common_vendor.unref(bottf).goTo.gtSrc[2],
          navText: common_vendor.unref(bottf).goTo.gtText[2],
          pageIndex: 2
        })
      };
    };
  }
});
_sfc_main.__runtimeHooks = 6;
wx.createPage(_sfc_main);
