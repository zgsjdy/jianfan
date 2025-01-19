<template>
	<scroll-view class="combox" 
	scroll-y :style="`height: calc(100vh - ${botSafeHeight+menheight+statusBarHeight+3}px);`" 
	@scrolltolower="bottomLoad.load(queryInput, contentListData.length)"  lower-threshold="30" >
	<!-- *********注意*********  这里不需要点value 本身在模板都不需要不在js里面所以直接contentListData.length-->
		
		
		<!-- 占位元素，防止使用外边距和内边距在scroll-view顶部导致会有滚动,这里的内边距是把自己撑高，实际和直接设置高度一样只不过是用内边距当高度 -->
		<view style="width: 100%; padding-top: 2%;"></view>
		
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
			
			
			
			<!-- 弹出提示框 注意这里这里是没用ref获取虚拟dom是因为在组件里面获取不了微信的环境-->
			<view class="searTips" :style="searSL.searTispStyle">
				<view class="searContenBox">
					
					<template v-for="(itme,index) in searSL.searchTispData" :key="index" >
						<view class="searTipsList" v-if="index < 5" >
							
							<rich-text :nodes="itme.mark" class="rich" :selectable="false" :preview="false" @click="clickDish(itme.name)"></rich-text>
							
							<!-- 3D显示菜成品图(装饰) -->
							<view class="searTipsListbox">
								<view class="searTipsList3D">
									<view class="listLi" v-for="(_,index) in 6" :key="index" :style="`background-image: url(${itme.topurl});`"></view>
								</view>
							</view>
							
						</view>
					</template>
					
					
					<!-- 加载,注意这里双引号和单引号contentText="这里面不能使用双引号，（容易忽略）" -->
					<uni-load-more iconType="circle" :contentText="{
						contentdown: 'o((>ω< ))o',
						contentrefresh: '正在加载...',
						contentnomore: '没有更多数据了'
					}" :status="searSL.PopPromptsLoading"  />
					
					
					<!-- 提示末尾水波纹效果（装饰） -->
					<image :src="Psbimg" mode="scaleToFill" :draggable="false" 
					style="width: 100%; height: 7vh; margin: 0; padding: 0; display: block; box-sizing: border-box; transform: translateY(-28%);" >
					</image>
					
					
				</view>
					
			</view>
		</view>
		
		
		<!-- 历史搜索记录 -->
		<template v-if="hSDataSL.hSarr.length !== 0">
			<view class="historySearch">
				<view v-for="(itme,index) in hSDataSL.hSarr" :key="index" 
				class="historySearchList"
				:class="hSDataSL.whetherDelete ? 'historySearchListAfter' : ''"
				@click="hSDataSL.deleteAnyClick(itme, index)">
				<!-- 注意###### @click=“这里面只能用单引号或模板字符串注意容易忽略，会写成双引号里面套双引号”   -->
				
				<view class="historySearchText">{{itme}}</view>
				</view>
				
				
				<view class="delet">
					<template v-if="!hSDataSL.whetherDelete">
						<uni-icons type="trash" size="2vh"  @click="hSDataSL.setwhetherDelete(true)"></uni-icons>
					</template>
					<template v-else>
						<uni-icons type="closeempty" size="2vh" @click="hSDataSL.setwhetherDelete(false)"></uni-icons>
					</template>
				</view>
			</view>
		</template>
		
		
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
				<navigator class="comList" hover-class="none" 
				v-for="(itme, index) in contentListData" :key="index"
				:url="`/pages/displaysTheAnalyzedContent/displaysTheAnalyzedContent?nameId=${itme.name}`" >
					<image class="comImg" :src="itme.topurl" 
					:draggable="false" lazy-load mode="scaleToFill"></image>
					
					<view class="comText">{{itme.name}}</view>
				</navigator>
			</view>
		</template>
		
		
		<!-- 上滑加载更多 -->
		<uni-load-more iconType="circle" :status="bottomLoad.bottStatus.value" 
		:style="`visibility: ${ bottomLoad.bottStatus.value === 'more' ? 'hidden' : 'visible' };`"
		:contentText="{ contentdown: ' ' }" />
		
	</scroll-view>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, watch } from "vue";
