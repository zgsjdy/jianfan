// 获取底部和顶部导航栏的信息
function getTobBotMar(posit = "top") {
	
	// #ifndef H5
	// 获取顶部和底部安全距离
	const systemInfo = uni.getWindowInfo()
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	// #endif
	
	
	if(posit === "top"){
		// 这段代码只会在非 H5 平台编译
		// #ifndef H5

		let statusBarHeight = systemInfo.statusBarHeight //顶部安全距离
		let menheight = ((menuButtonInfo.top - statusBarHeight) * 2) + (menuButtonInfo.bottom - menuButtonInfo.top) //胶囊高度
		
		
		return {
			statusBarHeight,
			menheight
		}
		
		// #endif
		
		
		
		// 这里的代码仅在 H5 平台生效
		// #ifdef H5
		return {
			statusBarHeight:5,
			menheight:47
		}
		// #endif
	}else if(posit === "bot"){
		// 非h5运行
		// #ifndef H5
		let positScreen;
		let botHeight;
		let botSafeHeight=0;
		if(systemInfo.screenHeight-systemInfo.safeArea.bottom <= 0){
			botHeight = 58
			positScreen = systemInfo.screenHeight-botHeight //定位位置top的
		}else{
			botHeight = systemInfo.screenHeight-systemInfo.safeArea.height  //底部导航栏高度
			positScreen = systemInfo.safeArea.height
			botSafeHeight = systemInfo.screenHeight-systemInfo.safeArea.bottom //底部安全距离
		}
		
		// console.log(systemInfo)
		// console.log(positScreen)
		// console.log(botHeight)
		// console.log(botSafeHeight)
		return {
			positScreen,
			botHeight,
			botSafeHeight
		}
		// #endif
		
		// h5运行,让h5使用默认底部导航栏"custom": true, 取消了默认的底部导航栏，在h5无效
		// #ifdef H5
			return {
				positScreen:null,
				botHeight:1,
				botSafeHeight:0
			}
		// #endif
		
		
	}else{
		throw new Error('参数错误，只能是字符串类型的top和bot，默认top。');
	}
	

}


// 获取数据库函数		
async function yun(uniCloudName,conPage){
	try{
		const jianfandata = uniCloud.importObject(uniCloudName)//使用云对象jianfandata
		let res = await jianfandata.getDataFromDatabase(conPage)  //连接数据库哪个表的数据
		
		return res.data
	}catch(e){
		throw new Error(`参数错误yun，默认无${e}`);
	}
}


// 模糊搜索数据库
async function fuzzySearch(uniCloudName,collect,obj,whetherExpression){
	try{
		
		const jianfandata = uniCloud.importObject(uniCloudName)//使用云对象jianfandata
		let res = await jianfandata.queryData(collect,obj,whetherExpression)  //连接数据库哪个表的数据,并搜索，注意正则表达式网传输会变为空，要用字符串传输
		// console.log(obj)
		return res.data
		
	}catch(e){
		throw new Error(`参数错误fuzzySearch，默认无${e}`);
	}
}


// 搜索框搜索函数（不通用，可以修改）
/**
 * @param {Object} inputValue  传对象的时候只能是第一个值是字符串才有效 
*/
async function queryInput(uniCloudName, conPage, inputValue, queConst, sort){
	try{
		
		const jianfandata = uniCloud.importObject(uniCloudName)//使用云对象jianfandata
		let res = await jianfandata.queryDataByInputValue(conPage, inputValue, queConst, sort) //调用云对象里的那个属性方法
		
		return res;
	}catch(e){
		throw new Error(`参数错误queryInput，默认无${e}`);
	}
}




export {getTobBotMar,yun,fuzzySearch,queryInput}