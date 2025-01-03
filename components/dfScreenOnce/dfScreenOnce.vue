<template>   												<!-- 注意css要有空格，直接写%不能完全适配 -->
	<view class="bodybox" v-if="dfimg.data" :style="`height: calc(100vh - ${statusBarHeight + menheight+2}px);`"><!-- v-if="dfimg.data"  解决提前加载访问数据为空报错 -->
		<image v-for="(itme,index) in dfimg.data.floatimg" 
		:key="index" 
		:src="itme" 
		mode="aspectFit" 
		class="floatimg" 
		:draggable="false"
		:style="`${anim.folatdata[index]}animation-delay: ${anim.animdelay}s;`"></image>

		<!-- 滑动按钮 -->
		<movable-area 
		class="moarea" 
		:class="anim.animclass" 
		:style="`opacity: ${anim.animclass == 'moarebox' || anim.animclass == 'jemoar' ? 1 : 0};`">    
			<movable-view 
			@change="reviseMovAnim" 
			@touchend="resetMov"
			@touchstart="touStart"
			:style="`opacity: ${anim.animclass == 'jemoar' ? 0 : 1};`"
			:y="anim.butResetY" 
			class="moview"  
			:class="anim.animclassimg"
			direction="vertical" 
			out-of-bounds>
				<image mode="aspectFit" :src="dfimg.data.butimg" class="dfimg" @load="loadImgAnim"></image>
			</movable-view>
		</movable-area>
	</view>
</template>

<script setup>
 import usedfScreenOnce from '@/components/hooks/usedfScreenOnce.js'
 
 const { anim, dfimg, loadImgAnim, reviseMovAnim, resetMov, touStart, menheight, statusBarHeight } = usedfScreenOnce()
	
</script>

<style lang="scss" scoped>
	@keyframes floatimg {
		1%{
			opacity: 0;
			transform: scale(0,0) translateY(200%) skewY(40deg) rotateX(-150deg);
		}
		50%{
			opacity: 1;
			transform: scale(1,1) translateY(0%) skewY(0deg) rotateX(0deg);
		}
		70%{
			opacity: 1;
			transform: scale(1.6,1.6) translateY(-20%) skewY(-4deg) rotate(10deg);
		}
		100%{
			opacity: 0;
			transform: scale(0,0) translateY(-200%) skewY(-40deg) rotateX(150deg);
		}
	}
	
	@keyframes moareone {
		1%{
			opacity: 0;
			transform: translateY(0%);
		}
		100%{
			opacity: 1;
			transform: translateY(50%);
		}
	}
	.moareone{animation: moareone 1.5s;}
	@keyframes moarebox {
		1%{
			border-color: #ffaaff;
			border-radius: 20px;
			transform: scale(1,1) translateY(50%);
		}
		10%{
			border-color: #c4acff;
		}
		20%{
			border-color: #a7c3ff;
		}
		30%{
			border-color: #aaddff;
		}
		40%{
			border-color: #ff9999;
		}
		65%{
			border-color: #ffb0a5;
		}
		100%{
			border-color: transparent;
			border-radius: 0px;
			transform: scale(1.08,1.08) translateY(50%);
		}
	}
	.moarebox{animation: moarebox 3s alternate infinite linear;}
	@keyframes moarimg {
		100%{
			border: 3px double #ffaaff;
			outline: #55aaff 4px double;
			outline-offset: 5px;
		}
	}
	.moarimg{animation: moarimg 1s alternate infinite linear;}
	@keyframes moarimgtu {
		100%{
			border: 3px double #aaffff;
			outline: #55ff7f 4px double;
			outline-offset: 5px;
		}
	}
	.moarimgtu{animation: moarimgtu 0.5s forwards;}
	// 转场动画背景铺满全屏元素
	@keyframes jemoar {
		1%{
			opacity: 1;
			transform: scale(1,1) translateY(50%);
		}
		25%{
			opacity: 0;
			transform: scale(0,0) translateY(-50%);
		}
		26%{
			opacity: 0;
			transform: scale(0,0) translateY(130%);
		}
		27%{
			border-radius: 90px;
			opacity: 1;
			transform: scale(5,3) translateY(130%);
		}
		52%{
			border-radius: 90px;
			background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
			opacity: 1;
			transform: scale(5,3) translateY(70%);
		}
		90%{
			opacity: 1;
			background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
			transform: scale(5,3.5) translateY(10%);
			filter: blur(5px);
		}
		100%{
			border-radius: 0px;
			opacity: 0.1;
			background-image: linear-gradient(to right, #fa709a 0%, #fee140 100%);
			transform: scale(5,3.5) translateY(0%);
			filter: blur(5px);
		}
	}
	.jemoar{ animation: jemoar 1.8s linear forwards; }
	//static样式
	.bodybox{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		.floatimg{
			width: 11%;
			height: 8%;
			position: fixed;
			top: 0px;
			z-index: 10;
			opacity: 0;
			animation: floatimg 3s paused;
		}
		
		.moarea{
			box-sizing: border-box;
			margin: 0;
			padding: 0;
			width: 25%;
			height: 38%;
			transform: translateY(50%);
			border: 3px dashed #ffaaff;
			border-top: none;
			border-bottom: none;
			border-radius: 20px;
			opacity: 0;
			.moview{
				box-sizing: border-box;
				// margin: 0 auto 无效
				margin-left: 10%;
				width: 80%;
				overflow: hidden;
				border-radius: 50%;
				padding-top: calc(80% - 4px);  //居于80%父元素的宽度减去里面包含的图片元素10px
				position: relative;
				border: 2px solid #ff5500;
				outline: #a7c3ff 3px double;
				outline-offset: 3px;
				.dfimg{
					box-sizing: border-box;
					margin: 0;
					padding: 0;
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>