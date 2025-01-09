"use strict";
const common_vendor = require("../common/vendor.js");
function getTobBotMar(posit = "top") {
  const systemInfo = common_vendor.index.getWindowInfo();
  const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
  if (posit === "top") {
    let statusBarHeight = systemInfo.statusBarHeight;
    let menheight = (menuButtonInfo.top - statusBarHeight) * 2 + (menuButtonInfo.bottom - menuButtonInfo.top);
    return {
      statusBarHeight,
      menheight
    };
  } else if (posit === "bot") {
    let positScreen;
    let botHeight;
    let botSafeHeight = 0;
    if (systemInfo.screenHeight - systemInfo.safeArea.bottom <= 0) {
      botHeight = 58;
      positScreen = systemInfo.screenHeight - botHeight;
    } else {
      botHeight = systemInfo.screenHeight - systemInfo.safeArea.height;
      positScreen = systemInfo.safeArea.height;
      botSafeHeight = systemInfo.screenHeight - systemInfo.safeArea.bottom;
    }
    return {
      positScreen,
      botHeight,
      botSafeHeight
    };
  } else {
    throw new Error("参数错误，只能是字符串类型的top和bot，默认top。");
  }
}
async function yun(uniCloudName, conPage) {
  try {
    const jianfandata = common_vendor.Ys.importObject(uniCloudName);
    let res = await jianfandata.getDataFromDatabase(conPage);
    return res.data;
  } catch (e) {
    throw new Error(`参数错误yun，默认无${e}`);
  }
}
async function fuzzySearch(uniCloudName, collect, obj, whetherExpression) {
  try {
    const jianfandata = common_vendor.Ys.importObject(uniCloudName);
    let res = await jianfandata.queryData(collect, obj, whetherExpression);
    return res.data;
  } catch (e) {
    throw new Error(`参数错误fuzzySearch，默认无${e}`);
  }
}
async function queryInput(uniCloudName, conPage, inputValue, queConst, sort) {
  try {
    const jianfandata = common_vendor.Ys.importObject(uniCloudName);
    let res = await jianfandata.queryDataByInputValue(conPage, inputValue, queConst, sort);
    return res;
  } catch (e) {
    throw new Error(`参数错误queryInput，默认无${e}`);
  }
}
exports.fuzzySearch = fuzzySearch;
exports.getTobBotMar = getTobBotMar;
exports.queryInput = queryInput;
exports.yun = yun;
