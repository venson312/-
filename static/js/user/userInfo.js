// JavaScript Document

$(function() {
	var url = window.location.href;
	url = url.substring(url.lastIndexOf("?") + 1, url.length);
	if (url == 1) {
		returnObject('dressingForm', 'form1');
	}
	$("#selectp").change(function() {
		$("#selectcId .curSelect").html("市/区");
	});
	$("#form1 input[type='radio']").change(
			function() {
				var $JqueryThis = $(this);
				if ($("#photo").val() == "") {
					if ($JqueryThis.val() == 0) {
						$("#headUserInfoImg").attr("src",
								"../../images/user/men.png");
					} else {
						$("#headUserInfoImg").attr("src",
								"../../images/user/women.png");
					}
				}
			});
	// 加载个人信息
	$('#dressingForm :input').labelauty();
	// 着装初始化不可编辑
	/*
	 * $("#forDressing").find("input").each(function(index,Ele){ var
	 * $radio=$(Ele); $radio.attr("disabled","disabled"); });
	 */
	// 点击编辑可以操作
	/*
	 * $("#dressCancles").click(function(){
	 * $("#forDressing").find("input").each(function(index,Ele){ var
	 * $radio=$(Ele); $radio.removeAttr("disabled","disabled"); }); });
	 */
	// 文本框只读
	$("#form1").read();
	$("#form1").find("input[type='text']").each(function(index, Ele) {
		var $thisInput = $(this);
		$thisInput.attr("style", "width: 150px;border:0px;");
		$(".picker").hide();
	});
	// 点击编辑文本框可输入
	$("#userInfoEdit").click(function() {
		$("#form1").find("input[type='text']").each(function(index, Ele) {
			var $thisInput = $(this);
			$thisInput.attr("style", "width: 150px;");
		});
		$("#form1").write();
		$(".picker").show();
		$("#form1 input[type='radio']").removeAttr("disabled");
		$("#temptime").attr("readonly", "readonly");
	});
	$
			.get(
					"../../service/userRest/user/info/current",
					function(data) {
						data = data.data;
						$("#form1").loadData(workspace['user']);
						$("#ithzsInviteCode").html(
								workspace['user']['inviteCode']);
						$("#birthday").val(workspace['user']["birthday"]);
						// 手机号进行特殊处理
						$("#phone").html(
								data.mobilePhone.substring(0, 3)
										+ "******"
										+ data.mobilePhone.substring(9,
												data.mobilePhone.length));
						// 性别
						if (data.sex === 0) {
							$("#man").attr("checked", true);
							$("#woman").remove("checked");
							$("#woman").val(1);
						} else {
							$("#man").remove("checked");
							$("#man").val(0);
							$("#woman").attr("checked", true);
						}
						if (data.photo) {
							$("#headUserInfoImg").attr("src", data.photo)
						} else {
							if (data.sex == 0) {
								$("#headUserInfoImg").attr("src",
										"../../images/user/men.png");
							} else {
								$("#headUserInfoImg").attr("src",
										"../../images/user/women.png");
							}
						}

						$("#photo").val(data.photo)
						if (data.email == "") {
							$("#emailTd")
									.html(
											"<span style='color: red;padding-left:5px;'>无</span><a href='../../html/user/editPassword.html?returnUrl=..%2F..%2Fhtml%2Fuser%2FchangeMail.html' style='padding-left:20px;' class='colorBlue'>绑定邮箱</a>")
						} else {
							// 邮箱
							$("#spanEmail").html(
									data.email.substring(0, 2)
											+ "****"
											+ data.email.substring(data.email
													.indexOf("@"),
													data.email.length));
							$("#emailTd").append(" 已验证");
						}

					}, 'json');
	var formOne = true;
	var dressingForm = true;
	var addressUrlForm = true;
	// 保存form表单的信息
	$("#form1").change(function() {
		formOne = false;
	});
	// 保存着装表单的信息
	$("#dressingForm").change(function() {
		dressingForm = false;
	});
	var checkUserName=true;
	$("#userName").focus(function(){
		$("#userNameError").html("");
	});
	
	$("#userName").blur(function(){
		var oldUserName=workspace['user']['userName'];
		var newUserName=$(this).val();
		if(newUserName!=oldUserName){
			$.get("../../service/userRest/user/info/checkUserName",{userName:newUserName},function(data){
				if(data.success==1 || data.success==="1"){
					checkUserName=true;
					$("#userNameError").html("");
				}else{
					checkUserName=false;
					insertError("用户名已经存在", "alertWrap7","userNameError");
				}
			},'json')
		}else{
			checkUserName=true;
		}
	});
	
	
	
	// 获取个人着装信息
	$.get("../../service/dressRest/user/dress/dressing", function(dress) {
		showDress(dress);
	}, 'json');

	// 加载用户收货地址信息
	$.get("../../service/addressRest/user/address/findAddress", function(data) {
		showAddress(data);
	}, 'json');

	// 保存个人信息
	$("#saveUserinfo").click(function() {
						if(!checkUserName){
							$("#userNameError").focus();
							return;
						}
						var birthday = $("#birthday").val();
						var temptime = $("#temptime").val();
						var wechat = $("#wechat").val().trim();
						$("#birthday").val($("#temptime").val());
						var d = new Date();
						var month = d.getMonth();
						var date = d.getDate() + "";
						month = parseInt(month) + 1;
						month = month + "";
						if (month.length == 1) {
							month = "0" + month;
						}
						if (date.length == 1) {
							date = "0" + date;
						}
						d = d.getFullYear() + "-" + month + "-" + date;
						var startNum = parseInt($("#temptime").val().replace(
								/-/g, ''), 10);
						var endNum = parseInt(d.replace(/-/g, ''), 10);
						if (startNum > endNum) {
							insertError("日期超过今天了,请重新输入！~", "alertWrap7",
									"birthdayError");
							document.getElementById("temptime").focus();
							return;
						} else {
							insertError("", "alertWrap7", "birthdayError");
						}
						var postCode = $("#postCode").val().trim();
						if (isNaN(postCode)) {
							insertError("邮编只能是数字！~", "alertWrap7",
									"postCodeError");
							document.getElementById("temptime").focus();
							return;
						}
						if (postCode != "") {
							if (postCode.length != 6) {
								insertError("邮编只能为6位数字！~", "alertWrap7",
										"postCodeError");
								document.getElementById("temptime").focus();
								return;
							}
						}
						if (birthday != temptime) {
						} else if (formOne) {
							$("#form1").read();
							$("#form1").find("input[type='text']").each(
									function(index, Ele) {
										var $thisInput = $(this);
										$thisInput.attr("style",
												"width: 150px;border:0px;");
										$(".picker").hide();
									});
							$("#form1 input[type='radio']").attr("disabled",
									"disabled");
							return;
						}
						$("#postCodeError").html("");
						if ($('#form1').validate()) {
							var retWechat = /^[a-z_\d]+$/
							if (!retWechat.test(wechat)) {
								insertError("请输入正确的微信号！~", "alertWrap7",
										"wechatError");
								document.getElementById("wechat").focus();
								return false;
							}
							$
									.ajax({
										type : "POST",
										url : "../../service/userRest/user/info/updateUserInfo",
										data : $("#form1").serializeJSON(),
										async : false,
										dataType : "json",
										error : function(request) {
											formOne = true;
											$.MsgBox.Alert("温馨提示",
													"服务器去火星旅游了！~ 请联系运维君！~");
											$("#form1").read();
											$("#form1")
													.find("input[type='text']")
													.each(
															function(index, Ele) {
																var $thisInput = $(this);
																$thisInput
																		.attr(
																				"style",
																				"width: 150px;border:0px;");
																$(".picker")
																		.hide();
															});
											$("#form1 input[type='radio']")
													.attr("disabled",
															"disabled");
										},
										success : function(data) {
											formOne = true;
											if (data.isSuccess != 1
													|| data.isSuccess != '1') {
												$.MsgBox.Alert("温馨提示",
														"个人信息保存不成功,请检查原因！~~~");
											} else {
												$("#addBox").fadeIn("slow");
											}
											setTimeout($("#addBox").fadeOut(
													"slow"), 10000);
											$("#form1").read();
											$("#form1")
													.find("input[type='text']")
													.each(
															function(index, Ele) {
																var $thisInput = $(this);
																$thisInput
																		.attr(
																				"style",
																				"width: 150px;border:0px;");
																$(".picker")
																		.hide();
															});
											$("#form1 input[type='radio']")
													.attr("disabled",
															"disabled");
										}
									})
						}
					})
	// 保存着装信息
	$("#saveDressing").click(function() {
		var mostBrand = $("#mostBrand").val();
		var shirt = $("#shirt").html();
		var pants = $("#pants").html();
		var overcoat = $("#overcoat").html();
		if (mostBrand != "") {
			if (0 >= mostBrand.length || mostBrand.length >= 100) {
				$("#addDress").html("服装品牌最多限制100字!~~~");
				$("#addDress").show();
				return;
			}
		} else if (shirt != "") {
			if (0 >= shirt.length || shirt.length >= 250) {
				$("#addDress").html("衬衫字符0~500之间");
				$("#addDress").show();
				return;
			}
		} else if (pants != "") {
			if (0 >= pants.length || pants.length >= 250) {
				$("#addDress").html("裤子字符0~500之间");
				$("#addDress").show();
				return;
			}
		} else if (overcoat != "") {
			if (0 >= overcoat.length || overcoat.length >= 250) {
				$("#addDress").html("裤子字符0~500之间");
				$("#addDress").show();
				return;
			}
		}
		$("#addDress").hide();
		$("#addDress").html("恭喜你,保存成功!~~~");
		if (dressingForm) {
			/*
			 * $("#forDressing").find("input").each(function(index,Ele){ var
			 * $radio=$(Ele); $radio.attr("disabled","disabled"); });
			 */
			return;
		}
		dressingForm = true;
		$.ajax({
			type : "POST",
			url : "../../service/dressRest/user/dress/updateDressing",
			data : $("#dressingForm").serializeJSON(),
			async : false,
			dataType : "json",
			error : function(request) {
				$.MsgBox.Alert("温馨提示", "服务器去火星旅游了！~ 请联系运维君！~");
				/*
				 * $("#forDressing").find("input").each(function(index,Ele){ var
				 * $radio=$(Ele); $radio.attr("disabled","disabled"); });
				 */
			},
			success : function(data) {
				if (data.success != 1 || data.success != '1') {
					$.MsgBox.Alert("温馨提示", "着装信息修改不成功,请检查原因！~");
				} else {
					$("#addDress").fadeIn("slow");
				}
				setTimeout($("#addDress").fadeOut("slow"), 10000);
				/*
				 * $("#forDressing").find("input").each(function(index,Ele){ var
				 * $radio=$(Ele); $radio.attr("disabled","disabled"); });
				 */
			}
		})
	})
	// 显示收货地址
	$("#SaveAddress")
			.click(
					function() {
						if ($("#addressUrl").is(":hidden")) {
							$("#operate").html("");
							$("#addressUrl").find("input").val("");
							$("#userId").val(workspace['user']['userId']);
							initProvinces("selectpId", "selectcId", "province",
									"municipality", "addressUrl");
							$("#operate")
									.append(
											'<td height="50" colspan="6" align="center"><a href="javascript:saveAddress()" class="saveButton">保 存</a><a href="javascript:closeAddress()" class="cancleButton">取 消</a></td>');
							$("#selectpId .curSelect").html("省份");
							$("#selectcId .curSelect").html("市/区");
							jQuery("#selectc option").remove();
							jQuery("#selectc").append(
									"<option value=''>市/区</option>");
							$("#selectp").find("option[value='']").attr(
									"selected", true);
							$("#selectc").find("option[value='']").attr(
									"selected", true);
							$("#addressUrl").show();
							$(".alertWrapDiv").html("");
						} else {
							$("#addressUrl").hide();
						}
					})
});
// 修改用户收货地址
function updateAddress() {
	var postCode = $("#addressUrl").find("input[name='postcode']").val().trim();
	if (isNaN(postCode)) {
		insertError("邮编只能是数字！~", "alertWrap8", "postcodeBottomError");
		return false;
	}
	if (postCode != "") {
		if (postCode.length != 6) {
			insertError("邮编只能为6位数字！~", "alertWrap8", "postcodeBottomError");
			return false;
		}
	} else {
		$("#postcodeBottomError").html("");
	}
	if ($("#addressUrl").validate()) {
		$("#provinceName").val($("#selectp").find("option:selected").text());
		$("#municipalityName")
				.val($("#selectc").find("option:selected").text());
		$.ajax({
			type : "POST",
			url : "../../service/addressRest/user/address/updateAddress",
			data : $("#addressUrl").serializeJSON(),
			async : false,
			dataType : "json",
			error : function(request) {
				$.MsgBox.Alert("温馨提示", "服务器去火星旅游了！~ 请联系运维君！~");
			},
			success : function(data) {
				if (data.success == 1 || data.success === '1') {
					$.get("../../service/addressRest/user/address/findAddress",
							function(data) {
								$("#userAddressShow tr:gt(0)").html("");
								showAddress(data);
							}, 'json');
					$("#addressUrl").hide();
				} else {
					$.MsgBox.Alert("温馨提示", "用户地址保存失败,请稍后重试！~");
				}
			}
		})
	}
}

