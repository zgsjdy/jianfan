<template>
	<view 
	class="headerbox" 
	:class="goToData.QJScreenOnce.botNavAnimClass" 
	:style="`height: ${statusBarHeight + menheight}px; opacity: ${goToData.QJScreenOnce.botNavAnimClass === '' ? 1 : 0};`">
		<!-- 这里goToData.QJScreenOnce.botNavAnimClass设置透明度不用定时赋值为空‘’因为是全局的底部导航栏已经赋值了 -->
		<view class="top" :style="`height: ${statusBarHeight}px;`" ></view>
		<!-- 内容区域 -->
		<view class="middle" :style="`height: ${menheight}px;`">
			<!-- 返回按钮 -->
			<uni-icons class="backicon" type="back" size="30" v-show="propsZ.backIcons" @click="backClick"></uni-icons>
			
			<text :class="goToData.goTo.animationslData[propsZ.pageIndex]">{{propsZ.navText}}:</text>
			<image 
			:src="propsZ.navImg"  
			:class="goToData.goTo.animationslData[propsZ.pageIndex]"
			fade-show draggable lazy-load mode="aspectFit" class="tupian"></image>
			
			<!-- 显示选材区域 -->
			<view class="selection" 
			@click="onpopupclick('none',propsZ.pageIndex)"
			v-show="propsZ.pageIndex === -1 ? false : selection.select" 
			:class="selection.anmi">
				<scroll-view scroll-x class="scror" enable-flex >
					
					<!-- 循环显示已选 注意这里同个元素一起用v-for v-if的话在vue3中v-if优先级高于v-for会导致空值 解决方法如下 注意要用template-->
					<template v-for="(itme,index) in navigationBarData" 
					:key="itme.cVmEtype === 'veget' ? itme.id: itme.id*300" >
					<!--            让蔬菜的key  和 肉类不一样       -->
						<view class="scrorV" 
						:style="`background-color: ${itme.cVmEtype === 'veget' ? '#7ad07e': '#aaaaff' };`" ></view>
					</template>
					
				
				</scroll-view>
				<view class="vtext">点击查看详情</view>
			</view>
			
			<!-- 弹出层 -->
			<uni-popup ref="onpopup" @maskClick="maskfufu">
				<view class="popup" :style="`padding-bottom: ${botHeight + 10}px;`">
					<!-- 标题 -->
					<view class="title">
						<view class="tileft" @click="onpopupclick('empty')">
							~清空💕
						</view>
						<view class="ticoenter">
							~~~~(左滑显示删除按钮←)~~~~
						</view>
						<view class="tiright" @click="onpopupclick('clos')">
							~关闭💕
						</view>
					</view>
					<!-- 内容 -->
					<view class="popucenter">
						<view class="left">
							<button 
							@click="boutdata('蔬菜')" 
							class="boutt" 
							:class="bouttclass.cla[0]"
							type="primary" 
							:plain="bouttclass.pi[0]">蔬菜</button>
							
							<button 
							@click="boutdata('肉类')" 
							class="boutt" 
							:class="bouttclass.cla[1]"
							type="primary" 
							:plain="bouttclass.pi[1]">肉类</button>
							
							<navigator url="/pages/listOfMatches/listOfMatches" class="navgat" >合成👌</navigator>
							
						</view>
						<view class="right">
							<!-- 空值时候的提示 -->
							<view 
							v-show="bouttclass.QJcape.length === 0" 
							style="width: 100%;text-align: center;color:beige;letter-spacing: 8px;">没有选该分类菜品</view>
							<!-- 左右滑动显示删除操作插件部分样式修改源码了 -->
							<uni-swipe-action ref="itmecloseAll">
								<uni-swipe-action-item 
								:right-options="options" 
								@click="swipeOnClick($event,itme.id - 1,itme)"
								v-for="(itme,index) in bouttclass.QJcape" :key="itme.cVmEtype === 'veget' ? itme.id*300 : itme.id">
								<!--                                       这里*300只是让蔬菜的key和肉类的key不同而已 -->
									<view class="list">
										<image :src="itme.cVurl" mode="aspectFit" :draggable="false" lazy-load ></image>
										<view>{{itme.cVname}}</view>
									</view>
								</uni-swipe-action-item>
							</uni-swipe-action>
						</view>
					</view>
				</view>
			</uni-popup>
			
		</view>
	</view>	
	<view class="clearFl" :style="`height: ${statusBarHeight + menheight+1}px;`" ></view>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { getTobBotMar } from '@/utils/getSysInf.js';
