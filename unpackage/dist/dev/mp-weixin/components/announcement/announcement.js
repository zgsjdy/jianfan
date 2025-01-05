"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "announcement",
  props: {
    noticeOpenor: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    const propsZ = __props;
    let openData = propsZ.noticeOpenor;
    function reviseAnalyStyle() {
      if (annCount.value <= 0) {
        clearInterval(setid);
        annCemStyle = Object.assign(annCemStyle, {
          opacity: 0,
          top: "-100vh"
        });
      }
    }
    let annCemStyle = common_vendor.reactive({});
    let annCount = common_vendor.ref(10);
    let setid;
    let setelsid;
    let setelconst = 0;
    setTimeout(() => {
      if (openData.noticeOpenorNot) {
        annCount.value = openData.noticeDelay ?? 10;
        annCemStyle = Object.assign(annCemStyle, {
          opacity: 1,
          top: "0vh"
        });
        setTimeout(() => {
          setid = setInterval(() => {
            if (annCount.value <= 0) {
              clearInterval(setid);
            } else {
              annCount.value--;
            }
          }, 1e3);
        }, 800);
      } else {
        setelsid = setInterval(() => {
          setelconst++;
          if (setelconst >= 30) {
            clearInterval(setelsid);
          }
          if (openData.noticeOpenorNot) {
            clearInterval(setelsid);
            annCount.value = openData.noticeDelay ?? 10;
            annCemStyle = Object.assign(annCemStyle, {
              opacity: 1,
              top: "0vh"
            });
            setTimeout(() => {
              setid = setInterval(() => {
                if (annCount.value <= 0) {
                  clearInterval(setid);
                } else {
                  annCount.value--;
                }
              }, 1e3);
            }, 800);
          } else if (openData.noticeOpenorNot === false) {
            clearInterval(setelsid);
          }
        }, 1e3);
      }
    }, 500);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(openData).noticeTitle),
        b: common_vendor.t(common_vendor.unref(openData).noticeConten),
        c: common_vendor.t(common_vendor.unref(annCount)),
        d: !common_vendor.unref(annCount) <= 0,
        e: common_vendor.o(reviseAnalyStyle),
        f: common_vendor.s(`background-color: ${common_vendor.unref(annCount) <= 0 ? "#98a3ff" : "#999"};`),
        g: common_vendor.s(common_vendor.unref(annCemStyle))
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-db9577a6"]]);
wx.createComponent(Component);
