"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const stores_counter = require("../../stores/counter.js");
if (!Array) {
  const _easycom_material2 = common_vendor.resolveComponent("material");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  (_easycom_material2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2)();
}
const _easycom_material = () => "../material/material2.js";
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
if (!Math) {
  (_easycom_material + _easycom_uni_collapse_item + _easycom_uni_collapse)();
}
const _sfc_main = {
  __name: "foldingPanel",
  setup(__props) {
    const goToData = stores_counter.useBotNarStor();
    const { menheight, statusBarHeight } = utils_getSysInf.getTobBotMar("top");
    const { positScreen, botHeight, botSafeHeight } = utils_getSysInf.getTobBotMar("bot");
    let anmidata = common_vendor.reactive({ botNavAnimClass: "000" });
    common_vendor.onMounted(() => {
      anmidata.botNavAnimClass = "rightboxanim";
      setTimeout(() => {
        anmidata.botNavAnimClass = "";
      }, 1990);
    });
    let compedata = [];
    let QJpopudata = goToData.QJpopularchVmeSel[2].meat;
    function dynamicCalculationHeight(QJpopudata2 = null) {
      try {
        QJpopudata2.map((itme) => {
          switch (itme.meatda.mename) {
            case "猪肉":
              compedata.push(58);
              break;
            case "驴肉":
              compedata.push(36);
              break;
            case "兔肉":
              compedata.push(36);
              break;
            case "鹌鹑肉":
              compedata.push(36);
              break;
            case "鸽肉":
              compedata.push(36);
              break;
            case "蟹类":
              compedata.push(36);
              break;
            case "软体动物类":
              compedata.push(36);
              break;
            default:
              compedata.push(51);
          }
        });
      } catch (e) {
        throw new Error(`dynamicCalculationHeight函数错误，默认null${e}`);
      }
    }
    dynamicCalculationHeight(QJpopudata);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(goToData).QJpopularchVmeSel[2].meat, (itme, index, i0) => {
          return {
            a: itme.meatda.meurl,
            b: common_vendor.t(itme.meatda.mename),
            c: "77a46ddb-2-" + i0 + "," + ("77a46ddb-1-" + i0),
            d: common_vendor.p({
              pageIndex: 2,
              pageheight: common_vendor.unref(compedata)[index],
              coenindex: index
            }),
            e: index,
            f: "77a46ddb-1-" + i0 + ",77a46ddb-0"
          };
        }),
        b: common_vendor.p({
          ["title-border"]: "none",
          border: false
        }),
        c: common_vendor.p({
          accordion: true
        }),
        d: common_vendor.n(common_vendor.unref(anmidata).botNavAnimClass),
        e: common_vendor.s(`opacity: ${common_vendor.unref(anmidata).botNavAnimClass === "" ? 1 : 0}; `),
        f: common_vendor.s(`height: calc(100vh - ${common_vendor.unref(menheight) + common_vendor.unref(statusBarHeight) + common_vendor.unref(botHeight) + 16}px);`)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-77a46ddb"]]);
wx.createComponent(Component);
