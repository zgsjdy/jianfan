<template>
	<!-- 公告部分 -->
	<announcement :noticeOpenor="openorData"></announcement>
	
	
	<!-- 轮播图部分 -->
	<swiper autoplay circular class="swi" :class="swiclass" :style="`opacity: ${swiclass === '' ? 1 : 0};`">
		<swiper-item v-for="(itme,index) in swiperData.popularDishesSwiper" :key="index">
			<navigator class="nav" hover-class="none" :url="`/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=${itme[0]}`">
				<!-- mode="值最好不要有要裁剪的或截取的"在swiper等地方会卡因为动画（不使用也不一定不卡）加image裁剪会卡一下  -->
				<image style="width:100%; height:100%;" class="navimg" :src="itme[1]" mode="scaleToFill" :draggable="false" @load="navimgload(index)" ></image>
				<view class="navtext">
					{{itme[0]}}
				</view>
			</navigator>
		</swiper-item>
	</swiper>
	
	
	<!-- 搜索框 跳转 -->
	<navigator url="/pages/searchBox/searchBox" hover-class="none" class="searbox">
		<view class="sealeft">
			<input type="text" confirm-type="search" cursor-color="#914600" disabled class="navinput"/>
			
			<uni-icons type="search" size="3vh" color="#924BDA" class="seaicons"></uni-icons>
		</view>
		
		
		<view class="searight">
			<uni-icons type="settings" size="4.3vh" color="#fff"></uni-icons>
		</view>
	</navigator>
	
	
	<!-- 热门菜部分 -->
	<view 
	class="popubox" 
	:class="goToData.QJScreenOnce.botNavAnimClass" 
	:style="`opacity: ${goToData.QJScreenOnce.botNavAnimClass === '' ? 1 : 0};`">
		<!-- 这里goToData.QJScreenOnce.botNavAnimClass设置透明度不用定时赋值为空‘’因为是全局的底部导航栏已经赋值了 -->
		
		
		<!-- 标题 -->
		<view :class="tsanim" class="poptitle">热门菜</view>
		
		<!-- 内容区 -->
		<scroll-view class="scrollcen" scroll-x enable-flex >
			<navigator 
			:url="`/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=${itme}`" 
			class="poplist" 
			hover-class="navcovered"
			v-for="(itme,index) in popular.data" 
			:key="index" >
			<view :class="tsanim" >{{itme}}</view>
			<image :class="tsanim" :src="popularimg.data" mode="aspectFit" :draggable="false" lazy-load></image>
			</navigator>
		</scroll-view>
		
	</view>
	
	
	<!-- 列表部分 -->
	<listPopu :listpopuData="listpopuData"></listPopu>
	
	
	<!-- 提示区域 具名插槽加作用域插槽  给插槽对象值，对象内不使用完整写法用简写的话无法传goToData.QJpopularchVmeSel[0]因为不能写这样的对象名-->
	<slot name="tipArea" :tipAreadata="{goTo:goToData.QJpopularchVmeSel[0],tsanim,tishianim}"></slot>
	
	
	<!-- 弹出分析结构  在底部导航修改全局变量，在这里使用全局变量防止多个底部导航组件都弹出分析 -->
	<view class="analyseBox" :style="goToData.analyseStyle" @click="reviseAnalyStyle">
		<view class="analyse" @click.stop>
			<!--            取消事件冒泡 -->
			<view class="antop">是否开始分析已选材料</view>
			<!-- 随机图片  -->
			<view class="animg" :animation="animationData[goToData.analyseStyle.countDown%2===0 ? 0:1]" >
				<image :src="popfloatimg[goToData.analyseStyle.countDown]" mode="aspectFit" :draggable="false" ></image>
			</view>
			<view class="bot">
				<view class="cancel" @click.stop="closeAndConfirm('取消')">取消({{goToData.analyseStyle.countDown}})</view>
				<view class="affirm" @click.stop="closeAndConfirm('确认')">确认</view>
			</view>
		</view>
	</view>
	
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { yun } from '../../utils/getSysInf';
import { useBotNarStor } from '@/stores/counter';//导入pinia，不使用数据集中管理无法实现图标切换，页面切换会更新变回默认值
const goToData = useBotNarStor()//获取pinia数据


