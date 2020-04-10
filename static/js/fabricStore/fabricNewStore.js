/* 
* @Author: Marte
* @Date:   2017-08-24 10:17:10
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-24 16:30:57
*/

$(document).ready(function(){
	    $(".js_fabricBookStore").on("click",function(){
	    	var brand=$(this).attr("data-type");
	    	sessionStorage.setItem('fabricBook', brand);
            var newTab=window.open('about:blank')
	    	newTab.location.href ="../../html/fabricStore/fabricNewBookStore.html";
	    })
});