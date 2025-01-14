"use strict";
const common_vendor = require("../../common/vendor.js");
function usecomSearchBox() {
  let contentListData = common_vendor.ref({}), contentStatus = common_vendor.ref("no-more");
  function reviseStatus(str) {
    contentStatus.value = str;
  }
  return { contentListData, contentStatus, reviseStatus };
}
exports.usecomSearchBox = usecomSearchBox;