// 轮播图数据
let swiperData = {};
let swiclass = ref('000');

// 处理轮播图图片加载完才应用动画
function navimgload(id){
	// console.log("&^&^&^")
	// 只让第一张图片事件运行
	if(id === 0){
		swiclass.value = 'swianim';
		// console.log("22222")
		setTimeout(()=>{swiclass.value = ''},1490)
	}
}

//列表数据
let listpopuData = reactive({});

// 公告组件数据
let openorData = {};

// 获取热门菜数据
let popular = {Aname:"热门菜数据"};
let popularimg = {Aname:"热门菜img数据"};
// 热门菜默认值
popular.data = ['加载中...','加载中...','加载中...','加载中...','加载中...','加载中...','加载中...','加载中...','加载中...','加载中...','加载中...','加载中...','加载中...']
popularimg.data = '../../static/imgs/pipeizhong.png'

yun('jianfandata','jfSysContentsData').then(res => {//异步
	// 给本组件
	popular.data = res[0].popularDishes;
	popularimg.data = res[0].popularDishesimg;
	swiperData = Object.assign(swiperData,res[3]);
	listpopuData = Object.assign(listpopuData,res[4]);  //注意不能直接listpopuData = res[4] 赋值会改变原对象会让传值的页面显示不了数据
	
	openorData = Object.assign(openorData,res[5]); // 给公告组件
	
	// console.log(res)
	//给全局变量
	goToData.QJpopularchVmeSel = Object.assign(goToData.QJpopularchVmeSel,res)
	
	
	})  
	// console.log(goToData.QJpopularchVmeSel)
	
	// 给提示加动画
	let tsanim = ref('')
	function tishianim(){
		tsanim.value = 'tishianim';
	}
	
	
	
	// 弹出分析模块
	onMounted(()=>{
		watch(()=>goToData.analyseStyle.countDown,(newValue,oldValue)=>{
			// console.log("@@jianshi",newValue,oldValue)
			if(newValue <= 0){
				//5秒后关闭弹出分析
				goToData.analyseStyle = Object.assign(goToData.analyseStyle,{
					top:"100vh",
					transform: 'scale(0,0)',
					opacity: 0
				})
				//清除取消倒计时定时器
				clearInterval(goToData.analyseStyle.countDownterufals);
				
				// 更新打乱弹出分析img数组函数
				shuffleArray(false, popfloatimg);
				
				// console.log(newValue);
			}
		});
		
		
	});
	
	
	// 关闭弹出模块蒙层
	function reviseAnalyStyle(){
		goToData.analyseStyle = Object.assign(goToData.analyseStyle,{
			top:"100vh",
			transform: 'scale(0,0)',
			opacity: 0
		})
		//清除取消倒计时定时器
		clearInterval(goToData.analyseStyle.countDownterufals);
		
		// 更新打乱弹出分析img数组函数
		shuffleArray(false, popfloatimg);
	}
	
	// 弹出分析的取消和关闭
	function closeAndConfirm(cloCon){
		if(cloCon === '取消'){
			goToData.analyseStyle = Object.assign(goToData.analyseStyle,{
				top:"100vh",
				transform: 'scale(0,0)',
				opacity: 0
			})
			
			//清除取消倒计时定时器
			clearInterval(goToData.analyseStyle.countDownterufals);
			// 更新打乱弹出分析img数组函数
			shuffleArray(false, popfloatimg);
		}else if(cloCon === '确认'){
			// console.log("queren")
			
			goToData.analyseStyle = Object.assign(goToData.analyseStyle,{
				top:"100vh",
				transform: 'scale(0,0)',
				opacity: 0
			})
			
			//清除取消倒计时定时器
			clearInterval(goToData.analyseStyle.countDownterufals);
			
			//跳转匹配页面列表页面
			uni.navigateTo({
				url:'/pages/listOfMatches/listOfMatches',
			});
			
			// 更新打乱弹出分析img数组函数
			shuffleArray(false, popfloatimg);
		}
	}
	
	// 弹出分析随机图片函数
	let popfloatimg = goToData.QJScreenOnceimg.pop;
	// 随机打乱数组函数
	function shuffleArray(cun,arr) {
	    for (let i =  cun || (arr.length - 1); i > 0; i--) {
	        let j = Math.floor(Math.random() * (i + 1));
	        [arr[i], arr[j]] = [arr[j], arr[i]];
			// console.log("111")
	    }
	}
	// 首次更新打乱弹出分析img数组函数
	shuffleArray(false, popfloatimg);
	// console.log(popfloatimg)
	
	// 创建动画实例
	let animationData = reactive([]);// 动画数据
	let animation = uni.createAnimation({
		transformOrigin:"50% 50%",
		duration:1000,
		timingFunction:"ease",
		delay:0
	})
	// 生成两组动画，应用不同时间
	animation.opacity(0.8).scale(0.7,0.7).step({duration:300});//隐藏
	animationData[0] = animation.export();
	animation.opacity(1).scale(1,1).step({duration:700});//显示
	animationData[1] = animation.export();
	
	
	
	
	
	
	
	
	
	