// 添加收货地址
function saveAddress() {
	var postCode = $("#addressUrl").find("input[name='postcode']").val().trim();
	if (isNaN(postCode)) {
		insertError("邮编只能是数字！~", "alertWrap8", "postcodeBottomError");
		return false;
	}
	if (postCode != "") {
		if (postCode.length != 6) {
			insertError("邮编只能为6位数字！~", "alertWrap8", "postcodeBottomError");
			return false;
		}
	} else {
		$("#postcodeBottomError").html("");
	}
	if ($("#addressUrl").validate()) {
		$("#provinceName").val($("#selectp").find("option:selected").text());
		$("#municipalityName")
				.val($("#selectc").find("option:selected").text());
		$.ajax({
			type : "POST",
			url : "../../service/addressRest/user/address/addAddress",
			data : $("#addressUrl").serializeJSON(),
			async : false,
			dataType : "json",
			error : function(request) {
				$.MsgBox.Alert("温馨提示", "服务器去火星旅游了！~ 请联系运维君！~");
			},
			success : function(data) {
				if (data.success == 1 || data.success === '1') {
					$.get("../../service/addressRest/user/address/findAddress",
							function(data) {
								$("#userAddressShow tr:gt(0)").html("");
								showAddress(data);
							}, 'json');
					$("#addressUrl").hide();
				} else {
					$.MsgBox.Alert("温馨提示", "用户地址添加失败,请稍后重试！~");
				}
			}
		})
	}
}

