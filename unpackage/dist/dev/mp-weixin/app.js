"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/chooseVegetables/chooseVegetables.js";
  "./pages/meatSelection/meatSelection.js";
  "./pages/personalCentre/personalCentre.js";
  "./components/material/material.js";
  "./pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent.js";
  "./pages/listOfMatches/listOfMatches.js";
  "./pages/searchBox/searchBox.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  // 定义uniapp自带的全局变量
  globalData: {
    // displaysTheAnalyzedContent页面的数据，热门才名字的菜名等等
    nameId: "教程"
  }
};
const navBar = () => "./components/navBar/navBar.js";
const botNavBar = () => "./components/botNavBar/botNavBar.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.component("navBarQJ", navBar);
  app.component("botNavBarQJ", botNavBar);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
