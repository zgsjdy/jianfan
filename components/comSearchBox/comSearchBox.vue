<template>
	<view class="combox">
		
		<!-- 搜索框  -->
		<view class="searbox">
			<view class="sealeft">
				<input type="text" 
				confirm-type="search" 
				cursor-color="#ffaaff" 
				@focus="searSL.getWhetherOrNotToFocus(false,$event)" 
				@blur="searSL.getWhetherOrNotToBlur(false,$event)"
				@confirm="confhandle"
				v-model="searchNameMyref"
				placeholder="请输入菜名!" 
				placeholder-style="color:#fff;"  class="navinput"/>
				
				<uni-icons type="search" size="3vh" color="#924BDA" class="seaicons" @click="clickDish"></uni-icons>
			</view>
			
			
			<view class="searight">
				<uni-icons type="undo" size="4.5vh" color="#fff" @click="backClick"></uni-icons>
			</view>
			
			
			
			<!-- 弹出提示框 -->
			<view class="searTips" :style="searSL.searTispStyle">
				<view class="searTipsList" v-for="(itme,index) in searSL.searchTispData" :key="index" >
					
					<rich-text :nodes="itme.mark" class="rich" :selectable="false" :preview="false" @click="clickDish(itme.name)"></rich-text>
					
					
					<view class="searTipsList3D">
						<view>
							3D3D
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 显示搜索内容区 -->
		<template v-if="contentStatus === 'no-more'">
			<!-- ********注意***这里用了scoped所以用行内样式写animation将会不起效果********** -->
			<image :src="Pimg" mode="aspectFit" :draggable="false" style="width: 18%;height: 20vh;margin: 0 auto;display: block;" class="moarAnim"></image>
			<!-- ********注意***这里用了scoped所以用行内样式写animation将会不起效果********** -->
			<view style="width: 100%; text-align: center; color: #5d5555;" class="moarAnim">未找到相关搜索</view>
		</template>
		<template v-else-if="contentStatus === 'loading'">
			<uni-load-more iconType="circle" :status="contentStatus"  />
		</template>
		<template v-else>
			<view class="comCen">
				<view class="comList"  v-for="(itme, index) in contentListData" :key="index">
					<image class="comImg" :src="itme.topurl" 
					:draggable="false" lazy-load mode="scaleToFill"></image>
					
					<view class="comText">{{itme.name}}</view>
				</view>
			</view>
		</template>
		
		
	</view>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import { queryInput } from "@/utils/getSysInf.js";
