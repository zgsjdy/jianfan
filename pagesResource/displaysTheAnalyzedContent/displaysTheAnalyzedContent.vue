<template>
	<view class="bodyboxback">
		<!--  顶部导航栏   -->
		<navBarQJ :backIcons="true" :navText="navtitle" :pageIndex="-1"></navBarQJ>
		
		<!-- 做菜详情组件 -->
		<cookingDetailsModule :structdData = "structdData"></cookingDetailsModule>
		
		
		
		
	</view>
</template>

<!-- 这里用两个js标签是用到了页面生命周期不能在vue3的语法糖内写 -->
<script>
	// 导入和注册组件
	import cookingDetailsModule from '@/pagesResource/Acomponents/cookingDetailsModule/cookingDetailsModule.vue'
	// 页面接受参数,页面生命周期
	export default {
		// 导入和注册组件,注意这里不注册理论也可以，因为下面有<script setup>语法糖会合并script
		components: {
		    cookingDetailsModule // 局部注册
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			// 两个js标签是不通信的所以要用到全局变量，这个全局变量是在App.vue中的uniapp自带的
			getApp().globalData.nameId = option.nameId;
			// console.log(getApp().globalData.nameId); //打印出上个页面传递的参数。
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
</script>



<script setup>
import { onMounted, reactive, ref } from 'vue';
import { fuzzySearch } from '../../utils/getSysInf';
import { useBotNarStor } from '@/stores/counter';//导入pinia，不使用数据集中管理无法实现图标切换，页面切换会更新变回默认值
const goToData = useBotNarStor()//获取pinia数据



	// 把自带全局变量给顶部导航栏标题
	let navtitle = ref('教程');
	let structdData = reactive({});
	// 使用Object.defineProperty()方法添加不可枚举属性，添加提示内容
	Object.defineProperty(structdData,"Aname",{
		value:"页面请求菜名传值详情组件（提示内容！）",
		enumerable:false //枚举为false
	})
	
	onMounted(()=>{
		navtitle.value = getApp().globalData.nameId;
		
		// 清空顶部导航栏已选菜品的全局变量
		goToData.QJnavBardata = [];
		
		// 搜索数据库并返回结果,注意正则表达式网传输会变为空，要用字符串传输
		fuzzySearch('jianfandata','jfContentsData',{
			name: navtitle.value,  
		},false).then(res => {  //异步                   
			structdData = Object.assign(structdData,res[0])
			// console.log(structdData);
			
		});
		
		
	})
	
	
	
	

	
	
</script>

<style lang="scss">
	       
</style>
