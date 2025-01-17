import { customRef } from 'vue';
// *********   不公用(最好像要公用新写一个，搜索页面和这个函数依赖太高)  **********
export default function<T>(initValue: T, delay: number = 500): {value:T} {  /* 注意这里用了大写属性类型，说明类型包装对象也是可以的，小写属性类型不可以 (已修改过) */
  let timeout: ReturnType<typeof setTimeout>;  //定时器id
  
  return customRef<T>((track, trigger) => {
    return {
		
      get() {
		  track(); //对数持续关注，依赖收集
		return initValue;
      },
	  
	  
      set(setvalue: T) {
		  clearTimeout(timeout) // 清除之前的定时器
		  // 定时器
		  timeout = setTimeout(()=>{
			  // @ts-ignore  //忽略特定行代码的类型检查错误提示。
			  initValue = setvalue.replace(/ /g,""); // 更新值,去掉空格
			  
			  trigger(); //触发更新
			  
			  // console.log("已修改:"+setvalue,initValue)
		  },delay)
      },
	  
	  
    }
  })
}











