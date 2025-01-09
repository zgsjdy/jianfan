<template>
	<view class="combox">
		
		<!-- 搜索框  -->
		<view class="searbox">
			<view class="sealeft">
				<input type="text" 
				confirm-type="search" 
				cursor-color="#ffaaff" 
				@focus="searSL.getWhetherOrNotToFocus(false,$event)" 
				@blur="searSL.getWhetherOrNotToBlur(false,$event)"
				v-model="searchNameMyref"
				placeholder="请输入菜名!" 
				placeholder-style="color:#fff;"  class="navinput"/>
				
				<uni-icons type="search" size="3vh" color="#924BDA" class="seaicons"></uni-icons>
			</view>
			
			
			<view class="searight">
				<uni-icons type="undo" size="4.5vh" color="#fff" @click="backClick"></uni-icons>
			</view>
			
			
			
			<!-- 弹出提示框 -->
			<view class="searTips" :style="searSL.searTispStyle">
				<view class="searTipsList" v-for="(itme,index) in 8" :key="index" >
					gsfgsgvsvdd
				</view>
			</view>
		</view>
		
		<!-- 显示搜索内容区 -->
		<view class="comCen">
			<view class="comList"  v-for="(itme, index) in 10" :key="index">
				<image class="comImg" src="https://hbimg.b0.upaiyun.com/4c41eed692ddef7bb8ea37e5decdd85bd8c61ad2917ad-oG36uo_fw658" 
				:draggable="false" lazy-load mode="scaleToFill"></image>
				
				<view class="comText">美国剂量和汉堡</view>
			</view>
		</view>
		
		
	</view>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { queryInput } from "@/utils/getSysInf.js";
import myRef from "../../utils/myRef";


	// 搜索框返回页面函数
	function backClick():void{
		uni.navigateBack();  //返回上一页面
	}
	
	
	// 创建一个类里面有搜索框焦点失去和获取的方法等
	
	type REF = {
		value: string;
	}
	
	type searTispStyle = {
		opacity: number;
		transform:string;
		// [key: string]: string;
	}
	
	interface MyObject {
		//属性
		whetherOrNotToFocus?: boolean; 
		searchName?: string;
		searTispStyle: searTispStyle;
		// 方法
		getWhetherOrNotToFocus(myget: boolean,e?: Object): string | Object;
		getWhetherOrNotToBlur(myget: boolean,e?: Object): string | Object;
	}
	
	class searFB {  /* 无简写 ,注意部分代码无用也没注释练习用的*/
		whetherOrNotToFocus?: boolean;
		searchName?: string;
		searTispStyle: searTispStyle;
		
		constructor(whetherOrNotToFocus?: boolean, searchName?: string){
			this.whetherOrNotToFocus = whetherOrNotToFocus ?? false;
			this.searchName = searchName || '';
			this.searTispStyle = {
				opacity:0,
				transform: "translateY(-12px) scale(1,0)",
			}
		}
		
		
	}
	
	class searFBFun extends searFB {
		// 简写ts
		// public：表示该属性是公有的，可以在类外部访问。
		// private：表示该属性是私有的，只能在类内部访问。
		// protected：表示该属性是受保护的，只能在类及其子类中访问。
		// readonly：表示该属性是只读的，初始化后不能修改。
		
		constructor( whetherOrNotToFocus?: boolean, searchName?: string, public houby: string = "不需要值（如果加了问号就不能有默认值）" ){
			
			super(whetherOrNotToFocus,searchName) //调用父类构造函数
			
		}
		
		
		// 方法
		
		
		/**
		 *聚焦调用函数，并修改whetherOrNotToFocus值，失败返回input的event值，可进行其他操作
		 *  
		*/
		getWhetherOrNotToFocus(myget: boolean = false, e?: Object): string | Object{
			this.whetherOrNotToFocus = true;
			if(this.whetherOrNotToFocus === true){
				
				if(myget){
					this.searTispStyle = Object.assign(this.searTispStyle,{
						opacity:1,
						transform: "translateY(0px) scale(1,1)",
					})
				}
				
				return "聚焦";
			}else{
				// console.log(e)
				return e;
			}
		}
		
		
		/**
		 *失焦调用函数，并修改whetherOrNotToFocus值，失败返回input的event值，可进行其他操作
		 *  
		*/
		getWhetherOrNotToBlur(myget: boolean = false, e?: Object): string | Object{
			this.whetherOrNotToFocus = false;
			if(this.whetherOrNotToFocus === false){
				
				if(myget){
					this.searTispStyle = Object.assign(this.searTispStyle,{
						opacity:0,
						transform: "translateY(-12px) scale(1,0)",
					})
				}
				
				return "失焦";
			}else{
				// 这里一样能获取到e,即使调用的时候没有用（）
				// console.log(e);
				return e;
			}
		}
		
	}
	
	
	
	
	//自定义ref搜索框的值
	let searchNameMyref: REF  = myRef("",400), searSL: MyObject ;
	
	// 在上面自定义ref处以声明
	searSL = reactive(new searFBFun(false,searchNameMyref.value))
	console.log(searSL,"FFF")
	
	
	
	
	// 监视,多个,注意只能监视响应式数据,自定义ref监视这里不用点value，因为监视的是ref，不是ref里面的值
	watch([searchNameMyref, ()=> searSL.whetherOrNotToFocus],([newMY, newFO],[oldMY, oldFO])=>{
		// 判断是否弹出搜索框提示
		if(searSL.whetherOrNotToFocus){
			
			if(searchNameMyref.value !== null && searchNameMyref.value !== undefined && searchNameMyref.value !== "" ){
				// console.log(searchNameMyref.value)
				searSL.getWhetherOrNotToFocus(true)
				
				// 调用搜索函数
				queryInput('jianfandata','jfContentsData',{name:searchNameMyref.value},8,"降序").then((res)=>{
					// console.log(res)
					searSL.searchName =  res;
					console.log(searSL.searchName);
				});
				
				
			}
			
		}else{
			searSL.getWhetherOrNotToBlur(true)
		}
		
		// console.log([newMY, newFO],[oldMY, oldFO])
	});
	
	
	
	
	
	
	
	
