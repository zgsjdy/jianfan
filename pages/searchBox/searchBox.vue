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
	uni.showLoading = ()=>{}
</script>

<style>
	
	.bodyboxback::-webkit-scrollbar {
		display: none; /* 对于WebKit浏览器隐藏滚动条 */
	}
	
</style>
