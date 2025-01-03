"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _component_navBarQJ = common_vendor.resolveComponent("navBarQJ");
  const _easycom_material2 = common_vendor.resolveComponent("material");
  const _component_botNavBarQJ = common_vendor.resolveComponent("botNavBarQJ");
  (_component_navBarQJ + _easycom_material2 + _component_botNavBarQJ)();
}
const _easycom_material = () => "../../components/material/material2.js";
if (!Math) {
  _easycom_material();
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
  __name: "chooseVegetables",
  setup(__props) {
    const bottf = stores_counter.useBotNarStor();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          navImg: common_vendor.unref(bottf).goTo.gtSrc[0],
          navText: common_vendor.unref(bottf).goTo.gtText[0],
          pageIndex: 0
        }),
        b: common_vendor.p({
          pageIndex: 1
        })
      };
    };
  }
});
_sfc_main.__runtimeHooks = 6;
wx.createPage(_sfc_main);
