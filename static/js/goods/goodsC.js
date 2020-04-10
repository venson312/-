// JavaScript Document


$(function() {
	var urlParam = getURLParam(), brandId = urlParam.id;
	
	// 品牌商信息
	$.get("../../service/goodsRest/goods/findGoodsBrandDealer", {
		brandId : brandId
	}, function(data) {
		var brandDealer = data.brandDealer;
		$("#brandackGround").css("background-image","url("+brandDealer.backBanler+")")
		                    .css("background-size","auto 750px");
		$("#brandLogo").attr("src",brandDealer.brandLogo);
		$("#brandName").text(brandDealer.brandName);
		$("#simpleContext").text(brandDealer.simpleContext);
	}, "json");
	
	// 按类别分页
	$('#goodPager').kkpager({
		url : '/service/product/brand/product',
		pno : 1,
		pageSize : 20,
		mode : 'click',
		method:'get',
		beforeAjax : function() {
			this.params = getCriteria();
		},
		callback : function(data, pno) {
			if(data) {
				console.log(data);
				showGoodsList(data);
			}
		},
		getHref: function(n) {
			return '#pagerBody';
		}
	});
	$.get("/service/product/clothesType/" + brandId, null, function(data) {
		if(data && data.code == 1) {
			var result = data.data,manType = result.man,womanType = result.woman;
			if(manType) {
				$('#man').show();
				$('#manCtn').show();
				renderClothesType("manCtn",manType);
			}else {
				$('#man').hide();
				$('#manCtn').hide();
			}
			if(womanType) {
				$('#woman').show();
				$('#womanCtn').show();
				renderClothesType("womanCtn",womanType);
			}else {
				$('#woman').hide();
				$('#womanCtn').hide();
			}
		}
	}, "json");
	
	$('.js_listAllFilter>ul>li').live('click', function(e) {
		$(this).addClass("current").siblings().removeClass("current");
		var type = $(this).data('type');
		if(type == 'man') {
			$('#manCtn').show();
			$('#womanCtn').hide();
		}else if(type == 'woman') {
			$('#womanCtn').show();
			$('#manCtn').hide();
		}else if(type == 'all') {
			$('#manCtn').show();
			$('#womanCtn').show();
		}
		$("#manCtn li,#womanCtn li").removeClass("current");
		$('#goodPager').getKkpager().query();
	});

	$("#manCtn,#womanCtn").delegate("li","click",function() {
		var _this = $(this),ctn = _this.data("type");
		_this.addClass("current").siblings().removeClass("current");
		if('manCtn' == ctn) {
			$('#man').addClass('current').siblings().removeClass('current');
			$("#womanCtn li").removeClass("current");
		}else if('womanCtn'==ctn) {
			$('#woman').addClass('current').siblings().removeClass('current');
			$("#manCtn li").removeClass("current");
		}
		$('#goodPager').getKkpager().query();
	});
	
});


// 显示商品列表
function showGoodsList(data) {
	$("#pagerBody").html("");
	$.each(data,function() {
		if(haveProductProperties(this).hasStyle) {
			this.url = "/html/goods/customersOrderIndex.html?id=" + this.productId;
		}else if(haveProductProperties(this).hasFabric) {
			this.url = "/html/goods/customersOrderIndex.html?id=" + this.productId;
		}else if(haveProductProperties(this).hasAccent) {
			this.url = "/html/goods/customersOrderIndex.html?id=" + this.productId;
		}else if(haveProductProperties(this).hasQuantity) {
			this.url = "/html/goods/customersMeasureIndex.html?id=" + this.productId;
		}else {
			this.url = "/html/goods/customersOrderBasic.html?id=" + this.productId;
		}
	});
	$("#pagerBody").append($("#listTmp").jqote(data));
}
function renderClothesType(ctnId,data) {
	$('#'+ctnId).empty();
	$('#'+ctnId).append($.jqote("<li data-id=<%=this.classesId%> data-type='"+ctnId+"'><%=this.typeName%></li>",data));
}
function getCriteria() {
	var brandId = getURLParam().id,classesId = null,
		type = $('.js_listAllFilter>ul>li.current').data('type');
	if(type == 'all') {
		classesId = null;
	}else if(type == 'man') {
		classesId = $("#manCtn li.current").data('id');
		if(!classesId) {
			classesId = $("#manCtn li").map(function() {
				return $(this).data('id');
			}).get().join(';');
		}
	}else if(type == 'woman') {
		classesId = $("#womanCtn li.current").data('id');
		if(!classesId) {
			classesId = $("#womanCtn li").map(function() {
				return $(this).data('id');

			}).get().join(';');
		}
	}
	return {
		brandId : brandId,
		classesId : classesId
	};
}