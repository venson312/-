// JavaScript Document

// 导航条置顶
window.onscroll = function(){
    var curPosition = document.documentElement.scrollTop || document.body.scrollTop;  
    var top_wrap = document.getElementById( "top_wrap"); 
    if(curPosition>=36) { 
		if(document.getElementById("naviBackBlack")!=undefined){document.getElementById("naviBackBlack").style.display= "block";}
		if(document.getElementById("naviBackBlue")!=undefined){document.getElementById("naviBackBlue").style.display= "none";}
		if(document.getElementById("topIcon")!=undefined){document.getElementById("topIcon").className = "topIcon";}
        // document.getElementById("topIcon").style.display= "block";
		
    } else { 
        
		if(document.getElementById("naviBackBlack")!=undefined){document.getElementById("naviBackBlack").style.display= "none";}
		if(document.getElementById("naviBackBlue")!=undefined){document.getElementById("naviBackBlue").style.display= "block";}
		if(document.getElementById("topIcon")!=undefined){document.getElementById("topIcon").className = "topIconNo";}
        // document.getElementById("topIcon").style.display= "none";
    } 
	/*
	 * if(curPosition>=300) {
	 * document.getElementById("leftNaviWrap").style.display= "block";
	 * //document.getElementById("rightNaviWrap").style.display= "block"; } else {
	 * document.getElementById("leftNaviWrap").style.display= "none";
	 * //document.getElementById("rightNaviWrap").style.display= "none"; }
	 */
} 
function returnObject(showId,hiddenId){
	$("#addressUrl").find("input").val("");
	$("#addressUrl").hide();
	document.getElementById(showId).style.display="block";
	document.getElementById(hiddenId).style.display="none";
}
function trunObject(showId,hiddenId1,hiddenId2){
	document.getElementById(showId).style.display="block";
	document.getElementById(hiddenId1).style.display="none";
	document.getElementById(hiddenId2).style.display="none";
}
function setDisabled(objId,checkId){
	if(document.getElementById(checkId).checked==true)
	{
		document.getElementById(objId).disabled="";
				
	}else{
		document.getElementById(objId).disabled="disabled";
	}
}
function setButtonDisabled(objId,checkId){

	if(document.getElementById(checkId).checked==true)
	{
		$(".regist2").removeClass("grayRegist2");
		document.getElementById(objId).disabled="";
	}else{
		$(".regist2").addClass("grayRegist2");
		document.getElementById(objId).disabled="disabled";
	}
}
function changeObject(objId){
	if (document.getElementById(objId).style.display=="none"){
		document.getElementById(objId).style.display="block";
	}else{
		document.getElementById(objId).style.display="none";
	}
}
function setRadioLable(objId,labelName, hiddenId, hiddenValue){
		document.getElementById(objId).style.display="block";
		document.getElementById(objId).innerHTML=labelName;
		if(hiddenValue!=null){
			document.getElementById(hiddenId).value = hiddenValue;
		}
}
function trunObjectClass(showId,hiddenClass){
	$("."+hiddenClass).hide();
	document.getElementById(showId).style.display="block";
}
function setChecked (objId,labelId, hiddenId) {
		var checks = document.getElementsByName(objId);
		for(i=0;i<checks.length;i++){
			checks[i].checked=false;
		}
		document.getElementById(labelId).style.display="none";
		document.getElementById(hiddenId).value = '-1';
    }
function showObject(objId){
		document.getElementById(objId).style.display="block";
}
function hiddenObject(objId){
		document.getElementById(objId).style.display="none";
}

function showObjects(objId){
	$(objId).show();
}
function hiddenObjects(objId){
	$(objId).hide();
}

function changeClass(objId,cName){
   document.getElementById(objId).className = cName; 
} 

