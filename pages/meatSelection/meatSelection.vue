<template>
	<view class="bodyboxback">
		<!--  顶部导航栏   -->
		<navBarQJ :navImg="bottf.goTo.gtSrc[2]" :navText="bottf.goTo.gtText[2]" :pageIndex="2"></navBarQJ>
		
		
		<!-- 选材模版肉类的 -->
		<foldingPanel></foldingPanel>
		
		
		
		<!--  底部导航栏   -->
		<botNavBarQJ></botNavBarQJ>
	</view>
</template>

<script setup>
import { useBotNarStor } from '@/stores/counter'  //导入pinia
const bottf = useBotNarStor()  //获取pinia数据



	
</script>

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


<style lang="scss">
	       
</style>
