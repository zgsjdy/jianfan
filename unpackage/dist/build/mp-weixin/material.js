"use strict";const e=require("./common/vendor.js"),a=require("./utils/getSysInf.js"),n=require("./stores/counter.js"),r={__name:"material",props:{pageIndex:{type:Number,default:-1},pageheight:{type:Number,default:100},coenindex:{type:Number,default:-1}},setup(r){const t=n.useBotNarStor(),{menheight:i,statusBarHeight:l}=a.getTobBotMar("top"),{positScreen:o,botHeight:m,botSafeHeight:c}=a.getTobBotMar("bot"),s=r;let f;"蔬菜"===t.QJpopularchVmeSel[s.pageIndex].vmtype?f=t.QJpopularchVmeSel[s.pageIndex]:"肉类"===t.QJpopularchVmeSel[s.pageIndex].vmtype?f=t.QJpopularchVmeSel[s.pageIndex].meat[s.coenindex]:console.log("material组件数据获取错误！");let p=e.reactive({botNavAnimClass:"000"});e.onMounted((()=>{1===s.pageIndex?p.botNavAnimClass="leftboxanim":2===s.pageIndex&&(p.botNavAnimClass="rightboxanim"),setTimeout((()=>{p.botNavAnimClass=""}),1990)}));let u=0;return"蔬菜"===t.QJpopularchVmeSel[s.pageIndex].vmtype?t.QJcVanmiArr[0]=new Array(f.vegetables.length).fill(null):"肉类"===t.QJpopularchVmeSel[s.pageIndex].vmtype&&(t.QJcVanmiArr[1]+=f.vegetables.length,t.QJcVanmiArr[t.QJcVanmiArr.length-1]=new Array(t.QJcVanmiArr[1]).fill(null),u=t.QJcVanmiArr.length-1),(a,n)=>({a:e.f(e.unref(f).vegetables,((a,n,r)=>({a:a.cVurl,b:e.t(a.cVname),c:e.n(e.unref(t).QJcVanmiArr[e.unref(u)][a.id-1]),d:e.s(`opacity: ${null===e.unref(t).QJcVanmiArr[e.unref(u)][a.id-1]?1:0};`),e:e.o((e=>function(e,a){if("cVanmiArr"!==t.QJcVanmiArr[u][e])t.QJcVanmiArr[u][e]="cVanmiArr",t.QJnavBardata.push(f.vegetables[a]);else if("cVanmiArrCancel"!==t.QJcVanmiArr[u][e]){t.QJcVanmiArr[u][e]="cVanmiArrCancel";let n=t.QJnavBardata.findIndex((e=>e.cVname===f.vegetables[a].cVname));t.QJnavBardata.splice(n,1)}}(a.id-1,n)),a.id),f:a.id}))),b:e.n(e.unref(p).botNavAnimClass),c:e.s(`opacity: ${""===e.unref(p).botNavAnimClass?1:0}; \n\tbackground-image: linear-gradient(to bottom, ${1===s.pageIndex?"#dfffe4 0%, #ffffff00 100%":"#dfdfff 0%, #ffffff00 100%"});`),d:e.s(`height: calc(${s.pageheight}vh - ${e.unref(i)+e.unref(l)+e.unref(m)+16}px);`)})}},t=e._export_sfc(r,[["__scopeId","data-v-3dd16a3c"]]);exports.MiniProgramPage=t;
