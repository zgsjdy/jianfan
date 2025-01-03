"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _component_navBarQJ = common_vendor.resolveComponent("navBarQJ");
  const _easycom_cookingDetailsModule2 = common_vendor.resolveComponent("cookingDetailsModule");
  (_component_navBarQJ + _easycom_cookingDetailsModule2)();
}
const _easycom_cookingDetailsModule = () => "../../components/cookingDetailsModule/cookingDetailsModule.js";
if (!Math) {
  _easycom_cookingDetailsModule();
}
const __default__ = {
  onLoad: function(option) {
    getApp().globalData.nameId = option.nameId;
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
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "displaysTheAnalyzedContent",
  setup(__props) {
    const goToData = stores_counter.useBotNarStor();
    let navtitle = common_vendor.ref("教程");
    let structdData = common_vendor.reactive({});
    Object.defineProperty(structdData, "Aname", {
      value: "页面请求菜名传值详情组件（提示内容！）",
      enumerable: false
      //枚举为false
    });
    common_vendor.onMounted(() => {
      navtitle.value = getApp().globalData.nameId;
      goToData.QJnavBardata = [];
      utils_getSysInf.fuzzySearch("jianfandata", "jfContentsData", {
        name: navtitle.value
      }, false).then((res) => {
        structdData = Object.assign(structdData, res[0]);
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          backIcons: true,
          navText: common_vendor.unref(navtitle),
          pageIndex: -1
        }),
        b: common_vendor.p({
          structdData: common_vendor.unref(structdData)
        })
      };
    };
  }
});
_sfc_main.__runtimeHooks = 6;
wx.createPage(_sfc_main);
