// JavaScript Document

function dataCheck(formId){
	if (isNull(document.getElementById("checkNo").value) )
	{
		insertError("请输入手机验证码！","alertWrap1","errorWrap");
		document.getElementById("checkNo").focus();
		return false;
	}else{
		insertError("","","errorWrap");
	}	
	
if (isNull(document.getElementById("passWord1").value))
	{
		insertError("请输入登录密码！","alertWrap1","errorWrap");
		document.getElementById("passWord1").focus();
		return false;
    }else{
		insertError("","","errorWrap");
	}
if (!checkLength(document.getElementById("passWord1").value,6,15))
	{
		insertError("密码长度为6-15个字符！","alertWrap1","errorWrap");
		document.getElementById("passWord1").focus();
		return false;
    }else{
		insertError("","","errorWrap");
	}
if (!isNumberLetter(document.getElementById("passWord1").value))
	{
		insertError("密码必须存在字母+数字！","alertWrap1","errorWrap");
		document.getElementById("passWord1").focus();
		return false;
    }else{
		insertError("","","errorWrap");
	}
/*if (!comPassword("passWord1","comPassWord"))
	{
		insertError("密码和确认密码不一致，请重新输入！","alertWrap1","errorWrap");
		document.getElementById("comPassWord").focus();
		return false;
    }else{
		insertError("","","errorWrap");
	}*/
/*var captcha = $.trim($('input[name=captcha]').val());
if (captcha == '') {
	$('input[name=captcha]').focus();
	insertError("请输入图形验证码","alertWrap1","errorWrap");
	return false;
}*/

// if (!isNull(document.getElementById("email").value) && !checkEmail(document.getElementById("email").value))
// {
// 	insertError("邮箱格式不正确，请输入正确的电子邮箱！","alertWrap1","errorWrap");
// 	document.getElementById("email").focus();
// 	return false;
// }else{
// 	insertError("","","errorWrap");
// }
/*var code = $('#code').val();
var inputcode = $('#checkNo').val();
if (inputcode != "" && inputcode != code) {
	insertError("验证码输入错误！","alertWrap1","errorWrap");
	document.getElementById("checkNo").focus();
    return false;  
}else {
	insertError("","","errorWrap");
}*/
var errorWrap = $('#errorWrap').text();
if (errorWrap != "") {
	return false;
}
	var inputcode = $('#checkNo').val();
	if(inputcode == ""){
		return ;
	}
	$.get('../../service/userRest/user/info/checkSendMessageMa/'+ inputcode , '', function(data){
		if (data.success === true) {
			insertError("","","errorWrap");
			$('#passWord1').val(hex_md5($('#passWord1').val()));
			$('#registFrom').submit();
		} else {
			$("#checkBokeMessTwo").val("11");
			insertError("验证码输入错误！","alertWrap1","errorWrap");
			return false;  
		}
},'json');
}
$(function(){
	
	var fage=false;
	$("#mobilePhone").blur(function(){
		var pattern = /^1[34578]\d{9}$/; 
		  if (!checkMobile(document.getElementById("mobilePhone").value) || !pattern.test(document.getElementById("mobilePhone").value))
			{
				insertError("请输入正确的手机号码！","alertWrap1","errorWrap");
				document.getElementById("mobilePhone").focus();
				$("#registerLoginUsernameRight").hide();
				$("#registerLoginUsernameError").show();
				return false;
		    }else{
				insertError("","","errorWrap");
			}
		  var phone = $('#mobilePhone').val();
		  if(phone){
			  $.get('../../service/userRest/user/info/verifyNumber/'+ phone + '', function(data){
					//console.log(data);
					 if (data.success === "repeat"){
						 document.getElementById("mobilePhone").focus();
						insertError("手机号码已经被注册！","alertWrap1","errorWrap");
						return false;
					}else{
						fage=true;
						insertError("","","errorWrap");
					}
				},'json');
		  }
	  });

	$('#regist2').click(function() {
		 if (isNull(document.getElementById("mobilePhone").value))
			{
				insertError("请输入手机号码！","alertWrap1","errorWrap");
				document.getElementById("mobilePhone").focus();
				return false;
		    }else{
				insertError("","","errorWrap");
			}
		 var pattern = /^1[34578]\d{9}$/; 
		if (!checkMobile(document.getElementById("mobilePhone").value) || !pattern.test(document.getElementById("mobilePhone").value))
			{
				insertError("请输入正确的手机号码！","alertWrap1","errorWrap");
				document.getElementById("mobilePhone").focus();
				return false;
		    }else{
				insertError("","","errorWrap");
			}
			if(fage){
				$('#registFrom').submit();
			}else{
				 document.getElementById("mobilePhone").focus();
				insertError("手机号码已经被注册！","alertWrap1","errorWrap");
				return false;
			}
	 })
	
	  var mobilePhone= getURLParam().mobilePhone;
	if(mobilePhone !=null && mobilePhone !=undefined && mobilePhone !=""){
		 $.get('../../service/userRest/user/info/checkUserMobilePhoneTrue/'+ mobilePhone + '', function(data){
				 if (data.success == true){
					 $("#mobilePhoneSel").text("手机号码："+mobilePhone);
					 $("#mobilePhone").val(mobilePhone);
					 $("#getCode").trigger("click",send); 
				}else if(data.success == '不能重复获取'){
					 $("#mobilePhoneSel").text("手机号码："+mobilePhone);
					 $("#mobilePhone").val(mobilePhone);
				}else{
					 location.replace("regist.html");
				}
		},'json');
	}
	 
	 
	/*
	$("#registerLoginUsernameRight").hide();
	$("#registerLoginUsernameError").hide();
	$("#registerLoginpassWord1Right").hide();
	$("#registerLoginPassWord1Error").hide();
	$("#registerLoginComPassWordRight").hide();
	$("#registerLoginComPassWordError").hide();*/
	/*$(document).ready(function(){
		  $("#mobilePhone").blur(function(){
			  if (!checkMobile(document.getElementById("mobilePhone").value))
				{
					insertError("请输入正确的手机号码！","alertWrap1","errorWrap");
					document.getElementById("mobilePhone").focus();
					$("#registerLoginUsernameRight").hide();
					$("#registerLoginUsernameError").show();
					return false;
			    }else{
					insertError("","","errorWrap");
				}
		  });
		  $("#passWord1").focus(function(){
			if (isNull(document.getElementById("passWord1").value))
			{
				insertError("请输入登录密码！","alertWrap1","errorWrap");
				$("#registerLoginpassWord1Right").hide();
				$("#registerLoginPassWord1Error").show();
				return false;
		    }else{
				insertError("","","errorWrap");
			}
			if (!checkLength(document.getElementById("passWord1").value,6,15))
			{
				insertError("密码长度为6-15个字符！","alertWrap1","errorWrap");
				$("#registerLoginpassWord1Right").hide();
				$("#registerLoginPassWord1Error").show();
				return false;
		    }else{
				insertError("","","errorWrap");
			}
			if (!isNumberLetter(document.getElementById("passWord1").value))
			{
				insertError("密码必须存在字母+数字！","alertWrap1","errorWrap");
				$("#registerLoginpassWord1Right").hide();
				$("#registerLoginPassWord1Error").show();
				return false;
		    }else{
				insertError("","","errorWrap");
				$("#registerLoginpassWord1Right").show();
				$("#registerLoginPassWord1Error").hide();
			}
		  });
		  $("#passWord1").blur(function(){
				if (isNull(document.getElementById("passWord1").value))
				{
					insertError("请输入登录密码！","alertWrap1","errorWrap");
					$("#registerLoginpassWord1Right").hide();
					$("#registerLoginPassWord1Error").show();
					return false;
			    }else{
					insertError("","","errorWrap");
				}
				if (!checkLength(document.getElementById("passWord1").value,6,15))
				{
					insertError("密码长度为6-15个字符！","alertWrap1","errorWrap");
					$("#registerLoginpassWord1Right").hide();
					$("#registerLoginPassWord1Error").show();
					return false;
			    }else{
					insertError("","","errorWrap");
				}
				if (!isNumberLetter(document.getElementById("passWord1").value))
				{
					insertError("密码必须存在字母+数字！","alertWrap1","errorWrap");
					$("#registerLoginpassWord1Right").hide();
					$("#registerLoginPassWord1Error").show();
					return false;
			    }else{
					insertError("","","errorWrap");
					$("#registerLoginpassWord1Right").show();
					$("#registerLoginPassWord1Error").hide();
				}
			  });
		  $("#comPassWord").focus(function(){
			  if (!comPassword("passWord1","comPassWord"))
				{
					insertError("密码和确认密码不一致，请重新输入！","alertWrap1","errorWrap");
					$("#registerLoginComPassWordRight").hide();
					$("#registerLoginComPassWordError").show();
					return false;
			    }else{
					insertError("","","errorWrap");
					$("#registerLoginComPassWordRight").show();
					$("#registerLoginComPassWordError").hide();
				}
		  })
		  $("#comPassWord").blur(function(){
			  if (!comPassword("passWord1","comPassWord"))
				{
					insertError("密码和确认密码不一致，请重新输入！","alertWrap1","errorWrap");
					$("#registerLoginComPassWordRight").hide();
					$("#registerLoginComPassWordError").show();
					return false;
			    }else{
					insertError("","","errorWrap");
					$("#registerLoginComPassWordRight").show();
					$("#registerLoginComPassWordError").hide();
				}
			});
		  $("#mobilePhone").blur(function(){
			  if (!checkMobile(document.getElementById("mobilePhone").value))
				{
					insertError("请输入正确的手机号码！","alertWrap1","errorWrap");
					document.getElementById("mobilePhone").focus();
					$("#registerLoginUsernameRight").hide();
					$("#registerLoginUsernameError").show();
					return false;
			    }else{
					insertError("","","errorWrap");
				}
			  var phone = $('#mobilePhone').val();
			  if(phone){
				  $.get('../../service/userRest/user/info/verifyNumber/'+ phone + '', function(data){
						//console.log(data);
						 if (data.success === "repeat"){
							 document.getElementById("mobilePhone").focus();
							insertError("手机号码已经被注册！","alertWrap1","errorWrap");
							return false;
						}else{
							$("#registerLoginUsernameRight").show();
							$("#registerLoginUsernameError").hide();
							insertError("","","errorWrap");
						}
					},'json');
			  }
		  });
	});*/
	/*$("#passWord1").blur(function(){
		if (!isNull(document.getElementById("passWord1").value) && !checkLength(document.getElementById("passWord1").value,6,15))
			{
				insertError("密码长度为6-15个字符！","alertWrap1","errorWrap");
		    }
		if (!isNull(document.getElementById("passWord1").value) && !isNumberLetter(document.getElementById("passWord1").value))
			{
				insertError("密码必须存在字母+数字！","alertWrap1","errorWrap");
		    }
	});*/
	/*$("#comPassWord").blur(function(){
		if (!comPassword("passWord1","comPassWord"))
		{
			insertError("密码和确认密码不一致，请重新输入！","alertWrap1","errorWrap");
	    }
	});*/
	// $('#email').blur(function(){
	// 	if (!isNull(document.getElementById("email").value) && !checkEmail(document.getElementById("email").value))
	// 		{
	// 			insertError("邮箱格式不正确，请输入正确的电子邮箱！","alertWrap1","errorWrap");
	// 			return false;
	// 	    }
	// 	var email = $('#email').val();
	// 	if (email != "") {
	// 		$.get('../../service/userRest/user/info/checkEmail/'+ email, '', function(data){
	// 			if(data.success === true){
					
	// 			} else {
	// 				insertError("邮箱已经被注册！","alertWrap1","errorWrap");
	// 				return false;
	// 			}
	// 		},'json');
	// 	}
	// });
	/*$('#mobilePhone').blur(function(){
		if (!isNull(document.getElementById("mobilePhone").value) && !checkMobile(document.getElementById("mobilePhone").value))
			{
				insertError("请输入正确的手机号码！","alertWrap1","errorWrap");
				return false;
		    }
	});*/
	
	// 验证码点击刷新图片
	/*$('#captchaImg').click(function() {
		var $this = $(this);
		var imgUrl = $this.attr('src');
		if (imgUrl.indexOf('?') == -1) {
			imgUrl += '?' + new Date().getTime();
		} else {
			imgUrl = imgUrl.replace(/\?(.*?)$/, '?' + new Date().getTime());
		}
		
		$this.attr('src', imgUrl);
	});*/
	
	var send = function(){
		if($(this).hasClass('sended')){
			return;
		}
		var phone=$("#mobilePhone").val();
		if(isNull(document.getElementById("mobilePhone").value)){
			insertError("手机号码为空","alertWrap1","errorWrap");
			document.getElementById("checkNo").focus();
			return false;
		}
		
		var wait = 120; //设置秒数(单位秒) 
		$('#getCode').attr("style", "color:#cccccc");
		$('#getCode').text("(" +wait+")秒后重新获取");
		$('#getCode').attr("disabled", "true");
		$(this).addClass('sended');
		
		$('#getCode').text("校验手机...");
		$.get('../../service/userRest/user/info/sendMessageregister/'+ phone, '', function(data){
			if(data.success === true){
				var interval = setInterval(function(){
					wait--;
					if(wait==0) { 
						clearInterval(interval);
						//$('#getCode').bind("click", send);
						$('#getCode').removeClass('sended');
						$('#getCode').removeAttr("style");
						$('#getCode').text("重新获取验证码");
						$('#getCode').removeAttr("disabled");
			    		//$('#code').val("");
			    	} else { 
			    		$('#getCode').attr("style", "color:#ffffff;background-color:#b5b5b5");
			    		$('#getCode').text(wait);
			    		$('#getCode').attr("disabled", "true"); 
			    	}
				},1000);
				//$('#code').val(data.code);
			}else if (data.success === "repeat"){
				//$('#getCode').bind("click", send);
				$('#getCode').removeClass('sended');
				$('#getCode').removeAttr("style");
				$('#getCode').removeAttr("disabled");
				$('#getCode').text("获取验证码");
				insertError("手机号码已经被注册！","alertWrap1","errorWrap");
				return false;
			} else {
				//$('#getCode').bind("click", send);
				$('#getCode').removeClass('sended');
				$('#getCode').removeAttr("style");
				$('#getCode').removeAttr("disabled");
				$('#getCode').text("获取验证码");
				insertError("获取验证码失败，请重新获取！","alertWrap1","errorWrap");
				return false;
			}
		},'json');
	};
	$('#getCode').bind("click", send);
	

	// $('#username').blur(function(){
	// 	var username = $('#username').val();
	// 	if ((username.length < 6 || username.length > 20) && username != "") { 
	// 		 insertError("用户名长度必须在6到20之间！","alertWrap1","errorWrap");
 //             return false;  
 //        } else {  
 //            if (!/[A-Za-z0-9]*/.test(username)) {  
 //            	insertError("用户名只能数字、字母组成！","alertWrap1","errorWrap");
 //                return false;  
 //            }
 //        }  
	// 	if (username != "") {
	// 		$.get('../../service/userRest/user/info/validateUsername/' + username, null, function(data){
	// 			if(data.success === true){
	// 				insertError("用户名可用！","alertWrap1","errorWrap");
	// 	            return false;  
	// 			} else {
	// 				insertError("该用户已注册！","alertWrap1","errorWrap");
	// 	            return false;  
	// 			}
	// 		},'json');
	// 	}
	// });

	// $('#inviteCode').blur(function(){
	// 	var inviCode = $('#inviteCode').val();
	// 	if ((inviCode.length != 12) && inviCode != "") { 
	// 		 insertError("推荐邀请码的长度是12位！","alertWrap1","errorWrap");
 //             return false;  
 //        } else {  
 //            if (!/[A-Za-z0-9]*/.test(inviCode)) {  
 //            	insertError("推荐邀请码只能数字、字母组成！","alertWrap1","errorWrap");
 //                return false;  
 //            }
 //        }  
	// 	if (inviCode != "") {
	// 		$.get('../../service/userRest/user/info/validateReferrer/' + inviCode, null, function(data){
	// 			if(data.success === true){
	// 			} else {
	// 				insertError("无效的邀请码！","alertWrap1","errorWrap");
	//                 return false;
	// 			}
	// 		},'json');
	// 	}
	// });
	// $('#adviser').blur(function(){
	// 	var adviser = $('#adviser').val();
	// 	if (adviser != "") {
	// 		$.get('../../service/userRest/user/info/validateFactor/' + adviser, null, function(data){
	// 			if(data.success === true){
	// 			} else {
	// 				insertError("无效的服装顾问！","alertWrap1","errorWrap");
	//                 return false;
	// 			}
	// 		},'json');
	// 	}
	// });
	/*$('#inviCode').focus(function(){
		$('span').remove('.alertWrap1');
	});
	// $('#username').focus(function(){
	// 	$('span').remove('.alertWrap1');
	// });
	// $('#email').focus(function(){
	// 	$('span').remove('.alertWrap1');
	// });
	$('#comPassWord').focus(function(){
		$('span').remove('.alertWrap1');
	});
	$('#mobilePhone').focus(function(){
		$('span').remove('.alertWrap1');
	});*/ 
})
function setColor(id) {
	if ($("input[type='checkbox']").is(':checked')) {
		$('#'+id).attr("style", "background-color:#ff5274;border:#ff5274;width:480px;margin-bottom:30px;");
	} else {
		$('#'+id).attr("style", "background-color:#cccccc;border:#cccccc;width:480px;margin-bottom:30px;");
	}
}

function protocol(){
	var t = $('#getProtocol').popup({
		type : 'ajax',
		url : '../../html/register/protocol.html',
		width : 850,
		height : 550
	});
}