</script>

<style lang="scss" scoped>
	// 列表动画 
	@keyframes searList {
		1%{
			opacity: 0;
			transform: translateY(-300px) scale(1,0);
		}
		30%{
			opacity: 0;
		}
		100%{
			opacity: 1;
			transform: translateY(0) scale(1,1);
		}
	}
	
	
	
	
	// 搜索框
	.combox{
		width: 98%;
		margin: 0 auto;
		padding-bottom: calc( env(safe-area-inset-bottom) + 3px);  //使用自带的安全距离
		
		
		
		
		// 搜索框
		.searbox{
			width: 98%;
			height: 5vh;
			margin: 2% auto 0 auto;
			padding: 2px;
			box-sizing: border-box;
			// overflow: hidden;
			position: relative;
			display: flex;
			
			
			// 弹出搜索框提示
			.searTips{
				--backTisp: #fff;
				width: 75vw;
				height: 30vh;
				padding: 10px;
				border-radius: 15px;
				background-color: var(--backTisp);
				opacity: 0; //配合动画
				transition: all 0.4s;
				transform-origin: center top; 
				// animation: searList 1.5s forwards;
				position: absolute;
				top: 120%;
				right: 10%;
				z-index: 9;
				
				// transform-style: preserve-3d;
				
				
				.searTipsList{
					width: 100%;
					margin-bottom: 10px;
					border-bottom: 1px dotted #aaaa00;
					padding-bottom: 3px;
				}
				
			}
			.searTips::before{
				display: block;
				content: "";
				border: 8px solid var(--backTisp);
				width: 0;
				height: 0;
				position: absolute;
				top: -2%;
				right: 4%;
				transform: rotate(45deg); //这里不修改层级，用了动画固定了
				// z-index: -1;  // 这里无效z-index 的层级关系是相对于同一个堆叠上下文的。
				// transform: rotate(45deg) translateZ(-1px);  //代替z-index,注意动画不能forwards固定否者无效,要配合父元素使用transform-style: preserve-3d;才有3d效果
			}
			
			
			.sealeft{
				height: 100%;
				width: 90%;
				background-color: #4B282B90;
				border-radius: 50px;
				padding-left: 10px;
				
				.navinput{
					height: 100%;
					width: 86%;
					color: #fff;
				}
				
				.seaicons{
					position: absolute; 
					top: 14%;
					right: 11.5%;
					box-sizing: border-box; 
					padding: 0.5% 0 0 0.6%;
					background-color: #fff; 
					border-radius: 100px; 
					width: 3.5vh;
					height: 3.5vh;
					transition: all 0.1s;
				}
				
				.seaicons:active{
					transform: scale(0.9,0.9);
				}
				
			}
			
			.searight{
				height: 100%;
				width: 10%;
				transition: all 0.1s; 
			}
			
			.searight:active{
				transform: scale(0.9,0.9);
			}
			
		}
		
		
		// 内容区
		.comCen{
			width: 98%;
			// background-color: #55aaff;
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			align-content: flex-start;
			justify-content: space-between;
			
			.comList{
				--ImgHeight: 80%; //图片的高度，方便其他模块动态计算高度
				
				background-color: #ff55ff50;
				width: 46%;
				height: 25vh;
				margin: 2%;
				padding: 10px;
				border-radius: 15px;
				overflow: hidden;
				opacity: 0;  //配合动画
				animation: searList 1.5s forwards;
				
				
				.comImg{
					width: 100%;
					height: var(--ImgHeight);
					border-radius: 8px;
					animation: searList 1.5s;
				}
				
				.comText{
					width: 100%;
					height: calc(100% - var(--ImgHeight));
					padding-top: 1%;
					border-top: #fff dashed 2px;
					font-size: 2vh;
					text-align: center;
					letter-spacing: 3px;
					text-decoration: underline;
					animation: searList 1.5s;
				}
			}
			
			
		}
		
		
		
	}
</style>