import { reactive } from 'vue';
import { useBotNarStor } from '@/stores/counter'  //导入pinia
const bottf = useBotNarStor()  //获取pinia数据
// 获取顶部导航栏高度
import { yun } from '@/utils/getSysInf.js';
// const { menheight,statusBarHeight } = getTobBotMar('top')  //获取顶部安全距离menheight胶囊高度，statusBarHeight导航栏安全区高度

// ************最后要向外部提供数据***********
export default function(){
	
	// 修改动画类名，使开头动画和循环动画衔接
		let anim = reactive({
			animclass:"",
			folatdata:[],
			animdelay:0,
			butResetY:0,
			animclassimg:'moarimg',
		})
		
		// 随机数
		function getRandomIntInclusive(min, max, count=0, gapSize=0) {
		    min = Math.ceil(min);
		    max = Math.floor(max);
			let numbers = [];
			let iftrfal;
			let foobsss=0;
			while (numbers.length < count) {
				iftrfal = 0;
				let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;// 注意此处+1表示包括最大值
				if (!numbers.includes(randomNumber)){
					
					for(let itme = 1; itme <= gapSize; itme++){
						if(numbers.includes(randomNumber+itme) || numbers.includes(randomNumber-itme))
						{ iftrfal++; break;}
					}
					
					if(iftrfal === 0){numbers.push(randomNumber);}
				}
				
				foobsss++
				if(foobsss > 1000){
					console.log("参数大小不够分隔后的长度要求,循环过大停止！")
					numbers.push("参数大小不够分隔后的长度要求,循环过大停止！"); 
					break;
					}
				
			}
			return numbers;
		}
		// console.log(...getRandomIntInclusive(6,50,1,5))
		
		// 生成float数组
		function createFolat(arrlenght=1, arrgetRan, arrgetRan2, regh="left"){
			try{
				if(typeof arrlenght !== 'number'){return "参数类型错误createFolat";}
				
				let arr = [];
				let arry = [...getRandomIntInclusive(arrgetRan[0],arrgetRan[1],arrlenght,arrgetRan[2])];
				let arry2 = [...getRandomIntInclusive(arrgetRan2[0],arrgetRan2[1],arrlenght,arrgetRan2[2])];
				
				for(let j = 0; j < arrlenght; j++){
					arr.push(`top:${arry[j]}%;${regh}:${arry2[j]}%;`);
				}
				
				
				return arr;
			}catch(e){
				throw new Error(`错误createFolat，默认null，{e}`);
			}
		}
	anim.folatdata.push(...createFolat(7,[2,20,1],[1,88,8])) //top组动画默认位置值
	anim.folatdata.push(...createFolat(7,[23,91,6],[1,23,1],"right")) //right组动画默认位置值
	anim.folatdata.push(...createFolat(7,[23,91,6],[1,23,1])) //left组动画默认位置值
	
	// console.log("@@@@",anim.folatdata)
	
	
	
		// 获取按钮图像
		var dfimg = reactive({})
		yun('jianfandata','jfSystemData').then(res =>{
			dfimg.data = res[0].dfScreenOnce;
			// 把请求的图片给全局变量pinia，用于将一个或多个源对象的所有可枚举属性复制到目标对象，并返回目标对象。第一个值是目标对象浅拷贝
			bottf.QJScreenOnceimg = Object.assign(bottf.QJScreenOnceimg, res[0].dfScreenOnce)
		})
		
		
		
		// 图片加载触发修改动画类名和修改动画值
		function loadImgAnim(){
			// 修改动画类名，使开头动画和循环动画衔接
			anim.animclass = 'moareone'
			setTimeout(()=>{anim.animclass = 'moarebox'},1510)
			
			// 修改动画值，使开头动画和滑块动画衔接
			let setTimid = setInterval(()=>{
				anim.animdelay -= 0.01
				if(anim.animdelay <= -1.5){
					clearInterval(setTimid)
				}
			},10)
		}
		
		// 修改动画值
		let AnimComparative = 'con'
		function reviseMovAnim(e){
			// 判断是底部还是顶部
			if(e.detail.source === 'touch-out-of-bounds'){
				if(e.detail.y > 100){AnimComparative = 'but';/* console.log("底部"); */}
			}
			
			if(e.detail.source === ''){
				AnimComparative = 'top';
				// console.log("返回中...");
				if(e.detail.y === 0){AnimComparative = 'con';}
			}
			// console.log(anim.animdelay)
			
			
			if(e.detail.source === 'touch'){
				if(anim.animdelay >= -2.9){
					anim.animdelay -= 0.02
					// console.log(anim.animdelay)
					// console.log(e.detail.y)
				}
			}
			
			if(anim.butResetY != 0){anim.butResetY = 0}  //让每次点击可以回到原位置
		}
		
		
		// 按钮复位函数
		let jwdisabled = true;  //使用户在最后结尾不在运行返回动画
		let runningzhong = false //判断返回动画是不是运行中，防止和底部专场动画冲突
		function resetMov(){
			anim.butResetY = 1  //为零0失效
			anim.animclassimg = "moarimg"
			// console.log(AnimComparative)
			// console.log(jwdisabled)
			
			// 在函数外面容易清除定时器不了，赋值后有延迟所以清除的是旧值清除不了
			let topsetTmeid;
			let setTimidT;
			
			if(AnimComparative === 'but'){
				AnimComparative = 'con';
				if(!runningzhong){
					if(anim.animdelay >= -3 && jwdisabled){
						
						jwdisabled = false; //使用户在最后结尾不在运行返回动画
						
						let setTimid = setInterval(()=>{
							// 清除返回top的定时器
							clearTimeout(topsetTmeid);
							clearInterval(setTimidT);
							// console.log("清除")
							anim.animdelay -= 0.01;
							if(anim.animdelay <= -3){
								clearInterval(setTimid)
								// console.log("完成跳转！！")
								setTimeout(()=>{
									anim.animclass = "jemoar"
									setTimeout(()=>{
										bottf.QJScreenOnce.dfScreen = false
										bottf.QJScreenOnce.botNav = true
									},1810)
								},50)
								
							}
						},10)
					}
				}
			}
			
			// 这里必须要定时器，因为上面修改值要运行完同一类型移动原因比这里运行慢会得到默认值
			topsetTmeid = setTimeout(()=>{
				if(AnimComparative === "top" && jwdisabled){
					AnimComparative = 'con';
					runningzhong = true;
					if(anim.animdelay <= -1.5 && jwdisabled){  //双重判断
						setTimidT = setInterval(()=>{
							anim.animdelay += 0.01
							if(anim.animdelay >= -1.5){
								clearInterval(setTimidT)
								runningzhong = false;//判断返回动画是不是运行中，防止和底部专场动画冲突
								// console.log("qingchu")
							}
						},10)
					}
				}
			},80)
		}
		
		//按住按钮切换class动画名
		function touStart(){
			anim.animclassimg = "moarimgtu"
		}
		
		// 向外部提供数据
		return{ anim, dfimg, loadImgAnim, reviseMovAnim, resetMov, touStart }
}













