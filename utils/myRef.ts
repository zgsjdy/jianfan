import { customRef } from 'vue';

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
			  initValue = setvalue; // 更新值
			  trigger(); //触发更新
		  },delay)
      },
	  
	  
    }
  })
}











