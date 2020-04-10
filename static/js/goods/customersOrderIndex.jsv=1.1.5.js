/* 
* @Author: Marte
* @Date:   2017-03-14 13:38:36
* @Last Modified by:   Marte
* @Last Modified time: 2017-08-09 14:24:48
*/

$(function(){


	// 当前用户信息
	window.__user = getLoginUser();

	if(window.__user !=null){
		var mark=isShopStop();
		if(mark){
			window.location.href = '/html/goods/customShopOrderIndexFit.html?id=' + getURLParam()['id'];
		}
	}
          var oOptionsLi = $('#fibri_options .options_list li');
            oOptionsLi.on('click', function() {
                $(this).children('.js_fibrioptions_L').addClass('current');
                $(this).siblings('li').children('.js_fibrioptions_L').removeClass('current');
                $('#fibri_options').addClass('min');
                var index = $(this).index();

                $('#fabribox_optsBox .js_fabriOrders_opts:eq(' + index + ')').removeClass('active').siblings('#fabribox_optsBox .js_fabriOrders_opts').addClass('active');
            });

          Controller.initPage(getURLParam().id);
          Controller.changeFabricCriteria();
          Controller.chooseFabric();
          Controller.showDetail();
          Controller.searchFabric();
          Controller.clickStyleItem();
          Controller.clickStyleItemOptions();
          Controller.clickBackArrow();
          Controller.clickAccentItem();
          Controller.clickAccentBackArrow();
          Controller.clickAccentOptions();
          Controller.inputAccentContent();
          Controller.clickNextBtn();
          Controller.changeImage();   
       
});
var ViewHelper = (function() {
	  
	  function ViewHelper() {}
	  
	  function renderFabric(product) {
		  
		  var 	defaultFabric = product.defaultFabric,
		  		recommendFabric = product.recommendFabric,
		  		choosableFabric = product.choosableFabric,
		  		allFabrics = [];
		  
		  if(defaultFabric) {
			  allFabrics = allFabrics.concat(defaultFabric);
		  }
		  if(recommendFabric && recommendFabric.length > 0) {
			  $.each(recommendFabric, function() {
				  var outId = this.fabricId,flag = false;
				  $.each(allFabrics,function() {
					  if(this.fabricId == outId ) {
						  flag = true;
						  return;
					  }
				  });
				  if(!flag) {
					  allFabrics.push(this); 
				  }
			  });
		  }
		  if(choosableFabric && choosableFabric.length > 0) {
			  $.each(choosableFabric, function() {
				  var outId = this.fabricId,flag = false;
				  $.each(allFabrics,function() {
					  if(this.fabricId == outId ) {
						  flag = true;
						  return;
					  }
				  });
				  if(!flag) {
					  allFabrics.push(this); 
				  }
			  });
		  }
		  if(recommendFabric) {
			  $.each(recommendFabric, function() {
				  this.agentFabricPrice = product.fabricProductPrice[this.fabricId];
			  });
		  }
		  $.each(allFabrics, function() {
			  this.agentFabricPrice = product.fabricProductPrice[this.fabricId];
		  });
		  allFabrics.sort(function(fabric1,fabric2) {
			  return fabric1.agentFabricPrice - fabric2.agentFabricPrice;
		  });
		  ViewHelper.allFabrics = allFabrics;
		  renderRecommendFabric(recommendFabric);
		  renderPriceFabric(allFabrics);
		  renderBrandFabric(allFabrics);
		  renderMaterialFabric(allFabrics);
		  
		  if(product.productMultiplePrice !="" && product.productMultiplePrice !=null && product.productMultiplePrice != undefined){
			  for (var i = 0; i < product.productMultiplePrice.length; i++) {
				  if(product.productMultiplePrice[i].price1 !="" && product.productMultiplePrice[i].price1 !=null && product.productMultiplePrice[i].price1 !=undefined){
					  	$("li[data-id="+product.productMultiplePrice[i].fabricId+"]").attr("data-price",product.productMultiplePrice[i].price1);
						$("span[data-id="+product.productMultiplePrice[i].fabricId+"]").text(product.productMultiplePrice[i].price1);
				  }
				
			  }
		  }
	  }
	  function renderRecommendFabric(recommends) {
		  if(!recommends) return;
		  $("#recommendFabrics").append($("#fabricTmp").jqote(recommends));
	  }
	  function renderPriceFabric(priceFabric) {
		  if(!priceFabric) return;
		  $("#priceFabrics").append($("#fabricTmp").jqote(priceFabric));
	  }
	  function renderBrandFabric(brandFabric) {
		  if(!brandFabric) return;
		  $("#brandsContainer").append($("#fabricContainerTmp").jqote(groupFabric(brandFabric, 'fabricBrand')));
	  }
	  function renderMaterialFabric(materialFabric) {
		  $("#materialContainer>div").empty();
		  if(!materialFabric) return;
		  $("#materialContainer>div").append($("#fabricContainerTmp").jqote(groupFabric(materialFabric, 'fabricMaterialStr')));
	  }
	  function groupFabric(fabrics, groupProp) {
		  
		  var groups = [],value = {},result = [];
		  
		  $.each(fabrics,function(i, v) {
			  if($.inArray(v[groupProp],groups) == -1) {
				  groups.push(v[groupProp]);
				  value[v[groupProp]] = [v];
			  }else {
				  value[v[groupProp]].push(v);
			  }
		  });
		  
		  for(var p in value) {
			  result.push(value[p]);
		  }
		  return {items:groups,'value':result};
	  }
	  function renderStyle(style, styleItemOptions) {
		  $("#styleItemContainer").append($("#styleItemTmp").jqote(style.items));
		  $("#box_optsBox").append($("#styleItemOptionsTmp").jqote(style.items));
		  
		  $.each(styleItemOptions,function(index,value) {
			  $("#"+value).addClass("current");
		  });
	  }
	  function renderAccent(accents) {
		  renderAccentItem(accents);
		  renderAccentOptions(accents);
	  }
	  function renderAccentItem(accents) {
		  $("#accentContainer").append($("#accentTmp").jqote(accents));
	  }
	  function renderAccentOptions(accents) {
		  $.each(accents, function(i,v){
			 if(v.type == 0) {
				 $("#accentbox_optsBox").append($("#singleAccentTmp").jqote(v));
			 }else {
				 $("#accentbox_optsBox").append($("#multiAccentTmp").jqote(v));
			 }
		  });
	  }
	  ViewHelper.renderProduct = function(product) {
		  
		  ViewHelper.product = product;
		  $("#productName2").text(product.name);
		  
		  var orderString = sessionStorage.getItem('order');
		  ViewHelper.order = orderString ? JSON.parse(orderString): {};
		  ViewHelper.order[product.productId] = {};
		  ViewHelper.clothesUpdataListSty;
		  renderFabric(product);
		  $("#firstProductPic").attr("src",product.picture1);
		  $("#pictures").append($("#pictureTmp").jqote(product));
		  $("#period").text(product.period);
		  $("#productName").text(product.name);
		  if(product.defaultId) {
			  $("#productPrice").text(product.fabricProductPrice[product.defaultId]);
		  }else {
			  $("#productPrice").text(product.snackPrice);
		  }
		  ProductService.loadBrandDealer(product.userId,function(data) {
			  $("#brandDealerLogo").attr("src", data.brandLogo);
			  $("#brandDealerName").text(data.brandName);
		  });
		  if(product.styleId) {
			  ProductService.loadStyle(product.styleId,function(data){
				  renderStyle(data,product.styleItemOptionId.split(","));
			  });
		  }
		  if(product.accentId) {
			  ProductService.loadMultiAccents(product.accentId.split(","), renderAccent);
		  }
		  if(product.productDetails) {
			  $("#productDetails").show();
			  $("#productDetailContainer").append(product.productDetails);
			  $("#serveStatementContainer").hide();
		  }else {
			  $("#productDetails").hide();
			  $("#productDetailContainer").hide();
		  }
		  if(product.serveStatementId) {
			  $("#serveStatement").show();
			  ProductService.loadCustomContent(product.serveStatementId, function(data) {
				  $("#serveStatementContainer").append(data.content);
			  });
		  }else {
			  $("#serveStatement").hide();
			  $("#serveStatementContainer").hide();
		  }
		  
		  
	  };
	  
	  ViewHelper.renderMaterialFabric = renderMaterialFabric;
	  return ViewHelper;
  })();