// 隐藏地址框框
function closeAddress() {
	$("#addressUrl").find("input").val("");
	$("#addressUrl").hide();
}
// 点击修改地址
function upAddress(i) {
	var addressId = $("#upAddress" + i + " input").val();
	$("#operate").html("");
	$("#addressUrl").find("input").val("");
	$("#userId").val(workspace['user']['userId']);
	$(".alertWrapDiv").html("");
	initProvinces("selectpId", "selectcId", "province", "municipality",
			"addressUrl");
	$("#operate")
			.append(
					'<td height="50" colspan="6" align="center"><a href="javascript:updateAddress()" class="saveButton">保存</a><a href="javascript:closeAddress()" class="cancleButton">取 消</a></td>');

	$.post("../../service/addressRest/user/address/findUserAddress", {
		addressId : addressId
	}, function(data) {
		jQuery("#selectc option").remove();
		jQuery("#selectc").append("<option value=''>市/区</option>");
		$("#addressUrl").loadData(data.data);
		$("#addressId").attr("name", "addressId");
		$("#addressId").val(data.data.addressId);
		$("#selectpId .curSelect").html(data.data.provinceName)
		$("#selectcId .curSelect").html(data.data.municipalityName)
		jQuery("#selectc").append(
				"<option value='" + data.data.municipality
						+ "' selected='selected'>" + data.data.municipalityName
						+ "</option>"); // 为Select追加一个Option(下拉项)
	}, 'json')
	$("#addressUrl").show();
}

