"use strict";const e=require("../../common/vendor.js"),t=require("../../utils/getSysInf.js"),a=require("../../stores/counter.js"),n={__name:"botNavBar",setup(n){const{positScreen:o,botHeight:s,botSafeHeight:r}=t.getTobBotMar("bot"),c=a.useBotNarStor();return setTimeout((()=>{c.QJScreenOnce.botNavAnimClass=""}),1490),(t,a)=>({a:e.f(e.unref(c).goTo.gtSrc,((t,a,n)=>({a:e.n(e.unref(c).goTo.animationslDataZC[a]),b:e.s(`filter: blur(${"cvcvZC"===e.unref(c).goTo.animationslDataZC[a]?0:3}px);`),c:t,d:e.n(e.unref(c).goTo.animationslData[a]),e:e.t(e.unref(c).goTo.gtText[a]),f:e.o((e=>function(e=null){switch(e){case 0:c.setanim(e,"cvcv","cvcvZC",0),c.setBotNar(e,3,0);break;case 1:c.setanim(e,"cvcv","cvcvZC",1),c.setBotNar(e,4,1),0!==c.QJnavBardata.length&&"0vh"!==c.analyseStyle.top&&0===c.analyseStyle.opacity&&(c.analyseStyle=Object.assign(c.analyseStyle,{top:"0vh",transform:"scale(1,1)",opacity:1}),c.analyseStyle.countDown=5,c.analyseStyle.countDownterufals=setInterval((()=>{c.analyseStyle.countDown--}),1e3));break;case 2:c.setanim(e,"cvcv","cvcvZC",2),c.setBotNar(e,5,2);break;default:throw new Error("参数错误，只能是整数类型下标0开始，默认false")}}(a)),a),g:a}))),b:e.n(e.unref(c).QJScreenOnce.botNavAnimClass),c:e.s(`\n\ttop: ${e.unref(o)}px;\n\theight:${e.unref(s)}px;\n\tpadding-bottom: ${e.unref(r)}px;\n\topacity: ${""===e.unref(c).QJScreenOnce.botNavAnimClass?1:0};`),d:e.s(`width: 100vw; height: ${e.unref(s)+1}px;`)})}},o=e._export_sfc(n,[["__scopeId","data-v-0b04c041"]]);wx.createComponent(o);
