/**
 * 预约加盟申请信息
 */
function dataCheck(){
	var name = $("#joinName").val();
	
	var telphone = $("#joinTelphone").val();
	
	if(name == null || name == "" || name == "姓名"){
		$.MsgBox.Alert("温馨提示","姓名填写不能为空！");
		return false;
	}
	
	if(telphone == null || telphone == "" || telphone == "电话"){
		$.MsgBox.Alert("温馨提示","电话填写不能为空！");
		return false;
	}else{
		var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
		var isMob = /^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
		
		if(isMob.test(telphone)  ||  isPhone.test(telphone)){
			//验证通过，请求后台
			$.ajax({
				type : "POST",
				url : "../../service/goodsRest/goods/insertJoinAppproval",
				data : $('#form1').serializeJSON(),
				async : false,
				dataType : "json",
				error : function(request) {
					$.MsgBox.Alert("温馨提示", "服务器去火星旅游了！~ 请联系运维君！~");
				},
				success : function(data) {
					if (data.success == true || data.success == 'true') {
						window.location.href = "eagueCooperationOk.html";
						//$.MsgBox.Alert("温馨提示", "加盟合作申请成功，招商专员会尽快与您联系！");
						//location.reload();
					} else {
						$.MsgBox.Alert("温馨提示", "加盟合作申请失败,请联系客服哦！~~~");
					}
				}
			});
		}else{
			$.MsgBox.Alert("温馨提示","电话填写格式不正确！");
			return false;
		}
	}
	
}