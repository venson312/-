/* 
* @Author: Marte
* @Date:   2017-08-24 10:18:01
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-24 10:18:01
*/

$(document).ready(function(){
	var brand=sessionStorage.getItem('fabricBook');
	$("#js_fabricBookBrand").text(brand);
	
	$.getJSON("/service/fabricBook/book",{brandName : brand},function(data) {
		console.log(data);
		if(data.code == 1) {
			$("#fabricBook_list").empty();
			$("#fabricBook_list").append($("#bookTmp").jqote(data.data));
		}else {
			console.log(data.message);
		}
	});

});