// 上传图片
function uploadPhoto() {
	var t = $('#uploadPhotoPopup').popup({
		type : 'ajax',
		url : '../../html/user/userHeadUpload.html',
		width : 690,
		height : 580
	});
}
// 加载个人收货地址
function showAddress(data) {
	var addressObj = data.data.addressObj;
	if (addressObj == null) {
		$("#userAddressShow")
				.append(
						"<tr><td colspan='7' align='center'>&nbsp;你还没有任何地址哦,请点击右上角添加！~~~ </td></tr>");
		return false;
	}
	for (var i = 0; i < addressObj.length; i++) {
		if (i == 0) {
			if (addressObj[i].isDefault == 0) {
				$("#userAddressShow")
						.append(
								'<tr class="addTable" onMouseMove="showObjects(default'
										+ i
										+ ')"onMouseOut="hiddenObjects(default'
										+ i
										+ ')"><td align="center"></td><td>'
										+ addressObj[i].linkman
										+ '</td><td>'
										+ addressObj[i].provinceName
										+ ''
										+ addressObj[i].municipalityName
										+ '</td><td>'
										+ addressObj[i].particularAddress
										+ '</td><td>'
										+ addressObj[i].postcode
										+ '</td><td>'
										+ addressObj[i].contactNumber
										+ '</td><td><a href="javascript:upAddress('
										+ i
										+ ')" class="colorYellow" id="upAddress'
										+ i
										+ '">修改<input type="hidden" value="'
										+ addressObj[i].addressId
										+ '"/>  </a> | <a href="javascript:delAddress('
										+ i
										+ ')"class="colorRed" id="delAddress'
										+ i
										+ '">删除<input type="hidden" value="'
										+ addressObj[i].addressId
										+ '"/></a></td><td><a href="javascript:editorAddress('
										+ i
										+ ')" class="setDefaultButton" id="default'
										+ i
										+ '">设为默认<input type="hidden" value="'
										+ addressObj[i].addressId
										+ '"/></a></td></tr>');
			} else {
				$("#userAddressShow")
						.append(
								'<tr class="addTable"><td align="center"><img src="../../images/user/defaulticon.png" width="16" height="22"></td><td>'
										+ addressObj[i].linkman
										+ '</td><td>'
										+ addressObj[i].provinceName
										+ ''
										+ addressObj[i].municipalityName
										+ '</td><td>'
										+ addressObj[i].particularAddress
										+ '</td><td>'
										+ addressObj[i].postcode
										+ '</td><td>'
										+ addressObj[i].contactNumber
										+ '</td><td><a href="javascript:upAddress('
										+ i
										+ ')" class="colorYellow" id="upAddress'
										+ i
										+ '">修改<input type="hidden" value="'
										+ addressObj[i].addressId
										+ '"></a></td><td></td></tr>');
			}

		} else {
			$("#userAddressShow")
					.append(
							'<tr class="addTable" onMouseMove="showObjects(default'
									+ i
									+ ')"onMouseOut="hiddenObjects(default'
									+ i
									+ ')"><td align="center"></td><td>'
									+ addressObj[i].linkman
									+ '</td><td>'
									+ addressObj[i].provinceName
									+ ''
									+ addressObj[i].municipalityName
									+ '</td><td>'
									+ addressObj[i].particularAddress
									+ '</td><td>'
									+ addressObj[i].postcode
									+ '</td><td>'
									+ addressObj[i].contactNumber
									+ '</td><td><a href="javascript:upAddress('
									+ i
									+ ')" class="colorYellow" id="upAddress'
									+ i
									+ '">修改<input type="hidden" value="'
									+ addressObj[i].addressId
									+ '"/></a> | <a href="javascript:delAddress('
									+ i
									+ ')"class="colorRed" id="delAddress'
									+ i
									+ '">删除<input type="hidden" value="'
									+ addressObj[i].addressId
									+ '"/></a></td><td><a href="javascript:editorAddress('
									+ i
									+ ')" class="setDefaultButton" id="default'
									+ i + '">设为默认<input type="hidden" value="'
									+ addressObj[i].addressId
									+ '"/></a></td></tr>');
		}
	}
}