import myRef from "../../utils/myRef";
import usecomSearchBox from "../hooks/usecomSearchBox";
import { useBotNarStor } from "@/stores/counter"; //导入pinia
const P = useBotNarStor();  //获取pinia值
// @ts-ignore
const Pimg = P.QJScreenOnceimg.searchBoxStatus.NoResults;
// console.log(Pimg)



	// 搜索框返回页面函数
	function backClick():void{
		uni.navigateBack();  //返回上一页面
	}
	
	
	// 创建一个类里面有搜索框焦点失去和获取的方法等
	
	type REF = {
		value: string;
	}
	
	type searTispStyle = {
		opacity: number;
		transform:string;
		// [key: string]: string;
	}
	
	interface MyObject {
		//属性
		whetherOrNotToFocus?: boolean; 
		searchName?: string;
		searchTispData: {name?:string;[key:string]:any}[];
		searTispStyle: searTispStyle;
		newset: Set<Object>;
		// 方法
		getWhetherOrNotToFocus(myget: boolean,e?: Object): string | Object;
		getWhetherOrNotToBlur(myget: boolean,e?: Object): string | Object;
	}
	
	class searFB {  /* 无简写 ,注意部分代码无用也没注释练习用的*/
		whetherOrNotToFocus?: boolean;
		searchName?: string;
		searchTispData: Object[];
		searTispStyle: searTispStyle;
		newset: Set<Object>;
		
		constructor(whetherOrNotToFocus?: boolean, searchName?: string){
			this.whetherOrNotToFocus = whetherOrNotToFocus ?? false;
			this.searchName = searchName || '';
			this.searchTispData;
			this.newset = new Set();
			this.searTispStyle = {
				opacity:0,
				transform: "translateY(-12px) scale(1,0)",
			}
		}
		
		
	}
	
	class searFBFun extends searFB {
		// 简写ts
		// public：表示该属性是公有的，可以在类外部访问。
		// private：表示该属性是私有的，只能在类内部访问。
		// protected：表示该属性是受保护的，只能在类及其子类中访问。
		// readonly：表示该属性是只读的，初始化后不能修改。
		
		constructor( whetherOrNotToFocus?: boolean, searchName?: string, public houby: string = "不需要值（如果加了问号就不能有默认值）" ){
			
			super(whetherOrNotToFocus,searchName) //调用父类构造函数
			
		}
		
		
		// 方法
		
		
		/**
		 *聚焦调用函数，并修改whetherOrNotToFocus值，失败返回input的event值，可进行其他操作
		 *  
		*/
		getWhetherOrNotToFocus(myget: boolean = false, e?: Object): string | Object{
			this.whetherOrNotToFocus = true;
			if(this.whetherOrNotToFocus === true){
				
				if(myget){
					this.searTispStyle = Object.assign(this.searTispStyle,{
						opacity:1,
						transform: "translateY(0px) scale(1,1)",
					})
				}
				
				return "聚焦";
			}else{
				// console.log(e)
				return e;
			}
		}
		
		
		/**
		 *失焦调用函数，并修改whetherOrNotToFocus值，失败返回input的event值，可进行其他操作
		 *  
		*/
		getWhetherOrNotToBlur(myget: boolean = false, e?: Object): string | Object{
			this.whetherOrNotToFocus = false;
			if(this.whetherOrNotToFocus === false){
				
				if(myget){
					this.searTispStyle = Object.assign(this.searTispStyle,{
						opacity:0,
						transform: "translateY(-12px) scale(1,0)",
					})
				}
				
				return "失焦";
			}else{
				// 这里一样能获取到e,即使调用的时候没有用（）
				// console.log(e);
				return e;
			}
		}
		
	}
	
	
	
	
	//自定义ref搜索框的值, *******修改会去掉空格*******
	let searchNameMyref: REF  = myRef("",300), searSL: MyObject ;
	
	// 在上面自定义ref处以声明
	searSL = reactive(new searFBFun(false,searchNameMyref.value))
	// console.log(searSL,"FFF")
	
	let newmap: Map<string ,{name?: string; [key: string]: any}[]> = new Map(), cache: number = 0;
	
	let pattern: RegExp = /^[\u4e00-\u9fa5a-zA-Z\s]*[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z\s]*$/;
	
	// 监视,多个,注意只能监视响应式数据,自定义ref监视这里不用点value，因为监视的是ref，不是ref里面的值
	watch([searchNameMyref, ()=> searSL.whetherOrNotToFocus],([newMY, newFO],[oldMY, oldFO])=>{
		console.log(searchNameMyref.value)
		// 判断是否弹出搜索框提示
		if(searSL.whetherOrNotToFocus){
			
			if(searchNameMyref.value !== null && searchNameMyref.value !== undefined && pattern.test(searchNameMyref.value)){
					
				clearMapByCount(newmap, 600, 100)  //清理Map函数
				console.log(newmap)
				if(newmap.has(searchNameMyref.value)){
					// 有缓存使用缓存
					searSL.searchTispData = newmap.get(searchNameMyref.value)
					
					searSL.getWhetherOrNotToFocus(true)
				}else{
					
					// 调用搜索函数，异步函数then也是异步，网络慢会先运行then后面的代码
					queryInput('jianfandata','jfContentsData',{name:searchNameMyref.value},5,"降序").then((res)=>{
						
						if(res.data.length !== 0){
							
								
							// 处理标红
							searSL.searchTispData = res.data.map((itme:{name:string})=>{
								const mark = `<div style="
								width: 100%;
								height: 100%;
								font-size: 2.3vh;
								line-height: 5vh;">${RedFunction(itme.name,searchNameMyref.value,'#ff7878')}</div>`
								return {...itme,mark}
								 
							})
							
							
							// 添加缓存数据，这里绕路实现代码，只是练习知识点用的#########
							res.data.map((itme: Object)=>{
								//Set对象地址没变才会不添加，值一样对象地址不一样也会添加，所以这里转化成字符串
								searSL.newset.add(JSON.stringify(itme))
							})
							
							
							// 添加键值对缓存/*这里理论上searSL.newset.size >= cache判断可以不写，上面使用缓存后就不运行这里了*/
							if(searSL.newset.size >= cache){  
								newmap.set(searchNameMyref.value, searSL.searchTispData)
								cache = searSL.newset.size  //保持和Set长度统一
							}
								
							
							// 防止用户操作太快，监控失焦后网络慢会先运行关闭弹窗在运行下面这行打开弹窗代码
							if(searSL.whetherOrNotToFocus){searSL.getWhetherOrNotToFocus(true)}
								
							
							
						}else{
							searSL.searchTispData = []
						}
					});
					
					
				}
				
				
				
						
			}
			
		}else{
			searSL.getWhetherOrNotToBlur(true)  //不要随意调用关闭函数，运行顺序不对会导致用searSL.whetherOrNotToFocus判断不复合逻辑进不去，因为修改为false了
		}
		
		// console.log([newMY, newFO],[oldMY, oldFO])
	});
	
	
	// 标红函数
	function RedFunction(tispString:string, newtispString: string, color: string = 'red'):string{
		/* ##########正则注意事项#######
		  如果你不想让test方法受到g标志的影响（即不希望lastIndex属性自动更新），可以在每次使用test方法之前将lastIndex属性重置为0。
		  这样每次调用test方法时，正则表达式都会从字符串的开头开始匹配。
		  其他方法也有类似test方法的特性，所以要注意
		  */
		const regex: RegExp = new RegExp(newtispString ,'gi')
		return tispString.replace(regex,`<span style='color: ${color}'>${newtispString}</span>`)
	}
	
	// 清理map前值函数
	function clearMapByCount(map: Map<string ,{name?: string; [key: string]: any}[]>, monitorValues: number, countToKeep: number): boolean{
	    const currentSize: number = map.size;
	    if(countToKeep >= currentSize) {
	        return false;
	    }
		
		if( currentSize >= monitorValues){
			const keys = Array.from(map.keys());
			for (let i = 0; i < countToKeep; i++) {
			    map.delete(keys[i]);
			}
			return true;
		}
		
	    return false;
	}
	
	
	// 点击菜名函数
	let { contentListData, contentStatus, reviseStatus } = usecomSearchBox()
	
	
	async function clickDish(nameid?: string): Promise<void> {
		let name: string = nameid || searchNameMyref.value ,res: {data: Object[]};
		
		
		reviseStatus("no-more")
		if(newmap.has(name)){
			searchNameMyref.value = ""
			contentListData.value = newmap.get(name)
			reviseStatus("value")
		}else{
			
			// 添加缓存
			if(name !== null && name !== undefined && pattern.test(name)){
				reviseStatus("loading");
				res = await queryInput('jianfandata','jfContentsData',{name:name},8,"降序")
				
				if(res.data.length !== 0){
					// 处理标红
					contentListData.value = res.data.map((itme:{name:string})=>{
						const mark = `<div style="
						width: 100%;
						height: 100%;
						font-size: 2.3vh;
						line-height: 5vh;">${RedFunction(itme.name,name,'#ff7878')}</div>`
						return {...itme,mark}
						 
					})
					newmap.set(name, contentListData.value)
					reviseStatus("value")
				}else{
					reviseStatus("no-more")
					contentListData.value = []
				}
				
			}
			
			searchNameMyref.value = ""
			
		}
		
	}
	
	// 点击完成按钮时触发(键盘弹出按钮显示搜索)，event.detail = {value: value}
	function confhandle(e:any): void{
		// 防止用户操作太快导致自定义ref定义的时间还没到，所以没修改,导致给了空值，ref最好不要给太就的时间因为clickDish里面还有很多不能为空的判断
		clickDish(e.detail.value);
		// console.log(e.detail)
	}
	
	
