<template>
	<view class="listPopubox" :class="popclass">
		<view class="gridcontainer">
			<navigator class="griditem" v-for="(itme,index) in listpou.populist" :key="index" 
			hover-class="griditemHoverClass" 
			:url="`/pagesResource/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=${itme.name}`">
				<!-- mode="值最好不要有要裁剪的或截取的"在swiper等地方会卡因为动画（不使用也不一定不卡）加image裁剪会卡一下  -->
				<image :src="itme.url" mode="scaleToFill" :draggable="false" lazy-load @load="navimgload(index)"></image>
				<view class="grtext">
					{{itme.name}}
				</view>
			</navigator>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';


// 接收传值数据,异步
const propsZ = defineProps({  //数据不可改
	listpopuData:{
		default:{}
	}
})


	let listpou = propsZ.listpopuData;  //注意这里不能再.populist 了因为传值没有传populist
	// console.log("js@@@",listpou)
	
	let popclass = ref('')
	
	// 处理图片加载完才应用动画
	function navimgload(id){
		// console.log("wai")
		// 只让第一张图片事件运行
		if(id === 0){
			popclass.value = 'listPopuanimclass';
			// console.log("nei")
			
		}
	}
	
	
</script>

<style scoped lang="scss">
	// 进入动画（复制）
	@keyframes lswianimpop {
		1%{
			opacity: 0;
			transform: translateY(100%);
		}
		100%{
			opacity: 1;
			transform: translateY(0%);
		}
	}
	.listPopuanimclass{animation: lswianimpop 1.8s forwards;}
	
	
	.listPopubox{
		margin: 5% auto;
		width: 98%;
		opacity: 0; //配合动画
		// animation: lswianimpop 1.8s forwards;
		
		
		.gridcontainer{
			padding-bottom: 10px;
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			align-content: flex-start;
			justify-content: space-between;
			
			.griditem{
				height: 26vh;
				margin: 2% 1% 0 1%;
				flex-basis: 48%;
				border-radius: 3px;
				// box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
				// background-color: #e9bdff;
				transition: all 0.1s;
				
				image{
					width: 100%;
					height: 75%;
					border-radius: 15px;
				}
				.grtext{
					width: 100%;
					height: 25%;
					font-size: 2.5vh;
					text-decoration: underline;
					// color: #fff;
					// text-shadow: 1px -1px #fff, -1px 1px #999, -10px 10px 5px #80808080;
				}
			}
			.griditemHoverClass{
				transform: scale(0.95,0.95);
				// box-shadow: none;
			}
		}
		

		
	}
</style>