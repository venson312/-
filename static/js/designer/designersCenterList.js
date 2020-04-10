/* 
* @Author: Marte
* @Date:   2017-03-20 15:49:35
* @Last Modified by:   Marte
* @Last Modified time: 2017-05-26 11:12:16
*/

$(document).ready(function(){
    // 轮播效果
    
    $('.js_centerListTil ul li').on('click',function(){
        $(this).addClass('current').siblings('li').removeClass('current');
        var index = $(this).index() ;
        $('.js_centerListBigBox .js_centerListCont').eq(index).removeClass('displayNone').siblings('.js_centerListBigBox .js_centerListCont').addClass('displayNone');
        search();
    });
    $('.js_centerListCont ul').delegate('li','click',function(){
        $('.js_centerListCont ul li').removeClass('currentOn');
        $(this).addClass('currentOn');
        search();
    });
    $("#productCtn").delegate("li","click",function() {
    	var _this=$(this),productId = _this.data("id");
    	// 跳转
     	var newTab=window.open('about:blank');
    	ProductService.loadProduct(productId, function(product) {
			if(haveProductProperties(product).hasStyle) {
				newTab.location.href = "/html/goods/customersOrderIndex.html?id=" + product.productId;
			}else if(haveProductProperties(product).hasFabric) {
				newTab.location.href = "/html/goods/customersFabricIndex.html?id=" + product.productId;
			}else if(haveProductProperties(product).hasAccent) {
				newTab.location.href = "/html/goods/customersDetailIndex.html?id=" + product.productId;
			}else if(haveProductProperties(product).hasQuantity) {
				newTab.location.href = "/html/goods/customersMeasureIndex.html?id=" + product.productId;
			}else {
				newTab.location.href = "/html/goods/customersOrderBasic.html?id=" + product.productId;
			}
		});
    });
    loadDesigner();
    loadClothType();
    search();
});

function loadDesigner() {
	$.getJSON("/service/isStylist/page",{checkStatus:1},function(data) {
		if(data && data.rows) {
			$("#designerCtn").append($("#designerTmp").jqote(data.rows));
		}
		jQuery(".js_slideGroup .js_ithzsShow").slide({ 
	        mainCell:"ul",
	        vis:4,
	        prevCell:".js_ithzsShowPrev",
	        nextCell:".js_ithzsShowNext",
	        autoPage:true,
	        effect:"left",
	        pnLoop:"false"
	    });
	});
}
function renderClothesType(ctnId,data) {
	$('#'+ctnId).append($.jqote("<li data-id=<%=this.typeId%>><%=this.typeName%></li>",data));
}
function loadClothType() {
	
	$.get("/service/isStylist/clothType", null, function(data) {
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
function search() {
	$.getJSON("/service/product/designer/product",getCriteria(),function(data) {
		$("#productCtn").empty();
		$("#productCtn").append($("#productTmp").jqote(data));
	});
}
function getCriteria() {
	var category = $("#categoryCtn li.current").attr("id");
	if("all" == category) {
		var selectedCategory = $("#allCtn li.currentOn");
		if(selectedCategory.length < 1) {
			return null;
		}
		var categoryId = selectedCategory.data("id");
		return {classesId : categoryId};
	}else if("man" == category) {
		var selectedCategory = $("#manCtn li.currentOn");
		if(selectedCategory.length < 1) {
			return{classesId: $("#manCtn li").map(function() {
				return $(this).data("id");
			}).get().join(";")};
		}
		var categoryId = selectedCategory.data("id");
		return {classesId : categoryId};
	}else if("woman" == category) {
		var selectedCategory = $("#womanCtn li.currentOn");
		if(selectedCategory.length < 1) {
			return{classesId: $("#womanCtn li").map(function() {
				return $(this).data("id");
			}).get().join(";")};
		}
		var categoryId = selectedCategory.data("id");
		return {classesId : categoryId};
	}
}