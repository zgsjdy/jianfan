"use strict";const t=require("../common/vendor.js");exports.fuzzySearch=async function(e,r,o,n){try{const a=t.Ys.importObject(e);return(await a.queryData(r,o,n)).data}catch(a){throw new Error(`参数错误fuzzySearch，默认无${a}`)}},exports.getTobBotMar=function(e="top"){const r=t.index.getWindowInfo(),o=t.index.getMenuButtonBoundingClientRect();if("top"===e){let t=r.statusBarHeight;return{statusBarHeight:t,menheight:2*(o.top-t)+(o.bottom-o.top)}}if("bot"===e){let t,e,o=0;return r.screenHeight-r.safeArea.bottom<=0?(e=58,t=r.screenHeight-e):(e=r.screenHeight-r.safeArea.height,t=r.safeArea.height,o=r.screenHeight-r.safeArea.bottom),{positScreen:t,botHeight:e,botSafeHeight:o}}throw new Error("参数错误，只能是字符串类型的top和bot，默认top。")},exports.queryInput=async function(e,r,o,n,a){try{const s=t.Ys.importObject(e);return await s.queryDataByInputValue(r,o,n,a)}catch(s){throw new Error(`参数错误queryInput，默认无${s}`)}},exports.yun=async function(e,r){try{const o=t.Ys.importObject(e);return(await o.getDataFromDatabase(r)).data}catch(o){throw new Error(`参数错误yun，默认无${o}`)}};
