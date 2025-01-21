<script>
	export default {

		onLaunch: function() {
			
			
			
			/**
			 * 定义一个全局深拷贝函数,用uni这个对象（不推荐）
			 * 有些特殊值不支持（正则，symbol，时间等等），函数直接返回不生成新的
			 * @param {any} value - 要拷贝的值
			 * @return {any} 像的值
			*/
			uni.deepClone = (value, visited = new WeakMap()) => {
				
			  // 不处理的特殊数据类型
			  if (value instanceof Date || value instanceof RegExp || typeof value === 'symbol') {
			    throw new Error(`特殊数据类型不进行深拷贝，当前传入的数据类型是：${typeof value}`);
			  }
			  
			  // 处理 null 和基本数据类型，（包过函数，函数直接返回不用生成新的）
			  if (value === null || typeof value !== 'object') {
			    return value;
			  }
			  
			  // 检查是否已经拷贝过该对象
			  if (visited.has(value)) {
			    return visited.get(value);
			  }
			
			  // 处理数组
			  if (Array.isArray(value)) {
			    let newArray = [];
			    visited.set(value, newArray);
			    for (let i = 0; i < value.length; i++) {
			      newArray.push(uni.deepClone(value[i], visited));
			    }
			    return newArray;
			  }
			
			  // 处理 Map
			  if (value instanceof Map) {
			    let newMap = new Map();
			    visited.set(value, newMap);
			    for (let [key, val] of value) {
			      newMap.set(uni.deepClone(key, visited), uni.deepClone(val, visited));
			    }
			    return newMap;
			  }
			
			  // 处理 Set
			  if (value instanceof Set) {
			    let newSet = new Set();
			    visited.set(value, newSet);
			    for (let item of value) {
			      newSet.add(uni.deepClone(item, visited));
			    }
			    return newSet;
			  }
			
			  // 处理普通对象，（注意顺序）
			  let newObj = {};
			  visited.set(value, newObj);
			  for (let key in value) {
			    if (value.hasOwnProperty(key)) {
			      newObj[key] = uni.deepClone(value[key], visited);
			    }
			  }
			
			  return newObj;
			};
			
			
			
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		// 定义uniapp自带的全局变量
		globalData:{
			// displaysTheAnalyzedContent页面的数据，热门才名字的菜名等等
			nameId:"教程"
		}
	}
</script>

<style>/*每个页面公共css */
	/* 在线链接服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
	@font-face {
	  font-family: "almm";
	  font-weight: 400;
	  src: 
	  url("https://env-00jxhfmhzs0p.normal.cloudstatic.cn/fonts/AlimamaDaoLiTi.ttf") format("ttf"),  /* truetype 这个为优先类型*/
	  url("https://env-00jxhfmhzs0p.normal.cloudstatic.cn/fonts/AlimamaDaoLiTi.woff2") format("woff2"), /* 默认这个最小体积 */
	  url("https://env-00jxhfmhzs0p.normal.cloudstatic.cn/fonts/AlimamaDaoLiTi.woff") format("woff");
	  font-display: swap;
	}
	
	
	
	/* 这里的代码仅在 H5 平台生效 */
	/* #ifdef H5 */
	:root{
		--bd-color-gradch:linear-gradient(to bottom, #ff7676 0%, #ff9e9e 10%, #ffb5b5 19%, #ffd0d0 30%, #ffd5d591 50%, #ffe9e938 70%, #fff5f500 90%, #F8F8F8 100%);
		font-family: almm;
	}
	/* #endif */
	
	
	/* 这段代码只会在非 H5 平台编译 */
	/* #ifndef H5 */
	page{
		--bd-color-gradch:linear-gradient(to bottom, #ff7676 0%, #ff9e9e 10%, #ffb5b5 19%, #ffd0d0 30%, #ffd5d591 50%, #ffe9e938 70%, #fff5f500 90%, #F8F8F8 100%);
		font-family: almm;
	}
	/* #endif */
	
	
	view {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	/* 主体背景色类名 */
	.bodyboxback {
		width: 100vw;
		height: 100vh;
		background-image: var(--bd-color-gradch);
		background-size: 100% 100%;
		background-attachment: fixed;
	}
</style>