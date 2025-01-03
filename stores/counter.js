import { defineStore } from 'pinia'

export const useBotNarStor = defineStore("jfStoresData",{
	// 存
	state(){
		return{
			goTo:{
				gtSrc:["../../static/imgs/baicai1.png","../../static/imgs/pingdiguo.png","../../static/imgs/jitui1.png"],
				gtText:["蔬菜","合成","肉类"],
				// 数组前面值是默认值，并且要按顺序
				defSrc:[
					"../../static/imgs/baicai1.png",
					"../../static/imgs/pingdiguo1.png",
					"../../static/imgs/jitui1.png",
					"../../static/imgs/baicai.png",
					"../../static/imgs/pingdiguo.png",
					"../../static/imgs/jitui.png",
				],
				contBotPage:["/pages/chooseVegetables/chooseVegetables","/pages/index/index","/pages/meatSelection/meatSelection"],
				animationslData:[null,null,null],
				animationslDataZC:[null,null,null]
			},
			QJScreenOnce:{
				botNav:false,
				dfScreen:true,
				botNavAnimClass:'botboxanim'
			},
			QJScreenOnceimg:{Aname:"首屏加载后请求的图片。"},
			QJpopularchVmeSel:{Aname:"首页加载后请求的蔬菜肉类热门菜图片。"},
			QJnavBardata:[],
			// 点击选材已选或取消动画数组 默认值0是用来计算所有肉类要用的动画值数组,第一项是蔬菜最后一项是肉类，第二项是计算所有类肉
			QJcVanmiArr:[[],0,[]],
			// 弹出层数组，防止出现多个页面都可以打开弹出层
			QJonpopup:[],
			//页面弹出是否分析的已选菜品全局变量
			analyseStyle:{
				top:"100vh",
				transform: 'scale(0,0)',
				opacity: 0,
				countDown:6,
				countDownterufals:false
			}
		}
	},
	// 改
	actions:{
		// 修改底部img数据
		setBotNar(id=null,setindex=null,def=null){
			try{
				if(this.goTo.gtSrc[id]===this.goTo.defSrc[def]){
					// 恢复默认值
					this.goTo.gtSrc = this.goTo.gtSrc.map((itme,index)=>{
						return this.goTo.defSrc[index]
					})
					// 修改变化值
					this.goTo.gtSrc = this.goTo.gtSrc.map((item,index) => {
						return index === id ? this.goTo.defSrc[setindex] : item;
					})
					uni.switchTab({
						url: this.goTo.contBotPage[id],
						fail(){
							uni.showToast({
								title: '点击过于频繁',
								icon:"error",
								mask:true,
								duration: 1500
							});
									
						}
					});
				}else{console.log("setbot相等不运行！")}
			}catch(e){
				throw new Error(`参数错误setBotNar，默认null${e}`);
			}
		},
		// 修改动画数据
		setanim(id=null,anmiclass=null,anmiclassZC=null,def=null){
			try{
				if(this.goTo.gtSrc[id]===this.goTo.defSrc[def]){
					setTimeout(()=>{
						this.goTo.animationslDataZC = this.goTo.animationslDataZC.map((item,index)=>{
							return index === id ? anmiclassZC : null;
						 })
					},80)
					setTimeout(()=>{
						this.goTo.animationslData = this.goTo.animationslData.map((item,index)=>{
							return index === id ? anmiclass : null;
						 })
					},80)
				}else{console.log("anim相等不运行")}
			}catch(e){
				throw new Error(`参数错误setanim，默认null${e}`);
			}
		}
	}
})











