"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
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
  const _easycom_comSearchBox2 = common_vendor.resolveComponent("comSearchBox");
  (_component_navBarQJ + _easycom_comSearchBox2)();
}
const _easycom_comSearchBox = () => "../../components/comSearchBox/comSearchBox.js";
if (!Math) {
  _easycom_comSearchBox();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      backIcons: true,
      navText: "搜索",
      pageIndex: -1
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
