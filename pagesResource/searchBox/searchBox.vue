<template>
	<!-- 溢出滚动是兼容苹果 -->
	<view class="bodyboxback" style="overflow-x: hidden; overflow-y: scroll;">
		
		
		
		<!--  顶部导航栏   -->
		<navBarQJ :backIcons="true" :navText="'搜索'" :pageIndex="-1"></navBarQJ>	
		
		
		<!-- 搜索框 -->
		<comSearchBox></comSearchBox>
		
		
		
	</view>
</template>



<script>
	export default {
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

</script>



<script setup>
//导入没有在uniapp中easycom组件自动引入规则中的组件，这里用了语法糖可以不用注册组件了，编译时候会帮写注册代码
import comSearchBox from '@/pagesResource/Acomponents/comSearchBox/comSearchBox.vue'
import { onBeforeUnmount } from 'vue';

	// 去除网络默认加载提示，加深拷贝
	const SHLO = uni.deepClone(uni.showLoading)
	uni.showLoading = ()=>{}
	
	// 恢复默认提示
	onBeforeUnmount(()=>{
		uni.showLoading = SHLO;
	})
	
</script>

<style>
	
	.bodyboxback::-webkit-scrollbar {
		display: none; /* 对于WebKit浏览器隐藏滚动条 */
	}
	
</style>
