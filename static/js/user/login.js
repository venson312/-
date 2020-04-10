// JavaScript Document
$(function(){
	$(document.body).keyup(function(e){
		if(e.keyCode === 13){
			dataCheck();
		}
	});
	
	$("#loginMessojqq").hide();
	$("#loginIpt5").hide();
    $('#loginBtnF2').on('click',function(){
        $(this).addClass('current')
               .siblings('li').removeClass('current');
        $('#loginIpt1').hide();
        $('#loginIpt2').hide();
        $('#loginIpt3').show();
        $('#loginIpt4').show();
        $("#loginMessojqq").show();
        $("#login").hide();
    })
    $('#loginBtnF1').on('click',function(){
        $(this).addClass('current')
               .siblings('li').removeClass('current');
        $('#loginIpt1').show();
        $('#loginIpt2').show();
        $('#loginIpt3').hide();
        $('#loginIpt4').hide();
        $("#loginMessojqq").hide();
        $("#login").show();
        $("#loginIpt5").hide();
    });
    
    $('#captchaImg').click(function() {
		var $this = $(this);
		var imgUrl = $this.attr('src');
		if (imgUrl.indexOf('?') == -1) {
			imgUrl += '?' + new Date().getTime();
		} else {
			imgUrl = imgUrl.replace(/\?(.*?)$/, '?' + new Date().getTime());
		}
		
		$this.attr('src', imgUrl);
	});
    
    var fage=false;
	$("#mobilePhone").blur(function(){
		var pattern = /^1[34578]\d{9}$/; 
		  if (!checkMobile(document.getElementById("mobilePhone").value) || !pattern.test(document.getElementById("mobilePhone").value))
			{
				insertError("请输入正确的手机号码！","alertWrap1","errorWrap");
				return false;
		    }else{
				insertError("","","errorWrap");
			}
		  var phone = $('#mobilePhone').val();
		  if(phone){
			  $.get('../../service/userRest/user/info/verifyNumber/'+ phone + '', function(data){
					//console.log(data);
					 if (data.success === "repeat"){
						 fage=true;
						 insertError("","","errorWrap");
					}else{
						insertError("你未注册过云衣账号，请点击进入注册页面！！！","alertWrap1","errorWrap");
						fage=false;
					}
				},'json');
		  }
	  });
    
    
    var send = function(){
    	if(!fage){
    		return;
    	}
		if($(this).hasClass('sended')){
			return;
		}
		if (isNull(document.getElementById("mobilePhone").value))
		{
			insertError("请输入手机号码！","alertWrap1","errorWrap");
			document.getElementById("mobilePhone").focus();
			return false;
	    }else{
			insertError("","","errorWrap");
		}
		var phone = $('#mobilePhone').val();
		$("#numberCheckfin").val(phone);
		if (phone == "" || !checkMobile(phone)) {
			insertError("请输入正确的手机号码！","alertWrap1","errorWrap");
			$('#mobilePhone').focus();
			return false;
		}
		var checkBokeMessl=$("#checkBokeMess").val();
		var captcha = $.trim($('input[name=captcha]').val());
		if(checkBokeMessl =="bo2ke132Ca456dPdc321h5c5h5ahdjk"){
			if (captcha == '') {
				$('input[name=captcha]').focus();
				insertError("请输入图形验证码","alertWrap1","errorWrap");
				return false;
			}
		}
		
		if(checkBokeMessl =="bo2ke132Ca456dPdc321h5c5h5ahdjk"){
			var wait = 120; //设置秒数(单位秒) 
			$('#getCode').attr("style", "color:#cccccc");
			$('#getCode').text("(" +wait+")秒后重新获取");
			$('#getCode').attr("disabled", "true");
			$(this).addClass('sended');
			
			$('#getCode').text("校验手机...");
			$.get('../../service/userRest/user/info/checkValideCaptcha/'+ phone + "?captcha=" + captcha, '', function(data){
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
					$('#code').val(data.code);
				}else if (data.success === "captcha"){
					//$('#getCode').bind("click", send);
					$('#getCode').removeClass('sended');
					$('#getCode').removeAttr("style");
					$('#getCode').removeAttr("disabled");
					$('#getCode').text("获取验证码");
					insertError("图形验证码输入不正确", "alertWrap1", "errorWrap");
					$('input[name=captcha]').focus();
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
		}else{
		var wait = 120; //设置秒数(单位秒) 
		$('#getCode').attr("style", "color:#cccccc");
		$('#getCode').text("(" +wait+")秒后重新获取");
		$('#getCode').attr("disabled", "true");
		$(this).addClass('sended');
		
		$('#getCode').text("校验手机...");
		$.get('../../service/userRest/user/info/sendMessageLogin/'+ phone , '', function(data){
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
			}else {
				//$('#getCode').bind("click", send);
				$('#getCode').removeClass('sended');
				$('#getCode').removeAttr("style");
				$('#getCode').removeAttr("disabled");
				$('#getCode').text("获取验证码");
				insertError("获取验证码失败，请重新获取！","alertWrap1","errorWrap");
				return false;
			}
		},'json');
	}
   };
	$('#getCode').bind("click", send);
	/*var errorCount=0;
	$('#checkNo').blur(function(){
		var inputcode = $('#checkNo').val();
		if(inputcode == ""){
			return ;
		}
		$.get('../../service/userRest/user/info/checkSendMessageMa/'+ inputcode , '', function(data){
			if (data.success === true) {
				insertError("","","errorWrap");
				$("#checkBokeMessTwo").val("bo2ke132Ca456dY798fa89771bu");
			} else {
				$("#checkBokeMessTwo").val("");
				insertError("验证码输入错误！","alertWrap1","errorWrap");
				errorCount +=1;
				if(errorCount == 3){
					$("#loginIpt5").show();
					$("#checkBokeMess").val("bo2ke132Ca456dPdc321h5c5h5ahdjk");
				}
				return false;  
			}
		},'json');
	});*/
    
    
	    
});
function dataCheck(formId){
	login(function(){
		var param = getURLParam();
		var _url = (param['returnUrl'] ? decodeURIComponent(param['returnUrl']) : '') || document.referrer;
		if(_url){
			if(_url.indexOf('html/login') >= 0 || _url.indexOf('html/register') >= 0){
				_url = _url = "/";   //跳转到首页
			}
		}else{
			_url = _url = "/";   //跳转到首页
		}
		var shopId = getLoginUser().isShop,shop;
		if(!shopId) {
			location.href = _url;
		}else {
			//debugger;
			shop = loadCustomShop(shopId);
			if(!shop) {
				location.href = _url;
			}else {
				if(shop.checkStatus == 1 && shop.isActive == 0) {
					location.href = "/html/goods/customShops.html";
				}else {
					location.href = _url;
				}
			}
			
		}
	});
	return false;
}

function shortMessagelog(formId){
	shortMessageLoginCheck(function(){
		var param = getURLParam();
		var _url = (param['returnUrl'] ? decodeURIComponent(param['returnUrl']) : '') || document.referrer;
		if(_url){
			if(_url.indexOf('html/login') >= 0 || _url.indexOf('html/register') >= 0){
				_url = _url = "/";  //跳转到首页
			}
		}else{
			_url = _url = "/";  //跳转到首页
		}
		location.href = _url;
	});
	return false;
}
