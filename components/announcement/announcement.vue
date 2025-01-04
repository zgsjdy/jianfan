<template>
	<view class="anncembox"  :style="annCemStyle">
		<view class="notice">
			<view class="notTitle">{{openData.noticeTitle}}</view>
			<view class="notcen">{{openData.noticeConten}}</view>
			<view class="notbut" @click="reviseAnalyStyle" :style="`background-color: ${ annCount <= 0 ? '#98a3ff' : '#999' };`">
				我知道了
				<text v-show="!annCount <= 0">({{annCount}})</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { reactive, ref } from 'vue';


	
	
	// 接收通过属性（props）传值,异步
	const propsZ = defineProps({
		noticeOpenor:{
			type:Object,
			default:null
		}
	})
	// console.log(propsZ)
	
	// 把不可修改值给本组件（可修改）
	let openData = propsZ.noticeOpenor
	// console.log(openData)  //由于传值是异步所以这里是打印不了值的，但是控制台有值是因为网络数据回来了内存地址没变所以控制台展开会有值
	
	
	
	// 公告按钮点击事件
	function reviseAnalyStyle(){
		if(annCount.value <= 0){
			clearInterval(setid);
			
			annCemStyle = Object.assign(annCemStyle,{
				opacity: 0,
				top: "-100vh"
			})
			
		}
	}
	
	
	
	let annCemStyle = reactive({})
	// let annCount = ref(openData.noticeDela ?? 10)
	let annCount = ref(10)
	
	
	let setid
	let setelsid
	let setelconst = 0
	
	// 让动画播放完才显示公告
	setTimeout(()=>{
		
		
		if(openData.noticeOpenorNot){
			
			annCount.value = openData.noticeDelay ?? 10;  //赋值数据库的值，不在外面赋值是因为数据异步的赋值过早就为空 ?? 和 || 类似但是问好是官方出的，两者有区别
			// console.log(openData.noticeDelay)
			
			annCemStyle = Object.assign(annCemStyle,{
				opacity: 1,
				top: "0vh"
			})
			
			// 配合过度，过度完成后在计时,实现多少秒内不能点击
			 setTimeout(()=>{
				// 倒计时
				setid = setInterval(()=>{
					// console.log(annCount.value)
					
					if(annCount.value <= 0){
						clearInterval(setid);
						
					}else{
						annCount.value--;
					}
				},1000)
			},800)
			
			
		}else{
			// 解决网络慢和错失判断问题
			setelsid = setInterval(()=>{
				
				setelconst++;
				if(setelconst >= 30 ){
					clearInterval(setelsid);
					
				}
				
				
				// console.log("重新请求！")
				if(openData.noticeOpenorNot){
					
					clearInterval(setelsid);
					
					annCount.value = openData.noticeDelay ?? 10;  //赋值数据库的值，不在外面赋值是因为数据异步的赋值过早就为空 ?? 和 || 类似但是问好是官方出的，两者有区别
					// console.log(openData.noticeDelay)
					
					annCemStyle = Object.assign(annCemStyle,{
						opacity: 1,
						top: "0vh"
					})
					
					// 配合过度，过度完成后在计时,实现多少秒内不能点击
					 setTimeout(()=>{
						// 倒计时
						setid = setInterval(()=>{
							// console.log(annCount.value)
							
							if(annCount.value <= 0){
								clearInterval(setid);
								
							}else{
								annCount.value--;
							}
						},1000)
					},800)
					
					
				}
			},1000)
			
			
		}
	},500)
	
	
	
</script>

<style lang="scss" scoped>
	.anncembox{
		opacity: 0;
		position: fixed;
		left: 0;
		top: -100vh;
		width: 100vw;
		height: 100vh;
		background-color: #D7FFFE30;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.8s;
		z-index: 1099;
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		
		.notice{
			padding: 20px;
			border-radius: 40px;
			width: 80%;
			background-color: #fff;
			
			.notTitle{
				text-align: center;
				font-size: 5vw;
			}
			
			.notcen{
				text-align: center;
				font-size: 4vw;
				margin-top: 5%;
				color: #999;
			}
			.notbut{
				color: #fff;
				text-align: center;
				font-size: 4vw;
				margin: 5% auto 0 auto;
				border-radius: 32px;
				width: 80%;
				transition: all 0.1s;
			}
			.notbut:active{
				background-color: #999 !important;
			}
		}
		
		
	}
</style>