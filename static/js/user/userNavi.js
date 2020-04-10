$(function() {
	// 得到焦点
	$("#naviSearch").find("input").focus(function() {
		$(this).removeAttr("value");
	});
	// 失去焦点
	$("#naviSearch").find("input").blur(function() {
		if ($(this).val() == "") {
			$(this).attr("value", "请输入关键词");
		}
	});
	var user = workspace['user'];
	$('#login_user_span').text(
			user.nickName || user.userName || user.mobilePhone);
	var lastTime = user['lastLoginTime'];
	var lastLoginTimeStr=user['lastLoginTimeStr'];
	var date = new Date();
	var hours = date.getHours();
	if (hours >= 6 && hours < 12) {
		$('#the_hour').text('上午好');
	} else if (hours >= 12 && hours < 18) {
		$('#the_hour').text('下午好');
	} else if (hours >= 18 && hours <= 23) {
		$('#the_hour').text('晚上好');
	} else {
		$('#the_hour').text('凌晨好');
	}
	if (lastTime) {
		date.setTime(lastTime['time']);
		$('#last_login_time')
				.text(lastLoginTimeStr);
	}
});