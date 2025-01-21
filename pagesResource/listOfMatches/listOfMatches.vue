<template>
	<view class="bodyboxback">
		<!--  顶部导航栏   -->
		<navBarQJ :backIcons="true" :navText="'结果'" :pageIndex="-1"></navBarQJ>	
		<!-- 没有值的提示 -->
		<view v-if="YMnavBardata.length <= 0" style="width: 100%;text-align: center;">没有选菜品</view>
		<!-- 主体 -->
		<view class="scrollvi" v-if="YMnavBardata.length > 0" 
		:style="`height: calc(100vh - ${menheight+statusBarHeight+botSafeHeight+3}px);`">
			<!-- 返回值没有时显示 -->
			<view style="width: 100%;text-align: center;" v-if="structdData.length <= 0" >
				已选的菜材没有匹配到相应的菜品，我们会更加努力的添加我们的菜单
			</view>
			<!-- 内容列表 -->
			<view 
			class="scrlist" 
			:class="struclass"
			:style="`opacity: ${struclass !== '' ? 0 : 1 };`"
			v-for="(itme,index) in structdData" :key="index" 
			v-if="structdData.length > 0" 
			@click="skipToDetails(itme.name)">
				<view class="top">
					<image :src="itme.topurl" mode="scaleToFill" :draggable="false" lazy-load ></image>
				</view>
				<view class="but">
					<view class="Tips">{{itme.doAdd}}</view>
					<view class="cainame">
						<view class="left">{{itme.name}}</view>
						<view class="right">匹配度<text style="color: firebrick;">{{itme.percentage}}%</text></view>
					</view>
				</view>
			</view>
			
			<!-- 没有更多数据提示 -->
			<view style="width: 100%; overflow: hidden;" v-if="structdData.length > 0" >
				<view 
				:class="struclass" 
				:style="`margin: 0 auto; width: 50%; text-align: center; border-radius: 50px; 
				opacity: ${struclass !== '' ? 0 : 1 };`">
					没有更多数据了！
				</view>
			</view>
			
		</view>
	</view>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { fuzzySearch, getTobBotMar } from '../../utils/getSysInf';
import { useBotNarStor } from '@/stores/counter';//导入pinia，不使用数据集中管理无法实现图标切换，页面切换会更新变回默认值
const goToData = useBotNarStor()//获取pinia数据


const {menheight,statusBarHeight} = getTobBotMar('top') //获取顶部安全距离menheight胶囊高度，statusBarHeight导航栏安全区高度
const{ botSafeHeight } = getTobBotMar('bot')  //pos是定位位置top的（可选）css  bottom 0，bothei是底部导航栏高度，botsafe是底部导航栏安全距离
	
	
	// 把全局变量给页面变量
	let YMnavBardata = goToData.QJnavBardata;
	
	
	
	
	// 生命周期函数
	onMounted(()=>{
		// 清空顶部导航栏已选菜品的全局变量
		goToData.QJnavBardata = [];
		
		
	});
	
	
	
	//将数组中的所有元素已join()里的值连接成一个字符串
	let regarr = YMnavBardata.map(itme => itme.cVname);
	let mergearr = "("+regarr.join("|")+")" === "()" ? null : "("+regarr.join("|")+")";
	// console.log(mergearr)
	
	// 结构数据
	let structdData = ['0']  //添加默认值让一开始不显示提示,会显示一条空数据但是因为动画不透明度所以用户看不见
	
	// 进入动画类名
	let struclass = ref('000')
	
	
	// 搜索数据库并返回结果,注意正则表达式网传输会变为空，要用字符串传输
	fuzzySearch('jianfandata','jfContentsData',{
		material: mergearr,  //注意这里的正则表达式不用加开头和结尾的/
	},true).then(res => {  //异步    
						// 使用数组对象排序函数
		structdData = arrayObjectSorting(regarr,res);
		// console.log(structdData);
		
		// 应用进入动画类名
		struclass.value = 'listcovered';
		// 清除动画
		setTimeout(()=>{
			struclass.value = '';
		},2030)
		
	});
	
	
	//两个数组对象排序函数
	function arrayObjectSorting(arrOne,resArrTow){
		//对象分解数组扁平化去重接着把这个合并后的数组传入 Set 构造函数进行去重，最后通过 Array.from 方法将 Set 转换为数组形式
		// let resArrTowAnalyse = Array.from(new Set(resArrTow.map(itme => itme.material).flat(Infinity)));
		let arrOneNum = 0; //没条数据满足多少个用户选的材料条件
		let arrSatisfied = [];//满足要求数组
		//let arrNoSatisfied = []//不满足（后期加功能可以用来分开筛选）
		
		// console.log(resArrTow)
		
		// 整理满足数据和不满足数据分类给不同数组
		for(let i = 0; i< resArrTow.length; i++){
			arrOneNum = 0;
			for(let j = 0; j< resArrTow[i].material.length; j++){
				for(let k = 0; k< arrOne.length; k++){
					if(resArrTow[i].material[j] === arrOne[k]){
						arrOneNum++;
						break;
					}
				}
			}
			
			// 分数据(后期加功能可以用来分开筛选)
			/* if(arrOneNum === arrOne.length){
				
				
			}else{
				
			} */
			
			
			//计算百分比 不同时候不同算法  （可以优化但是没必要优化不了多少性能）
			let price; 
			if(arrOne.length >= resArrTow[i].material.length){
				price = Math.round((arrOneNum / arrOne.length)*100);  //取整数
			}else if(arrOne.length <= resArrTow[i].material.length){
				price = Math.round((arrOneNum / resArrTow[i].material.length)*100);
			}
			
			let priceAdd;
			// 添加是否要添加材料还是减少
			if(resArrTow[i].material.length > arrOne.length){
				priceAdd = '需要增加额外的材料';
			}else if(resArrTow[i].material.length === arrOne.length){
				if(arrOneNum === arrOne.length){
					priceAdd = '所有要求符合😁';
				}else{
					priceAdd = '需要更换部分已选材料';
				}
			}else{
				priceAdd = '需要减少部分已选材料';
			}
			
			
			let freightStation = {...resArrTow[i],doAdd:priceAdd,percentage:price}
			arrSatisfied.push(freightStation);
			
			
			
			
		}
		
		//  let copiedArray = JSON.parse(JSON.stringify(arrNoSatisfied));
		// console.log(copiedArray)  //注意这里如果直接输出arrNoSatisfied是循环过后的值是修改过的不会因为是提前输出就是旧值所以要用深拷贝
		
		// 排序不满足数组对象
		let transferStation;  
		/* for(let j = arrNoSatisfied.length-1; j> 0 ;j--){  //****后期加功能可以用来分开筛选***
			for(let i = 0; i< j; i++){
				if(arrNoSatisfied[i].percentage < arrNoSatisfied[i+1].percentage){
					// 交换
					transferStation = arrNoSatisfied[i];
					arrNoSatisfied[i] = arrNoSatisfied[i+1];
					arrNoSatisfied[i+1] = transferStation;
				}
			}
		} */
		
		// 排序 满足  数组对象
		// transferStation;
		for(let j = arrSatisfied.length-1; j> 0 ;j--){
			for(let i = 0; i< j; i++){
				if(arrSatisfied[i].percentage < arrSatisfied[i+1].percentage){
					// 交换
					transferStation = arrSatisfied[i];
					arrSatisfied[i] = arrSatisfied[i+1];
					arrSatisfied[i+1] = transferStation;
				}
			}
		}
		
		// console.log("@@@",arrSatisfied)
		// console.log(arrNoSatisfied)
		
		// 合并
		
		// return [...arrSatisfied,...arrNoSatisfied]
		return arrSatisfied;
		
	}
	
	// 跳转到详情函数
	function skipToDetails(nameid){
		//跳转匹配页面列表页面
		uni.navigateTo({
			url:'/pagesResource/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId='+nameid,
		});
	}
	
	
	
	
	
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
	// 列表进入动画
	@keyframes listcovered {
		1%{
			opacity: 0;
			background-color: #d0fff0;
			transform: translateY(18%);
		}
		53%{
			background-color: #d0fff0;
			transform: translateY(-1%);
		}
		100%{
			opacity: 1;
			transform: translateY(0%);
		}
	}
	
	.listcovered{animation: listcovered 2s 0.5s;}
	
	
	
	
	
	.scrollvi{
		margin: 0 auto;
		// padding-bottom: 20px;
		width: 98%;
		border-radius: 5px;
		// 主体溢出隐藏大多数是为了苹果兼容，苹果背景固定不了会跟着页面滚动
		overflow-x: hidden; 
		overflow-y: scroll;
		
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		align-content: flex-start;
		
		// 列表
		.scrlist{
			padding: 5px;
			margin: 0 1.5% 1.5% 1.5%;
			max-width: 47%;
			min-width: 47%;
			height: 26vh;
			border-radius: 10px;
			box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
			background-color: #e6f0ff;
			transition: all 0.1s;
			
			.top{
				width: 100%;
				height: 68%;
				margin-bottom: 2%;
				
				image{
					width: 100%;
					height: 100%;
					border-radius: 10px;
				}
			}
			.but{
				width: 100%;
				height: 30%;
				.Tips{
					width: 100%;
					height: 30%;
					text-align: 
					center;color: #999999;
					font-size: 1.5vh;
					border-top: 2px solid #55ff7f;
					border-bottom: 2px solid #55ff7f;
				}
				.cainame{
					width: 100%;
					height: 70%;
					display: flex;
					.left{
						width: 70%;
						height: 100%;
						font-size: 2.3vh;
						letter-spacing: 3px;
						border-right: 3px double grey;
					}
					.right{
						@extend.left;
						width: 30%;
						font-size: 2vh;
						border-right: none;
						letter-spacing: 0px;
					}
				}
				
			}
			
		}
		.scrlist:active{
			transform: scale(0.95,0.95);
			box-shadow: none;
		}
		// 选着父元素最后一个子元素生成一个伪类解决最后一行和底边距太近的问题
		/* .scrlist:last-child::after{
			content: "";
			display: block;
			width: 100%;
			height: 20px;
		} */
		
	}
	.scrollvi::-webkit-scrollbar {
	    display: none; /* 对于WebKit浏览器隐藏滚动条 */
	}
</style>
