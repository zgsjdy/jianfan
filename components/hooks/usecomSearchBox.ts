import { ref } from "vue"

export default function(): {[key:string]: any;}   {
	
	let contentListData = ref({}), contentStatus = ref("no-more")
	
	function reviseStatus(str: string): void{
		contentStatus.value = str;
	}
	
	
	return { contentListData, contentStatus, reviseStatus }
}