</script>

<style lang="scss" scoped>
	// 开头进入动画
	@keyframes botboxanim {
		1%{
			opacity: 0;
			transform: translateY(-100%) scale(0.3,0.3);
		}
		100%{
			opacity: 1;
			transform: translateY(0%) scale(1,1);
		}
	}
	.botboxanim{animation: botboxanim 1.5s;}
	
	// 提示动画
	@keyframes tishianim {
		1%{
			opacity: 0;
			transform: translateY(100%);
		}
		100%{
			opacity: 1;
			transform: translateY(0%);
		}
	}
	.tishianim{animation: tishianim 1.5s forwards;}
	
	
	
	// 点击热门菜上下移动
	@keyframes navcovered {
		1%{
			background-color: #FFFEFF;
			transform: translateY(0);
		}
		30%{
			background-color: #FFFEFF;
			transform: translateY(3%);
		}
		53%{
			background-color: #FFFEFF;
			transform: translateY(-1%);
		}
		100%{
			transform: translateY(0%);
		}
	}
	.navcovered{ animation: navcovered 0.6s; }
	
	// 轮播图动画
	@keyframes swianim {
		1%{
			filter: blur(5px);
			opacity: 0;
			transform: scale(0.5,0.5);
		}
		80%{
			filter: blur(10px);
			opacity: 0.5;
		}
		100%{
			filter: blur(0);
			opacity: 1;
			transform: scale(1,1);
		}
	}
	.swianim{animation: swianim 1.5s;}
	
	// 搜索框 跳转
	@keyframes searbox {
		1%{
			opacity: 0;
			transform: scale(0,0);
		}
		100%{
			opacity: 1;
			transform: scale(1,1);
		}
	}
	
	
	
	// 轮播图
	.swi{
		margin: 0 auto;
		width: 98%;
		height: 30vh;
		opacity: 0; //配合动画
		border-radius: 15px;
		overflow: hidden;
		
		.nav{
			width: 100%;
			height: 100%;
			position: relative;
			
			.navtext{
				width: 100%;
				position: absolute;
				top: 80%;
				left: 0;
				font-size: 4vh;
				color: #fff;
				text-decoration: overline;
				text-shadow: 1px -1px #fff, -1px 1px #999, -10px 10px 5px #80808080;
				
			}
		}
		
	}
	
	
	// 搜索框 跳转
	.searbox{
		width: 98%;
		height: 5vh;
		margin: 0 auto;
		padding: 2px;
		box-sizing: border-box;
		overflow: hidden;
		// border-radius: 20px;
		// background-color: #D7FFFE;
		position: relative;
		top: -1%;
		opacity: 0;  //配合动画
		animation: searbox 2s forwards;
		display: flex;
		
		
		.sealeft{
			height: 100%;
			width: 90%;
			background-color: #4B282B90;
			border-radius: 50px;
			
			
			.navinput{
				height: 100%;
				width: 91%;
				
			}
			
			.navinput::after{
				position: absolute;
				top: 28%;
				left: 4%;
				color: #fff;
				letter-spacing: 5px;
				font-size: 1.5vh;
				content: "请输入菜名!";
			}
			
			.seaicons{
				position: absolute; 
				top: 14%;
				right: 11.5%;
				box-sizing: border-box; 
				padding: 0.5% 0 0 0.6%;
				background-color: #fff; 
				border-radius: 100px; 
				width: 3.5vh;
				height: 3.5vh;
			}
			
		}
		
		.searight{
			height: 100%;
			width: 10%;
		}
	}
	
	
	// 内容区域
	.popubox{
		margin: 0 auto;
		width: 98%;
		height: 18vh;
		background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);
		border-radius: 5px;
		overflow: hidden;
		display: flex;
		border: 5px double #aaffff;
		
		.poptitle{
			min-width: 12%;
			max-width: 12%;
			line-height: 13vw;  //控制上下字和字的间距
			letter-spacing: 1vw;  //控制左右的间距，这两句加上下面一句text-align: center;元素的大小等等属性可以实现文字从上到下，从左到右排列
			text-align: center;
			font-size: 5vw;
			opacity: 0;  //配合动画
			border-right: 3px solid #aaaaff;
		}
		.scrollcen{
			box-sizing: border-box;
			min-width: 88%;
			max-width: 88%;
			display: flex;
			
			.poplist{
				box-sizing: border-box;
				border-right: 2px solid #aaaaff;
				min-width: 8%;
				min-width: 8%;
				
				
				view{
					line-height: 7vw;
					// letter-spacing: 3vw;
					padding-top: 3%;
					font-size: 3vw;
					opacity: 0; //配合动画
					// text-align: center;
					writing-mode: vertical-rl;/* 文字从上到下，从右到左排列 */
				}
				
				image{
					display: block;
					box-sizing: border-box;
					opacity: 0; //配合动画
					width: 100%;
					height: 30%;
				}
				
			}
			
		}
		
		
	}
	
	
	
	// 弹出分析样式
	.analyseBox{
		position: fixed;
		left: 0;
		top: 100vh;
		width: 100vw;
		height: 100vh;
		background-color: #D7FFFE30;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.8s;
		
		.analyse{
			width: 55%;
			height: 15%;
			border-radius: 10px;
			overflow: hidden;
			background-color: #ffaa7f;
			transform: translateY(200%);
			box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
			
			.antop{
				width: 100%;
				height: 18%;
				color: #FFFEFF;
				text-align: center;
				font-size: 2vh;
				// text-shadow: 1px -1px #fff, -1px 1px #999, -10px 10px 5px #80808080;
			}
			.animg{
				margin: 0.5% auto 1.3% auto;
				width: 80%;
				height: 46%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.bot{
				width: 100%;
				height: 30%;
				padding-bottom: 5px;
				display: flex;
				
				
				.cancel{
					margin: 0 auto;
					background-color: #aaaaff;
					border-radius: 10px;
					overflow: hidden;
					width: 45%;
					height: 100%;
					font-size: 2.5vh;
					line-height: 3.5vh;
					text-align: center;
					transition: all 0.1s; 
					box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
				}
				.cancel:active{
					transform: scale(0.9,0.9);
					background-color: #aaaa7f55;
				}
				.affirm{
					@extend.cancel
				}
				.affirm:active{
					transform: scale(0.9,0.9);
					background-color: #aaaa7f55;
				}
			}
		}
	}
	
	
	
</style>