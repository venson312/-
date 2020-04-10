/* 常用表单验证封装  
 * BY lrk  2015-10-13  
 */
$.fn.validate = function(config) {
	config = config || {};
	var validate = new $.fn._validate();
	$.extend(validate, config);
	return validate.validate(this);
}
$.fn._validate = function() {
}
$.fn._validate.prototype = {
	emptyText : '该项不能为空',
	numberText : '请填写数字',
	phoneText : '请填写正确的电话号码',
	mobilePhoneText : '请填写正确的手机号码',
	emailText : '请填写正确的邮箱地址',
	idcardText : '请填写正确的身份证号',
	numberLeterText : '该项必须要字母和数字组成',
	chineseText : '该项只能填写中文',
	dateText : '请输入正确的日期格式',
	decimalText : '请填写数字或小数',
	batchValidate : true,
	validate : function(form) {
		var validateFlag = true, scope = this;
		form.find(":input").each(function(index) {
			var _this = $(this);
			var _validate = _this.attr('validate');
			if (_validate) {
				var validates = _validate.split(' ');
				if (validates.length > 0) {
					for (var i = 0; i < validates.length; i++) {
						if (scope[validates[i]]) {
							var flag = scope[validates[i]](_this);
							if (!flag) {
								validateFlag = flag;
								break;
							} else {
								scope.success.call(_this);
							}
						}
					}
				}
			}
			if (scope.batchValidate === false) {
				return validateFlag;
			}
		});
		return validateFlag;
	},
	success : function() {
		var errorId = this.attr('msgId');
		if (errorId) {
			$('#' + errorId).html("");
		}
	},
	// 显示异常信息
	showErrorMsg : function(msg) {
		var errorId = this.attr('msgId');
		if (errorId) {
			var _class = this.attr('changClass') || this.attr('changeClass');
			_class = _class || "";
			$('<span>').addClass(_class).html(msg).appendTo(
					$('#' + errorId).html(''));
			// insertError(msg, _class, errorId);
		} else {
			$.MsgBox.Alert('提示', msg)
		}
		this.focus();
	},

	// 验证时间
	checkDate : function(el) {
		var patrn = /^(?!0000)[0-9]{4}-((0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-8])|(0[13-9]|1[0-2])-(29|30)|(0[13578]|1[02])-31)$/;
		if (!patrn.exec(el.val())) {
			var msg = this.dateTest;
			if (el.attr("dateText")) {
				msg = el.attr("dateText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
		return true;
	},
	// 非空校验
	empty : function(el) {
		var tempValue = el.val();
		if (tempValue.trim() == "") {
			var msg = this.emptyText;
			if (el.attr("emptyText")) {
				msg = el.attr("emptyText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
		return true;
	},
	notEqual:function(el){
		var val = el.val(),
			_val = el.attr('notEqualVal');
		if(val == _val){
			var msg = "该项不能等于" + _val;
			if (el.attr("notEqualText")) {
				msg = el.attr("notEqualText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
		return true;
	},
	// 数字校验
	number : function(el) {
		if (!el.val()) {
			return true;
		}
		var patrn = /^\d+$/;
		if (!patrn.test(el.val())) {
			var msg = this.numberText;
			if (el.attr("numberText")) {
				msg = el.attr("numberText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
		return true;
	},
	// 小数验证
	decimal : function(el) {
		if (!el.val()) {
			return true;
		}
		var patrn = /^\d+\.?\d{0,2}$/;
		if (!patrn.test(el.val())) {
			var msg = this.numberText;
			if (el.attr("decimalText")) {
				msg = el.attr("decimalText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
		return true;
	},
	// 密码合法性校验
	password : function(el) {

	},
	// 普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
	phone : function(el) {
		if (!el.val()) {
			return true;
		}
		var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
		if (!patrn.exec(el.val())) {
			var msg = this.phoneText;
			if (el.attr("phoneText")) {
				msg = el.attr("phoneText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
		return true;
	},
	// 手机校验
	mobilePhone : function(el) {
		if (!el.val()) {
			return true;
		}
		if (!(/^1[\d]{10}$/g.test(el.val()))) {
			var msg = this.mobilePhoneText;
			if (el.attr("mobilePhoneText")) {
				msg = el.attr("mobilePhoneText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
		return true;
	},
	// 邮箱校验
	email : function(el) {
		if (!el.val()) {
			return true;
		}
		if (!/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
				.test(el.val())) {
			var msg = this.emailText;
			if (el.attr("emailText")) {
				msg = el.attr("emailText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
		return true;
	},
	// 数字、字母验证
	numberLeter : function(el) {
		var str = el.val();
		if (!str) {
			return true;
		}
		var regu = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-z0-9A-Z]+$/;
		var re = new RegExp(regu);
		if (!re.test(str)) {
			var msg = this.numberLeterText;
			if (el.attr("numberLeterText")) {
				msg = el.attr("numberLeterText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
		return true;
	},
	// 长度校验
	length : function(el) {
		var max = el.attr('max'), min = el.attr('min'), val = el.val();
		if (!val) {
			return true;
		}
		if (max && max) {
			if (val.length > max || val.length < min) {
				var msg = "该项内容的长度必须是" + min + '到' + max + '个字符';
				if (el.attr("lengthText")) {
					msg = el.attr("lengthText");
				}
				this.showErrorMsg.call(el, msg);
				return false;
			}
			return true;
		}
		if (max) {
			if (val.length > max) {
				var msg = "该项内容的长度必须小于" + max + "个字符";
				if (el.attr("lengthText")) {
					msg = el.attr("lengthText");
				}
				this.showErrorMsg.call(el, msg);
				return false;
			}
			return true;
		}
		if (min) {
			if (val.length < min) {
				var msg = "该项内容的长度必须大于" + min + "个字符";
				if (el.attr("lengthText")) {
					msg = el.attr("lengthText");
				}
				this.showErrorMsg.call(el, msg);
				return false;
			}
			return true;
		}

	},
	// 验证中文
	chinese : function(el) {
		if (!el.val()) {
			return true;
		}
		var reg = /^[\u4e00-\u9fa5]+$/gi;
		if (!reg.test(el.val())) {
			var msg = this.chineseText;
			if (el.attr("chineseText")) {
				msg = el.attr("chineseText");
			}
			this.showErrorMsg.call(el, msg);
			// obj.select();
			return false;
		}
		return true;
	},
	/**
	 * 身份证15位编码规则：dddddd yymmdd xx p dddddd：地区码 yymmdd: 出生年月日 xx: 顺序类编码，无法确定 p:
	 * 性别，奇数为男，偶数为女
	 * <p />
	 * 身份证18位编码规则：dddddd yyyymmdd xxx y dddddd：地区码 yyyymmdd: 出生年月日
	 * xxx:顺序类编码，无法确定，奇数为男，偶数为女 y: 校验码，该位数值可通过前17位计算获得
	 * <p />
	 * 18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4,
	 * 2,1 ] 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ] 校验位计算公式：Y_P = mod(
	 * ∑(Ai×Wi),11 ) i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置
	 * 
	 * @param canImpty:1,可空;0,必填
	 */
	idcard : function(el) {
		var idCard = el.val();
		if (!idCard) {
			return true;
		}
		if (idCard.length == 15) {
			if (!this.isValidityBrithBy15IdCard(idCard)) {
				var msg = this.idcardText;
				if (el.attr("idcardText")) {
					msg = el.attr("idcardText");
				}
				this.showErrorMsg.call(el, msg);
				return false;
			}
			return true;
		} else if (idCard.length == 18) {
			var a_idCard = idCard.split("");// 得到身份证数组
			if (this.isValidityBrithBy18IdCard(idCard)
					&& this.isTrueValidateCodeBy18IdCard(a_idCard)) {
				return true;
			} else {
				var msg = this.idcardText;
				if (el.attr("idcardText")) {
					msg = el.attr("idcardText");
				}
				this.showErrorMsg.call(el, msg);
				return false;
			}
		} else {
			var msg = this.idcardText;
			if (el.attr("idcardText")) {
				msg = el.attr("idcardText");
			}
			this.showErrorMsg.call(el, msg);
			return false;
		}
	},
	/**
	 * 验证15位数身份证号码中的生日是否是有效生日
	 * 
	 * @param idCard15
	 *            15位书身份证字符串
	 * @return
	 */
	isValidityBrithBy15IdCard : function(idCard15) {
		var year = idCard15.substring(6, 8);
		var month = idCard15.substring(8, 10);
		var day = idCard15.substring(10, 12);
		var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
		// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
		if (temp_date.getYear() != parseFloat(year)
				|| temp_date.getMonth() != parseFloat(month) - 1
				|| temp_date.getDate() != parseFloat(day)) {
			// alert("身份证号格式不正确！出生日期有误!");
			return false;
		} else {
			return true;
		}
	},
	/**
	 * 验证18位数身份证号码中的生日是否是有效生日
	 * 
	 * @param idCard
	 *            18位书身份证字符串
	 * @return
	 */
	isValidityBrithBy18IdCard : function(idCard18) {
		var year = idCard18.substring(6, 10);
		var month = idCard18.substring(10, 12);
		var day = idCard18.substring(12, 14);
		var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
		// 这里用getFullYear()获取年份，避免千年虫问题
		if (temp_date.getFullYear() != parseFloat(year)
				|| temp_date.getMonth() != parseFloat(month) - 1
				|| temp_date.getDate() != parseFloat(day)) {
			// alert("身份证号格式不正确！出生日期有误!");
			return false;
		} else {
			return true;
		}
	},
	/**
	 * 判断身份证号码为18位时最后的验证位是否正确
	 * 
	 * @param a_idCard
	 *            身份证号码数组
	 * @return
	 */
	isTrueValidateCodeBy18IdCard : function(a_idCard) {
		var sum = 0; // 声明加权求和变量
		var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子
		var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X
		if (a_idCard[17].toLowerCase() == 'x') {
			a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
		}
		for (var i = 0; i < 17; i++) {
			sum += Wi[i] * a_idCard[i];// 加权求和
		}
		valCodePosition = sum % 11;// 得到验证码所位置
		if (a_idCard[17] == ValideCode[valCodePosition]) {
			return true;
		} else {
			// alert("身份证号码格式不正确！请确认");
			return false;
		}
	}
}