$(function() {
	$("#checkAll").click(function() {$('input[name="checkbox"]').attr("checked",this.checked); });
	var $subBox = $("#pagerBody");
	$subBox.delegate('input[name=checkbox]','click',function(){
		$("#checkAll").attr("checked",$("input[name='checkbox']").length == $("input[name='checkbox']:checked").length ? true : false);
	});
// $("input[name='checkbox']").click(function(){
// $("#checkAll").attr("checked",$("input[name='checkbox']").length ==
// $("input[name='checkbox']:checked").length ? true : false);
// });
	// 收藏品牌全选
	$("#checkAllBrand").click(function() {$('input[name="checkbox2"]').attr("checked",this.checked); });
	var $subBox1 = $("input[name='checkbox2']");
	$subBox1.click(function(){
		$("#checkAllBrand").attr("checked",$subBox1.length == $("input[name='checkbox2']:checked").length ? true : false);
	});
	// 收藏设计师全选
	$("#checkAllDesigner").click(function() {$('input[name="checkbox3"]').attr("checked",this.checked); });
	var $subBox2 = $("input[name='checkbox3']");
	$subBox2.click(function(){
		$("#checkAllDesigner").attr("checked",$subBox2.length == $("input[name='checkbox3']:checked").length ? true : false);
	});
	
	$(".sub a,.nosub a").click(function(){
		$(".on").removeClass("on");
		$(this).addClass("on");
	});
	
 function changeRadio(obj,radioName,className){
	 var className=className+"On";
		$("."+radioName).removeClass(className);
		$(obj).addClass(className);
	}
	window.changeRadio = changeRadio;
	
 function changeCheckbox(obj,radioName,className){
	 var className=className+"On";
		 if($(obj).attr('class').indexOf(className)>=0){
			$(obj).removeClass(className);
		 }else{
			$(obj).addClass(className);
		 }
	}
	window.changeCheckbox = changeCheckbox;
	
 function changeRalRadio(obj,radioName,className,targetObj,content){
	 var className=className+"On";
	 $("."+radioName).removeClass(className);
	 $(obj).addClass(className);
	 $("#"+targetObj).show();
	 $("#"+targetObj).html(content);
	}
	window.changeRalRadio = changeRalRadio;
	
function setRalChecked (objId,labelId,className) {
		var checks = document.getElementsByName(objId);
		for(i=0;i<checks.length;i++){
			checks[i].checked=false;
		}
		document.getElementById(labelId).style.display="none";
	 $("."+objId).removeClass(className);
    }
	window.setRalChecked = setRalChecked;
});
		
			
function moveToFavorite(favobj,moveobj,targetobj) {
	if( document.getElementById(favobj).className=='productFavorie'){
		document.getElementById(favobj).className = 'productFavorieOn'; 
		}else{
		document.getElementById(favobj).className = 'productFavorie'; 
	}
	var moveobj=document.getElementById(moveobj);
	var divTop = $(moveobj).offset().top;
	var divLeft = $(moveobj).offset().left;
	$(moveobj).css({ "position": "absolute", "z-index": "500", "left": divLeft + "px", "top": divTop + "px" });
	$(moveobj).animate({ "left": ($(targetobj).offset().left - 25) + "px", "top": ($(document).scrollTop() + (document.documentElement.clientHeight - 265) / 2+160) + "px", "width": "50px", "height": "50px" }, 500).fadeTo(0, 0).hide(0);
}

function rightNaviWrap() {
	// 右侧导航条初始化定位
	$('#rightNaviWrap').css('right', '0px').css('top', (document.documentElement.clientHeight - 265) / 2);
}
function leftNaviOn(objid){
	$(".on").removeClass("on");
	$(objid).addClass("on");
}

function changeSelected(objId,objClass){
	var cssname="."+objClass;
	$(cssname).removeClass(objClass);
	$(objId).addClass(objClass);
}

