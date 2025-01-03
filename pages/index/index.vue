<template>
	<!-- 主体溢出隐藏大多数是为了苹果兼容，苹果背景固定不了会跟着页面滚动 -->
	<view class="bodyboxback" style="overflow-x: hidden; overflow-y: scroll;">
		<!--  顶部导航栏   -->
		<navBarQJ v-if="bottf.QJScreenOnce.botNav" 
		:navImg="bottf.goTo.gtSrc[1]" 
		:navText="bottf.goTo.gtText[1]" :pageIndex="1"></navBarQJ>	
		
		
		
		<!--  首页展屏   -->
		<dfScreenOnce v-if="bottf.QJScreenOnce.dfScreen"></dfScreenOnce>
		
		
		
		<!-- 热门菜 -->
		<popularDishes v-if="bottf.QJScreenOnce.botNav">
			
			<!-- 提示区域 具名插槽加作用域插槽 -->
			<template v-slot:tipArea="data">
				<!-- {{ console.log(data) }} -->
				<image 
				v-if="data.tipAreadata.goTo" 
				class="tishi" 
				:class="data.tipAreadata.tsanim" 
				@load="data.tipAreadata.tishianim"
				:src="data.tipAreadata.goTo.popularDishesTips" mode="aspectFit" :draggable="false" >
				<!-- data后面的tipAreadata要和插槽传值名字一样 -->
				</image>
			</template>
			
		</popularDishes>
		
		
		
			<!-- 练习区 -->
		<!-- <view class="boxcon" :style="`animation-delay: ${gg}s;`">
			{{refcl}}
			<input type="text" v-model="refcl"/>
			<input type='text' v-model="gg"/>
		</view> -->
		
		
		
		
		<!--  底部导航栏   -->
		<botNavBarQJ v-if="bottf.QJScreenOnce.botNav"></botNavBarQJ>				
	</view>
</template>

<script>
// ****************这个是vue3没有语法糖的写法文件*****************
import { ref } from 'vue'
import { useBotNarStor } from '@/stores/counter'  //导入pinia

	export default{
		name:"index",
		setup(props, context) {
			// ****************这个是vue3没有语法糖的写法文件*****************
			const bottf = useBotNarStor()  //获取pinia数据
			// console.log(bottf.QJScreenOnce.botNav)
			
			
			// 练习区数据
			const refcl = ref("index  首页！")
			let gg = ref(-0.1)
			
			
			
			
			// console.log(bottf.QJScreenOnceimg)
			
			
			/* 这几行 CSS 代码是用于在支持安全区域（Safe Area）的设备上设置元素的内边距，以确保元素不会被设备的特殊区域（如 iPhone X 及以上型号的顶部刘海、底部导航栏等）遮挡。
			padding-top: env(safe-area-inset-top);：设置元素顶部的内边距为安全区域顶部的距离。这样可以确保元素与设备顶部的特殊区域保持一定的距离，避免被遮挡。
			padding-bottom: env(safe-area-inset-bottom);：设置元素底部的内边距为安全区域底部的距离。同样是为了避免元素被设备底部的导航栏等区域遮挡。
			padding-left: env(safe-area-inset-left);：设置元素左侧的内边距为安全区域左侧的距离。
			padding-right: env(safe-area-inset-right);：设置元素右侧的内边距为安全区域右侧的距离。
			env()函数是用于在 CSS 中获取环境变量的值，这里的环境变量是与安全区域相关的变量。这样的设置可以使页面在不同设备上都能保持良好的显示效果，尤其是在有特殊屏幕形状或布局的设备上。
			需要注意的是，这种写法可能需要考虑浏览器或平台的兼容性。 */
			
			
			
			return{refcl,gg,bottf}
		},
		
		// 分享好友
		onShareAppMessage(e) {
			return{
				title:"简Fan，美食食谱聚集地~~~",
				path:"/pages/index/index"
			}
		},
		
		// 分享朋友圈
		onShareTimeline(e) {
			return{
				title:"简Fan，美食食谱聚集地~~~"
			}
		}
	
	
	
	
	}
	
	
	
	
	// *************数据库值更改id**********可以删
	/* import { yun } from '../../utils/getSysInf'
	
	
	yun('jianfandata','jfContentsData').then(res => {
		
		console.log(res)
		
		
		
		
	}) */
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</script>

<style lang="scss">
	@keyframes dh {
		100%{
			color: burlywood;
			background-color: #aaff00;
			
		}
	}
	.boxcon{
		animation: dh 1s linear forwards paused;
		
	}
	
	
	
	// 提示动画 插槽 css应写在当前页
	@keyframes tishianim {
		1%{
			// 不去除渐变背景会有整个渐变背景图的压缩动画 transform: translateY(-100%) scale(1,0);
			opacity: 0;
			transform: translateY(100%);
		}
		100%{
			opacity: 1;
			transform: translateY(0%);
		}
	}
	.tishianim{animation: tishianim 1.5s forwards;}
	
	// 提示区域  插槽
	.tishi{
		margin: 10rpx auto 0 auto;
		display: block;
		box-sizing: border-box;
		opacity: 0; //配合动画
		width: 98%;
		height: 33vh;
	}
	
	
	.bodyboxback::-webkit-scrollbar {
	    display: none; /* 对于WebKit浏览器隐藏滚动条 */
	}
</style>
