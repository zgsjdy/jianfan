<template>
	<view 
	class="botbox" 
	:class="goToData.QJScreenOnce.botNavAnimClass"
	:style="`
	top: ${positScreen}px;
	height:${botHeight}px;
	padding-bottom: ${botSafeHeight}px;
	opacity: ${goToData.QJScreenOnce.botNavAnimClass === '' ? 1 : 0};`">
		<view class="botcon" v-for="(itme,index) in goToData.goTo.gtSrc" :key="index">
			<view @click="goToTabPage(index)">
				<view 
				class="falo" 
				:class="goToData.goTo.animationslDataZC[index]" 
				:style="`filter: blur(${goToData.goTo.animationslDataZC[index] === 'cvcvZC' ? 0 : 3}px);`"></view>  <!-- 浮动切换屏幕转场元素 -->
				<image :src="itme" :class="goToData.goTo.animationslData[index]" mode="aspectFit" fade-show></image>
				<text>{{goToData.goTo.gtText[index]}}</text> 
			</view>
		</view>
	</view>
	
	<view :style="`width: 100vw; height: ${botHeight+1}px;`"></view>
</template>

<script setup>
import { reactive } from 'vue';
import { getTobBotMar } from '@/utils/getSysInf.js';//导入定位函数
import { useBotNarStor } from '@/stores/counter';//导入pinia，不使用数据集中管理无法实现图标切换，页面切换会更新变回默认值
const{ positScreen,botHeight,botSafeHeight } = getTobBotMar('bot')  //pos是定位位置top的（可选）css  bottom 0，bothei是底部导航栏高度，botsafe是底部导航栏安全距离
const goToData = useBotNarStor()//获取pinia数据
// console.log(goToData.goTo)

	// 闭包，构建关闭在肉类和蔬菜的分析，使用闭包不污染全局变量
	/* function outer(fn,daly){
		let setTmId; 
		return function(){
			if(setTmId){clearTimeout(setTmId);}
			setTmId = setTimeout(fn,daly);				
		}
	}
	let bibaoOut = outer(()=>{
		console.log("qingchu")
		if(goToData.analyseStyle.top === '0vh'){
			//批量修改对象里面的属性值，还不破坏源对象(关闭弹出是否分析)
			goToData.analyseStyle = Object.assign(goToData.analyseStyle,{
				opacity: 0,
				top:"100vh",
				transform: 'scale(0,0)',
			});
		}
	},5000); */
	
	
	// 点击事件和修改pinia值
	function goToTabPage(id=null){
		//判读是哪个按钮需要更改
		switch(id){
			case 0:
				// 创建动画注意顺序要先给动画判断后才可以修改img数据否则动画失效
				goToData.setanim(id,"cvcv","cvcvZC",0)
				
				// 修改按钮img数据,加跳转
				goToData.setBotNar(id,3,0);
				
				
				break;
			case 1:
				// 创建动画注意顺序要先给动画判断后才可以修改img数据否则动画失效
				goToData.setanim(id,"cvcv","cvcvZC",1)
				
				// 修改按钮img数据,加跳转
				goToData.setBotNar(id,4,1);
				
				
				// 这里修改全局变量弹出分析模块
				if(goToData.QJnavBardata.length !== 0){
					if(goToData.analyseStyle.top !== '0vh' && goToData.analyseStyle.opacity === 0){
						//批量修改对象里面的属性值，还不破坏源对象
						goToData.analyseStyle = Object.assign(goToData.analyseStyle,{
							top:"0vh",
							transform: 'scale(1,1)',
							opacity: 1
						});
						
						//取消按钮的倒计时
						goToData.analyseStyle.countDown = 5;
						
						goToData.analyseStyle.countDownterufals = setInterval(()=>{
							goToData.analyseStyle.countDown--;
						},1000)
						
					}
				}
				
				
				break;
			case 2:
				// 创建动画注意顺序要先给动画判断后才可以修改img数据否则动画失效
				goToData.setanim(id,"cvcv","cvcvZC",2)
				
				// 修改按钮img数据,加跳转
				goToData.setBotNar(id,5,2);
				
				
				break;
			
			default:
			throw new Error('参数错误，只能是整数类型下标0开始，默认false');
		}
		

	}
	
	// 底部导航栏上升清除动画类名和所有用到这个全局的变量
	setTimeout(()=>{
		goToData.QJScreenOnce.botNavAnimClass = '';
	},1490)
	
</script>

<style lang="scss" scoped>
	// 点击动画实体
	@keyframes goToFrames {
		1%{
			opacity: 0;
			transform: scale(0.3,0) translateY(30px);
		}
		100%{
			opacity: 1;
			transform: scale(1,1) translateY(0px);
		}
	}
	// 点击动画类名
	.cvcv{
		transform-origin: 50% 100%;
		animation: goToFrames 0.6s;
	}
	
	// 点击转场动画实体
	@keyframes goToFramesZC {
		50%{
			filter: blur(0px);
			transform: scale(1.3,1.3);
		}
		90%{
			filter: blur(3px);
			transform: scale(1,1);
		}
		100%{
			filter: blur(0px);
			transform: scale(1,1);
		}
	}
	// 点击转场动画类名
	.cvcvZC{
		transform-origin: 50% 50%;
		animation: goToFramesZC 0.8s;
	}
	
	// 开头进入动画
	@keyframes botboxanim {
		1%{
			opacity: 0;
			transform: translateY(100%) scale(1,0);
		}
		100%{
			opacity: 1;
			transform: translateY(0%) scale(1,1);
		}
	}
	.botboxanim{animation: botboxanim 1.5s;}
	
	.botbox{
		width: 100vw;
		height: $uni-bot-heiget;
		background-color: #F8F8F8;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		// bottom: 0;
		z-index: 999;
		padding-bottom: env(safe-area-inset-bottom);//css底部安全距离写法
		// position: sticky;  //粘性定位写法
		// bottom: 0;
		
			
		/* 当设置为flex: 50%;时，相当于：
		flex-grow: 1;（默认值为 0，设置为 1 表示如果有剩余空间，该项目会等比例放大）。
		flex-shrink: 1;（默认值为 1，表示如果空间不足，该项目会等比例缩小）。
		flex-basis: 50%;（表示在分配多余空间之前，该项目占据的主轴空间为其父容器主轴空间的 50%）。 */
		.botcon{
			flex: 33.33%;
			max-width: 33.33%;
			height: 100%;
			flex-grow: 0;
			flex-shrink: 0;
			flex-basis: 33.33%;
			
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			view{
				height: 100%;
				width: 35%;
				position: relative;
				.falo{
					position: absolute;
					left: -26%;
					top: -22%;
					z-index: -1;
					width: 150%;
					// padding-top: 150%;
					height: 150%;
					// border-radius: 50%;
					background-image: url("../../static/imgs/pipeizhong.png");
					background-size: 100% 100%;
					background-position: center center;
					filter: blur(3px); /* 添加 10 像素的模糊效果 */
				}
				image{
					display: block;
					margin: 0;
					padding: 0;
					width: 100%;
					height: 70%;
				}
				text{
					@extend image;
					height: 30%;
					text-align: center;
					font-size: 12px;
					letter-spacing: 6px;
					transform: translateX(3px);
				}
			}
		}
		
	}
</style>