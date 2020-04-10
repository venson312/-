$(function() {
	$('.js_personWorksTil ul li').on('click',function(){
		$(this).addClass('current').siblings('li').removeClass('current');
        var index = $(this).index() ;
        $('.js_personWorksBigBox .js_personWorksCont').eq(index).removeClass('displayNone').siblings('.js_personWorksBigBox .js_personWorksCont').addClass('displayNone');
        search(getCriteria());
    });
    $('.js_personWorksCont ul').delegate('li','click',function(){
    	$('.js_personWorksCont ul li').removeClass('currentOn');
        $(this).addClass('currentOn');
        search(getCriteria());
    });
    $("#productCtn").delegate("li","click",function() {
    	var _this=$(this),productId = _this.data("id");
    	// 跳转
     	var newTab=window.open('about:blank');
    	ProductService.loadProduct(productId, function(product) {
			if(haveProductProperties(product).hasStyle) {
				newTab.location.href= "/html/goods/customersOrderIndex.html?id=" + product.productId ;
			}else if(haveProductProperties(product).hasFabric) {
				newTab.location.href= "/html/goods/customersFabricIndex.html?id=" + product.productId;
			}else if(haveProductProperties(product).hasAccent) {
				newTab.location.href= location.href = "/html/goods/customersDetailIndex.html?id=" + product.productId;
			}else if(haveProductProperties(product).hasQuantity) {
				newTab.location.href= "/html/goods/customersMeasureIndex.html?id=" + product.productId;
			}else {
				newTab.location.href= "/html/goods/customersOrderBasic.html?id=" + product.productId;
			}
		});
    });
	loadDesigner();
	loadClothType();
	search({userId : getURLParam().id});
});
function loadDesigner() {
	var id = getURLParam().id;
	$.getJSON("/service/isStylist/page",{userId : id},function(data) {
		if(data && data.rows && data.rows.length>0) {
			var designer = data.rows[0];
			$("#designerName").text(designer.designerName);
			$("#producCount").text(designer.productCount);
			$("#goodField").text(designer.goodField);
			$("#personalIntroduction").text(designer.personalIntroduction);
			$("#headPortrait").attr("src",designer.headPortrait);
		}
	});
}
function renderClothesType(ctnId,data) {
	$('#'+ctnId).append($.jqote("<li data-id=<%=this.typeId%>><%=this.typeName%></li>",data));
}
function loadClothType() {
	
	$.get("/service/isStylist/clothType", {userId:getURLParam().id}, function(data) {
		if(data && data.code == 1) {
			var result = data.data,manType = result.man,womanType = result.woman;
			if(manType.length > 0) {
				$('#man').show();
				$('#manCtn').show();
				renderClothesType("manCtn",manType);
				renderClothesType("allCtn",manType);
			}else {
				$('#man').hide();
				$('#manCtn').hide();
			}
			if(womanType.length > 0) {
				$('#woman').show();
				$('#womanCtn').show();
				renderClothesType("womanCtn",womanType);
				renderClothesType("allCtn",womanType);
			}else {
				$('#woman').hide();
				$('#womanCtn').hide();
			}
		}
	}, "json");
}
function search(criteria) {
	$.getJSON("/service/product/designer/product",criteria,function(data) {
		$("#productCtn").empty();
		$("#productCtn").append($("#productTmp").jqote(data));
	});
}
function getCriteria() {
	var category = $("#categoryCtn li.current").attr("id");
	if("all" == category) {
		var selectedCategory = $("#allCtn li.currentOn");
		if(selectedCategory.length < 1) {
			return  {userId:getURLParam().id};
		}
		var categoryId = selectedCategory.data("id");
		return {classesId : categoryId,userId:getURLParam().id};
	}else if("man" == category) {
		var selectedCategory = $("#manCtn li.currentOn");
		if(selectedCategory.length < 1) {
			return{classesId: $("#manCtn li").map(function() {
				return $(this).data("id");
			}).get().join(";"),userId:getURLParam().id};
		}
		var categoryId = selectedCategory.data("id");
		return {classesId : categoryId,userId:getURLParam().id};
	}else if("woman" == category) {
		var selectedCategory = $("#womanCtn li.currentOn");
		if(selectedCategory.length < 1) {
			return{classesId: $("#womanCtn li").map(function() {
				return $(this).data("id");
			}).get().join(";"),userId:getURLParam().id};
		}
		var categoryId = selectedCategory.data("id");
		return {classesId : categoryId,userId:getURLParam().id};
	}
}