// 显示着装信息
function showDress(dress) {
	dress = dress.data;
	if (dress == null) {
		return;
	}
	$("#mostBrand").val(dress.mostBrand);
	$("#dressType"+dress.dressType).attr("checked",true);
	$("#dressStyle"+dress.dressStyle).attr("checked",true);
	var customization=dress.customization;
	customization=customization.split(",");
	for(var i=0;i<customization.length;i++){
		$("#customization"+customization[i]).attr("checked",true);
	}
	var favoriteColor=dress.favoriteColor;
	favoriteColor=favoriteColor.split(",");
	for(var i=0;i<favoriteColor.length;i++){
		$("#favoriteColor"+favoriteColor[i]).attr("checked",true);
	}
	$("#clothingQuality"+dress.clothingQuality).attr("checked",true);
	var myPreference=dress.myPreference;
	myPreference=myPreference.split(",");
	for(var i=0;i<myPreference.length;i++){
		$("#myPreference"+myPreference[i]).attr("checked",true);
	}
	var dressPrice=dress.dressPrice;
	$("#dressPrices").find("option[value='"+dressPrice+"']").attr("selected",true);
	switch (dressPrice) {
		case 1:
			$("#dressPrice .curSelect").html("1000以下");
			break;
		case 2:
			$("#dressPrice .curSelect").html("1000-3000");
			break;
		case 3:
			$("#dressPrice .curSelect").html("3000-5000");
			break;
		case 4:
			$("#dressPrice .curSelect").html("5000-10000");
			break;
		case 5:
			$("#dressPrice .curSelect").html("10000以上");
			break;
	}
	var madePays=dress.madePay;
	$("#madePays").find("option[value='"+madePays+"']").attr("selected",true);
	switch (madePays) {
	case 1:
		$("#madePay .curSelect").html("1000以下");
		break;
	case 2:
		$("#madePay .curSelect").html("1000-3000");
		break;
	case 3:
		$("#madePay .curSelect").html("3000-5000");
		break;
	case 4:
		$("#madePay .curSelect").html("5000-10000");
		break;
	case 5:
		$("#madePay .curSelect").html("10000以上");
		break;	
	}
	$("#shirtModels").find("option[value='"+dress.shirtModel+"']").attr("selected",true);
	$("#shirtModel .curSelect").html(dress.shirtModel);
	$("#pantsModels").find("option[value='"+dress.pantsModel+"']").attr("selected",true);
	$("#pantsModel .curSelect").html(dress.pantsModel);
	$("#overcoatModels").find("option[value='"+dress.overcoatModel+"']").attr("selected",true);
	$("#overcoatModel .curSelect").html(dress.overcoatModel);
	$("#shirt").html(dress.shirt);
	$("#pants").html(dress.pants);
	$("#overcoat").html(dress.overcoat);
}

