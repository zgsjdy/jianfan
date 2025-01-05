"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_uni_popup)();
}
const _sfc_main = {
  __name: "navBar",
  props: {
    // 这个名字要和传过来的值名一样
    navImg: {
      // type:String,
      default: "../../static/imgs/pipeizhong.png"
    },
    navText: {
      type: String,
      default: "合成"
    },
    backIcons: {
      default: false
    },
    pageIndex: {
      type: Number,
      default: 1
    }
  },
  setup(__props) {
    const goToData = stores_counter.useBotNarStor();
    const propsZ = __props;
    const { menheight, statusBarHeight } = utils_getSysInf.getTobBotMar("top");
    const { positScreen, botHeight, botSafeHeight } = utils_getSysInf.getTobBotMar("bot");
    function backClick() {
      if (propsZ.backIcons) {
        common_vendor.index.navigateBack();
      }
    }
    let selection = common_vendor.reactive({
      select: false,
      selectWatch: false,
      anmi: ""
    });
    common_vendor.onMounted(() => {
      if (propsZ.pageIndex !== -1) {
        let timeoutId;
        common_vendor.watch(() => goToData.QJnavBardata, (newValue, oldValue) => {
          if (goToData.QJnavBardata.length !== 0 && selection.selectWatch === false) {
            clearTimeout(timeoutId);
            selection.select = true;
            selection.selectWatch = true;
            selection.anmi = "selectionInto";
          } else if (goToData.QJnavBardata.length === 0) {
            selection.anmi = "selectionExit";
            selection.selectWatch = false;
            timeoutId = setTimeout(() => {
              selection.select = false;
            }, 800);
            goToData.analyseStyle.countDown = 0;
            goToData.QJcVanmiArr[0].map((itme, index) => {
              if (itme === "cVanmiArr") {
                goToData.QJcVanmiArr[0][index] = "cVanmiArrCancel";
              }
            });
            goToData.QJcVanmiArr[goToData.QJcVanmiArr.length - 1].map((itme, index) => {
              if (itme === "cVanmiArr") {
                goToData.QJcVanmiArr[goToData.QJcVanmiArr.length - 1][index] = "cVanmiArrCancel";
              }
            });
            onpopupclick("clos");
          }
          if (trfalwatch === "蔬菜") {
            boutdata("蔬菜");
          } else if (trfalwatch === "肉类") {
            boutdata("肉类");
          }
          navigationBarData = collateData();
        }, { deep: true, immediate: true });
      }
    });
    let onpopup = common_vendor.ref(null);
    if (propsZ.pageIndex !== -1) {
      goToData.QJonpopup[propsZ.pageIndex] = onpopup;
    }
    function onpopupclick(clos = "none", popid) {
      if (clos === "none") {
        goToData.QJonpopup.map((_, index) => {
          index === popid ? goToData.QJonpopup[index].value.open("bottom") : goToData.QJonpopup[index].value.close();
        });
      } else if (clos === "clos") {
        itmecloseAll.value.closeAll();
        trfalwatch = "蔬菜";
        onpopup.value.close();
      } else if (clos === "empty") {
        goToData.QJnavBardata = [];
        trfalwatch = "蔬菜";
      }
    }
    function maskfufu() {
      itmecloseAll.value.closeAll();
      trfalwatch = "蔬菜";
    }
    let bouttclass = common_vendor.reactive({
      cla: ["boutthover", ""],
      pi: [false, true],
      QJcape: []
    });
    function boutdata(cmtype) {
      if (cmtype === "蔬菜") {
        itmecloseAll.value.closeAll();
        bouttclass.QJcape = [];
        bouttclass.cla[1] = "";
        bouttclass.pi[1] = true;
        bouttclass.cla[0] = "boutthover";
        bouttclass.pi[0] = false;
        if (goToData.QJnavBardata.length !== 0) {
          goToData.QJnavBardata.map((itme) => {
            if (itme.cVmEtype === "veget") {
              bouttclass.QJcape.push(itme);
            }
          });
        }
      } else if (cmtype === "肉类") {
        itmecloseAll.value.closeAll();
        bouttclass.QJcape = [];
        bouttclass.cla[0] = "";
        bouttclass.pi[0] = true;
        bouttclass.cla[1] = "boutthover";
        bouttclass.pi[1] = false;
        if (goToData.QJnavBardata.length !== 0) {
          goToData.QJnavBardata.map((itme) => {
            if (itme.cVmEtype === "meat") {
              bouttclass.QJcape.push(itme);
            }
          });
        }
      }
    }
    let navigationBarData = collateData();
    function collateData() {
      let newarr = [];
      goToData.QJnavBardata.map((itme) => {
        if (itme.cVmEtype === "veget") {
          newarr.unshift(itme);
        } else if (itme.cVmEtype === "meat") {
          newarr.push(itme);
        }
      });
      return newarr;
    }
    let options = common_vendor.reactive([
      {
        text: "删除",
        style: {
          backgroundColor: "#ff557f"
        }
      }
    ]);
    let trfalwatch = "蔬菜";
    let itmecloseAll = common_vendor.ref(null);
    function swipeOnClick(e, id, posit) {
      if (posit.cVmEtype === "veget") {
        if (e.content.text === "删除") {
          goToData.QJcVanmiArr[0][id] = "cVanmiArrCancel";
          let indexid = goToData.QJnavBardata.findIndex((person) => person.cVname === posit.cVname);
          goToData.QJnavBardata.splice(indexid, 1);
          trfalwatch = "蔬菜";
        }
      } else if (posit.cVmEtype === "meat") {
        if (e.content.text === "删除") {
          goToData.QJcVanmiArr[goToData.QJcVanmiArr.length - 1][id] = "cVanmiArrCancel";
          let indexid = goToData.QJnavBardata.findIndex((person) => person.cVname === posit.cVname);
          goToData.QJnavBardata.splice(indexid, 1);
          trfalwatch = "肉类";
        }
      }
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(`height: ${common_vendor.unref(statusBarHeight)}px;`),
        b: propsZ.backIcons,
        c: common_vendor.o(backClick),
        d: common_vendor.p({
          type: "back",
          size: "30"
        }),
        e: common_vendor.t(propsZ.navText),
        f: common_vendor.n(common_vendor.unref(goToData).goTo.animationslData[propsZ.pageIndex]),
        g: propsZ.navImg,
        h: common_vendor.n(common_vendor.unref(goToData).goTo.animationslData[propsZ.pageIndex]),
        i: common_vendor.f(common_vendor.unref(navigationBarData), (itme, index, i0) => {
          return {
            a: common_vendor.s(`background-color: ${itme.cVmEtype === "veget" ? "#7ad07e" : "#aaaaff"};`),
            b: itme.cVmEtype === "veget" ? itme.id : itme.id * 300
          };
        }),
        j: common_vendor.o(($event) => onpopupclick("none", propsZ.pageIndex)),
        k: propsZ.pageIndex === -1 ? false : common_vendor.unref(selection).select,
        l: common_vendor.n(common_vendor.unref(selection).anmi),
        m: common_vendor.o(($event) => onpopupclick("empty")),
        n: common_vendor.o(($event) => onpopupclick("clos")),
        o: common_vendor.o(($event) => boutdata("蔬菜")),
        p: common_vendor.n(common_vendor.unref(bouttclass).cla[0]),
        q: common_vendor.unref(bouttclass).pi[0],
        r: common_vendor.o(($event) => boutdata("肉类")),
        s: common_vendor.n(common_vendor.unref(bouttclass).cla[1]),
        t: common_vendor.unref(bouttclass).pi[1],
        v: common_vendor.unref(bouttclass).QJcape.length === 0,
        w: common_vendor.f(common_vendor.unref(bouttclass).QJcape, (itme, index, i0) => {
          return {
            a: itme.cVurl,
            b: common_vendor.t(itme.cVname),
            c: common_vendor.o(($event) => swipeOnClick($event, itme.id - 1, itme), itme.cVmEtype === "veget" ? itme.id * 300 : itme.id),
            d: itme.cVmEtype === "veget" ? itme.id * 300 : itme.id,
            e: "fba290dc-3-" + i0 + ",fba290dc-2"
          };
        }),
        x: common_vendor.p({
          ["right-options"]: common_vendor.unref(options)
        }),
        y: common_vendor.sr(itmecloseAll, "fba290dc-2,fba290dc-1", {
          "k": "itmecloseAll"
        }),
        z: common_vendor.s(`padding-bottom: ${common_vendor.unref(botHeight) + 10}px;`),
        A: common_vendor.sr(onpopup, "fba290dc-1", {
          "k": "onpopup"
        }),
        B: common_vendor.o(maskfufu),
        C: common_vendor.s(`height: ${common_vendor.unref(menheight)}px;`),
        D: common_vendor.n(common_vendor.unref(goToData).QJScreenOnce.botNavAnimClass),
        E: common_vendor.s(`height: ${common_vendor.unref(statusBarHeight) + common_vendor.unref(menheight)}px; opacity: ${common_vendor.unref(goToData).QJScreenOnce.botNavAnimClass === "" ? 1 : 0};`),
        F: common_vendor.s(`height: ${common_vendor.unref(statusBarHeight) + common_vendor.unref(menheight) + 1}px;`)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fba290dc"]]);
wx.createComponent(Component);
