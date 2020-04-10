/* 男士专区 & 女士专区 公用
 * @Author: Marte
 * @Date:   2016-12-13 10:13:03
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-06-14 10:59:50
 */

$(function() {
	getbanner10011();
	getbanner10012();
	getbanner10021();
	getbanner10022();
	// 小分类点击事件：添加class current & 查询商品
	$('.js_displayListBox ul li').on('click', function() {
		var $this = $(this);
		
		// 查询分类下的产品
		var typeid = $this.data('typeid');
		console.log();
		if (!typeid || typeid == '') {
			return;
		}

		var url = '/service/product/page?pageSize=4&&state=1&classesId=' + typeid;
		$.get(url, function(r) {
			$this.addClass('current').siblings('li').removeClass('current');
			if (!r || !r.rows || r.rows.length == 0) {
				return;
			}

			var $ul = $this.closest('.js_specialContBox').find('.displayDownList ul');
			var products = r.rows;
			for (var i = 0; i < products.length; i++) {
				var product = products[i];
				product._pageUrl = getProductPageUrl(product);
			}
			$ul.html($('#x-template-goods-item').jqote(r.rows));
			
		}, 'json');
	});
	
	function getProductPageUrl(product) {
		var productProperties = haveProductProperties(product);
		var url = '/html/goods/';
		if(productProperties.hasStyle) {
			url += 'customersOrderIndex.html';
		}else if(productProperties.hasFabric) {
			url += 'customersOrderIndex.html';
		}else if(productProperties.hasAccent) {
			url += 'customersOrderIndex.html';
		}else if(productProperties.hasQuantity) {
			url += 'customersOrderIndex.html';
		}else {
			url += 'customersOrderBasic.html';
		}
		url += '?id=' + product.productId;
		return url;
	}

	// ////////////////滚滚导航效果开始////////////////////////////
	var $window = $(window);
	var oBox = $('.js_specialContBox');
	var oTipLi = $('.js_specialLeftNav').find('li');
	var oBoxH = [];

	oBox.each(function(i) {
		oBoxH.push(oBox.eq(i).offset().top);
		return oBoxH
	});
	// 点击移动效果
	// console.log(oBoxH)
	oTipLi.click(function(e) {
		var index = oTipLi.index(this);
		// $window.scrollTop(oBoxH[index]);
		$('html,body').stop().animate({
			scrollTop : oBoxH[index]
		}, 500);
		e.stopPropagation();
	});
	// 滚轮滚动事件
	$window.on('scroll', function() {
		throttle(moveNav, window)
	})
	// 点击移动效果封装
	function moveNav() {
		var winScroll = $window.scrollTop();
		console.log(winScroll);
		for (var i = (oBoxH.length-1); i >= 0; i--) {
			if (winScroll >= oBoxH[i]) {
				oTipLi.removeClass('active').eq(i).addClass('active');
				break;
			}
		}
		
		if (winScroll < oBoxH[0]) {
			oTipLi.removeClass('active').eq(0).addClass('active');
		}

	}
	// 控制节流
	function throttle(method, context) {
		clearTimeout(method.tId);
		method.tId = setTimeout(function() {
			method.call(context);
			// console.log(111)
		}, 200);
	}

	// ////////////////滚滚导航效果结束////////////////////////////

	// 检测侧边导航的高度
	$('.specialLeftNav').css({
		'margin-top' : -$(".js_specialLeftNav").height() / 2
	})

	// 
	// 
	// 
	// 轮播图开始////////////////////////////////////
	var mySwiper = new Swiper('.js_swiper-container', {
		// pagination: '.pagination',
		loop : true,
		grabCursor : true,
		paginationClickable : true
	// autoplay: 4000
	})
	$('.arrow-left').on('click', function(e) {
		e.preventDefault()
		mySwiper.swipePrev()
	})
	$('.arrow-right').on('click', function(e) {
		e.preventDefault()
		mySwiper.swipeNext()
	})
	
	// 根据url上的参数，定位到某个分类
	function scrollToCategory() {
		var c = parseInt((getURLParam())['c']);
		if (isNaN(c)) {
			return;
		}
		
		$('.js_specialLeftNav li').eq(c+2).click();
	}

	// 查询子分类
	function queryCategories(parentId, callback) {
		$.get('/service/product/clothesType/children/' + parentId, callback, 'json');
	}
	
	
	function queryCategoriesAndBuildHtml(parentId) {
		queryCategories(parentId, function(res) {
			console.log(res);
			if (!res || res.code == 0) {
				return;
			}
			var cs = res.data;
			
			for (var i = 0; i < cs.length; i++) {
				var pc = cs[i];
				console.log(pc.typeName + ' - ' + pc.typeId);
				queryCategories(pc.typeId, function(res) {
					var cs2 = res.data;
					var html = '';
					for (var j = 0; j < cs2.length; j++) {
						var c = cs2[j];
						var clazz = j == 0 ? ' class="current"' : '';
						html += '<li data-typeid="{0}"{2}>{1}</li>'.format(c.typeId, c.typeName, clazz);
					}
					console.log(html);
				});
			}
		});
	}
	
//	queryCategoriesAndBuildHtml('a62cc01b9aa047c489085b07da205b57');
//	queryCategoriesAndBuildHtml('8edbb9847a28473e83a1399b97c58090');
	

	
	// 默认查询每个分类下的第一个小分类
	$('.js_displayListBox ul li:first-child').click();
	
	scrollToCategory();
})
//读取动态banner10011
function getbanner10011(){
	var zdy="10011";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {
		if(data.data==null){
			return ;
		}
        if(data.data.dmItemList.length  > 0){
        	$("#banner10011").html('');
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			var html="";
    		if(i<3 || i >=6 && i<=8 || i>=12 && i <=14 || i>=18 && i<=20){
    			if(temp[i].clickEvent == "0"){
    				var remarksSplit=temp[i].remarks.split("#");
    				html +='<li class="preLeftPic">';
    				html +=' <a href="javascript:;" target="_blank">';
    				html +=' <div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='   </div>';
    				html +='   <span class="prefecturePic">';
    				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='   </span>';
    				html +='  <span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='   <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +='  </i>';
    				html +='  </span>';
    				html +='  </a>';
    				html +='</li> ';
    			}else if(temp[i].clickEvent == "1"){
    				var remarksSplit=temp[i].remarks.split("#");
    				html +='<li class="preLeftPic">';
    				html +=' <a href="'+temp[i].itemUrl+'" target="_blank">';
    				html +=' <div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='   </div>';
    				html +='   <span class="prefecturePic">';
    				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='   </span>';
    				html +='  <span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='   <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +='  </i>';
    				html +='  </span>';
    				html +='  </a>';
    				html +='</li> ';
    			}else if(temp[i].clickEvent == "2"){
    				if(temp[i].product == null || temp[i].product == ""){
    					return ;
    				}
    				
    				var remarksSplit=temp[i].remarks.split("#");
    				html +='<li class="preLeftPic">';
    				html +=' <a href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'" target="_blank">';
    				html +=' <div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='   </div>';
    				html +='   <span class="prefecturePic">';
    				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='   </span>';
    				html +='  <span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='   <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +='  </i>';
    				html +='  </span>';
    				html +='  </a>';
    				html +='</li> ';
    			}else if(temp[i].clickEvent == "3"){
    				var remarksSplit=temp[i].remarks.split("#");
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				html +='<li class="preLeftPic">';
    				html +=' <a href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'" target="_blank">';
    				html +=' <div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='   </div>';
    				html +='   <span class="prefecturePic">';
    				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='   </span>';
    				html +='  <span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='   <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +='  </i>';
    				html +='  </span>';
    				html +='  </a>';
    				html +='</li> ';
    			}else if(temp[i].clickEvent == "4"){
    				var remarksSplit=temp[i].remarks.split("#");
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				
    				html +='<li class="preLeftPic">';
    				html +=' <a href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'" target="_blank">';
    				html +=' <div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='   </div>';
    				html +='   <span class="prefecturePic">';
    				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='   </span>';
    				html +='  <span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='   <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +='  </i>';
    				html +='  </span>';
    				html +='  </a>';
    				html +='</li> ';
    			}
    			$("#banner10011").append(html);
    		}else{
    			if(temp[i].clickEvent == "0"){
    				var remarksSplit=temp[i].remarks.split("#");
    				html +='<li class="preRightPic">';
    				html +='<a href="javascript:;" target="_blank">';
    				html +='<div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='</div>';
    				html +='<span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='  <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +=' </i>';
    				html +='</span>';
    				html +=' <span class="prefecturePic">';
    				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='</span>';
    				html +='</a>';
    				html +=' </li>';
    			}else if(temp[i].clickEvent == "1"){
    				var remarksSplit=temp[i].remarks.split("#");
    				
    				html +='<li class="preRightPic">';
    				html +='<a href="'+temp[i].itemUrl+'" target="_blank">';
    				html +='<div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='</div>';
    				html +='<span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='  <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +=' </i>';
    				html +='</span>';
    				html +=' <span class="prefecturePic">';
    				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='</span>';
    				html +='</a>';
    				html +=' </li>';
    			}else if(temp[i].clickEvent == "2"){
    				if(temp[i].product == null || temp[i].product == ""){
    					return ;
    				}
    				
    				var remarksSplit=temp[i].remarks.split("#");
    				html +='<li class="preRightPic">';
    				html +='<a href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'" target="_blank">';
    				html +='<div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='</div>';
    				html +='<span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='  <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +=' </i>';
    				html +='</span>';
    				html +=' <span class="prefecturePic">';
    				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='</span>';
    				html +='</a>';
    				html +=' </li>';
    			}else if(temp[i].clickEvent == "3"){
    				var remarksSplit=temp[i].remarks.split("#");
    				var itemUrlSplit=temp[i].itemUrl.split("###");

    				html +='<li class="preRightPic">';
    				html +='<a href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'" target="_blank">';
    				html +='<div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='</div>';
    				html +='<span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='  <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +=' </i>';
    				html +='</span>';
    				html +=' <span class="prefecturePic">';
    				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='</span>';
    				html +='</a>';
    				html +=' </li>';
    			}else if(temp[i].clickEvent == "4"){
    				var remarksSplit=temp[i].remarks.split("#");
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				
    				html +='<li class="preRightPic">';
    				html +='<a href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'" target="_blank">';
    				html +='<div class="prefectureBg">';
    				html +=remarksSplit[0];
    				html +='</div>';
    				html +='<span class="prefectureTxt">';
    				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
    				html +='  <i class="prefectureDe skipWords2">';
    				if(remarksSplit[1] != undefined){
    					html +=remarksSplit[1];
    				}
    				html +=' </i>';
    				html +='</span>';
    				html +=' <span class="prefecturePic">';
    				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
    				html +='</span>';
    				html +='</a>';
    				html +=' </li>';
    			}
    			$("#banner10011").append(html);
    		}
		}
    }
   });
}

