"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "listPopu",
  props: {
    //数据不可改
    listpopuData: {
      default: {}
    }
  },
  setup(__props) {
    const propsZ = __props;
    let listpou = propsZ.listpopuData;
    let popclass = common_vendor.ref("");
    function navimgload(id) {
      if (id === 0) {
        popclass.value = "listPopuanimclass";
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(listpou).populist, (itme, index, i0) => {
          return {
            a: itme.url,
            b: common_vendor.o(($event) => navimgload(index), index),
            c: common_vendor.t(itme.name),
            d: index,
            e: `/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=${itme.name}`
          };
        }),
        b: common_vendor.n(common_vendor.unref(popclass))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a5c6af03"]]);
wx.createComponent(Component);
