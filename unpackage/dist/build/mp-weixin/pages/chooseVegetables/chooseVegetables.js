"use strict";const e=require("../../common/vendor.js"),n=require("../../stores/counter.js");if(!Array){(e.resolveComponent("navBarQJ")+e.resolveComponent("material")+e.resolveComponent("botNavBarQJ"))()}Math;const o={onShareAppMessage:e=>({title:"简Fan，美食食谱聚集地~~~",path:"/pages/index/index"}),onShareTimeline:e=>({title:"简Fan，美食食谱聚集地~~~"})},t=Object.assign(o,{__name:"chooseVegetables",setup(o){const t=n.useBotNarStor();return(n,o)=>({a:e.p({navImg:e.unref(t).goTo.gtSrc[0],navText:e.unref(t).goTo.gtText[0],pageIndex:0}),b:e.p({pageIndex:1})})}});t.__runtimeHooks=6,wx.createPage(t);