//读取动态banner10012
function getbanner10012(){
	var zdy="10012";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {
		if(data.data==null){
			return ;
		}
        if(data.data.dmItemList.length  > 0){
        	$("#banner10012").html('');
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			var html="";
    			if(temp[i].clickEvent == "0"){
    				html +='<li>'; 
    				html +='<a href="javascript:;" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}else if(temp[i].clickEvent == "1"){
    				html +='<li>'; 
    				html +='<a href="'+temp[i].itemUrl+'" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}else if(temp[i].clickEvent == "2"){
    				if(temp[i].product == null || temp[i].product == ""){
    					return ;
    				}
    				
    				html +='<li>'; 
    				html +='<a href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}else if(temp[i].clickEvent == "3"){
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				html +='<li>'; 
    				html +='<a href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}else if(temp[i].clickEvent == "4"){
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				html +='<li>'; 
    				html +='<a href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}
    			$("#banner10012").append(html);
			}
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

//读取动态banner10021
function getbanner10021(){
	var zdy="10021";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {

		if(data.data==null){
			return ;
		}
        if(data.data.dmItemList.length  > 0){
        	$("#banner10021").html('');
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			var html="";
    			if(i<3 || i >=6 && i<=8 || i>=12 && i <=14 || i>=18 && i<=20){
        			if(temp[i].clickEvent == "0"){
        				var remarksSplit=temp[i].remarks.split("#");
        				html +='<li class="preLeftPic">';
        				html +=' <a href="javascript:;" target="_blank">';
        				html +=' <div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='   </div>';
        				html +='   <span class="prefecturePic">';
        				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='   </span>';
        				html +='  <span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='   <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +='  </i>';
        				html +='  </span>';
        				html +='  </a>';
        				html +='</li> ';
        			}else if(temp[i].clickEvent == "1"){
        				var remarksSplit=temp[i].remarks.split("#");
        				html +='<li class="preLeftPic">';
        				html +=' <a href="'+temp[i].itemUrl+'" target="_blank">';
        				html +=' <div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='   </div>';
        				html +='   <span class="prefecturePic">';
        				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='   </span>';
        				html +='  <span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='   <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +='  </i>';
        				html +='  </span>';
        				html +='  </a>';
        				html +='</li> ';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				
        				var remarksSplit=temp[i].remarks.split("#");
        				html +='<li class="preLeftPic">';
        				html +=' <a href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'" target="_blank">';
        				html +=' <div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='   </div>';
        				html +='   <span class="prefecturePic">';
        				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='   </span>';
        				html +='  <span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='   <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +='  </i>';
        				html +='  </span>';
        				html +='  </a>';
        				html +='</li> ';
        			}else if(temp[i].clickEvent == "3"){
        				var remarksSplit=temp[i].remarks.split("#");
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<li class="preLeftPic">';
        				html +=' <a href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'" target="_blank">';
        				html +=' <div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='   </div>';
        				html +='   <span class="prefecturePic">';
        				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='   </span>';
        				html +='  <span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='   <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +='  </i>';
        				html +='  </span>';
        				html +='  </a>';
        				html +='</li> ';
        			}else if(temp[i].clickEvent == "4"){
        				var remarksSplit=temp[i].remarks.split("#");
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				
        				html +='<li class="preLeftPic">';
        				html +=' <a href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'" target="_blank">';
        				html +=' <div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='   </div>';
        				html +='   <span class="prefecturePic">';
        				html +='       <img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='   </span>';
        				html +='  <span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='   <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +='  </i>';
        				html +='  </span>';
        				html +='  </a>';
        				html +='</li> ';
        			}
        			$("#banner10021").append(html);
        		}else{
        			if(temp[i].clickEvent == "0"){
        				var remarksSplit=temp[i].remarks.split("#");
        				html +='<li class="preRightPic">';
        				html +='<a href="javascript:;" target="_blank">';
        				html +='<div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='</div>';
        				html +='<span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='  <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +=' </i>';
        				html +='</span>';
        				html +=' <span class="prefecturePic">';
        				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='</span>';
        				html +='</a>';
        				html +=' </li>';
        			}else if(temp[i].clickEvent == "1"){
        				var remarksSplit=temp[i].remarks.split("#");
        				
        				html +='<li class="preRightPic">';
        				html +='<a href="'+temp[i].itemUrl+'" target="_blank">';
        				html +='<div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='</div>';
        				html +='<span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='  <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +=' </i>';
        				html +='</span>';
        				html +=' <span class="prefecturePic">';
        				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='</span>';
        				html +='</a>';
        				html +=' </li>';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				
        				var remarksSplit=temp[i].remarks.split("#");
        				html +='<li class="preRightPic">';
        				html +='<a href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'" target="_blank">';
        				html +='<div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='</div>';
        				html +='<span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='  <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +=' </i>';
        				html +='</span>';
        				html +=' <span class="prefecturePic">';
        				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='</span>';
        				html +='</a>';
        				html +=' </li>';
        			}else if(temp[i].clickEvent == "3"){
        				var remarksSplit=temp[i].remarks.split("#");
        				var itemUrlSplit=temp[i].itemUrl.split("###");

        				html +='<li class="preRightPic">';
        				html +='<a href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'" target="_blank">';
        				html +='<div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='</div>';
        				html +='<span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='  <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +=' </i>';
        				html +='</span>';
        				html +=' <span class="prefecturePic">';
        				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='</span>';
        				html +='</a>';
        				html +=' </li>';
        			}else if(temp[i].clickEvent == "4"){
        				var remarksSplit=temp[i].remarks.split("#");
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				
        				html +='<li class="preRightPic">';
        				html +='<a href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'" target="_blank">';
        				html +='<div class="prefectureBg">';
        				html +=remarksSplit[0];
        				html +='</div>';
        				html +='<span class="prefectureTxt">';
        				html +='   <em class="prefectureTil">'+remarksSplit[0]+'</em><br/>';
        				html +='  <i class="prefectureDe skipWords2">';
        				if(remarksSplit[1] != undefined){
        					html +=remarksSplit[1];
        				}
        				html +=' </i>';
        				html +='</span>';
        				html +=' <span class="prefecturePic">';
        				html +='<img src="'+temp[i].picture+'" height="200" width="200" alt="" />';
        				html +='</span>';
        				html +='</a>';
        				html +=' </li>';
        			}
        			$("#banner10021").append(html);
        		}
			}
    	}

    });
}

//读取动态banner10022
function getbanner10022(){
	var zdy="10022";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {
		if(data.data==null){
			return ;
		}
        if(data.data.dmItemList.length  > 0){
        	$("#banner10022").html('');
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			var html="";
    			if(temp[i].clickEvent == "0"){
    				html +='<li>'; 
    				html +='<a href="javascript:;" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}else if(temp[i].clickEvent == "1"){
    				html +='<li>'; 
    				html +='<a href="'+temp[i].itemUrl+'" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}else if(temp[i].clickEvent == "2"){
    				if(temp[i].product == null || temp[i].product == ""){
    					return ;
    				}
    				
    				html +='<li>'; 
    				html +='<a href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}else if(temp[i].clickEvent == "3"){
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				html +='<li>'; 
    				html +='<a href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}else if(temp[i].clickEvent == "4"){
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				html +='<li>'; 
    				html +='<a href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'" target="_blank">'; 
    				html +='  <div class="seriesPic">'; 
    				html +='   <img src="'+temp[i].picture+'" height="350" width="250" alt="" />'; 
    				html +='   <div class="specialHoverBg">'; 
    				html +='     <span class="diyLinkBtn" >去定制</span>'; 
    				html +='   </div>'; 
    				html +=' </div>'; 
    				html +='  </a>  '; 
    				html +=' </li>'; 
    			}
    			$("#banner10022").append(html);
			}
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