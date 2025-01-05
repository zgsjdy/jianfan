"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_counter = require("../../stores/counter.js");
const utils_getSysInf = require("../../utils/getSysInf.js");
const bottf = stores_counter.useBotNarStor();
function usedfScreenOnce() {
  let anim = common_vendor.reactive({
    animclass: "",
    folatdata: [],
    animdelay: 0,
    butResetY: 0,
    animclassimg: "moarimg"
  });
  function getRandomIntInclusive(min, max, count = 0, gapSize = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let numbers = [];
    let iftrfal;
    let foobsss = 0;
    while (numbers.length < count) {
      iftrfal = 0;
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!numbers.includes(randomNumber)) {
        for (let itme = 1; itme <= gapSize; itme++) {
          if (numbers.includes(randomNumber + itme) || numbers.includes(randomNumber - itme)) {
            iftrfal++;
            break;
          }
        }
        if (iftrfal === 0) {
          numbers.push(randomNumber);
        }
      }
      foobsss++;
      if (foobsss > 1e3) {
        console.log("参数大小不够分隔后的长度要求,循环过大停止！");
        numbers.push("参数大小不够分隔后的长度要求,循环过大停止！");
        break;
      }
    }
    return numbers;
  }
  function createFolat(arrlenght = 1, arrgetRan, arrgetRan2, regh = "left") {
    try {
      if (typeof arrlenght !== "number") {
        return "参数类型错误createFolat";
      }
      let arr = [];
      let arry = [...getRandomIntInclusive(arrgetRan[0], arrgetRan[1], arrlenght, arrgetRan[2])];
      let arry2 = [...getRandomIntInclusive(arrgetRan2[0], arrgetRan2[1], arrlenght, arrgetRan2[2])];
      for (let j = 0; j < arrlenght; j++) {
        arr.push(`top:${arry[j]}%;${regh}:${arry2[j]}%;`);
      }
      return arr;
    } catch (e) {
      throw new Error(`错误createFolat，默认null，{e}`);
    }
  }
  anim.folatdata.push(...createFolat(7, [2, 20, 1], [1, 88, 8]));
  anim.folatdata.push(...createFolat(7, [23, 91, 6], [1, 23, 1], "right"));
  anim.folatdata.push(...createFolat(7, [23, 91, 6], [1, 23, 1]));
  var dfimg = common_vendor.reactive({});
  utils_getSysInf.yun("jianfandata", "jfSystemData").then((res) => {
    dfimg.data = res[0].dfScreenOnce;
    bottf.QJScreenOnceimg = Object.assign(bottf.QJScreenOnceimg, res[0].dfScreenOnce);
  });
  function loadImgAnim() {
    anim.animclass = "moareone";
    setTimeout(() => {
      anim.animclass = "moarebox";
    }, 1510);
    let setTimid = setInterval(() => {
      anim.animdelay -= 0.01;
      if (anim.animdelay <= -1.5) {
        clearInterval(setTimid);
      }
    }, 10);
  }
  let AnimComparative = "con";
  function reviseMovAnim(e) {
    if (e.detail.source === "touch-out-of-bounds") {
      if (e.detail.y > 100) {
        AnimComparative = "but";
      }
    }
    if (e.detail.source === "") {
      AnimComparative = "top";
      if (e.detail.y === 0) {
        AnimComparative = "con";
      }
    }
    if (e.detail.source === "touch") {
      if (anim.animdelay >= -2.9) {
        anim.animdelay -= 0.02;
      }
    }
    if (anim.butResetY != 0) {
      anim.butResetY = 0;
    }
  }
  let jwdisabled = true;
  let runningzhong = false;
  let moarsetid;
  function resetMov() {
    anim.butResetY = 1;
    anim.animclassimg = "moarimgzhuan";
    moarsetid = setTimeout(() => {
      clearTimeout(moarsetid);
      anim.animclassimg = "moarimg";
    }, 800);
    let topsetTmeid;
    let setTimidT;
    if (AnimComparative === "but") {
      AnimComparative = "con";
      if (!runningzhong) {
        if (anim.animdelay >= -3 && jwdisabled) {
          jwdisabled = false;
          let setTimid = setInterval(() => {
            clearTimeout(topsetTmeid);
            clearInterval(setTimidT);
            anim.animdelay -= 0.01;
            if (anim.animdelay <= -3) {
              clearInterval(setTimid);
              setTimeout(() => {
                anim.animclass = "jemoar";
                setTimeout(() => {
                  bottf.QJScreenOnce.dfScreen = false;
                  bottf.QJScreenOnce.botNav = true;
                }, 1810);
              }, 50);
            }
          }, 10);
        }
      }
    }
    topsetTmeid = setTimeout(() => {
      if (AnimComparative === "top" && jwdisabled) {
        AnimComparative = "con";
        runningzhong = true;
        if (anim.animdelay <= -1.5 && jwdisabled) {
          setTimidT = setInterval(() => {
            anim.animdelay += 0.01;
            if (anim.animdelay >= -1.5) {
              clearInterval(setTimidT);
              runningzhong = false;
            }
          }, 10);
        }
      }
    }, 80);
  }
  function touStart() {
    clearTimeout(moarsetid);
    anim.animclassimg = "moarimgtu";
  }
  return { anim, dfimg, loadImgAnim, reviseMovAnim, resetMov, touStart };
}
exports.usedfScreenOnce = usedfScreenOnce;