// 删除用户收货地址
function delAddress(i) {
	var addressIdDel = $("#delAddress" + i + " input").val();
	var addressId = $("#addressId").val();
	if (addressId == addressIdDel) {
		$.MsgBox.Alert("温馨提示", "你正在修改当前地址,不能删除哦！~");
		return false;
	}
	$.MsgBox.Confirm("温馨提示", "你确定要删除吗?", function() {
		$.post("../../service/addressRest/user/address/deleteAddress", {
			addressId : addressIdDel
		}, function(data) {
			if (data.success == 1 || data.success === '1') {
				// 加载用户收货地址信息
				$("#userAddressShow tr:gt(0)").html("");
				$.get("../../service/addressRest/user/address/findAddress",
						function(data) {
							showAddress(data);
						}, 'json');
				$("#addressUrl").hide();
			} else {
				$.MsgBox.Alert("温馨提示", "删除失败了,请稍后重试！~");
			}
		}, 'json')
	});
}

// 设置默认收货地址
function editorAddress(i) {
	var addressId = $("#default" + i + " input").val();
	var userId = workspace['user']['userId'];
	$.post("../../service/addressRest/user/address/updateIsDefault", {
		addressId : addressId,
		userId : userId
	}, function(data) {
		if (data.success == 1 || data.success === '1') {
			// 加载用户收货地址信息
			$("#userAddressShow tr:gt(0)").html("");
			$.get("../../service/addressRest/user/address/findAddress",
					function(data) {
						showAddress(data);
					}, 'json');
		} else {
			$.MsgBox.Alert("温馨提示", "默认地址修改失败,请稍后重试！~");
		}
	}, 'json');

}