// 获取浏览器URL参数
function getURLParam() {
	  
  var url = location.search; // 获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}
String.prototype.trim=function() {  
    return this.replace(/(^\s*)|(\s*$)/g,'');  
};
(function($){  
    // 备份jquery的ajax方法
    var _ajax=$.ajax;  
      
    // 重写jquery的ajax方法
    $.ajax=function(url ,opt){
    	if(typeof url == 'object'){
    		opt = url;
    	}
        // 备份opt中error和success方法
        var fn = {  
            error:function(XMLHttpRequest, textStatus, errorThrown){},  
            success:function(data, textStatus, xhr){},
            overtime:function(xhr){
            	var loginUrl = xhr.getResponseHeader('loginUrl');
            	var win = window.parent || window;
            	win.location.href = loginUrl;
            }
        }  
        if(opt.error){  
            fn.error=opt.error;  
        }  
        if(opt.success){  
            fn.success=opt.success;  
        }  
        if(opt.overtime){
        	fn.overtime = opt.overtime;
        }
        // 扩展增强处理
        var _opt = $.extend(opt,{  
            error:function(xhr, textStatus, errorThrown){  
                // 错误方法增强处理
            	var session_status = xhr.getResponseHeader('session_status');
                if(session_status && session_status === 'timeout'){
                	fn.overtime.call(xhr, xhr);
                }else{
                	fn.error(xhr, textStatus, errorThrown);  
                }
            },  
            success:function(data, textStatus, xhr){  
                // 成功回调方法增强处理
                var session_status = xhr.getResponseHeader('session_status');
                if(session_status && session_status === 'timeout'){
                	fn.overtime.call(xhr, xhr);
                }else{
                	fn.success.call(xhr,data, textStatus, xhr);
                }
            }  
        });  
        return _ajax(url ,_opt);  
    };
    $.fn.loadData = function(data){
    	this.find(':input').each(function(index){
    		var _this = $(this);
    		if(data[_this.attr('name')]){
    			_this.val(data[_this.attr('name')]);
    		}
    	});
    }
})(jQuery);
function delay(fn, millis, scope, args){
	if(millis > 0){
		return setTimeout(function(){
			fn.apply(scope || window, args || []);
		},millis);
	}
	fn.apply(scope, args);
	return 0;
}
function cancelDelay(clearId){
	if(clearId){
		clearTimeout(clearId);
	}
}
function login(fn){
	if (isNull(document.getElementById("userName").value)) /* 判断呢称是否为空 */
	{
		//insertError("请输入登录用户名！","alertWrap","errorWrap");
		$('#errorWrap span').text("请输入登录用户名！").addClass('alertWrap');
		document.getElementById("userName").focus();
		return false;
    }else{
		//insertError("","","errorWrap");
    	$('#errorWrap span').text("").removeClass('alertWrap');
	}
	if (isNull(document.getElementById("passWord").value)) /* 判断呢称是否为空 */
	{
		//insertError("请输入登录密码！","alertWrap","errorWrap");
		$('#errorWrap span').text("请输入登录密码！").addClass('alertWrap');
		document.getElementById("passWord").focus();
		return false;
    }else{
		//insertError("","","errorWrap");
    	$('#errorWrap span').text("").removeClass('alertWrap');
	}
	$('#login').text("登录中...");
	//var login_data = $("#loginFrom").serializeJSON();
	//login_data['autoLogin'] = login_data['autoLogin'] ? 0 : 1;
	//login_data['passWord'] = hex_md5(login_data['passWord']);
	var autoLogin=$("#autoLogin").val();
	autoLogin = autoLogin ? 0 : 1;
	
	var passWord=hex_md5($("#passWord").val());
	
	var userName=$("#userName").val();
	
	$.ajax('../../service/userRest/user/info/login/' + userName + '/' + passWord + '/' + autoLogin,{
		dataType:'json',
		error:function(){
			$('#errorWrap span').text("网络超时，请稍候再试").addClass('alertWrap');
			$('#login').text("立即登录");
		},
		success:function(data){
			if(data.isSuccess === 1){
				fn && fn();
			}else{
				$('#login').text("立即登录");
				$('#errorWrap span').text(data.message).addClass('alertWrap');
				if(data.isSuccess === 4){
					$('#passWord').focus();
					$('#passWord').val('');
				}else{
					$("#userName").focus();
				}
			}
			return false;
		}
	});
}

function shortMessageLoginCheck(fn){
	if (isNull(document.getElementById("mobilePhone").value)) /* 判断呢称是否为空 */
	{
		//insertError("请输入登录用户名！","alertWrap","errorWrap");
		$('#errorWrap span').text("请输入登录用户名！").addClass('alertWrap');
		document.getElementById("mobilePhone").focus();
		return false;
    }else{
		//insertError("","","errorWrap");
    	$('#errorWrap span').text("").removeClass('alertWrap');
	}
	
	if($("#numberCheckfin").val() != document.getElementById("mobilePhone").value){
		insertError("登录的用户名跟获取号码的用户名不是同一个号码！","alertWrap1","errorWrap");
		document.getElementById("mobilePhone").focus();
		return false;
	}else{
		insertError("","","errorWrap");
	}
	
	var checkBokeMessl=$("#checkBokeMess").val();
	if(checkBokeMessl =="bo2ke132Ca456dPdc321h5c5h5ahdjk"){
		var captcha = $.trim($('input[name=captcha]').val());
		if (captcha == '') {
			$('input[name=captcha]').focus();
			insertError("请输入图形验证码","alertWrap1","errorWrap");
			return false;
		}
	}
	
	var inputcode = $('#checkNo').val();
	if (isNull(document.getElementById("checkNo").value))
	{
		insertError("请输入手机验证码！","alertWrap1","errorWrap");
		document.getElementById("checkNo").focus();
		return false;
	}else{
		insertError("","","errorWrap");
	}
	$.get('../../service/userRest/user/info/checkSendMessageMa/'+ inputcode , '', function(data){
		if (data.success === true) {
			insertError("","","errorWrap");
			$('#login').text("登录中...");
			//var login_data = $('#loginFrom').serializeJSON();
			//login_data['autoLogin'] = login_data['autoLogin'] ? 0 : 1;
			//login_data['passWord'] = hex_md5(login_data['passWord']);
			var autoLogin=$("#autoLogin").val();
			autoLogin = autoLogin ? 0 : 1;

			var mobilePhone=$("#mobilePhone").val();
			
			$.ajax('../../service/userRest/user/info/login/' + mobilePhone + '/' + autoLogin,{
				dataType:'json',
				error:function(){
					$('#errorWrap span').text("网络超时，请稍候再试").addClass('alertWrap');
					$('#login').text("立即登录");
				},
				success:function(data){
					if(data.isSuccess === 1){
						fn && fn();
					}else{
						$('#login').text("立即登录");
						$('#errorWrap span').text(data.message).addClass('alertWrap');
						if(data.isSuccess === 4){
							$('#passWord').focus();
							$('#passWord').val('');
						}else{
							$("#userName").focus();
						}
					}
					return false;
				}
			});
		} else {
			$("#checkBokeMessTwo").val("");
			insertError("验证码输入错误！","alertWrap1","errorWrap");
			var errorCount=$("#errorCount").val();
			$("#errorCount").val(errorCount+1);
			if(errorCount == '111'){
				$("#loginIpt5").show();
				$("#checkBokeMess").val("bo2ke132Ca456dPdc321h5c5h5ahdjk");
			}
			return false;  
		}
	},'json');
	

	
	/*var checkBokeMessTwo = $('#checkBokeMessTwo').val();
	if(checkBokeMessTwo =="" ||  checkBokeMessTwo !="bo2ke132Ca456dY798fa89771bu" ){
		insertError("请输入手机验证码！","alertWrap1","errorWrap");
		document.getElementById("checkNo").focus();
		return false;
	}else{
		insertError("","","errorWrap");
	}*/
	
}

function loginPop(fn){
	$('<div>').popup({
		width:580,
		height:500,
		type:'ajax',
		url:'../../html/login/loginPop.html',
		onLoad:function(){
			$('#loginPop').click(function(){
				login(fn);
			});
		}
	});
};
window.standardConf = {
		'西装':[{'display':'前衣长', 'name':'frontLength', 'required':true},
		      {'display':'后中长', 'name':'backCross', 'required':true},
		      {'display':'袖长', 'name':'sleeve', 'required':true},
		      {'display':'袖肥', 'name':'sleeveWidth', 'required':false},
		      {'display':'袖口', 'name':'cuffs', 'required':false},
		      {'display':'肩宽', 'name':'shoulderWidth', 'required':true},
		      {'display':'前胸宽', 'name':'acrossFront', 'required':false},
		      {'display':'后背宽', 'name':'acrossBack', 'required':false},
		      {'display':'胸围', 'name':'bust', 'required':true},
		      {'display':'中腰', 'name':'middleWaisted', 'required':true},
		      {'display':'肚高', 'name':'bellyHigh', 'required':false},
		      {'display':'肚围', 'name':'aroundBelly', 'required':true},
		      {'display':'臀围', 'name':'upperHipline', 'required':false},
		      {'display':'下摆', 'name':'hem', 'required':false}],
		 '西裤':[{'display':'裤长', 'name':'pantsLength', 'required':true},
		       {'display':'裤腰围', 'name':'waist', 'required':true},
		       {'display':'臀围', 'name':'hipline', 'required':true},
		       //{'display':'横档', 'name':'crosspiece', 'required':true},
		       {'display':'腿围', 'name':'thighCircumference', 'required':true},
		       {'display':'膝围', 'name':'kneeCircumference', 'required':false},
		       {'display':'总裆', 'name':'totalCrotch', 'required':true},
		       {'display':'前浪', 'name':'frontRise', 'required':false},
		       {'display':'后浪', 'name':'backRise', 'required':false},
		       {'display':'脚口', 'name':'footMouth', 'required':true}],
		 '马甲':[{'display':'前衣长', 'name':'frontLength'},
			    {'display':'后中长', 'name':'backCross'},
			    {'display':'肩宽', 'name':'shoulderWidth'},
			    {'display':'胸围', 'name':'bust'},
			    {'display':'中腰', 'name':'middleWaisted'},
			    {'display':'肚围', 'name':'aroundBelly'},
			    {'display':'下摆', 'name':'hem'}],
	    '衬衫':[{'display':'前衣长', 'name':'frontLength', 'required':true},
		      {'display':'后中长', 'name':'backCross', 'required':true},
		      {'display':'袖长', 'name':'sleeve', 'required':true},
		      {'display':'袖肥', 'name':'sleeveWidth', 'required':false},
		      {'display':'袖口', 'name':'cuffs', 'required':true},
		      {'display':'肩宽', 'name':'shoulderWidth', 'required':true},
		      {'display':'前胸宽', 'name':'acrossFront', 'required':false},
		      {'display':'后背宽', 'name':'acrossBack', 'required':false},
		      {'display':'胸围', 'name':'bust', 'required':true},
		      {'display':'中腰', 'name':'middleWaisted', 'required':true},
		      {'display':'肚高', 'name':'bellyHigh', 'required':false},
		      {'display':'肚围', 'name':'aroundBelly', 'required':false},
		      {'display':'臀围', 'name':'upperHipline', 'required':true},
		      {'display':'下摆', 'name':'hem', 'required':false},
		      {'display':'领围', 'name':'collar', 'required':true}]
}
window.fabricLengthConf = {
		'西装两件套':{'length':3.0, 'val':0},
		'西装三件套':{'length':3.8, 'val':1},
		'西装':{'length':1.8, 'val':2},
		'西裤':{'length':1.2, 'val':3},
		'衬衫':{'length':1.5, 'val':4},
		'马甲':{'length':0.8, 'val':5},
		'大衣':{'length':1.8, 'val':6}
}
window.sizeNoStandardConf = {
	'西装':{
		'165':{
			'165/88':{
				'frontLength':20,
				'backCross':20,
				'sleeve':20,
				'sleeveWidth':20,
				'cuffs':20,
				'shoulderWidth':20,
				'acrossFront':20,
				'acrossBack':20,
				'bust':20,
				'middleWaisted':20,
				'bellyHigh':20,
				'aroundBelly':20,
				'hem':20
			},
			'165/90':{
				'frontLength':21,
				'backCross':21,
				'sleeve':21,
				'sleeveWidth':21,
				'cuffs':21,
				'shoulderWidth':21,
				'acrossFront':21,
				'acrossBack':21,
				'bust':21,
				'middleWaisted':21,
				'bellyHigh':21,
				'aroundBelly':21,
				'hem':21
			},
			'165/92':{
				'frontLength':22,
				'backCross':22,
				'sleeve':22,
				'sleeveWidth':22,
				'cuffs':22,
				'shoulderWidth':22,
				'acrossFront':22,
				'acrossBack':22,
				'bust':22,
				'middleWaisted':22,
				'bellyHigh':22,
				'aroundBelly':22,
				'hem':22
			},
			'165/94':{
				'frontLength':23,
				'backCross':23,
				'sleeve':23,
				'sleeveWidth':23,
				'cuffs':23,
				'shoulderWidth':23,
				'acrossFront':23,
				'acrossBack':23,
				'bust':23,
				'middleWaisted':23,
				'bellyHigh':23,
				'aroundBelly':23,
				'hem':23
			},
			'165/96':{
				'frontLength':24,
				'backCross':24,
				'sleeve':24,
				'sleeveWidth':24,
				'cuffs':24,
				'shoulderWidth':24,
				'acrossFront':24,
				'acrossBack':24,
				'bust':24,
				'middleWaisted':24,
				'bellyHigh':24,
				'aroundBelly':24,
				'hem':24
			}
		},
		'170':{
			'170/90':{
				'frontLength':25,
				'backCross':25,
				'sleeve':25,
				'sleeveWidth':25,
				'cuffs':25,
				'shoulderWidth':25,
				'acrossFront':25,
				'acrossBack':25,
				'bust':25,
				'middleWaisted':25,
				'bellyHigh':25,
				'aroundBelly':25,
				'hem':25
			},
			'170/92':{
				'frontLength':26,
				'backCross':26,
				'sleeve':26,
				'sleeveWidth':26,
				'cuffs':26,
				'shoulderWidth':26,
				'acrossFront':26,
				'acrossBack':26,
				'bust':26,
				'middleWaisted':26,
				'bellyHigh':26,
				'aroundBelly':26,
				'hem':26
			},
			'170/94':{
				'frontLength':27,
				'backCross':27,
				'sleeve':27,
				'sleeveWidth':27,
				'cuffs':27,
				'shoulderWidth':27,
				'acrossFront':27,
				'acrossBack':27,
				'bust':27,
				'middleWaisted':27,
				'bellyHigh':27,
				'aroundBelly':27,
				'hem':27
			},
			'170/96':{
				'frontLength':28,
				'backCross':28,
				'sleeve':28,
				'sleeveWidth':28,
				'cuffs':28,
				'shoulderWidth':28,
				'acrossFront':28,
				'acrossBack':28,
				'bust':28,
				'middleWaisted':28,
				'bellyHigh':28,
				'aroundBelly':28,
				'hem':28
			},
			'170/98':{
				'frontLength':29,
				'backCross':29,
				'sleeve':29,
				'sleeveWidth':29,
				'cuffs':29,
				'shoulderWidth':29,
				'acrossFront':29,
				'acrossBack':29,
				'bust':29,
				'middleWaisted':29,
				'bellyHigh':29,
				'aroundBelly':29,
				'hem':29
			}
		},
		'175':{
			'175/92':{
				'frontLength':30,
				'backCross':30,
				'sleeve':30,
				'sleeveWidth':30,
				'cuffs':30,
				'shoulderWidth':30,
				'acrossFront':30,
				'acrossBack':30,
				'bust':30,
				'middleWaisted':30,
				'bellyHigh':30,
				'aroundBelly':30,
				'hem':30
			},
			'175/96':{
				'frontLength':31,
				'backCross':31,
				'sleeve':31,
				'sleeveWidth':31,
				'cuffs':31,
				'shoulderWidth':31,
				'acrossFront':31,
				'acrossBack':31,
				'bust':31,
				'middleWaisted':31,
				'bellyHigh':31,
				'aroundBelly':31,
				'hem':31
			},
			'175/100':{
				'frontLength':32,
				'backCross':32,
				'sleeve':32,
				'sleeveWidth':32,
				'cuffs':32,
				'shoulderWidth':32,
				'acrossFront':32,
				'acrossBack':32,
				'bust':32,
				'middleWaisted':32,
				'bellyHigh':32,
				'aroundBelly':32,
				'hem':32
			},
			'175/104':{
				'frontLength':33,
				'backCross':33,
				'sleeve':33,
				'sleeveWidth':33,
				'cuffs':33,
				'shoulderWidth':33,
				'acrossFront':33,
				'acrossBack':33,
				'bust':33,
				'middleWaisted':33,
				'bellyHigh':33,
				'aroundBelly':3,
				'hem':33
			},
			'175/108':{
				'frontLength':34,
				'backCross':34,
				'sleeve':34,
				'sleeveWidth':34,
				'cuffs':34,
				'shoulderWidth':34,
				'acrossFront':34,
				'acrossBack':34,
				'bust':34,
				'middleWaisted':34,
				'bellyHigh':34,
				'aroundBelly':34,
				'hem':34
			}
		},
		'180':{
			'180/96':{
				'frontLength':35,
				'backCross':35,
				'sleeve':35,
				'sleeveWidth':35,
				'cuffs':35,
				'shoulderWidth':35,
				'acrossFront':35,
				'acrossBack':35,
				'bust':35,
				'middleWaisted':35,
				'bellyHigh':35,
				'aroundBelly':35,
				'hem':35
			},
			'180/100':{
				'frontLength':36,
				'backCross':36,
				'sleeve':36,
				'sleeveWidth':36,
				'cuffs':36,
				'shoulderWidth':36,
				'acrossFront':36,
				'acrossBack':36,
				'bust':36,
				'middleWaisted':36,
				'bellyHigh':36,
				'aroundBelly':36,
				'hem':36
			},
			'180/104':{
				'frontLength':37,
				'backCross':37,
				'sleeve':37,
				'sleeveWidth':37,
				'cuffs':37,
				'shoulderWidth':37,
				'acrossFront':37,
				'acrossBack':37,
				'bust':37,
				'middleWaisted':37,
				'bellyHigh':37,
				'aroundBelly':37,
				'hem':37
			},
			'180/106':{
				'frontLength':38,
				'backCross':38,
				'sleeve':38,
				'sleeveWidth':38,
				'cuffs':38,
				'shoulderWidth':38,
				'acrossFront':38,
				'acrossBack':38,
				'bust':38,
				'middleWaisted':38,
				'bellyHigh':38,
				'aroundBelly':38,
				'hem':38
			},
			'180/110':{
				'frontLength':39,
				'backCross':39,
				'sleeve':39,
				'sleeveWidth':39,
				'cuffs':39,
				'shoulderWidth':39,
				'acrossFront':39,
				'acrossBack':39,
				'bust':39,
				'middleWaisted':39,
				'bellyHigh':39,
				'aroundBelly':39,
				'hem':39
			}
		},
		'185':{
			'185/100':{
				'frontLength':40,
				'backCross':40,
				'sleeve':40,
				'sleeveWidth':40,
				'cuffs':40,
				'shoulderWidth':40,
				'acrossFront':40,
				'acrossBack':40,
				'bust':40,
				'middleWaisted':40,
				'bellyHigh':40,
				'aroundBelly':40,
				'hem':40
			},
			'185/104':{
				'frontLength':41,
				'backCross':41,
				'sleeve':41,
				'sleeveWidth':41,
				'cuffs':41,
				'shoulderWidth':41,
				'acrossFront':41,
				'acrossBack':41,
				'bust':41,
				'middleWaisted':41,
				'bellyHigh':41,
				'aroundBelly':41,
				'hem':41
			},
			'185/106':{
				'frontLength':42,
				'backCross':42,
				'sleeve':42,
				'sleeveWidth':42,
				'cuffs':42,
				'shoulderWidth':42,
				'acrossFront':42,
				'acrossBack':42,
				'bust':42,
				'middleWaisted':42,
				'bellyHigh':42,
				'aroundBelly':42,
				'hem':42
			},
			'185/108':{
				'frontLength':43,
				'backCross':43,
				'sleeve':43,
				'sleeveWidth':43,
				'cuffs':43,
				'shoulderWidth':43,
				'acrossFront':43,
				'acrossBack':43,
				'bust':43,
				'middleWaisted':43,
				'bellyHigh':43,
				'aroundBelly':43,
				'hem':43
			},
			'185/112':{
				'frontLength':44,
				'backCross':44,
				'sleeve':44,
				'sleeveWidth':44,
				'cuffs':44,
				'shoulderWidth':44,
				'acrossFront':44,
				'acrossBack':44,
				'bust':44,
				'middleWaisted':44,
				'bellyHigh':44,
				'aroundBelly':44,
				'hem':44
			}
		}
	},
	'西裤':{
		'165':{
			'165/88':{},
			'165/90':{},
			'165/92':{},
			'165/94':{},
			'165/96':{}
		},
		'170':{
			'170/90':{},
			'170/92':{},
			'170/94':{},
			'170/96':{},
			'170/98':{}
		},
		'175':{
			'175/92':{},
			'175/96':{},
			'175/100':{},
			'175/104':{},
			'175/108':{}
		},
		'180':{
			'180/96':{},
			'180/100':{},
			'180/104':{},
			'180/106':{},
			'180/110':{}
		},
		'185':{
			'185/100':{},
			'185/104':{},
			'185/106':{},
			'185/108':{},
			'185/112':{}
		}
	}
};

$(function(){
	$.ajaxSetup ({
		cache: false
	});

	// 添加新版首页导航下拉菜单(公用)
	$('.js_consumerUl>ul>li').hover(function() {
		$('.js_consumerUlList').hide();
		$(this).children('.js_consumerUlList').show(50);
	}, function() {
		$('.js_consumerUlList').hide();
	});
});
//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.format = function(fmt)   
{   
var o = {   
"M+" : this.getMonth()+1,                 //月份   
"d+" : this.getDate(),                    //日   
"h+" : this.getHours(),                   //小时   
"m+" : this.getMinutes(),                 //分   
"s+" : this.getSeconds(),                 //秒   
"q+" : Math.floor((this.getMonth()+3)/3), //季度   
"S"  : this.getMilliseconds()             //毫秒   
};   
if(/(y+)/.test(fmt))   
fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
for(var k in o)   
if(new RegExp("("+ k +")").test(fmt))   
fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
return fmt;   
};

String.prototype.format = function() {
	var args = arguments;
	return this.replace(/\{(\d+)\}/g, function(){
		var val = args[arguments[1]];
		//return (! val) ? arguments[0] : val;
		return (! val) ? '' : val;
	});
};
function loadLeafChildClothType(parentTypeName,callback) {
	$.getJSON('/service/custom/measure/clothesType/' + parentTypeName, function(data) {
		if(data.code == 1 && data.data) {
			callback(data.data);
		}else {
			console.log(data.message);
		}
	});
}
function groupAddressByFirstLetter(address) {
	var group = {},i=0,len = address.length,temp;
	for(; i < len; i++) {
		temp = PINYIN.firstLetter(address[i].municipalityName.charAt(0));
		
		for(var j = 0, jlen = temp.length; j < jlen; j++) {
			if(group[temp[j]]) {
				group[temp[j]].push(address[i]);
			}else {
				group[temp[j]] = [address[i]];
			}
		}
	}
	return group;
}
/*返回产品是否有设置款式、面料、定制细节，是否需要量体的描述对象
 * */
function haveProductProperties(product) {
	var styleId = product.styleId,//款式组
		confess =product.confess,
		quantity = product.quantity,//是否需要量体数据
		choosableIdArray = product.choosableId ? product.choosableId.split(",") : null,//可选面料
		accentIdArray = product.accentId ? product.accentId.split(",") : null;//定制细节
		
		if(choosableIdArray && choosableIdArray.indexOf("") != -1) {
			choosableIdArray.splice(choosableIdArray.indexOf(""),1);
		}
		if(accentIdArray && accentIdArray.indexOf("") != -1) {
			accentIdArray.splice(accentIdArray.indexOf(""),1);
		}
		return {
				confessCheck : confess && confess == 1 ? true : false,
				hasStyle : styleId ? true : false, 
				hasFabric : !choosableIdArray || choosableIdArray.length == 0 ? false : true,
				hasAccent : !accentIdArray || accentIdArray.length == 0 ? false : true,
				hasQuantity : quantity ? true : false
				};
}
function getLoginUser() {
	var result = null;
	$.ajax('../../service/userRest/user/info/current?' + Math.random(),{
		success:function(data){
			if(data.isSuccess === 1){
				var user = data.data;
				result = user;
			}	
		},
		dataType:'json',
		async:false
	});
	return result;
}
function isLogin() {
	if(getLoginUser()) {
		return true;
	}
	return false;
}
function isNumber( str ){   
	var regu = "^[0-9]+$"; 
	var re = new RegExp(regu); 
		if (str.search(re) != -1) { 
			return true; 
		} else { 
			return false; 
		} 
}
function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = (d + Math.random()*16)%16 | 0;
	  d = Math.floor(d/16);
	  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});
	return uuid.replace(/-/g,"");
}