var Controller = (function() {
	  
	  function Controller() {}
	  
	  Controller.clickDetailsStatement = function() {
		  $("#productDetails,#serveStatement").click(function() {
			  if($(this).attr("id") == "productDetails") {
				  $("#productDetailContainer").show();
				  $("#serveStatementContainer").hide();
			  }else {
				  $("#productDetailContainer").hide();
				  $("#serveStatementContainer").show();
			  }
		  });
	  };
	  Controller.changeImage = function() {
		  $("#pictures").delegate("li", "mouseover", function() {
			  $(this).addClass('current').siblings('li').removeClass('current');
            var src = $(this).children('img').attr("src");
            $(".js_orderIndexPic img").attr("src",src);
		  });
	  };
	  Controller.changeFabricCriteria = function() {
		  $("#brandsContainer,#materialContainer").delegate("span", "click", function() {
			  var _this = $(this),index = $(this).index();
			  _this.addClass('current').siblings('span').removeClass('current');
			  _this.parent().siblings('div').find('ul:eq(' + index +')').css("display","block").siblings("ul").css("display","none");
		  });
	  };
	  Controller.chooseFabric = function() {
		  $("#fabribox_optsBox").delegate("li", "click", function() {
			  $("#fabribox_optsBox li").removeClass('current');
	          $(this).addClass('current');
	          var price = $(this).data('price');
	          accentContent = getAccentContent();
	          ViewHelper.product.snackPrice =price;
	          $("#productPrice").text(Number(price+accentContent.totalPrice));
	          $("#productPriceCheck2").val(price);
	          
	          $("#productDefaultFabric").show();
	          $("#productDefaultFabric img").attr('src',$(this).data('img'));
	          $("#productDefaultFabric img").data('id',$(this).data('id'));
		  });
	  };
	  Controller.chooseMenu = function() {
		  var oOptionsLi = $('#fibri_options .options_list li');
		    oOptionsLi.on('click', function() {
		        $(this).children('.js_fibrioptions_L').addClass('current');
		        $(this).siblings('li').children('.js_fibrioptions_L').removeClass('current');
		        $('#fibri_options').addClass('min');
		        var index = $(this).index();

		        $('#fabribox_optsBox .js_fabriOrders_opts:eq(' + index + ')').removeClass('active').siblings('#fabribox_optsBox .js_fabriOrders_opts').addClass('active');
		    });
	  };
	  
	  function getSelectedFabric() {
		  return $("#fabribox_optsBox li.current").data("id");
	  }
	  
	  Controller.clickNextBtn = function() {
			$("#nextBtn").click(function() {
				nextAction();
			});  
	  };

	  function getSelectedStyleOptions() {
		  var style = {};
		  $("#box_optsBox ul li.current").each(function() {
			  var _this = $(this),
			  	  styleName = _this.data("styleItemName"),
			  	  styleValue = _this.data("optionName");
			  style[styleName] = styleValue;
		  });
		  return style;
	  }
	  
	  //用于返回修改
	  function getSelectedStyleOptionsUpdata() {
		  var style = {};
		  $("#box_optsBox ul li.current").each(function() {
			  var _this = $(this),
			  	  styleName = _this.data("styleItemName"),
			  	  styleValue = _this.data("optionId");
			  style[styleName] = styleValue;
		  });
		  return style;
	  }
	  
	  function getAccentContentUpdata() {
		  var accent = {};
		  $("#accentbox_optsBox div[data-type=singleAccent] ul li.current").each(function() {
			  var _this = $(this),
			  accentName = _this.data("name"),
			  accentValue = _this.data("id");
			  accent[accentName] = accentValue;
		  });
		  $("#accentbox_optsBox div[data-type=multiAccent] input").each(function() {
			  var _this = $(this),
			  accentName = _this.data("name"),
			  accentItemId = _this.data("itemId"),
			  accentItemValue = _this.val();
			  if(accentItemValue) {
				  if(accent[accentName]) {
					  accent[accentName][accentItemId] = accentItemValue;
				  }else {
					  accent[accentName] = {};
					  accent[accentName][accentItemId] = accentItemValue;
				  }
			  }
		  });
		  $("#accentbox_optsBox div[data-type=multiAccent] ul li.current").each(function() {
			  var _this = $(this),
			  accentName = _this.data("name"),
			  accentItemName = _this.data("itemName"),
			  accentItemValue = _this.data("id");
			  if(accent[accentName]) {
				  accent[accentName][accentItemName] = accentItemValue;
			  }else {
				  accent[accentName] = {};
				  accent[accentName][accentItemName] = accentItemValue;
			  }
		  });
		  return accent;
	  }
	  function nextAction() {


	 	if(isLogin()) {
	 		var mark=isShopStop();
			if(mark){
				window.location.href = '/html/goods/customShopOrderIndexFit.html?id=' + getURLParam()['id'];
			}else{
		 		$('#smallLoginPage').hide();
			  	var product = ViewHelper.product,
				selectedFabric = getSelectedFabric(),
				selectedStyles = getSelectedStyleOptions(),
				accentContent = getAccentContent(),
				order = ViewHelper.order[product.productId];
				
			  	order["面料"] = selectedFabric ? selectedFabric : product.defaultId;
			  	
			  	
				if(!order["面料"] && (product.defaultId || product.choosableId)) {
					$.MsgBox.Alert('温馨提示', "请选择面料！");
					return;
				}
				order["款式"] = selectedStyles;
				order["细节"] = accentContent;
				var  productPriceCheck2=Number($("#productPriceCheck2").val());
				if(productPriceCheck2 > 0){
					order["价格"] = Number(order["细节"].totalPrice+productPriceCheck2);
				}else{
					order["价格"] =Number($("#productPrice").text());
				}
				//console.log(order);
				order["款式修改保留"]=getSelectedStyleOptionsUpdata();
				order["细节修改保留"]=getAccentContentUpdata();
				
				var clothesUpdataListSty =ViewHelper.clothesUpdataListSty ? ViewHelper.clothesUpdataListSty : '';
				if(clothesUpdataListSty){
					order["成衣数据修改保留"]=clothesUpdataListSty;
				}
				sessionStorage.setItem('order', JSON.stringify(ViewHelper.order));
				if(product.standardSize || product.sizeId1) {
					location.href = "/html/goods/customersMeasureIndex.html?id=" + product.productId;
				}else {
					location.href = "/html/goods/customersOrderBasic.html?id=" + product.productId;
				}
			}
		 }else{
			$('#smallLoginPage').show()
		 }
	  }
	  function renderFabric(fabricId) {
		  ProductService.loadFabric(fabricId,function(fabric) {
			  
			  $('#fabricBigImg').attr('src', fabric.fabricImage1);
			  $('#fabricImages').append($('imgTmp').jqote(fabric));
			  $('#fabricName').text(fabric.fabricName);
			  $('#fabricNum').text(fabric.fabricNumber);
			  $('#fabricBrand').text(fabric.fabricBrand);
			  $('#fabricMaterial').text(fabric.fabricMaterialStr);
			  $('#fabricArea').text(fabric.fabricArea);
			  $('#fabricText').text(fabric.fabricText);
			  
			  $('.js_fabricDetailCont').css({'display':'block'});
		  });
	  }
	  Controller.showDetail = function() {
		  $('#fabribox_optsBox').delegate('ul li div.js_particularsBoxC','click',function(event) {
			    	renderFabric($(this).data('id'));
			    	$('.js_fabricDetailCont').css({'display':'block'});
			    	$('.js_closeFabricCont').on('click',function(){
	                    $(this).parents('.js_fabricDetailCont').css({'display':'none'});
	                });
		  });
	  };
	  Controller.initPage = function(productId) {
		  ProductService.loadProduct(productId, ViewHelper.renderProduct); 
	  };
	  Controller.searchFabric = function() {
		  $('.searchFabricBtn').click(function() {
			  var fabricNum = $("#fabricNumSearch").val(),allFabric = ViewHelper.allFabrics,showFabric = [];
			  if(!fabricNum) {
				  showFabric = allFabric;
			  }else {
				  $.each(allFabric,function() {
					  if(this.fabricNumber == fabricNum) {
						  showFabric.push(this);
					  } 
				  });
			  }
			  ViewHelper.renderMaterialFabric(showFabric);
		  });
	  };
	  Controller.clickStyleItem = function() {
		  $("#styleItemContainer").delegate("li", "click", function() {
			  	$(this).children('.js_options_L').addClass('current');
		        $(this).siblings('li').children('.js_options_L').removeClass('current');
		        $('#container_options').addClass('min');
		        var index = $(this).index();
	
		        $('#box_optsBox .js_box_opts:eq(' + index + ')').addClass('active').siblings('#box_optsBox .js_box_opts').removeClass('active');
		        $('#accentbox_optsBox .js_box_opts').removeClass('active');
		  });

	  };
	  Controller.clickStyleItemOptions = function() {
		  $("#box_optsBox").delegate("li", "click", function() {
			  $(this).addClass('current');
			  $(this).siblings().removeClass("current");
		  });
	  };
	  Controller.clickBackArrow = function() {
		  $("#box_optsBox").delegate(".js_getBackBtn", "click", function() {
			  $(this).parents('.js_box_opts').removeClass('active');
		      $('#container_options').removeClass('min');
		  });
	  };
	  Controller.clickAccentItem = function() {
		  $("#accentContainer").delegate("li", "click", function() {
			  $(this).children('.js_options_L').addClass('current');
		        $(this).siblings('li').children('.js_options_L').removeClass('current');
		        $('#container_options').addClass('min');
		        var index = $(this).index();
		        $('#accentbox_optsBox .js_box_opts:eq(' + index + ')').addClass('active').siblings('#accentbox_optsBox .js_box_opts').removeClass('active');
		        $('#box_optsBox .js_box_opts').removeClass('active');
		  });
	  };
	  Controller.clickAccentBackArrow = function() {
		  $("#accentbox_optsBox").delegate(".js_getBackBtn", "click", function() {
			  $(this).parents('.js_box_opts').removeClass('active');
		      $('#container_options').removeClass('min');
		  });
	  };
	  function getAccentContent() {
		  var accent = {},price = 0;
		  $("#accentbox_optsBox div[data-type=singleAccent] ul li.current").each(function() {
			  var _this = $(this),
			  accentName = _this.data("name"),
			  accentValue = _this.data("value");
			  accent[accentName] = accentValue;
			  price += _this.data("price");
		  });
		  $("#accentbox_optsBox div[data-type=multiAccent] input").each(function() {
			  var _this = $(this),
			  accentName = _this.data("name"),
			  accentItemName = _this.data("itemName"),
			  accentItemValue = _this.val();
			  if(accentItemValue) {
				  if(accent[accentName]) {
					  accent[accentName][accentItemName] = accentItemValue;
				  }else {
					  accent[accentName] = {};
					  accent[accentName][accentItemName] = accentItemValue;
					  price += _this.data("price");
				  }
			  }
		  });
		  $("#accentbox_optsBox div[data-type=multiAccent] ul li.current").each(function() {
			  var _this = $(this),
			  accentName = _this.data("name"),
			  accentItemName = _this.data("itemName"),
			  accentItemValue = _this.data("value");
			  if(accent[accentName]) {
				  accent[accentName][accentItemName] = accentItemValue;
			  }else {
				  accent[accentName] = {};
				  accent[accentName][accentItemName] = accentItemValue;
				  price += _this.data("price");
			  }
		  });
		  accent['totalPrice'] = price;
		  return accent;
	  }
	  var test = setTimeout(function(){
			initUpdata();
	  },1500);
	  window.onload=initUpdata;
	  function initUpdata() {
	  	  var 
	  		orderString = sessionStorage.getItem('order'),
	  		order = orderString ? JSON.parse(orderString) : {};
	  		order[getURLParam().id] = order[getURLParam().id] ? order[getURLParam().id] : {};
	  		if(order !=null){
	  			var style = order[getURLParam().id]["款式修改保留"] ? order[getURLParam().id]["款式修改保留"] : '';
	  			if(style){
	  				for(var s in style) {
	  					if(typeof style[s] == 'string'){
	  						$("ul li[data-option-id="+style[s]+']').addClass('current').siblings().removeClass('current');
	  					}else{
	  						for(var m in style[s]) {
	  							$("ul li[data-option-id="+style[s][m]+']').addClass('current').siblings().removeClass('current');
	  						}
	  					}
	  				}
	  			}
	  			
	  			var accents =order[getURLParam().id]["细节修改保留"] ? order[getURLParam().id]["细节修改保留"] : '';
	  			if(accents){
	  				$(".js_box_opts1 li").removeClass('current');
	  				$(".js_box_opts1 li").removeClass('current');
	  				for(var s in accents) {
	  					if(typeof accents[s] == 'string'){
	  						$("ul li[data-id="+accents[s]+']').addClass('current').siblings().removeClass('current');
	  					}else{
	  						for(var m in accents[s]) {
	  							$("#"+m).val(accents[s][m]);
	  							$(".js_box_opts1 li[data-id="+accents[s][m]+']').addClass('current');
								$(".js_box_opts2 li[data-id="+accents[s][m]+']').addClass('current');
	  							 //$("#accentscheck").append($.jqote("<li><%=this.name%>:<%=this.value%></li>",{name:m,value:accents[s][m]}));
	  						}
	  					}
	  					
	  					
	  				}
	  			}
	  		}
	  		
	  		var fabricId =order[getURLParam().id]["面料"] ? order[getURLParam().id]["面料"] : '';
	  		$("#fabribox_optsBox li[data-id="+fabricId+']').addClass('current');
	  		if($("#fabribox_optsBox li").hasClass('current')){
	  				var price = $("#fabribox_optsBox li.current").data('price');
		          accentContent = getAccentContent();
		          ViewHelper.product.snackPrice =price;
		          $("#productPrice").text(Number(price+accentContent.totalPrice));
		          $("#productPriceCheck2").val(price);
		          
		          $("#productDefaultFabric").show();
		          $("#productDefaultFabric img").attr('src',$(this).data('img'));
		          $("#productDefaultFabric img").data('id',$(this).data('id'));
	  	}
	  		ViewHelper.clothesUpdataListSty = order[getURLParam().id]["成衣数据修改保留"] ? order[getURLParam().id]["成衣数据修改保留"] : '';
	  }
	  
	  Controller.clickAccentOptions = function() {
		  $("#accentbox_optsBox").delegate("li", "click", function() {
			  var _this = $(this);
			  _this.addClass('current');
			  _this.siblings().removeClass("current");
			  $("#productPrice").text(ViewHelper.product.snackPrice + getAccentContent().totalPrice);
		  });
	  };
	  Controller.inputAccentContent = function() {
		  $("#accentbox_optsBox").delegate("div[data-type=multiAccent] input", "change", function() {
			  $("#productPrice").text(ViewHelper.product.snackPrice + getAccentContent().totalPrice);
		  });
	  }; 
	  return Controller;
})();


// 表示已停用的定制店账号
function isShopStop(){
	var __customShop;
	$.ajax('/service/customRest/customShopService/getShopInfo', {
		dataType:'json',
		async:false,
		success:function(res){
			__customShop = res;
		}
	});
	if(__customShop ==null || __customShop =="" || __customShop == undefined ){
		return ;
	}
	var mark=true;
	if (! __customShop) {
		mark=false;
	}
	if (__customShop.isActive == 1) {
		mark=false;
	}
	if (__customShop.checkStatus != 1) {
		mark=false;
	}
	
	return mark;
}