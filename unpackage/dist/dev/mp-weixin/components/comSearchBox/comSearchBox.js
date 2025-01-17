"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const utils_myRef = require("../../utils/myRef.js");
const components_hooks_usecomSearchBox = require("../hooks/usecomSearchBox.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_load_more)();
}
const Titme = 300;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "comSearchBox",
  setup(__props) {
    const P = stores_counter.useBotNarStor();
    const Pimg = P.QJScreenOnceimg.searchBoxStatus.NoResults;
    function backClick() {
      common_vendor.index.navigateBack();
    }
    class searFB {
      constructor(whetherOrNotToFocus, searchName) {
        this.whetherOrNotToFocus = whetherOrNotToFocus ?? false;
        this.searchName = searchName || "";
        this.searchTispData;
        this.newset = /* @__PURE__ */ new Set();
        this.searTispStyle = {
          opacity: 0,
          transform: "translateY(-12px) scale(1,0)",
          height: "40vh"
        };
      }
    }
    class searFBFun extends searFB {
      // 简写ts
      // public：表示该属性是公有的，可以在类外部访问。
      // private：表示该属性是私有的，只能在类内部访问。
      // protected：表示该属性是受保护的，只能在类及其子类中访问。
      // readonly：表示该属性是只读的，初始化后不能修改。
      constructor(whetherOrNotToFocus, searchName, PopPromptsLoading = "no-more") {
        super(whetherOrNotToFocus, searchName);
        this.PopPromptsLoading = PopPromptsLoading;
      }
      // 方法
      setHeight(height, num) {
        let connunFixed = height * num + 9;
        if (num === 0 || height === 0) {
          this.searTispStyle.height = "9vh";
        } else if (connunFixed >= 40) {
          this.searTispStyle.height = "40vh";
        } else {
          this.searTispStyle.height = connunFixed.toFixed(1) + "vh";
        }
      }
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
    let searchNameMyref = utils_myRef.myRef("", Titme), searSL;
    searSL = common_vendor.reactive(new searFBFun(false, searchNameMyref.value));
    let newmap = /* @__PURE__ */ new Map(), cache = 0;
    let pattern = /^[\u4e00-\u9fa5a-zA-Z\s]*[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z\s]*$/;
    common_vendor.watch([searchNameMyref, () => searSL.whetherOrNotToFocus], ([newMY, newFO], [oldMY, oldFO]) => {
      if (searSL.whetherOrNotToFocus) {
        if (searchNameMyref.value !== null && searchNameMyref.value !== void 0 && pattern.test(searchNameMyref.value)) {
          clearMapByCount(newmap, 600, 100);
          console.log(newmap);
          if (newmap.has(searchNameMyref.value)) {
            searSL.searchTispData = newmap.get(searchNameMyref.value);
            searSL.getWhetherOrNotToFocus(true);
            searSL.setHeight(6.3, searSL.searchTispData.length);
            searSL.PopPromptsLoading = "more";
          } else {
            searSL.PopPromptsLoading = "loading";
            utils_getSysInf.queryInput("jianfandata", "jfContentsData", { name: searchNameMyref.value }, 8, "降序").then((res) => {
              if (res.data.length !== 0) {
                searSL.searchTispData = res.data.map((itme) => {
                  const mark = `<div style="
								width: 100%;
								height: 100%;
								font-size: 2.3vh;
								line-height: 5vh;">${RedFunction(itme.name, searchNameMyref.value, "#ff7878")}</div>`;
                  return { ...itme, mark };
                });
                res.data.map((itme) => {
                  searSL.newset.add(JSON.stringify(itme));
                });
                if (searSL.newset.size >= cache && searchNameMyref.value !== "") {
                  newmap.set(searchNameMyref.value, searSL.searchTispData);
                  cache = searSL.newset.size;
                }
                if (searSL.whetherOrNotToFocus) {
                  searSL.getWhetherOrNotToFocus(true);
                }
                searSL.setHeight(6.3, searSL.searchTispData.length);
                searSL.PopPromptsLoading = "more";
              } else {
                searSL.searchTispData = [];
                searSL.setHeight(6.3, searSL.searchTispData.length);
                searSL.PopPromptsLoading = "no-more";
              }
            });
          }
        }
      } else {
        searSL.getWhetherOrNotToBlur(true);
      }
    });
    function RedFunction(tispString, newtispString, color = "red") {
      const regex = new RegExp(newtispString, "gi");
      return tispString.replace(regex, `<span style='color: ${color}'>${newtispString}</span>`);
    }
    function clearMapByCount(map, monitorValues, countToKeep) {
      const currentSize = map.size;
      if (countToKeep >= currentSize) {
        return false;
      }
      if (currentSize >= monitorValues) {
        const keys = Array.from(map.keys());
        for (let i = 0; i < countToKeep; i++) {
          map.delete(keys[i]);
        }
        return true;
      }
      return false;
    }
    let { contentListData, contentStatus, reviseStatus } = components_hooks_usecomSearchBox.usecomSearchBox();
    function clickDishClosure() {
      let constnum = 0, constnumtTow = 0;
      return async function ClickDish(nameid) {
        let name = nameid || searchNameMyref.value, res;
        if (name !== nameid) {
          constnum++;
          if (constnum === 1) {
            setTimeout(async () => {
              await ClickDish(searchNameMyref.value);
              constnum = 0;
            }, Titme);
          }
          return;
        }
        reviseStatus("no-more");
        if (newmap.has(name)) {
          contentListData.value = newmap.get(name);
          if ("addhSarr" in hSDataSL) {
            hSDataSL.addhSarr(name);
          }
          reviseStatus("value");
        } else {
          if (name !== null && name !== void 0 && pattern.test(name)) {
            reviseStatus("loading");
            res = await utils_getSysInf.queryInput("jianfandata", "jfContentsData", { name }, 8, "降序");
            if (res.data.length !== 0) {
              contentListData.value = res.data.map((itme) => {
                const mark = `<div style="
							width: 100%;
							height: 100%;
							font-size: 2.3vh;
							line-height: 5vh;">${RedFunction(itme.name, name, "#ff7878")}</div>`;
                return { ...itme, mark };
              });
              newmap.set(name, contentListData.value);
              if ("addhSarr" in hSDataSL) {
                hSDataSL.addhSarr(name);
              }
              reviseStatus("value");
            } else {
              reviseStatus("no-more");
              contentListData.value = [];
            }
          }
        }
        if (name === nameid && name !== void 0 && name !== null && name !== "") {
          constnumtTow++;
          if (constnumtTow === 1) {
            setTimeout(() => {
              searchNameMyref.value = "";
              constnumtTow = 0;
            }, Titme);
          }
        } else {
          searchNameMyref.value = "";
        }
      };
    }
    let clickDish = clickDishClosure();
    function confhandle(e) {
      clickDish(e.detail.value);
    }
    class historySearch {
      constructor(hSarr = [], whetherDelete = false) {
        this.hSarr = hSarr;
        this.whetherDelete = whetherDelete;
      }
      addhSarr(d) {
        let index = this.hSarr.indexOf(d);
        if (this.hSarr.length >= 25) {
          this.hSarr.pop();
        }
        if (index !== -1) {
          let numstr;
          numstr = this.hSarr.splice(index, 1)[0];
          if (numstr !== "" && numstr !== void 0 && numstr !== null) {
            this.hSarr.unshift(d);
          }
        } else {
          if (d !== "" && d !== void 0 && d !== null) {
            this.hSarr.unshift(d);
          }
        }
      }
      setwhetherDelete(swi) {
        this.whetherDelete = swi;
      }
      deleteAnyClick(str, index) {
        if (this.whetherDelete) {
          this.hSarr.splice(index, 1);
          if (this.hSarr.length === 0) {
            this.whetherDelete = false;
          }
        } else {
          searchNameMyref.value = str;
        }
      }
    }
    let hSDataSL = common_vendor.reactive(new historySearch());
    console.log(hSDataSL);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => common_vendor.unref(searSL).getWhetherOrNotToFocus(false, $event)),
        b: common_vendor.o(($event) => common_vendor.unref(searSL).getWhetherOrNotToBlur(false, $event)),
        c: common_vendor.o(confhandle),
        d: common_vendor.unref(searchNameMyref),
        e: common_vendor.o(($event) => common_vendor.isRef(searchNameMyref) ? searchNameMyref.value = $event.detail.value : searchNameMyref = $event.detail.value),
        f: common_vendor.o(common_vendor.unref(clickDish)),
        g: common_vendor.p({
          type: "search",
          size: "3vh",
          color: "#924BDA"
        }),
        h: common_vendor.o(backClick),
        i: common_vendor.p({
          type: "undo",
          size: "4.5vh",
          color: "#fff"
        }),
        j: common_vendor.f(common_vendor.unref(searSL).searchTispData, (itme, index, i0) => {
          return {
            a: itme.mark,
            b: common_vendor.o(($event) => common_vendor.unref(clickDish)(itme.name), index),
            c: index,
            d: common_vendor.s(`margin-bottom: ${index + 1 === common_vendor.unref(searSL).searchTispData.length ? 0 : "4%"};`)
          };
        }),
        k: common_vendor.p({
          iconType: "circle",
          contentText: {
            contentdown: "o((>ω< ))o",
            contentrefresh: "正在加载...",
            contentnomore: "没有更多数据了"
          },
          status: common_vendor.unref(searSL).PopPromptsLoading
        }),
        l: common_vendor.s(common_vendor.unref(searSL).searTispStyle),
        m: common_vendor.unref(hSDataSL).hSarr.length !== 0
      }, common_vendor.unref(hSDataSL).hSarr.length !== 0 ? common_vendor.e({
        n: common_vendor.f(common_vendor.unref(hSDataSL).hSarr, (itme, index, i0) => {
          return {
            a: common_vendor.t(itme),
            b: index,
            c: common_vendor.o(($event) => common_vendor.unref(hSDataSL).deleteAnyClick(itme, index), index)
          };
        }),
        o: common_vendor.n(common_vendor.unref(hSDataSL).whetherDelete ? "historySearchListAfter" : ""),
        p: !common_vendor.unref(hSDataSL).whetherDelete
      }, !common_vendor.unref(hSDataSL).whetherDelete ? {
        q: common_vendor.o(($event) => common_vendor.unref(hSDataSL).setwhetherDelete(true)),
        r: common_vendor.p({
          type: "trash",
          size: "2vh"
        })
      } : {
        s: common_vendor.o(($event) => common_vendor.unref(hSDataSL).setwhetherDelete(false)),
        t: common_vendor.p({
          type: "closeempty",
          size: "2vh"
        })
      }) : {}, {
        v: common_vendor.unref(contentStatus) === "no-more"
      }, common_vendor.unref(contentStatus) === "no-more" ? {
        w: common_vendor.unref(Pimg)
      } : common_vendor.unref(contentStatus) === "loading" ? {
        y: common_vendor.p({
          iconType: "circle",
          status: common_vendor.unref(contentStatus)
        })
      } : {
        z: common_vendor.f(common_vendor.unref(contentListData), (itme, index, i0) => {
          return {
            a: itme.topurl,
            b: common_vendor.t(itme.name),
            c: index
          };
        })
      }, {
        x: common_vendor.unref(contentStatus) === "loading"
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb315dc2"]]);
wx.createComponent(Component);
