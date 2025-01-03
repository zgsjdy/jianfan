"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const _sfc_main = {
  __name: "cookingDetailsModule",
  props: {
    //数据不可改
    structdData: {
      default: {}
    }
  },
  setup(__props) {
    const { menheight, statusBarHeight } = utils_getSysInf.getTobBotMar("top");
    const { botSafeHeight } = utils_getSysInf.getTobBotMar("bot");
    const propsZ = __props;
    let strData = propsZ.structdData;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !!!Object.keys(common_vendor.unref(strData)).length
      }, !!!Object.keys(common_vendor.unref(strData)).length ? {} : {}, {
        b: !!Object.keys(common_vendor.unref(strData)).length
      }, !!Object.keys(common_vendor.unref(strData)).length ? {
        c: common_vendor.unref(strData).topurl,
        d: common_vendor.t(common_vendor.unref(strData).name),
        e: common_vendor.f(common_vendor.unref(strData).materialDetails, (itme, index, i0) => {
          return {
            a: common_vendor.t(itme[0]),
            b: common_vendor.t(itme[1]),
            c: index
          };
        }),
        f: common_vendor.f(common_vendor.unref(strData).practContent, (itme, index, i0) => {
          return {
            a: common_vendor.t(index + 1),
            b: itme[0],
            c: common_vendor.t(itme[1]),
            d: index
          };
        })
      } : {}, {
        g: common_vendor.s(`height: calc(100vh - ${common_vendor.unref(menheight) + common_vendor.unref(statusBarHeight) + common_vendor.unref(botSafeHeight) + 3}px);`)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f061a658"]]);
wx.createComponent(Component);