// 加载diy产品信息
function loadDiyProduct() {
	var id = getURLParam()['id'];
	if (!id || id == '') {
		return null;
	}
	
	var product;
	$.ajax('/service/diyProduct/' + id,{
		success: function(res){
				product = res.data;
		},
		dataType:'json',
		async:false
	});
	
	return product;
}

//加载U3D产品信息
function loadU3DProduct(id) {
	if (!id || id == '') {
		return null;
	}
	var product;
	$.ajax('/service/diyProduct/' + id,{
		success: function(res){
				product = res.data;
		},
		dataType:'json',
		async:false
	});
	
	return product;
}


function loadCustomShop(shopId) {
	if (!shopId || shopId == '') {
		return null;
	}
	
	var shop = null;
	$.ajax('/service/customRest/customShopService/findCustomShopInfo',{
		success: function(res){
			if(res && res.rows && res.rows.length > 0) {
				shop = res.rows[0];
			}
		},
		dataType:'json',
		async:false,
		data : {shopId : shopId}
	});
	
	return shop;
}
// 新版统计代码获取
var _hmt = _hmt || [];
$(function(){
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?92a1d9d9411129414b032b2236b9031d";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
})
// var _hmt = _hmt || []; 
// (function() { var hm = document.createElement("script"); hm.src = "https://hm.baidu.com/hm.js?8e30a113d819f344c4fe59e8c2dd67d0"; 
//     var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); 
// })(); 

