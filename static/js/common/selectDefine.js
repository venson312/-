// JavaScript Document

/*/自定义订单状态下拉菜单样式
var $$ = function (id) {return document.getElementById(id); } 
window.onload = function () { 
	var orderStatus = $$("orderStatusId"); 
	
	var curSelect = orderStatus.getElementsByTagName("span")[0]; 
	var oSelect = orderStatus.getElementsByTagName("select")[0]; 
	var aOption = orderStatus.getElementsByTagName("option"); 
	
	oSelect.onchange = function () { 
		var text=oSelect.options[oSelect.selectedIndex].text; 
		curSelect.innerHTML = text; 
	} 
	
} 
*/


function selectDefine(id) {
	var orderStatus = document.getElementById(id); 
	
	var curSelect = orderStatus.getElementsByTagName("span")[0]; 
	var oSelect = orderStatus.getElementsByTagName("select")[0]; 
	var aOption = orderStatus.getElementsByTagName("option"); 
	
	if(id == "chooseFactoryId"){
		oSelect.onchange = function () { 
			var text=oSelect.options[oSelect.selectedIndex].text; 
			curSelect.innerHTML = text; 
			
			setInfomation();
		} 
	}else{
		oSelect.onchange = function () { 
			var text=oSelect.options[oSelect.selectedIndex].text; 
			curSelect.innerHTML = text; 
		} 
	}
} 
