/* 
* @Author: Marte
* @Date:   2016-12-13 18:52:47
* @Last Modified by:   Marte
* @Last Modified time: 2017-05-26 11:21:29
*/

$(function(){
	Controller.initPage();
	Controller.clickCriteria();
    Controller.clickTopCategory();
	Controller.initPaging();
	Controller.clickProduct();
});
var ViewHelper = (function() {
	
	function ViewHelper() {}
	
	ViewHelper.renderCategory = function(categories) {
		$("#categoryContainer").empty();
		$("#categoryContainer").append($("#categoryTmp").jqote(categories));
	};
	ViewHelper.renderBrand = function(brands) {
		$("#brandContainer").empty();
		$("#brandContainer").append($("#brandTmp").jqote(brands));
	};
	ViewHelper.renderProductList = function(products) {
		$("#productContainer").empty();
		if(products && products.length > 0) {
			$("#productContainer").append($("#productTmp").jqote(products));
		}
	};
	return ViewHelper;
}());
var Controller = (function() {
	
	function Controller() {}
	
	Controller.initPage = function() {
		// 导航部分
	    var oNaviBackBlue = $('.js_choiceStyleList');
	    $(window).on('scroll',function(){
	        if($(window).scrollTop()>156){
	            oNaviBackBlue.addClass('choiceFixed');
	        }else{
	            oNaviBackBlue.removeClass('choiceFixed');
	        }
	    });
	    var param = getURLParam(),
	    	clothesTypeId = param.id ? param.id : $("#topCategoryContainer li:first").attr('id');
	    
    	$('#' + clothesTypeId).addClass('current').siblings('li').removeClass('current');
    	changeTopCategroy(clothesTypeId);
    	
	};
	function changeTopCategroy(clothesTypeId) {
		ProductService.loadClothesTypeChildren(clothesTypeId,ViewHelper.renderCategory);
    	ProductService.loadBrands(clothesTypeId,ViewHelper.renderBrand);
	}
	Controller.clickCriteria = function() {
		$(".js_choiceCondiSpan").delegate("span", "click", function() {
			if( $(this).hasClass('current') ){
	            $(this).removeClass('current');
	        }else{
	            $(this).addClass('current').siblings('span').removeClass('current');
	        }
			$('#pageBox').getKkpager().query();
		});
	};
	function getCriteria() {
		var topCategory = $("#topCategoryContainer li.current").attr("id"),
			secondCategory = $("#categoryContainer span.current").data("id"),
			brand = $("#brandContainer span.current").data("id"),
			price = $("#priceRangeContainer span.current").data("price"),
			classesId = [];
		if(secondCategory) {
			classesId = secondCategory;
		}else if(topCategory) {
			var temp = ProductService.synloadClothesTypeChildren(topCategory);
			if(temp) {
				$.each(temp,function() {
					classesId.push(this.typeId);
				});
				classesId = classesId.join("-");
			}
		}else {
				classesId = Controller.allClothesTypeIds;
		}
		return {
			userId : brand,
			priceRange : price,
			classesId : classesId,
			state : 1
		};
	}
	Controller.clickTopCategory = function() {
		$('.js_choiceStyleList ul li').on('click',function(){
			var _this = $(this);
			_this.addClass('current').siblings('li').removeClass('current');
			changeTopCategroy(_this.attr('id'));
			$('#pageBox').getKkpager().query();
	    });
	};
	Controller.initPaging= function() {
		$('#pageBox')
		.kkpager(
				{
					url : '/service/product/page',
					pno : 1,
					pageSize : 12,
					mode : 'click',
					method: 'get',
					beforeAjax:function(){
						this.params = this.params ? this.params : {};
						this.params = getCriteria();
					},
					callback : function(data, pno) {
							ViewHelper.renderProductList(data);
					}
				});
	};
	Controller.clickProduct = function() {
		$("#productContainer").delegate("li", "click", function() {
			var _this = $(this),productId = _this.data("id");
    		// 跳转
     		var newTab=window.open('about:blank');
			ProductService.loadProduct(productId, function(product) {
				if(haveProductProperties(product).hasStyle) {
					newTab.location.href = "/html/goods/customersOrderIndex.html?id=" + product.productId;
				}else if(haveProductProperties(product).hasFabric) {
					newTab.location.href = "/html/goods/customersOrderIndex.html?id=" + product.productId;
				}else if(haveProductProperties(product).hasAccent) {
					newTab.location.href = "/html/goods/customersOrderIndex.html?id=" + product.productId;
				}else if(haveProductProperties(product).hasQuantity) {
					newTab.location.href = "/html/goods/customersMeasureIndex.html?id=" + product.productId;
				}else {
					newTab.location.href = "/html/goods/customersOrderBasic.html?id=" + product.productId;
				}
			});
		});
	};
	return Controller;
}());