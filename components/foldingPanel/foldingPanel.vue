<template>
	<view class="mateboxbody" 
	:style="`height: calc(100vh - ${menheight+statusBarHeight+botHeight+16}px);`">
		<scroll-view
		scroll-y
		class="matebox" 
		:class="anmidata.botNavAnimClass"
		:style="`opacity: ${anmidata.botNavAnimClass === '' ? 1 : 0}; `">
			
			
			<!-- 折叠面板 -->
			<uni-collapse accordion >
				<uni-collapse-item v-for="(itme,index) in goToData.QJpopularchVmeSel[2].meat" :key="index" title-border="none" :border="false">
					<template v-slot:title>
						<view class="colltile">
							<image class="collimg" :src="itme.meatda.meurl" mode="aspectFit" :draggable="false" lazy-load ></image>
							<view class="colltext">{{ itme.meatda.mename }}</view>
						</view>
					</template>
					<!-- 折叠内容打开部分 -->
					<material :pageIndex="2" :pageheight="compedata[index]" :coenindex="index"></material>
				</uni-collapse-item>
			</uni-collapse>
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
	
	// console.log(goToData.QJpopularchVmeSel[2].meat)
	
	// 开头点击动画应用,给默认值使透明度==0,使用生命周期让动画和页面加载不一起运行导致卡顿
	let anmidata = reactive({botNavAnimClass:'000'})
	onMounted(()=>{
		
		anmidata.botNavAnimClass = 'rightboxanim';

		// 清除动画类名  不是全局的变量
		setTimeout(()=>{
			anmidata.botNavAnimClass = '';
		},1990)
		
	})
	
	// 动态计算给组件传值高度
	let compedata = [];
	let QJpopudata = goToData.QJpopularchVmeSel[2].meat
	function dynamicCalculationHeight(QJpopudata=null){
		try{
			QJpopudata.map((itme)=>{
				switch(itme.meatda.mename){
					case "猪肉":
						compedata.push(58)
						break;
						
						
					case "驴肉":
						compedata.push(36)
						break;
						
					case "兔肉":
						compedata.push(36)
						break;
						
					case "鹌鹑肉":
						compedata.push(36)
						break;
						
					case "鸽肉":
						compedata.push(36)
						break;
						
						
					case "蟹类":
						compedata.push(36)
						break;
						
					case "软体动物类":
						compedata.push(36)
						break;
						
						
					default:
						compedata.push(51)
				}
			})
			
			
		}catch(e){
			throw new Error(`dynamicCalculationHeight函数错误，默认null${e}`);
		}
	}
	// 调用
	dynamicCalculationHeight(QJpopudata)
	
	// console.log(compedata)
	
	
	
	
	
	
</script>

<style scoped lang="scss">
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
	
	
	.mateboxbody{
		margin: 10rpx auto 0 auto;
		width: 98%;
		border-radius: 5px;
		overflow: hidden;
		
		
		.matebox{
			box-sizing: border-box;
			opacity: 0;
			width: 100%;
			height: 100%;
			background-image: linear-gradient(to bottom, #a18cd1 0%, #ffffff00 100%);
		}
	}
	
	
	// 折叠面板的插槽部分标题
	// *********注意部分样式是修改插件源码实现的**********
	.colltile{
		margin-top: 3px;
		width: 100%;
		height: 10vh;
		border-radius: 10px;
		overflow: hidden;
		background-color: #ffffff38;
		
		
		.collimg{
			display: block;
			width: 100%;
			height: 70%;
		}
		.colltext{
			width: 100%;
			height: 30%;
			letter-spacing: 8px;
			text-align: center;
			font-size: 4vw;
		}
	}
</style>