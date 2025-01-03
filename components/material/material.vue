<template>
	<view 
	class="matebox" 
	:style="`height: calc(${propsZ.pageheight}vh - ${menheight+statusBarHeight+botHeight+16}px);`">
		<!-- 内容区域 -->
	<scroll-view 
	class="scrollvi" 
	:class="anmidata.botNavAnimClass"
	:style="`opacity: ${anmidata.botNavAnimClass === '' ? 1 : 0}; 
	background-image: linear-gradient(to bottom, ${propsZ.pageIndex === 1 ? '#dfffe4 0%, #ffffff00 100%' : '#dfdfff 0%, #ffffff00 100%'});`"
	scroll-y enable-flex >
		<view class="coenbox cailiaoboxanim" v-for="(itme,index) in materData.vegetables" :key="itme.id">
			<view class="coentop">
				<image :src="itme.cVurl" mode="aspectFit" :draggable="false" lazy-load ></image>
				<view>{{itme.cVname}}</view>
			</view>
			<view class="coenbot" @click="clickOnTheOrder(itme.id - 1,index)">
				<view class="less"></view>
				<view class="plus" 
				:class="goToData.QJcVanmiArr[conjishu][itme.id - 1]" 
				:style="`opacity: ${goToData.QJcVanmiArr[conjishu][itme.id - 1] === null ? 1 : 0 };`">
				<!--                         这里itme.id - 1 计算会自己动使用 parseInt() 函数 把00001 ==> 1       -->
				</view>
			</view>
		</view>
	</scroll-view>
	</view>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
import { getTobBotMar } from '../../utils/getSysInf';  //导入获取上下导航栏高度函数
import { useBotNarStor } from '@/stores/counter';//导入pinia，不使用数据集中管理无法实现图标切换，页面切换会更新变回默认值
const goToData = useBotNarStor()//获取pinia数据




const {menheight,statusBarHeight} = getTobBotMar('top') //获取顶部安全距离menheight胶囊高度，statusBarHeight导航栏安全区高度
const{ positScreen,botHeight,botSafeHeight } = getTobBotMar('bot')  //pos是定位位置top的（可选）css  bottom 0，bothei是底部导航栏高度，botsafe是底部导航栏安全距离


// 接收通过属性（props）传值
const propsZ = defineProps({
	// 这个名字要和传过来的值名一样
	pageIndex:{
		type:Number,
		default:-1
	},
	pageheight:{
		type:Number,
		default:100
	},
	coenindex:{
		type:Number,
		default:-1
	}
})
// console.log(propsZ)
	

	// 获取页面数据
	let materData;
	if(goToData.QJpopularchVmeSel[propsZ.pageIndex].vmtype === '蔬菜'){
		materData = goToData.QJpopularchVmeSel[propsZ.pageIndex]
	}else if(goToData.QJpopularchVmeSel[propsZ.pageIndex].vmtype === '肉类'){
		materData = goToData.QJpopularchVmeSel[propsZ.pageIndex].meat[propsZ.coenindex]
	}else{
		console.log("material组件数据获取错误！")
	}
	
	// console.log(goToData.QJpopularchVmeSel[propsZ.pageIndex])
	// console.log(materData)
	
	
	// 开头点击动画应用,给默认值使透明度==0,使用生命周期让动画和页面加载不一起运行导致卡顿
	let anmidata = reactive({botNavAnimClass:'000'})
	onMounted(()=>{
		
		// 判断是肉类还是蔬菜
		if(propsZ.pageIndex === 1){
			anmidata.botNavAnimClass = 'leftboxanim';
			// console.log("leeee")
		}else if(propsZ.pageIndex === 2){
			anmidata.botNavAnimClass = 'rightboxanim';
			// console.log("RRReeee")
		}
		
		// 清除动画类名  不是全局的变量
		setTimeout(()=>{
			anmidata.botNavAnimClass = '';
		},1990)
		
	})
	
	
	// 点击添加菜品加号动画数组
	let conjishu = 0;
	if(goToData.QJpopularchVmeSel[propsZ.pageIndex].vmtype === '蔬菜'){
		// 在数组前面赋值
		goToData.QJcVanmiArr[0] = new Array(materData.vegetables.length).fill(null);
	}else if(goToData.QJpopularchVmeSel[propsZ.pageIndex].vmtype === '肉类'){
		goToData.QJcVanmiArr[1] += materData.vegetables.length;
		// console.log(goToData.QJcVanmiArr[1])
		// 把肉类动画数组值赋值给数组最后一个
		goToData.QJcVanmiArr[goToData.QJcVanmiArr.length-1] = new Array(goToData.QJcVanmiArr[1]).fill(null);
		// 修改下方赋值下标
		conjishu = goToData.QJcVanmiArr.length-1;
	}
	
		
	
	
	// console.log(cVanmiArr,"PPPP")
	
	function clickOnTheOrder(index ,crid){
		// console.log(goToData.QJcVanmiArr[2])
		// console.log(index)
		if(goToData.QJcVanmiArr[conjishu][index] !== 'cVanmiArr'){
			goToData.QJcVanmiArr[conjishu][index] = 'cVanmiArr';
			
			// 添加数据到导航栏
			goToData.QJnavBardata.push(materData.vegetables[crid])
		}else if(goToData.QJcVanmiArr[conjishu][index] !== 'cVanmiArrCancel'){
			goToData.QJcVanmiArr[conjishu][index] = 'cVanmiArrCancel';
			
			// 取消添加数据到导航栏                               直接对象===也可以
			let indexid = goToData.QJnavBardata.findIndex(person => person.cVname === materData.vegetables[crid].cVname) //找到取消索引
			goToData.QJnavBardata.splice(indexid,1) //删除索引的值
		}
		
	}
	
	
	
	
	
	
	
</script>

<style lang="scss" scoped>
	
	// 开头进入动画蔬菜
	@keyframes leftboxanim {
		1%{
			opacity: 0;
			border-radius: 0px;
			transform: translateX(-100%) scale(0.1,0.8);
		}
		100%{
			opacity: 1;
			border-radius: 5px;
			transform: translateX(0%) scale(1,1);
		}
	}
	.leftboxanim{animation: leftboxanim 2s;}
	
	
	// 开头进入动画肉类
	@keyframes rightboxanim {
		1%{
			opacity: 0;
			border-radius: 0px;
			transform: translateX(100%) scale(0.1,0.8);
		}
		100%{
			opacity: 1;
			border-radius: 5px;
			transform: translateX(0%) scale(1,1);
		}
	}
	.rightboxanim{animation: rightboxanim 2s;}
	
	
	// 开头进入动画材料区
	@keyframes cailiaoboxanim {
		1%{
			opacity: 0;
			border-radius: 0px;
			transform: translateY(100%) scale(0.8,0.1);
		}
		100%{
			opacity: 1;
			border-radius: 10px;
			transform: translateY(0%) scale(1,1);
		}
	}
	.cailiaoboxanim{animation: cailiaoboxanim 2s 0.3s; transform-origin: 50% 100%;}
	
	
	// 选材后添加的动画
	@keyframes cVanmiArr {
		1%{
			opacity: 1;
			transform: translateY(0vh) scale(1,1) rotate(90deg);
		}
		50%{
			opacity: 1;
			transform: translateY(-5vh) scale(2,3) rotate(90deg);
		}
		99%{
			opacity: 0.8;
			transform: translateY(-85vh) scale(1,1) rotate(90deg);
		}
		// 因为动画不是用窗口定位，没有脱离层级加上动画固定，所以会导致后面的动画固定后在页面上挡住其它元素
		100%{
			display: none;
		}
	}
	.cVanmiArr{animation: cVanmiArr 2s forwards; /* transform-origin: 50% 100%; */}
	
	// 选材取消后添的动画
	@keyframes cVanmiArrCancel {
		1%{
			display: block;
			opacity: 0;
			transform: translateY(-85vh) scale(1,1) rotate(90deg);
			
		}
		2%{
			opacity: 0.3;
			transform: translateY(-84vh) scale(1,1) rotate(90deg);
			
		}
		50%{
			opacity: 1;
			transform: translateY(-5vh) scale(2,3) rotate(90deg);
		}
		100%{
			opacity: 1;
			transform: translateY(0vh) scale(1,1) rotate(90deg);
		}
	}
	.cVanmiArrCancel{animation: cVanmiArrCancel 2s forwards;}
	
	
	
	
	.matebox{
		margin: 10rpx auto 0 auto;
		width: 98%;
		overflow: hidden;
		border-radius: 5px;
		
		
		.scrollvi{
			box-sizing: border-box;
			padding: 6rpx;
			padding-bottom: 0px;
			width: 100%;
			height: 100%;
			display: flex;
			flex-wrap: wrap;
			
			
			
			.coenbox{
				margin: 1%;
				padding: 5px;
				min-width: 23%;
				max-width: 23%;
				// 下面两行适配其他页面调用该组件
				min-height: 13vh;
				max-height: 13vh;
				box-shadow: 1px -1px #fff, -1px 1px #999, -10px 10px 5px #80808080;
				// overflow: hidden;
				border-radius: 10px;
				
				.coentop{
					width: 100%;
					height: 80%;
					border-bottom: 3px double #55ff00;
					// background-color: #ffaa00;
					
					image{
						display: block;
						width: 100%;
						height: 70%;
					}
					view{
						width: 100%;
						height: 30%;
						font-size: 3.5vw;
						text-align: center;
					}
				}
				
				.coenbot{
					width: 100%;
					height: 20%;
					background-color: #e7e7e7;
					border-radius: 5px;
					position: relative;
					
					
					.less{
						position: absolute;
						top: 52%;
						left: 39%;
						width: 26%;
						height: 10%;
						border-radius: 100%;
						background-color: #ff55ff;
					}
					.plus{
						@extend .less;
						width: 18%;
						transform: rotate(90deg);
					}
					
				}
				.coenbot:active{
					background-color: #a2a2a2;
				}
			}
			// 选着父元素最后一个子元素生成一个伪类解决最后一行和底边距太近的问题
			.coenbox:last-child::after{
				content: "";
				display: block;
				width: 100%;
				height: 20px;
			}
		}
	}
</style>