"use strict";const e=require("../../common/vendor.js"),t=require("../../utils/getSysInf.js"),n=require("../../stores/counter.js");if(!Array){e.resolveComponent("navBarQJ")()}const a={onShareAppMessage:e=>({title:"简Fan，美食食谱聚集地~~~",path:"/pages/index/index"}),onShareTimeline:e=>({title:"简Fan，美食食谱聚集地~~~"})},r=Object.assign(a,{__name:"listOfMatches",setup(a){const r=n.useBotNarStor(),{menheight:l,statusBarHeight:o}=t.getTobBotMar("top"),{botSafeHeight:g}=t.getTobBotMar("bot");let i=r.QJnavBardata;e.onMounted((()=>{r.QJnavBardata=[]}));let h=i.map((e=>e.cVname)),u="("+h.join("|")+")"=="()"?null:"("+h.join("|")+")",s=["0"],f=e.ref("000");return t.fuzzySearch("jianfandata","jfContentsData",{material:u},!0).then((e=>{s=function(e,t){let n,a=0,r=[];for(let l=0;l<t.length;l++){a=0;for(let r=0;r<t[l].material.length;r++)for(let n=0;n<e.length;n++)if(t[l].material[r]===e[n]){a++;break}let n,o;e.length>=t[l].material.length?n=Math.round(a/e.length*100):e.length<=t[l].material.length&&(n=Math.round(a/t[l].material.length*100)),o=t[l].material.length>e.length?"需要增加额外的材料":t[l].material.length===e.length?a===e.length?"所有要求符合😁":"需要更换部分已选材料":"需要减少部分已选材料";let g={...t[l],doAdd:o,percentage:n};r.push(g)}for(let l=r.length-1;l>0;l--)for(let e=0;e<l;e++)r[e].percentage<r[e+1].percentage&&(n=r[e],r[e]=r[e+1],r[e+1]=n);return r}(h,e),f.value="listcovered",setTimeout((()=>{f.value=""}),2030)})),(t,n)=>e.e({a:e.p({backIcons:!0,navText:"结果",pageIndex:-1}),b:e.unref(i).length<=0},(e.unref(i).length,{}),{c:e.unref(i).length>0},e.unref(i).length>0?e.e({d:e.unref(s).length<=0},(e.unref(s).length,{}),{e:e.unref(s).length>0},e.unref(s).length>0?{f:e.f(e.unref(s),((t,n,a)=>({a:t.topurl,b:e.t(t.doAdd),c:e.t(t.name),d:e.t(t.percentage),e:n,f:e.o((n=>{return a=t.name,void e.index.navigateTo({url:"/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId="+a});var a}),n)}))),g:e.n(e.unref(f)),h:e.s(`opacity: ${""!==e.unref(f)?0:1};`)}:{},{i:e.unref(s).length>0},e.unref(s).length>0?{j:e.n(e.unref(f)),k:e.s(`margin: 0 auto; width: 50%; text-align: center; border-radius: 50px; \n\t\t\t\topacity: ${""!==e.unref(f)?0:1};`)}:{},{l:e.s(`height: calc(100vh - ${e.unref(l)+e.unref(o)+e.unref(g)+3}px);`)}):{})}});r.__runtimeHooks=6,wx.createPage(r);
