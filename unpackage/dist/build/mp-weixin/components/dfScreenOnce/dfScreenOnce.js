"use strict";const e=require("../../common/vendor.js"),n=require("../hooks/usedfScreenOnce.js"),a={__name:"dfScreenOnce",setup(a){const{anim:r,dfimg:s,loadImgAnim:t,reviseMovAnim:u,resetMov:f,touStart:o,menheight:i,statusBarHeight:m}=n.usedfScreenOnce();return(n,a)=>e.e({a:e.unref(s).data},e.unref(s).data?{b:e.f(e.unref(s).data.floatimg,((n,a,s)=>({a:a,b:n,c:e.s(`${e.unref(r).folatdata[a]}animation-delay: ${e.unref(r).animdelay}s;`)}))),c:e.unref(s).data.butimg,d:e.o(((...n)=>e.unref(t)&&e.unref(t)(...n))),e:e.o(((...n)=>e.unref(u)&&e.unref(u)(...n))),f:e.o(((...n)=>e.unref(f)&&e.unref(f)(...n))),g:e.o(((...n)=>e.unref(o)&&e.unref(o)(...n))),h:e.s(`opacity: ${"jemoar"==e.unref(r).animclass?0:1};`),i:e.unref(r).butResetY,j:e.n(e.unref(r).animclassimg),k:e.n(e.unref(r).animclass),l:e.s(`opacity: ${"moarebox"==e.unref(r).animclass||"jemoar"==e.unref(r).animclass?1:0};`)}:{})}},r=e._export_sfc(a,[["__scopeId","data-v-9781f085"]]);wx.createComponent(r);