</script>

<style lang="scss" scoped>
	// 列表动画 
	@keyframes searList {
		1%{
			opacity: 0;
			transform: translateY(-300px) scale(1,0);
		}
		30%{
			opacity: 0;
		}
		100%{
			opacity: 1;
			transform: translateY(0) scale(1,1);
		}
	}
	
	// 搜索内容提示未找到相关搜索弹出提示
	@keyframes moarAnim {
		1%{
			opacity: 0;
			transform: scale(0.9,0.9);
		}
		100%{
			opacity: 1;
			transform: scale(1,1);
		}
	}
	
	// ********注意这里用了scoped，还用了forwards****所以用行内样式写animation将会不起效果**********
	.moarAnim{ 
		animation: moarAnim 0.8s forwards; 
		opacity: 0;//配合动画 
	}
	
	// 搜索框
	.combox{
		width: 98%;
		margin: 0 auto;
		padding-bottom: calc( env(safe-area-inset-bottom) + 3px);  //使用自带的安全距离
		
		
		
		
		// 搜索框
		.searbox{
			width: 98%;
			height: 5vh;
			margin: 2% auto 0 auto;
			padding: 2px;
			box-sizing: border-box;
			// overflow: hidden;
			position: relative;
			display: flex;
			
			
			// 弹出搜索框提示
			.searTips{
				--backTisp: #fff;
				width: 75vw;
				max-height: 31.1vh;
				padding: 10px;
				border-radius: 15px;
				background-color: var(--backTisp);
				opacity: 0; //配合动画
				transition: all 0.4s;
				transform-origin: center top; 
				// animation: searList 1.5s forwards;
				position: absolute;
				top: 120%;
				right: 10%;
				z-index: 9;
				
				
				// transform-style: preserve-3d;
				
				.searTipsList{
					--richWidth: 80%;
					width: 100%;
					height: 5vh;
					margin-bottom: 10px;
					border-bottom: 1px dotted #aaaa00;
					padding-bottom: 3px;
					display: flex;
					
					.rich{
						width: var(--richWidth);
						height: 100%;
						// background-color: #ff55ff50;
					}
					
					.searTipsList3D{
						width: calc(100% - var(--richWidth));
						height: 100%;
						background-color: #aaaa00;
					}
				}
				
				
				
			}
			.searTips::before{
				display: block;
				content: "";
				border: 8px solid;
				width: 0;
				height: 0;
				position: absolute;
				top: -15px;
				right: 15px;
				border-color: transparent transparent var(--backTisp) transparent;  //只显示一边显示一个三角
				// transform: rotate(45deg); //这里不修改层级，用了动画固定了
				// z-index: -1;  // 这里无效z-index 的层级关系是相对于同一个堆叠上下文的。
				// transform: rotate(45deg) translateZ(-1px);  //代替z-index,注意动画不能forwards固定否者无效,要配合父元素使用transform-style: preserve-3d;才有3d效果
			}
			
			
			.sealeft{
				height: 100%;
				width: 90%;
				background-color: #4B282B90;
				border-radius: 50px;
				padding-left: 10px;
				
				.navinput{
					height: 100%;
					width: 86%;
					color: #fff;
					font-size: 2vh;
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
					transition: all 0.1s;
				}
				
				.seaicons:active{
					transform: scale(0.9,0.9);
				}
				
			}
			
			.searight{
				height: 100%;
				width: 10%;
				transition: all 0.1s; 
			}
			
			.searight:active{
				transform: scale(0.9,0.9);
			}
			
		}
		
		
		// 内容区
		.comCen{
			width: 98%;
			// background-color: #55aaff;
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			align-content: flex-start;
			justify-content: space-between;
			
			.comList{
				--ImgHeight: 80%; //图片的高度，方便其他模块动态计算高度
				
				background-color: #ff55ff50;
				width: 46%;
				height: 25vh;
				margin: 2%;
				padding: 10px;
				border-radius: 15px;
				overflow: hidden;
				opacity: 0;  //配合动画
				animation: searList 1.5s forwards;
				
				
				.comImg{
					width: 100%;
					height: var(--ImgHeight);
					border-radius: 8px;
					animation: searList 1.5s;
				}
				
				.comText{
					width: 100%;
					height: calc(100% - var(--ImgHeight));
					padding-top: 1%;
					border-top: #fff dashed 2px;
					font-size: 2vh;
					text-align: center;
					letter-spacing: 3px;
					text-decoration: underline;
					animation: searList 1.5s;
				}
			}
			
			
		}
		
		
		
	}
</style>