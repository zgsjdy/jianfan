"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _component_navBarQJ = common_vendor.resolveComponent("navBarQJ");
  const _easycom_comSearchBox2 = common_vendor.resolveComponent("comSearchBox");
  (_component_navBarQJ + _easycom_comSearchBox2)();
}
const _easycom_comSearchBox = () => "../../components/comSearchBox/comSearchBox.js";
if (!Math) {
  _easycom_comSearchBox();
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
  __name: "searchBox",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          backIcons: true,
          navText: "搜索",
          pageIndex: -1
        })
      };
    };
  }
});
_sfc_main.__runtimeHooks = 6;
wx.createPage(_sfc_main);
