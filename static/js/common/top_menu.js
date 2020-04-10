workspace={}
$(function(){
	$.ajax('../../service/userRest/user/info/current?' + Math.random(),{
		success:function(data){
			if(data.isSuccess === 1){
				var user = data.data;
				$('#topFlag').html('邀请好友多送50元抵用金');
				workspace['user'] = user;
				if(user['isAgency'] || user['isMaterial'] || user['isBrand'] || user['isFactory'] || user['isShop']){
					$('#naviBackBlue li.noline').show();
				}
				$('#current_user_center').text(user.nickName || user.userName || user.mobilePhone).attr('href', '../../html/user/userIndex.html?' + Math.random()).attr('title', '个人中心');
				$('#current_user_register').text("退出").attr('href', 'javascript:void(0)').attr('title', '退出').click(logout);
				$('#businessUl a').click(function(){
					var flag = true;
					var bo = {};
					$.ajax('../../service/common/validateStatus/' + $(this).attr('_type'),{
						dataType:'json',
						async:false,
						success:function(_data){
							if (_data.bo) bo = _data.bo;
							flag = _data['success'];
							workspace['user'][_data['type']] = _data['id'];
						}
					});
					if(!flag){
						//$.MsgBox.Alert('提示', '您不是' + $(this).text() + "");
						$.MsgBox.Confirm("温馨提示","您不是" + $(this).text() + ",是否现在入驻" + $(this).text() + "？",function(){
							window.location.href = "../../html/business/index.html";
						});
						return false;
					}
					
					if (bo && bo.checkStatus != 1) {
						$.MsgBox.Alert('提示', "您的" + $(this).text() + "申请" + (bo.checkStatus == 0 ? '审核中' : '审核未通过') + "，请联系客服");
						return false;
					}

					if (bo && bo.isActive == 1) {
						$.MsgBox.Alert('提示', "您的" + $(this).text() + "角色已停用，请联系客服");
						return false;
					}
					
					
					
				});
			}else{
				// 表示点击跳转
				$('#service').click(function(){
					window.location.href="../../html/login/login.html";
				})
				$('#businessUl').hide();
			}
		},
		dataType:'json',
		async:false
	});
	if($("#current_user_center").html()!="请登录"){

		$("#favoriteIthzs").hover(function(){
			showGoodsOne();
		});
		
		//购物车展示
		$("#cartOrders").hover(function(){
			showOrders();
		});
	}
});

function delFavorteGoods(favoriteId){
	$.MsgBox.Confirm("温馨提示","你是否删除呢?",function(data){
		$.get("../../service/goodsRest/goods/ithzs/delFavorite",{"favoriteId":favoriteId},function(data){
			if(data.success==-1){
				$.MsgBox.Alert("温馨提示", "删除失败,请联系客服处理！~~~");
			}else{
				showGoodsOne();
				initFavorite();
			}
		});
	});
}
function showGoodsOne(){
	$.get("../../service/goodsRest/goods/ithzs/findMyFavoriteGoodsList",{"isSelling":0,"pno":1,"pageSize":3},function(data){
		var goods=data.rows;
		$("#ithzsFavoriteGoodsone").html("");
		for(var i=0;i<goods.length;i++){
			$("#ithzsFavoriteGoodsone").append("<li><div><a href='../../html/goods/showProductDetail.html?"+goods[i].goodsId+"' title=''><img src='"+goods[i].goodsPictureOne+"' width='40' height='40'></a> <a href='../../html/goods/showProductDetail.html?"+goods[i].goodsId+"' class='linkText'>"+goods[i].goodsName+"</a> <a href='../../html/goods/showProductDetail.html?"+goods[i].goodsId+"' class='priceText colorRed'>￥"+goods[i].customPrice+" </a> <a href='javascript:void(0)' class='linkText'>&nbsp;</a> <a href='javascript:void(0)' class='priceText colorGray'  onmouseover='mouseOver(this)' onmouseout='mouseOut(this)' onclick='delFavorteGoods(\""+goods[i].favoriteId+"\")'>删除 </a></div></li>");
		}
		if(goods.length>0){
			$("#ithzsFavoriteGoodsone").append("<li><a href='../../html/user/myFavoriteProduct.html?1' class='floatRight menuMore moveOn'>查看更多>&nbsp;</a></li>");
		}
	},"json");
	
}

function mouseOver(thisDom){
	$(thisDom).attr("style","color:red");
}
function mouseOut(thisDom){
	$(thisDom).removeAttr("style","color:red");
}

//删除购物车订单信息
function delOrder(detailId) {
	$.MsgBox
			.Confirm(
					"温馨提示",
					"你确定要删除吗?",
					function() {
						$
								.post(
										"../../service/shoppingCartRest/shoppingCartService/deleteGoodOrder",
										{
											detailId : detailId
										}, function(data) {
											if (data.success == 1
													|| data.success === '1') {
												
											} else {
												alert("删除不成功,请联系管理员");
											}
										}, 'json')
					});

}



//首页购物车数据展示
function showOrders(){
	$.get("../../service/shoppingCartRest/shoppingCartService/findOrders",null,function(data){
		$("#cartOrder").html("");
		if(data==""||data==null){
			return;
		}
		for(var i=0;i<3;i++){
			$("#cartOrder").append("<li><div><a href='../../html/goods/showProductDetail.html?"+data[i].goodsId+"' title=''><img src='"+data[i].goodsPicture1+"' width='40' height='40'></a> <a href='../../html/goods/showProductDetail.html?"+data[i].goodsId+"' class='linkText'>"+data[i].goodsName+"</a> <a href='../../html/goods/showProductDetail.html?"+data[i].goodsId+"' class='priceText colorRed'>￥"+data[i].customPrice+" </a> <a href='javascript:void(0)' class='linkText'>&nbsp;</a> <a href='javascript:void(0)' class='priceText colorGray' onclick='delOrder(\""+data[i].detailId+"\")'  onmouseover='mouseOver(this)' onmouseout='mouseOut(this)'>删除 </a></div></li>");
		}
		if(i>=3){
			$("#cartOrder").append("<li><a href='../../html/user/cart.html' class='floatRight menuMore moveOn'>查看更多>&nbsp;</a></li>");
		}
	},"json"
);
}
function logout(){
	var href=window.location.href;
	if(href.indexOf("macth")==-1){
		$.cookie('COOKIE_LOGIN_USERNAME', '', { expires: -1 });
		$.cookie('COOKIE_LOGIN_PASSWORD', '', { expires: -1 });
	}
	$.get('../../service/userRest/user/info/logout?' + Math.random());
	console.log(href);
	window.location.href = "../../html/login/login.html"
}