import { useBotNarStor } from '@/stores/counter';//导入pinia，不使用数据集中管理无法实现图标切换，页面切换会更新变回默认值
const goToData = useBotNarStor()//获取pinia数据
// 接收通过属性（props）传值
const propsZ = defineProps({
	// 这个名字要和传过来的值名一样
	navImg:{
		// type:String,
		default:"../../static/imgs/pipeizhong.png"
	},
	navText:{
		type:String,
		default:"合成"
	},
	backIcons:{
		default:false
	},
	pageIndex:{
		type:Number,
		default:1
	}
})
// console.log(propsZ)
	const {menheight,statusBarHeight} = getTobBotMar('top') //获取顶部安全距离menheight胶囊高度，statusBarHeight导航栏安全区高度
	const{ positScreen,botHeight,botSafeHeight } = getTobBotMar('bot')  //pos是定位位置top的（可选）css  bottom 0，bothei是底部导航栏高度，botsafe是底部导航栏安全距离
	
	
	
	// 是否显示返回图标点击事件
	function backClick(){
		if(propsZ.backIcons){
			// 返回上一页面
			uni.navigateBack();
			
			// console.log("@@@@@@",propsZ.backIcons)
		}
	}
	
	// 是否显示已选选材
	let selection = reactive({
		select:false,
		selectWatch: false,
		anmi:""
	})
	
	// 用生命周期防止页面没加载就修改值了
	onMounted(()=>{
		//判断页面是否需要监听功能
		if(propsZ.pageIndex !== -1){
			
			
			//监视选材的数据 //修改的对象里面的值不是修改整个对象那么newValue, oldValue可能一样，reactive定义的对象关闭不了深度监视默认深度监视
			// watch(goToData.QJnavBardata,)直接监视这个由于reactive定义的对象是深度监视所以只要goToData修改了都会运行这个监视
			//所以要监视reactive定义的对象的某个属性可以用watch能监视的四个值中的getter值（也就是又返回值的函数）
			let timeoutId;
			watch(()=> goToData.QJnavBardata,(newValue,oldValue)=>{
				// console.log("yyy",newValue,oldValue)
				// console.log("监视")
				
				//*******注意这里输出的值会根据组件的个数从而输出多次有三个页面用了navBar这个组件那么就相当于有三个重复watch代码*******
				//其他代码也是同理只是没有监视值而已或者没加载该组件而已
				
				if(goToData.QJnavBardata.length !== 0 && selection.selectWatch === false){
					clearTimeout(timeoutId);//清除取消选材顶部导航栏的定时器
					selection.select = true;  //显示已选材料详情
					selection.selectWatch = true;  // 修改监视数组长度不为零时的判断条件
					selection.anmi = 'selectionInto';
					// console.log("显示")
					
					
				}else if(goToData.QJnavBardata.length === 0){
					selection.anmi = 'selectionExit';
					selection.selectWatch = false;  // 修改监视数组长度不为零时的判断条件
					timeoutId = setTimeout(()=>{
						selection.select = false;
						// console.log("清除")
					},800)
					
					//让popular...页面的弹出分析模块监视为零关闭弹窗
					goToData.analyseStyle.countDown = 0;
					
					// 蔬菜恢复已选按钮的动画
					goToData.QJcVanmiArr[0].map((itme,index)=>{
						if(itme === 'cVanmiArr'){
							goToData.QJcVanmiArr[0][index] = 'cVanmiArrCancel'
						}
					})
					// 肉类复位按钮动画
					goToData.QJcVanmiArr[goToData.QJcVanmiArr.length-1].map((itme,index)=>{
						if(itme === 'cVanmiArr'){
							goToData.QJcVanmiArr[goToData.QJcVanmiArr.length-1][index] = 'cVanmiArrCancel'
						}
					})
					
					// 防止多次使用navBar组件导致有些nacBar开启了//trfalwatch  监听变量值要更新的分类，有些关闭了导致多个navBar组件弹出层蔬菜肉类分类数据不一致
					//关闭弹出层
					onpopupclick('clos')//关闭弹出层 这个会关闭所以弹出层，因为有多个navBar组件就有多个watch代码一样的功能但是相互不干涉
				}
				
				
				// 更新 蔬菜和肉类按钮数据整理，注意顺序
				if(trfalwatch === '蔬菜'){  //trfalwatch  监听变量值要更新的分类
					// boutdata('肉类')
					boutdata('蔬菜')  //这个运行完类名等等都在蔬菜按钮这
					
				}else if(trfalwatch === '肉类'){
					boutdata('肉类')
				}
				
				// 更新显示选材区域,点击查看详情数组
				navigationBarData = collateData();
				// console.log(navigationBarData)
				
				
				// console.log(goToData.QJnavBardata)
				
			},{deep:true, immediate:true}) //写getter值就没有默认深度监视了只有整个对象换了才监视所以要开启
		}
		
		
		
	})
	
	
	
	// 弹出层
	let onpopup = ref(null);
	// 把弹出层ref对象给全局数组实现多个页面只能打开一个详情
	if(propsZ.pageIndex !== -1){goToData.QJonpopup[propsZ.pageIndex] = onpopup;}
	function onpopupclick(clos="none",popid){
		if(clos === "none"){
			
			// 通过全局变量数组实现多个页面只能打开一个详情
			goToData.QJonpopup.map((_,index)=>{
				index === popid ? goToData.QJonpopup[index].value.open('bottom') : goToData.QJonpopup[index].value.close();
				
			})
			// console.log(goToData.QJonpopup)
			
			
		}else if(clos === "clos"){
			// console.log("关闭弹出层")
			
			// 关闭所有左右滑动已打开的组件,注意要有.value 因为是ref对象
			itmecloseAll.value.closeAll();
			
			trfalwatch = '蔬菜';//恢复默认监听变量值要更新的分类
			
			onpopup.value.close()
		}else if(clos === 'empty'){//清空
			
			
			// 清空已选按钮代码在监听哪里还有其他部分代码
			
			goToData.QJnavBardata = []// 清空弹出层信息
			
			trfalwatch = '蔬菜';//恢复默认监听变量值要更新的分类
			
		}
	}
	
	// 弹出层蒙层函数
	function maskfufu(){
		// console.log("点击蒙层")
		
		// 关闭所有左右滑动已打开的组件,注意要有.value 因为是ref对象
		itmecloseAll.value.closeAll();
		
		//恢复默认监听变量值要更新的分类
		trfalwatch = '蔬菜';
	}
	
	
	
	
	// 蔬菜和肉类按钮数据整理
	let bouttclass = reactive({
		cla:['boutthover',''],
		pi:[false,true],
		QJcape:[]
	})
	// 蔬菜和肉类整理函数
	function boutdata(cmtype){
		if(cmtype === '蔬菜'){
			// 关闭所有左右滑动已打开的组件,注意要有.value 因为是ref对象
			itmecloseAll.value.closeAll();
			
			
			// 恢复默认值和修改样式
			bouttclass.QJcape = [];
			
			bouttclass.cla[1] = '';
			bouttclass.pi[1] = true;
			
			bouttclass.cla[0] = 'boutthover';
			bouttclass.pi[0] = false;
			
			// console.log(goToData.QJnavBardata)
			// 整理数据
			if(goToData.QJnavBardata.length !== 0){
				goToData.QJnavBardata.map((itme)=>{
					if(itme.cVmEtype === 'veget'){
						bouttclass.QJcape.push(itme)
					}
				})
			}
			
			
		}else if(cmtype === '肉类'){
			// 关闭所有左右滑动已打开的组件,注意要有.value 因为是ref对象
			itmecloseAll.value.closeAll();
			
			
			// 恢复默认值和修改样式
			bouttclass.QJcape = [];
			
			bouttclass.cla[0] = '';
			bouttclass.pi[0] = true;
			
			bouttclass.cla[1] = 'boutthover';
			bouttclass.pi[1] = false;
			
			// console.log(goToData.QJnavBardata)
			
			// 整理数据
			if(goToData.QJnavBardata.length !== 0){
				goToData.QJnavBardata.map((itme)=>{
					if(itme.cVmEtype === 'meat'){
						bouttclass.QJcape.push(itme)
					}
				})
			}
		}
	}
	
	
	
	
	// 显示选材区域,点击查看详情数组
	let navigationBarData = collateData()
	/**
	 * 整理数据函数，分蔬菜和肉类,文档注释
	 * @param {Array} arrData 对象数组(全局)顶部导航栏的,只本组件用，直接用全局变量goToData.QJnavBardata不传值
	 * @return {Array} 返回一个整理好的新数组，排序原数组效率慢，还可能多次触发监视
	 * 
	*/
	function collateData(){
		let newarr = [];
		
		goToData.QJnavBardata.map((itme)=>{
			if(itme.cVmEtype === 'veget'){
				newarr.unshift(itme) //数组前插值 
			}
			else if(itme.cVmEtype === 'meat'){
				newarr.push(itme) //数组后插值 
			}
		})
		// console.log("shujufengli",newarr)
		return newarr;
	}
	
	
	
	
	// 左右滑动模块
	let options = reactive([
		{
			text: '删除',
			style: {
				backgroundColor: '#ff557f'
			}
		},
	])
	
	// 左右滑块点击删除函数
	let trfalwatch = '蔬菜';  //默认蔬菜监听变量值要更新的分类
	let itmecloseAll = ref(null); //获取左右滑动操作ref 实现调用ref closeAll()关闭所有已打开的组件
	function swipeOnClick(e,id,posit){
		// 判断蔬菜还是肉类
		if(posit.cVmEtype === 'veget'){
			if(e.content.text === '删除'){
				// 选材动画取消复位肉类和蔬菜
				goToData.QJcVanmiArr[0][id] = 'cVanmiArrCancel';
				
				
				// 取消添加数据到导航栏                               直接对象===也可以
				let indexid = goToData.QJnavBardata.findIndex(person => person.cVname === posit.cVname) //找到取消索引
				goToData.QJnavBardata.splice(indexid,1) //删除索引的值
				
				
				//监听变量值要更新的分类
				trfalwatch = '蔬菜';
				
			}
		}
		else if(posit.cVmEtype === 'meat'){
			if(e.content.text === '删除'){
				// 选材动画取消复位肉类和蔬菜
				goToData.QJcVanmiArr[goToData.QJcVanmiArr.length-1][id] = 'cVanmiArrCancel';
				
				// 取消添加数据到导航栏                               直接对象===也可以
				let indexid = goToData.QJnavBardata.findIndex(person => person.cVname === posit.cVname) //找到取消索引
				goToData.QJnavBardata.splice(indexid,1) //删除索引的值
				
				
				//监听变量值要更新的分类
				trfalwatch = '肉类';
				
			}
		}
		
		// console.log('点击了' + (e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
	}

