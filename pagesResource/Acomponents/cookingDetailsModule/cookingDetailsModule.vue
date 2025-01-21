<template>
	<scroll-view class="mateboxbody" scroll-y 
	:style="`height: calc(100vh - ${menheight+statusBarHeight+botSafeHeight+3}px);`">
		<!-- 没有值的提示 !!双非运算符用于将任何值转换为布尔值。{}[]值为真0为假1为真 加取反 本生有一个固定属性Aname不枚举  -->
		<view v-if="!!!Object.keys(strData).length" style="width: 100%;text-align: center;">长时间没反应，请重试！</view>
		<!-- 内容 -->
		<template v-if="!!Object.keys(strData).length">
			<!-- 图片 -->
			<image 
			class="topimg"
			:src="strData.topurl" mode="scaleToFill" :draggable="false" lazy-load ></image>
			
			<view class="food">菜名：<text>{{strData.name}}</text></view>
			
			
			<view class="ingrebox">
				<view style="margin-top: 8%; font-size: 3vh;text-decoration: underline;">用料：</view>
				
				<view v-for="(itme,index) in strData.materialDetails" :key="index" class="ingre">
					<view class="ingreleft">{{itme[0]}}</view>
					<view class="ingreright" >{{itme[1]}}</view>
				</view>
			</view>
			
			
			
			<view class="cen">
				<view style="margin-top: 10%; font-size: 3vh;text-decoration: underline;">步骤如下：</view>
				
				<view class="cenlist" v-for="(itme,index) in strData.practContent" :key="index" >
					<view style="margin-top: 10%; font-size: 2.5vh;">步骤{{index+1}}</view>
					
					
					<image
					style="width: 100%;height: 30vh; border-radius: 5px;" 
					:src="itme[0]" mode="scaleToFill" :draggable="false" lazy-load ></image>
					
					<view style="margin-top: 2%; font-size: 2vh; line-height: 3.5vh; letter-spacing: 0.3vw;">{{itme[1]}}</view>
					
				</view>
			</view>
		</template>
	</scroll-view>
</template>

<script setup>
import { getTobBotMar } from '@/utils/getSysInf.js';
const {menheight,statusBarHeight} = getTobBotMar('top') //获取顶部安全距离menheight胶囊高度，statusBarHeight导航栏安全区高度
const{ botSafeHeight } = getTobBotMar('bot')  //pos是定位位置top的（可选）css  bottom 0，bothei是底部导航栏高度，botsafe是底部导航栏安全距离

// 接收传值数据，异步
const propsZ = defineProps({  //数据不可改
	structdData:{
		default:{}
	}
})

	//转用页面响应式数据
	let strData = propsZ.structdData;
	// console.log(strData)
	
	
	
	
</script>

<style scoped lang="scss">
	// 顶部图片动画
	@keyframes topimganim {
		1%{
			opacity: 0;
			transform: translateY(-100%);
		}
		100%{
			opacity: 1;
			transform: translateY(0%);
		}
	}
	
	//通用左进入
	@keyframes leftintoanim {
		1%{
			opacity: 0;
			transform: translateX(-100%);
		}
		100%{
			opacity: 1;
			transform: translateX(0%);
		}
	}
	
	//通用右进入
	@keyframes rightintoanim {
		1%{
			opacity: 0;
			transform: translateX(100%);
		}
		100%{
			opacity: 1;
			transform: translateX(0%);
		}
	}
	
	
	
	
	
	
	.mateboxbody{
		margin: 2rpx auto 0 auto;
		width: 96%;
		border-radius: 5px;
		overflow: hidden;
		
		
		// 顶部图片
		.topimg{
			width: 100%;
			height: 30vh;
			border-radius: 5px;
			opacity: 0;  //配合动画
			animation: topimganim 2s 0.3s forwards;
		}
		
		//菜名
		.food{
			font-size: 3.5vh;
			text-decoration: underline;
			border-top: 2rpx solid #fff;
			opacity: 0;  //配合动画
			animation: leftintoanim 2s 0.3s forwards;
			text{
				font-style: italic;
				letter-spacing: 5px;
			}
		}
		
		// 材料表部分
		.ingrebox{
			opacity: 0;  //配合动画
			animation: rightintoanim 2s 0.3s forwards;
			
			
			.ingre{
				margin-top: 3%;
				display: flex;
				width: 100%;
				height: 2.5%;
				border-bottom: 2rpx solid #55557f;
				
				.ingreleft{
					font-size: 2vh;
					width: 50%;
					height: 100%;
				}
				.ingreright{
					font-size: 2vh;
					width: 50%;
					// display: flex;
					padding-left: 8%;
					
					/* .scrolist{
						margin-right: 8px;
						background-color: #55557f;
						border-radius: 5px;
						letter-spacing: 3px;
						font-size: 2vh;
						height: 100%;
						text-align: center;
						// 在flex布局中让子元素的宽度根据内容决定宽度,其实就是宽度自动，缩放比没了就可以自动了
						flex-shrink: 0; 
						flex-grow: 0; 
					} */
				}
			}
		
		
		}
		
		// 步骤内容
		.cen{
			opacity: 0;  //配合动画
			animation: leftintoanim 2s 0.3s forwards;
		}
		
		.cenlist{
			border-bottom: 2rpx solid #005500;
		}
		
	}
</style>