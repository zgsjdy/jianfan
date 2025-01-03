<script>
	export default {

		onLaunch: function() {
			
			
			
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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