
function insertError(str,cName,eWrap){
	if(str!=""){
		document.getElementById(eWrap).innerHTML='<span class="'+cName+'">'+str+'</span>';
	}else{
		document.getElementById(eWrap).innerHTML='';
		}
}

function checkLength(str,a,b) 
{
  if(str.length<=b && str.length>=a)
  {
    return true;
  }
  else
  {
	return false;
  }
}
function comPassword(obj1,obj2)
{
  if(document.getElementById(obj1).value==document.getElementById(obj2).value)
  {
	return true;
  }
  else
  {
    return false;
  }
}


/* 
用途：检查输入字符串是否为空或者全部都是空格 
输入：str 
返回： 
如果全是空返回true,否则返回false 
*/ 
function isNull( str ){ 
if ( str == "" ) return true; 
var regu = "^[ ]+$"; 
var re = new RegExp(regu); 
return re.test(str); 
} 

  
  
/* 
用途：检查输入字符串是否符合正整数格式 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isNumber( str ){   
	var regu = "^[0-9]+$"; 
	var re = new RegExp(regu); 
	if (str.search(re) != -1) { 
		return true; 
	} else { 
		return false; 
	} 
} 


/* 
用途：检查输入字符串是否符合金额格式 
格式定义为带小数的正数，小数点后最多三位 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isMoney( s ){   
var regu = "^[0-9]+[\.][0-9]{0,3}$"; 
var re = new RegExp(regu); 
if (re.test(s)) { 
return true; 
} else { 
return false; 
} 
} 

/* 
用途：检查输入字符串是否只由英文字母和数字和下划线组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isNumberOr_Letter( str ){//判断是否是数字或字母 
	var regu = "^[0-9a-zA-Z\_]+$"; 
	var re = new RegExp(regu); 
	if (re.test(str)) { 
		return true; 
	}else{ 
		return false; 
	} 
} 

/* 
用途：输入字符串必须由英文字母和数字组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 

function isNumberLetter(str){//判断是否是数字或字母 
	var regu = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-z0-9A-Z]+$/; 
	var re = new RegExp(regu); 
	if (re.test(str)) { 
		return true; 
	}else{ 
		return false; 
	} 
} 

/* 
用途：检查输入字符串是否只由英文字母和数字组成 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 

function isNumberOrLetter( str ){//判断是否是数字或字母 

	var regu = /^[0-9a-zA-Z]+$/; 
	var re = new RegExp(regu); 
	if (re.test(str)) { 
		return true; 
	}else{ 
		return false; 
	} 
} 

/* 
用途：检查输入字符串是否只由汉字、字母、数字组成 
输入： 
value：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function isChinaOrNumbOrLett( str ){//判断是否是汉字、字母、数字组成 
	var regu = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";   
	var re = new RegExp(regu); 
	if (re.test(str)) { 
		return true; 
	}else{ 
		return false; 
	} 
} 

/* 
用途：判断是否是日期 
输入：date：日期；fmt：日期格式 
返回：如果通过验证返回true,否则返回false 
*/ 
function isDate(date,fmt ) { 
if (fmt==null) fmt="yyyyMMdd"; 
var yIndex = fmt.indexOf("yyyy"); 
if(yIndex==-1) return false; 
var year = date.substring(yIndex,yIndex+4); 
var mIndex = fmt.indexOf("MM"); 
if(mIndex==-1) return false; 
var month = date.substring(mIndex,mIndex+2); 
var dIndex = fmt.indexOf("dd"); 
if(dIndex==-1) return false; 
var day = date.substring(dIndex,dIndex+2); 
if(!isNumber(year)||year>"2100" || year< "1900") return false; 
if(!isNumber(month)||month>"12" || month< "01") return false; 
if(day>getMaxDay(year,month) || day< "01") return false; 
return true; 
} 

function getMaxDay(year,month) { 
if(month==4||month==6||month==9||month==11) 
return "30"; 
if(month==2) 
if(year%4==0&&year%100!=0 || year%400==0) 
return "29"; 
else 
return "28"; 
return "31"; 
} 


/* 
用途：字符1是包含字符串2 
输入：str1：字符串；str2：被包含的字符串 
返回：如果通过验证返回true,否则返回false 

*/ 
function isMatch(str1,str2) 
{  
var index = str1.indexOf(str2); 
if(index==-1) return false; 
return true; 
} 

  
/* 
用途：检查输入的起止日期是否正确，规则为两个日期的格式正确， 
且结束如期>=起始日期 
输入： 
startDate：起始日期，字符串 
endDate：结束如期，字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkTwoDate( startDate,endDate ) { 
if( !isDate(startDate) ) { 
alert("起始日期不正确!"); 
return false; 
} else if( !isDate(endDate) ) { 
alert("终止日期不正确!"); 
return false; 
} else if( startDate > endDate ) { 
alert("起始日期不能大于终止日期!"); 
return false; 
} 
return true; 
} 




/* 
用途：检查输入的Email信箱格式是否正确 
输入： 
strEmail：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkEmail(strEmail) { 
//var emailReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/; 
var emailReg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/; 
if( emailReg.test(strEmail) ){ 
return true; 
}else{ 
return false; 
} 
} 

/* 
用途：检查输入手机号码是否正确 
输入： 
s：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkMobile( str ){   
var regu =/^[1][0-9]{10}$/; 
var re = new RegExp(regu); 
if (re.test(str)) { 
return true; 
}else{ 
return false; 
} 
} 



/* 
用途：检查输入的电话号码格式是否正确 
输入： 
strPhone：字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkPhone( strPhone ) { 
var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/; 
var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/; 
var prompt = "您输入的电话号码不正确!" 
if( strPhone.length > 9 ) { 
if( phoneRegWithArea.test(strPhone) ){ 
return true; 
}else{ 
alert( prompt ); 
return false; 
} 
}else{ 
if( phoneRegNoArea.test( strPhone ) ){ 
return true; 
}else{ 
alert( prompt ); 
return false; 
} 
} 
} 

  
/* 
用途：检查输入的起止日期是否正确，规则为两个日期的格式正确或都为空 
且结束日期>=起始日期 
输入： 
startDate：起始日期，字符串 
endDate：  结束日期，字符串 
返回： 
如果通过验证返回true,否则返回false 

*/ 
function checkPeriod( startDate,endDate ) { 
if( !checkDate(startDate) ) { 
alert("起始日期不正确!"); 
return false; 
} else if( !checkDate(endDate) ) { 
alert("终止日期不正确!"); 
return false; 
} else if( startDate > endDate ) { 
alert("起始日期不能大于终止日期!"); 
return false; 
} 
return true; 
} 


/**************************************************** 
function:cTrim(sInputString,iType) 
description:字符串去空格的函数 
parameters:iType：1=去掉字符串左边的空格 

2=去掉字符串左边的空格 
0=去掉字符串左边和右边的空格 
return value:去掉空格的字符串 
****************************************************/ 
function cTrim(sInputString,iType) 
{ 
var sTmpStr = ' '; 
var i = -1; 

if(iType == 0 || iType == 1) 
{ 
while(sTmpStr == ' ') 
{ 
++i; 
sTmpStr = sInputString.substr(i,1); 
} 
sInputString = sInputString.substring(i); 
} 

if(iType == 0 || iType == 2) 
{ 
sTmpStr = ' '; 
i = sInputString.length; 
while(sTmpStr == ' ') 
{ 
--i; 
sTmpStr = sInputString.substr(i,1); 
} 
sInputString = sInputString.substring(0,i+1); 
} 
return sInputString; 
}