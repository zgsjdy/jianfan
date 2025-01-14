"use strict";
const common_vendor = require("../common/vendor.js");
function myRef(initValue, delay = 500) {
  let timeout;
  return common_vendor.customRef((track, trigger) => {
    return {
      get() {
        track();
        return initValue;
      },
      set(setvalue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          initValue = setvalue.replace(/ /g, "");
          trigger();
        }, delay);
      }
    };
  });
}
exports.myRef = myRef;