import { queryInput, getTobBotMar } from "@/utils/getSysInf.js";
import myRef from "../../utils/myRef";
import usecomSearchBox from "../hooks/usecomSearchBox";
import { useBotNarStor } from "@/stores/counter"; //导入pinia
const P = useBotNarStor();  //获取pinia值
// @ts-ignore
const Pimg = P.QJScreenOnceimg.searchBoxStatus.NoResults;
//@ts-ignore
const Psbimg = P.QJScreenOnceimg.searchBoxStatus.waterRipples;
// console.log(Pimg)

// 获取主体滚动高度
const { menheight,statusBarHeight } = getTobBotMar('top')
const { botSafeHeight } = getTobBotMar('bot')


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
		height: string;
		// [key: string]: string;
	}
	
	interface MyObject {
		//属性
		whetherOrNotToFocus?: boolean; 
		searchName?: string;
		searchTispData: {name?:string;[key:string]:any}[];
		searTispStyle: searTispStyle;
		newset: Set<Object>;
		PopPromptsLoading: string;
		
		
		// 方法
		getWhetherOrNotToFocus(myget: boolean,e?: Object): string | Object;
		getWhetherOrNotToBlur(myget: boolean,e?: Object): string | Object;
		setHeight(height: number, num: number): void;
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
				height: "40vh"
			}
		}
		
		
	}
	
	class searFBFun extends searFB {
		// 简写ts
		// public：表示该属性是公有的，可以在类外部访问。
		// private：表示该属性是私有的，只能在类内部访问。
		// protected：表示该属性是受保护的，只能在类及其子类中访问。
		// readonly：表示该属性是只读的，初始化后不能修改。
		
		constructor( 
		whetherOrNotToFocus?: boolean, 
		searchName?: string, 
		public PopPromptsLoading: string = "no-more"
		){
			
			super(whetherOrNotToFocus,searchName) //调用父类构造函数
			
		}
		
		
		// 方法
		
		
		setHeight(height: number, num: number): void{
			let connunFixed: number = (height*num) + 9;
			
			if(num === 0 || height === 0){ 
				this.searTispStyle.height = '9vh'; 
			}
			else if(connunFixed >= 40){
				this.searTispStyle.height = '40vh';
			}else{
				this.searTispStyle.height = connunFixed.toFixed(1) + "vh"
			}
			
		}
		
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
	const Titme: number = 300
	let searchNameMyref: REF  = myRef("",Titme), searSL: MyObject ;
	
	// 在上面自定义ref处以声明
	searSL = reactive(new searFBFun(false,searchNameMyref.value))
	// console.log(searSL,"FFF")
	
	let newmap: Map<string ,{name?: string; [key: string]: any}[]> = new Map(), cache: number = 0;
	
	let pattern: RegExp = /^[\u4e00-\u9fa5a-zA-Z\s]*[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5a-zA-Z\s]*$/;
	
	// 监视,多个,注意只能监视响应式数据,自定义ref监视这里不用点value，因为监视的是ref，不是ref里面的值
	watch([searchNameMyref, ()=> searSL.whetherOrNotToFocus],([newMY, newFO],[oldMY, oldFO])=>{
		
		// 判断是否弹出搜索框提示
		if(searSL.whetherOrNotToFocus){
			
			if(searchNameMyref.value !== null && searchNameMyref.value !== undefined && pattern.test(searchNameMyref.value)){
					
				clearMapByCount(newmap, 600, 100)  //清理Map函数
				console.log(newmap)
				if(newmap.has(searchNameMyref.value)){
					// 有缓存使用缓存
					searSL.searchTispData = newmap.get(searchNameMyref.value)
					
					searSL.getWhetherOrNotToFocus(true)
					searSL.setHeight(6.3, searSL.searchTispData.length)
					searSL.PopPromptsLoading = 'more'
				}else{
					
					searSL.PopPromptsLoading = "loading"
					
					// 调用搜索函数，异步函数then也是异步，网络慢会先运行then后面的代码
					queryInput('jianfandata','jfContentsData',{name:searchNameMyref.value},8,"降序").then((res)=>{
						
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
							if(searSL.newset.size >= cache && searchNameMyref.value !== ""){
								newmap.set(searchNameMyref.value, searSL.searchTispData)
								cache = searSL.newset.size  //保持和Set长度统一
							}
								
							
							// 防止用户操作太快，监控失焦后网络慢会先运行关闭弹窗在运行下面这行打开弹窗代码
							if(searSL.whetherOrNotToFocus){searSL.getWhetherOrNotToFocus(true);}
								
							searSL.setHeight(6.3, searSL.searchTispData.length)
							searSL.PopPromptsLoading = "more"
						}else{
							searSL.searchTispData = []
							searSL.setHeight(6.3, searSL.searchTispData.length)
							searSL.PopPromptsLoading = "no-more"
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
	
	// 点击菜名导入文件和滚动到底部加载等等
	let { contentListData, contentStatus, reviseStatus, bottomLoad } = usecomSearchBox()
	
	
	// 点击菜名闭包异步函数
	function clickDishClosure(): Function {
		let constnum: number = 0, constnumtTow: number = 0;
		
		
		return async function ClickDish(nameid?: string): Promise<void> {
			let name: string = nameid || searchNameMyref.value ,res: {data: Object[]};
			if("setSatus" in bottomLoad){ bottomLoad.setSatus("more") } //防止搜索的时候底部上滑还显示没有数据这些字
			// 判断searchNameMyref.value有没有值，nameid参数进来的都会有值
			if(name !== nameid){
				constnum++;
				if(constnum === 1){
					setTimeout(async ()=>{
						// console.log(searchNameMyref.value,"clike") 
						// 注意这块代码判断和给这个函数值，由于searchNameMyref.value是延迟的，所以上下文关系没处理好会先运行searchNameMyref.value = ""（快速多次点击下面代码）
						await ClickDish(searchNameMyref.value); 
						constnum = 0; //注意顺序
					},Titme)
				}
				return
			}
			
			reviseStatus("no-more")
			if(newmap.has(name)){
				contentListData.value = newmap.get(name)
				// in 关键字用于检查对象是否具有指定的属性（包括方法）。语法是propertyName in object
				if("addhSarr" in hSDataSL){ hSDataSL.addhSarr(name); }
				if("recordValue" in bottomLoad){ bottomLoad.recordValue = name } //添加上滑加载关键字
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
						// in 关键字用于检查对象是否具有指定的属性（包括方法）。语法是propertyName in object
						if("addhSarr" in hSDataSL){ hSDataSL.addhSarr(name); }
						if("recordValue" in bottomLoad){ bottomLoad.recordValue = name } //添加上滑加载关键字
						reviseStatus("value")
					}else{
						reviseStatus("no-more")
						contentListData.value = []
					}
					
				}
				
			}
			
			//******注意******，这里要延迟执行防止用户过快按下键盘搜索键，页面输入框还是有用户输入的值，searchNameMyref.value有延迟，
			//如延迟300用户输入西还没改就被系统赋值为空（函数可以传值可以不用靠searchNameMyref.value的值），导致vue会觉得两次内容没变不刷新页面
			if(name === nameid && name !== undefined && name !== null && name !== ""){
				constnumtTow++; //让定时器只运行一次
				if(constnumtTow === 1){
					setTimeout(()=>{
						searchNameMyref.value = ""; 
						constnumtTow = 0; //注意顺序,加防止快速点击键盘完成按钮
						// console.log("$$$$$")
					},Titme)
				}
			}else{
				// 进这里已经使用过回调函数了，所以直接赋值不用延迟
				searchNameMyref.value = ""; 
			}
			
			
		}
	}
	// 使用闭包
	let clickDish: Function = clickDishClosure()
	
	// 点击完成按钮时触发(键盘弹出按钮显示搜索)，event.detail = {value: value}
	function confhandle(e:any): void{
		// 防止用户操作太快导致自定义ref定义的时间还没到，所以没修改,导致给了空值，ref最好不要给太就的时间因为clickDish里面还有很多不能为空的判断
		clickDish(e.detail.value);
		// console.log(e.detail)
	}
	
	
	
	
	
	interface hisSear {
		hSarr:string[];
		whetherDelete: boolean;
		addhSarr(d: string): void;
		setwhetherDelete(swi: boolean): void;
		deleteAnyClick(str: string, index: number): void;
	}
	
	// 缓存搜索历史
	class historySearch {
		constructor( public hSarr:string[] = [], public whetherDelete: boolean = false ){
		}
		
		
		addhSarr(d: string): void{
			let index: number = this.hSarr.indexOf(d)
			
			if(this.hSarr.length >= 25){
				this.hSarr.pop()
			}
			
			if(index !== -1){
				let numstr: string;
				// 注意注意注意，容易搞乱
				// slice：不修改原数组，只返回一个新数组。
				// splice：会修改原数组。也有返回值
				numstr = this.hSarr.splice(index, 1)[0] //后面【0】是因为splice会返回一个新数组，这里调用新数组第一项
				if(numstr !== "" && numstr !== undefined && numstr !== null){
					this.hSarr.unshift(d); //插入数组第一项
				}
			}else{
				if(d !== "" && d !== undefined && d !== null){this.hSarr.unshift(d)}
			}
		}
		
		
		setwhetherDelete(swi: boolean): void{
			this.whetherDelete = swi;
			// console.log(this.whetherDelete,swi)
		}
		
		deleteAnyClick(str: string, index: number): void{
			
			if(this.whetherDelete){
				this.hSarr.splice(index,1)
				if(this.hSarr.length === 0){ this.whetherDelete = false }
			}else{
				searchNameMyref.value = str;
			}
			
		}
		
	}
	
	let hSDataSL: hisSear = reactive(new historySearch())
	// console.log(hSDataSL)
	
	
	
	// 添加历史缓存和获取
	onBeforeUnmount(()=>{
		uni.setStorage({
			key: "Searchforhistoricaldata",
			data: hSDataSL.hSarr,
			success() {
				
				// console.log("缓存成功！")
			}
		})
	})
	
	onMounted(()=>{
		uni.getStorage({
			key:"Searchforhistoricaldata",
			success(e) {
				if(e.data.length !== 0){ hSDataSL.hSarr = e.data }
				// console.log("获取缓存成功！",e.data)
			}
		})
	})
	
	
	
	
	
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
	
	
	// 搜索历史动画
	@keyframes historySe {
		1%{
			opacity: 0;
			transform: scale(1,0);
		}
		100%{
			opacity: 1;
			transform: scale(1,1);
		}
	}
	
	
	
	
	// 删除历史弹删除按钮
	@keyframes moarAnimAfter {
		1%{
			opacity: 0;
			transform: translateX(-50%);
		}
		100%{
			opacity: 1;
			transform: translateX(0);
		}
	}
	
	
	/* 定义绕Y轴转动的动画 */
	@keyframes RotateY {
	    0% {
	        transform: rotateY(0);
	    }
	    100% {
	        transform: rotateY(360deg);
	    }
	}
	
	
	
	// ********注意这里用了scoped，还用了forwards****所以用行内样式写animation将会不起效果**********
	.moarAnim{ 
		animation: moarAnim 0.8s forwards; 
		opacity: 0;//配合动画 
	}
	
	
	.combox{
		width: 98%;
		margin: 0 auto;
		// padding-bottom: calc( env(safe-area-inset-bottom) + 3px);  //使用自带的安全距离
		
		
		
		
		// 搜索框
		.searbox{
			width: 98%;
			height: 5vh;
			margin: 0 auto;
			padding: 2px;
			box-sizing: border-box;
			// overflow: hidden;
			position: relative;
			display: flex;
			
			
			// 弹出搜索框提示
			.searTips{
				--backTisp: #fff;
				width: 75vw;
				padding: 2%;
				border-radius: 15px;
				background-color: var(--backTisp);
				opacity: 0; //配合过度
				transition: all 0.4s;
				transform-origin: center top; 
				background-image: linear-gradient(-180deg, #FFFEFF50 38%, #D7FFFE60 100%);
				position: absolute;
				top: 120%;
				right: 10%;
				z-index: 9;
				
				
				
				.searContenBox{
					width: 100%;
					height: 100%;
					overflow: hidden;
					
					.searTipsList{
						--richWidth: 80%;
						width: 100%;
						height: 5vh;
						margin-bottom: 4%;
						border-bottom: 1px dotted #aaaa00;
						padding-bottom: 3px;
						display: flex;
						
						.rich{
							width: var(--richWidth);
							height: 100%;
							// background-color: #ff55ff50;
						}
						
						
						// 3D部分
						.searTipsListbox{
							width: calc(100% - var(--richWidth));
							height: 100%;
							overflow: hidden;
							display: flex;
							justify-content: center;
							align-items: center;
							/* 设置透视点,相当于摄像机的远近 */
							perspective: 1000px;
							// 设置摄像机的位置，注意和transform-origin不同，这个是控制变形的中心点
							perspective-origin: -10% -130%;
							
							.searTipsList3D{
								--translateZ: 8vw;
								width: 60%;
								height: 60%;
								position: relative;
								display: flex;
								justify-content: center;
								align-items: center;
								transform-style: preserve-3d;
								/* 调用绕Y轴旋转的动画 */
								animation: RotateY 20s linear infinite;
								
								.listLi{
									background-color: #aaffff50;
									position: absolute;
									width: 98%;
									height: 98%;
									border: 0.3vh solid #aaaaff;
									background-position: center;
									background-size: cover;
									border-radius: 3px;
									
									&:nth-child(1) {
									    transform: translateZ(var(--translateZ));
									}
									
									&:nth-child(2) {
									    transform: rotateY(60deg) translateZ(var(--translateZ));
									}
									
									&:nth-child(3) {
									    transform: rotateY(120deg) translateZ(var(--translateZ));
									}
									
									&:nth-child(4) {
									    transform: rotateY(180deg) translateZ(var(--translateZ));
									}
									
									&:nth-child(5) {
									    transform: rotateY(240deg) translateZ(var(--translateZ));
									}
									
									&:nth-child(6) {
									    transform: rotateY(300deg) translateZ(var(--translateZ));
									}
									
								}
								
							}
							
						}
					
					}
					
					// 选择searTipsList最后一个元素,注意这里用:last-child不起效果，选择范围不一样，后面还跟着有加载图标
					.searTipsList:last-of-type{
						margin-bottom: 0;
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
				padding-left: 15px;
				outline: 6px double #fff;
				outline-offset: -6px; //用outline代替border是让input元素不影响布局,注意父元素溢出隐藏，太大会看不到部分边框
				
				.navinput{
					height: 100%;
					width: 86%;
					color: #fff;
					font-size: 2vh;
				}
				
				.seaicons{
					position: absolute; 
					top: 14.87%;  //不修改样式的情况下，不建议修改14.87这个值
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
					transform: scale(0.88,0.88);
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
		
		
		//收缩框历史
		 .historySearch{
			width: 93%;
			height: 8vh;
			margin: 5% auto 0 auto;
			padding-right: 2%;
			overflow: hidden;
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: flex-start;
			align-content: flex-start;
			border-radius: 15px;
			border: 1rpx solid #4B282B90;
			position: relative;
			opacity: 0; //配合动画
			animation: historySe 0.5s forwards;
			// background-color: #aaaa00;
			
			
			.historySearchList{
				margin: 0.8vh 1.5% 1.5% 1.5%;
				padding: 0.4vh;
				max-width: 30%;
				min-width: 5%;
				min-height: 30%;
				max-height: 30%;
				border-radius: 5px;
				animation: moarAnim 0.5s forwards;
				transition: all 0.1s;
				background-color: #eeeeee80;
				position: relative;
				
				.historySearchText{
					width: 100%;
					height: 100%;
					text-align: center;
					font-size: 1.6vh;
					line-height: 1.6vh;
					// 单行文本溢出显示省略号，要这三个属性配合用才有效果  ######
					white-space: nowrap;  //不进行换行
					overflow: hidden;
					text-overflow: ellipsis;
				}
				
			}
			
			.historySearchList:active{
				background-color: #bebebe;
			}
			
			// 点击删除历史修改部分原本样式配合伪元素
			.historySearchListAfter{
				border-radius: 5px 0 0 5px;
			}
			// 点击删除历史伪元素
			.historySearchListAfter::before{
				box-sizing: border-box;
				margin: 0;
				padding: 0.5vh 0 0 0;
				height: 100%;
				display: block;
				content: "❌";
				font-size: 1vh;
				background-color: #ffc0f9;
				border-radius: 0 5px 5px 0;
				position: absolute;
				top: 0vh;
				right: -1vh;
				z-index: 9;
				opacity: 0;  //配合动画
				animation: moarAnimAfter 0.8s forwards; 
			}
			
			.delet{
				width: 3vw;
				position: absolute;
				top: 3vh;
				right: 0.5vh;
			}
			
			
		 }
		
		
		
		// 内容区
		.comCen{
			width: 98%;
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			align-content: flex-start;
			justify-content: space-between;
			
			.comList{
				--ImgHeight: 80%; //图片的高度，方便其他模块动态计算高度
				box-sizing: border-box;
				background-color: #ff55ff50;
				width: 46%;
				height: 25vh;
				margin: 2%;
				padding: 10px;
				border-radius: 15px;
				box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
			
			
			.comList:active{
				// 由于comList用了动画固定所以不用!important，将无效果，过度用了!important也无效果
				opacity: 0.8 !important;
				transform: scale(0.98,0.98) translateY(-5px) !important;
			}
			
		}
		
	}
</style>