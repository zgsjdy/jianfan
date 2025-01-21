import { Ref, ref } from "vue"



// 触碰底部加载模块部分ts模块(注意默认导出加了bottomLoad: bottModule)，这里export不用也可以
export interface bottModule {
	 recordValue: string;
	 bottStatus:Ref<string>;
	 load(fn: Function,num?: number):void;
	 setSatus(str: string): void;
}



export default function(): {[key:string]: any; bottomLoad: bottModule}   {
	// 点击菜名搜索显示内容部分模块
	let contentListData = ref([]), contentStatus = ref("no-more")
	
	function reviseStatus(str: string): void{
		contentStatus.value = str;
	}
	
	
	
	// 触碰底部加载模块部分模块
	let requNumber: number = 8, longRecordValue: string;
	class bottomModule {
		constructor( 
		private botconst: boolean = true, 
		public recordValue: string = "",
		public bottStatus = ref("more")
		){}
		
		
		load(fn: Function,num?: number):void{
			if(this.recordValue === "" || this.recordValue === null || this.recordValue === undefined){
				return
			}
			
			
			// 事件会触发多次，让主体内容只运行一次
			if(this.botconst && longRecordValue !== this.recordValue){
				this.botconst = false;
				this.setSatus("loading")
				
				// 每次初始化requNumber
				if(num !== 0 && num !== null && num !== undefined){  requNumber = num; }
				
				fn('jianfandata','jfContentsData',{name:this.recordValue},this.requestQuantityNumber(),"降序").then((res:{data:[]})=>{
					if(res.data.length !== 0){
						contentListData.value = res.data  //给内容列表赋值
						if(requNumber === res.data.length){ this.setSatus("no-more"); longRecordValue = this.recordValue; }
						this.botconst = true;
						// requNumber = res.data.length;
					}
				}).catch(()=>{
					this.botconst = true;
				}).finally(()=>{
					if(this.bottStatus.value !== "no-more"){ this.setSatus("more"); }
				})
			}else{
				// 防止用户搜索同一个词导致没有显示提示语句，因为搜索的时候会隐藏，同样的词又不会进上面的判断请求
				this.setSatus("no-more")
			}
		}
		
		
		private requestQuantityNumber(): number{
			if(requNumber+8 >= 96){
				return 96
			}else{
				return requNumber+8
			}
		}		
		
		
		setSatus(str: string): void{
			this.bottStatus.value = str;
		}
		
		
	}
	
	
	
	const bottomLoad: bottModule = new bottomModule()
	
	return { contentListData, contentStatus, reviseStatus, bottomLoad }
}