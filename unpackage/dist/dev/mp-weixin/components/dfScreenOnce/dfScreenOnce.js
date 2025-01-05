"use strict";
const common_vendor = require("../../common/vendor.js");
const components_hooks_usedfScreenOnce = require("../hooks/usedfScreenOnce.js");
const _sfc_main = {
  __name: "dfScreenOnce",
  setup(__props) {
    const { anim, dfimg, loadImgAnim, reviseMovAnim, resetMov, touStart, menheight, statusBarHeight } = components_hooks_usedfScreenOnce.usedfScreenOnce();
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(dfimg).data
      }, common_vendor.unref(dfimg).data ? {
        b: common_vendor.f(common_vendor.unref(dfimg).data.floatimg, (itme, index, i0) => {
          return {
            a: index,
            b: itme,
            c: common_vendor.s(`${common_vendor.unref(anim).folatdata[index]}animation-delay: ${common_vendor.unref(anim).animdelay}s;`)
          };
        }),
        c: common_vendor.unref(dfimg).data.butimg,
        d: common_vendor.o((...args) => common_vendor.unref(loadImgAnim) && common_vendor.unref(loadImgAnim)(...args)),
        e: common_vendor.o((...args) => common_vendor.unref(reviseMovAnim) && common_vendor.unref(reviseMovAnim)(...args)),
        f: common_vendor.o((...args) => common_vendor.unref(resetMov) && common_vendor.unref(resetMov)(...args)),
        g: common_vendor.o((...args) => common_vendor.unref(touStart) && common_vendor.unref(touStart)(...args)),
        h: common_vendor.s(`opacity: ${common_vendor.unref(anim).animclass == "jemoar" ? 0 : 1}; 
			${common_vendor.unref(anim).animclassimg === "moarimgzhuan" ? `
				border: 3px double #aaffff;
				outline: #55ff7f 4px double;
				outline-offset: 5px;` : `
				border: 2px solid #ff5500;
				outline: #a7c3ff 3px double;
				outline-offset: 3px;`}
			`),
        i: common_vendor.unref(anim).butResetY,
        j: common_vendor.n(common_vendor.unref(anim).animclassimg),
        k: common_vendor.n(common_vendor.unref(anim).animclass),
        l: common_vendor.s(`opacity: ${common_vendor.unref(anim).animclass == "moarebox" || common_vendor.unref(anim).animclass == "jemoar" ? 1 : 0};`)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1f106cce"]]);
wx.createComponent(Component);
