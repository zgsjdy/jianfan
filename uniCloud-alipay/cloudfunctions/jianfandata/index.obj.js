// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129



const db = uniCloud.database();//获取数据库
module.exports = {
	_before: function () { // 通用预处理器
		
	},
	
	async getDataFromDatabase(conPage='jfSysContentsData'){
		
		// 获取数据库数据
		const collection = db.collection(conPage);
		const result = await collection.get();
		return result;
		

	},
	// 搜索数据库的内容，注意正则表达式网传输会变为空，要用字符串传输，这里属于后台是属于前端通过网络传值过来的
	async queryData(conPage='jfContentsData',obj,whetherExpression = false){
		// 把带字符串的obj值转成正则表达式
		let newObj = {};
		if(whetherExpression){
			for(let key in obj){
				if(typeof obj[key] === 'string'){
					newObj[key] = new RegExp(obj[key],'i');
				}else{
					newObj[key] = obj[key];
				}
			}
		}
		
		
		// 获取数据库数据
		const collection = db.collection(conPage);
		const result = await collection.where(whetherExpression?newObj:obj).get();
		return result;
	},
	
	
	// 搜索框搜索函数（不通用，可以修改）
	async queryDataByInputValue(conPage='jfContentsData', inputValue, queConst, sort='升序'){
		
		// 把带字符串的obj值转成正则表达式
		let newObj = {}, ordername;
		for(let key in inputValue){
			if(typeof inputValue[key] === 'string'){
				newObj[key] = new RegExp(inputValue[key],'i');
				ordername = key;  //给排序用
				
				break;  //让只有第一个值有用
			}
		}
		
		
		
		// 获取数据库数据
		const collection = db.collection(conPage);
		
		const result = await collection.where(newObj).orderBy(ordername, sort === '升序' ? 'asc' : 'desc').limit(queConst).get();
		
		return result;
	}
	
	
}
