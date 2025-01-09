"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const utils_myRef = require("../../utils/myRef.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comSearchBox",
  setup(__props) {
    function backClick() {
      common_vendor.index.navigateBack();
    }
    class searFB {
      constructor(whetherOrNotToFocus, searchName) {
        this.whetherOrNotToFocus = whetherOrNotToFocus ?? false;
        this.searchName = searchName || "";
        this.searTispStyle = {
          opacity: 0,
          transform: "translateY(-12px) scale(1,0)"
        };
      }
    }
    class searFBFun extends searFB {
      // 简写ts
      // public：表示该属性是公有的，可以在类外部访问。
      // private：表示该属性是私有的，只能在类内部访问。
      // protected：表示该属性是受保护的，只能在类及其子类中访问。
      // readonly：表示该属性是只读的，初始化后不能修改。
      constructor(whetherOrNotToFocus, searchName, houby = "不需要值（如果加了问号就不能有默认值）") {
        super(whetherOrNotToFocus, searchName);
        this.houby = houby;
      }
      // 方法
      /**
       *聚焦调用函数，并修改whetherOrNotToFocus值，失败返回input的event值，可进行其他操作
       *  
      */
      getWhetherOrNotToFocus(myget = false, e) {
        this.whetherOrNotToFocus = true;
        if (this.whetherOrNotToFocus === true) {
          if (myget) {
            this.searTispStyle = Object.assign(this.searTispStyle, {
              opacity: 1,
              transform: "translateY(0px) scale(1,1)"
            });
          }
          return "聚焦";
        } else {
          return e;
        }
      }
      /**
       *失焦调用函数，并修改whetherOrNotToFocus值，失败返回input的event值，可进行其他操作
       *  
      */
      getWhetherOrNotToBlur(myget = false, e) {
        this.whetherOrNotToFocus = false;
        if (this.whetherOrNotToFocus === false) {
          if (myget) {
            this.searTispStyle = Object.assign(this.searTispStyle, {
              opacity: 0,
              transform: "translateY(-12px) scale(1,0)"
            });
          }
          return "失焦";
        } else {
          return e;
        }
      }
    }
    let searchNameMyref = utils_myRef.myRef("", 400), searSL;
    searSL = common_vendor.reactive(new searFBFun(false, searchNameMyref.value));
    console.log(searSL, "FFF");
    common_vendor.watch([searchNameMyref, () => searSL.whetherOrNotToFocus], ([newMY, newFO], [oldMY, oldFO]) => {
      if (searSL.whetherOrNotToFocus) {
        if (searchNameMyref.value !== null && searchNameMyref.value !== void 0 && searchNameMyref.value !== "") {
          searSL.getWhetherOrNotToFocus(true);
          utils_getSysInf.queryInput("jianfandata", "jfContentsData", { name: searchNameMyref.value }, 8, "降序").then((res) => {
            searSL.searchName = res;
            console.log(searSL.searchName);
          });
        }
      } else {
        searSL.getWhetherOrNotToBlur(true);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(searSL).getWhetherOrNotToFocus(false, $event)),
        b: common_vendor.o(($event) => common_vendor.unref(searSL).getWhetherOrNotToBlur(false, $event)),
        c: common_vendor.unref(searchNameMyref),
        d: common_vendor.o(($event) => common_vendor.isRef(searchNameMyref) ? searchNameMyref.value = $event.detail.value : searchNameMyref = $event.detail.value),
        e: common_vendor.p({
          type: "search",
          size: "3vh",
          color: "#924BDA"
        }),
        f: common_vendor.o(backClick),
        g: common_vendor.p({
          type: "undo",
          size: "4.5vh",
          color: "#fff"
        }),
        h: common_vendor.f(8, (itme, index, i0) => {
          return {
            a: index
          };
        }),
        i: common_vendor.s(common_vendor.unref(searSL).searTispStyle),
        j: common_vendor.f(10, (itme, index, i0) => {
          return {
            a: index
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb315dc2"]]);
wx.createComponent(Component);