</script>

<style scoped lang="scss">
	// 开头进入动画
	@keyframes botboxanim {
		1%{
			// 不去除渐变背景会有整个渐变背景图的压缩动画 transform: translateY(-100%) scale(1,0);
			background-image: none;  
			opacity: 0;
			transform: translateY(-100%) scale(1,0);
		}
		100%{
			background-image: none;
			opacity: 1;
			transform: translateY(0%) scale(1,1);
		}
	}
	.botboxanim{animation: botboxanim 1.5s;}
	
	
	// 切换页面顶部导航图片和文字区域动画实体
	@keyframes goToFrames {
		1%{
			opacity: 0;
			transform: scale(0.8,0.8);
		}
		100%{
			opacity: 1;
			transform: scale(1,1);
		}
	}
	// 切换页面顶部导航图片和文字区域动画类名
	.cvcv{
		transform-origin: 50% 100%;
		animation: goToFrames 0.8s;
	}
	
	
	// 显示选材区域详情动画实体进入
	@keyframes selectionInto {
		1%{
			opacity: 0;
			transform: scale(0,0) translateY(-300px);
		}
		100%{
			opacity: 1;
			transform: scale(1,1) translateY(0px);
		}
	}
	// 显示选材区域详情动画类名进入
	.selectionInto{
		animation: selectionInto 0.8s forwards;
	}
	
	// 显示选材区域详情动画实体退出
	@keyframes selectionExit{
		1%{
			opacity: 1;
			transform: scale(1,1) translateY(0px);
		}
		40%{
			opacity: 0.8;
			transform: scale(0.8,0.8) translateY(-50px);
		}
		100%{
			opacity: 0;
			transform: scale(0,0) translateY(-300px);
		}
	}
	// 显示选材区域详情动画类名退出
	.selectionExit{
		animation: selectionExit 0.8s forwards;
	}
	
	
	
	
	
	.headerbox{
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		width: 100vw;
		height: 47px;
		// position: sticky;  //粘性定位 另一种方案
		position: fixed;
		top: 0;
		z-index: 999;
		overflow: hidden;
		background-image: $uni-bd-color-gradch;
		background-size: 100% 100%;
		background-attachment: fixed;
		/* .top{
			@extend.headerbox;
			background-color: #ff0000;
		} */
		.middle{
			padding-left: 3px;
			padding-right: 3px;
			overflow: hidden;
			display: flex;
			align-items: center;
			
			.backicon{
				padding-left: 5px;
				transition: all 0.1s;
			}
			.backicon:active{
				transform: scale(0.8,0.8);
			}
			
			text{
				font-size: 2.5vh;
				display: block;
				margin-left: 20rpx;
			}
			.tupian{
				width: 12%;
				height: 65%;
				// background-color: #557000;
				display: block;
			}
			.selection{
				height: 85%;
				width: 43%;
				border-radius: 5px;
				padding: 5px;
				opacity: 0;// 配合动画
				background-color: #effff7;
				.scror{
					width: 100%;
					height: 60%;
					display: flex;
					.scrorV{
						opacity: 0; //配合动画
						margin-right: 5px;
						min-width: 2%;
						max-width: 2%;
						border-radius: 5px;
						
						animation: botboxanim 1.5s forwards;
					}
				}
				.vtext{
					width: 100%;
					height: 40%;
					line-height: 100%;
					letter-spacing: 5px;
					color: #9a9a9a;
					font-size: 12px;
					text-align: center;
				}
				
			}
		}
		
	}
	
	
	
	
	// 显示弹出层标题动画
	@keyframes popuptile {
		1%{
			opacity: 0;
			transform: scale(0,0) translateY(-50px);
		}
		100%{
			opacity: 1;
			transform: scale(1,1) translateY(0);
		}
	}
	
	
	// 弹出层
	.popup{
		width: 100%;
		height: 80vh;
		padding: 5px;
		border-radius: 10px;
		overflow: hidden;
		background-color: #aaaaff;
		
		// 标题
		.title{
			width: 100%;
			height: 3%;
			display: flex;
			animation: popuptile 0.8s;
			transform-origin: 50% 0%;
			
			.tileft{
				margin: 0 1.5% 0 1.5%;
				border-radius: 10px;
				overflow: hidden;
				text-align: center;
				line-height: 2vh;
				font-size: 3vw;
				flex-basis: 17%;
				background-color: #9a9a9a;
				// background-color: #ff557f;
			}
			.tileft:active{
				background-color: #55ff7f;
			}
			
			.ticoenter{
				border-radius: 10px;
				overflow: hidden;
				text-align: center;
				line-height: 2vh;
				font-size: 3vw;
				flex-basis: 60%;
				background-color: #9a9a9a;
				// background-color: #ffaaff;
			}
			.tiright{
				margin: 0 1.5% 0 1.5%;
				border-radius: 10px;
				overflow: hidden;
				text-align: center;
				line-height: 2vh;
				font-size: 3vw;
				flex-basis: 17%;
				background-color: #9a9a9a;
				// background-color: #55aa00;
			}
			.tiright:active{
				background-color: #55ffff;
			}
		}
		
		
		// 内容部分
		.popucenter{
			margin-top: 8px;
			width: 100%;
			height: 96%;  //和上面标题一起计算高度
			// background-color: #55ff7f;
			display: flex;
			
			.left{
				flex-basis: 20%;
				.boutt{
					box-sizing: border-box;
					font-size: 4vw;
					letter-spacing: 8px;
					color: #9a9a9a;
					border: 3px double #effff7;
					margin-bottom: 30%;
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
					animation: botboxanim 1s;
					transition: all 0.3s;
				}
				.boutthover{  //用js控制加多class样式实现切换效果代码
					font-size: 5vw;
					color: #ffaa00;
					border: 3px double #55ffff;
					background-color: #6a6a9e;
				}
				
				// 弹出成合成按钮样式
				.navgat{
					box-sizing: border-box;
					border-radius: 50px;
					overflow: hidden;
					font-size: 5vw;
					line-height: 5vw;
					text-align: center;
					color: #ffaa00;
					border: 3px double #914600;
					margin-bottom: 30%;
					padding: 1%;
					background-color: #9296d0;
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
					animation: selectionInto 1s;
					transition: all 0.1s; 
				}
				.navgat:active{
					font-size: 4vw;
					border: 3px double #00ff00;
					transform: scale(0.95,0.95);
					background-color: #6464b4;
				}
			}
			
			.right{
				margin-left: 1%;
				flex-basis: 79%;
				overflow-x: hidden;
				overflow-y: scroll;
				.list{
					height: 8vh;
					// background-color: #9a9a9a;
					animation: selectionInto 0.8s;
					display: flex;
					background-image: linear-gradient(to left, #ff817750 0%, #ff867a40 0%, #ff8c7f30 21%, #f9918520 52%, #cf556c10 78%, #b12a5b08 100%);
					
					image{
						box-sizing: border-box;
						height: 100%;
						padding: 5px;
						display: block;
						flex-basis: 50%;
						
					}
					view{
						line-height: 8vh;
						height: 100%;
						flex-basis: 50%;
						font-size: 5vw;
						text-align: center;
						text-shadow: 1px -1px #fff, -1px 1px #999, -10px 10px 5px #80808080;
					}
					
				}
			}
		}
	}
	
	
	
	/* .clearFl{
			background-color: #557000;
		} */
</style>