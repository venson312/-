/* 
 * @Author: Marte
 * @Date:   2016-06-29 10:54:57
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-12-06 15:38:11
 */

$(function() {

   //getDiyProduct();
   // getDiyProduct2(); 
    getbanner10001();
   U3DProductSwitch('bee92c56855f4a54b703df0cd842fb96');
   // getbanner10002();
   // getbanner10003();
    getbanner10099();
    getbanner10012();
    getbanner10022();
	var editor = UE.getEditor('requirementDescription');
	editor.ready(function(){
	});
	var editor = UE.getEditor('requirementDescription1');
	editor.ready(function(){
	});
	// 头部 导航部分的li
	// 定位导航位置
	// $('.js_manListUl').css({
	// 	'margin-left' : -$(".js_comListUl").width()+18 +'px'
	// });
	// $('.js_madamListUl').css({
	// 	'margin-left' : -8 +'px'
	// });
	// 商
	
	
	
	
	$('.js_consultIcon').on('click',function(){
		$(this).toggleClass('consultIconOn');
		if( $(this).hasClass('consultIconOn') ){
			$('.js_consultCont ').fadeOut(500);
		}else{

			$('.js_consultCont ').fadeIn(500);
		}
	})
	$('.js_consultCont a').hover(function() {
		$(this).addClass('current');
	}, function() {
		$(this).removeClass('current');
	});

	
	// 鼠标经过的效果
	$('.js_consumerUl>ul>li').hover(function() {
		$(this).addClass('current');
		$(this).children('.js_comListUl').stop().slideDown(200);
		// $('.js_navWhiteBg').stop().show(500)
	}, function() {
		$(this).removeClass('current');
		$(this).children('.js_comListUl').stop().slideUp(200);
		// $('.js_navWhiteBg').stop().hide(500)
	});
	$('.js_consumerUl li').hover(function() {
		$(this).addClass('on')
		// $('.js_navWhiteBg').stop().show(500)
	}, function() {
		$(this).removeClass('on')
	});

	// 首页轮播图开始/////////////////////////////
	var oMinbanner = $('.js_mainbanner');
	var oBanner_ul = $('.js_banner_ul'); // 大图片
	var oBanner_ol = $('.js_banner_ol'); // 小图片

    // 定义一个变量来判断当前播放的
	var num = 0
    var sideBtn = null;
    // 第一张图片显示
    $(".js_banner_ul li").eq(0).show();
    $(".js_banner_ol li:first").addClass("on");
	// 鼠标移上小点点时
    $('.js_banner_ol li').mouseover(function(){
        var This = this;
        sideBtn = setInterval(function(){
            $(This).addClass('on').siblings().removeClass('on');
            var index = $(This).index();
            $('.js_banner_ul li').eq(index).fadeIn(600).siblings('li').fadeOut(600);
            num = index;
        },100);
    });
    // 鼠标离开小点点时
    $('.js_banner_ol li').mouseout(function(){
        clearInterval(sideBtn);
    });

	var timerBanner = null;
    // 自动播放
    function play(){
        num++;
        num = num > $('.js_banner_ol li').length-1 ? 0 : num; 
        $('.js_banner_ol li').eq(num).addClass('on').siblings().removeClass('on');
        $('.js_banner_ul li').eq(num).fadeIn(600).siblings().fadeOut(600);
    }
	// var myFn = function() {
	// 	num++;
	// 	if (num >= 4) {
	// 		num = 0;
	// 	}
	// 	$('.js_banner_ul li').eq(num).stop().fadeIn(500).siblings('li').stop().fadeOut(500);
	// 	$('.js_banner_ol li').eq(num).addClass('on').siblings().removeClass('on');
	// }
	timerBanner = setInterval(play, 3500)

	// 鼠标移上大图片的时候停止
	oMinbanner.mouseenter(function(e) {
		clearInterval(timerBanner)
	}).mouseleave(function(e) {
		clearInterval(timerBanner)
		timerBanner = setInterval(play, 3500)
	});
	// 首页轮播图结束/////////////////////////////

	// 轮播图开始////////////////////////////

	// var $oLi = $('#seriesLiBox1 ol li');
	// var iNow = 0;
	// var timer = null;
	// var consumerCont_W = $('.js_seriesCont').width();
	// // console.log( $('.js_seriesCont').length )
	// // console.log(consumerCont_W)
	// $oLi.mouseover(function(){
	// // $oLi.attr('class','');
	// $(this).attr('class','active').siblings('li').attr('class','');
	// $('.js_seriesLiBox1').siblings('.js_consumerCont1').stop().animate({left
	// : -consumerCont_W * $(this).index()},1000);
	// iNow = $(this).index();

	// });

	// $('.js_consumerSeriesplay1').mouseover(function(){
	// clearInterval(timer);
	// }).mouseout(function(){
	// timer = setInterval(toRun,4000);
	// });

	// timer = setInterval(toRun,4000);
	// function toRun(){
	// if(iNow == $oLi.length-1){
	// iNow = 0;
	// $('.js_consumerCont1').css({left:0})
	// }
	// else{
	// iNow++;
	// }
	// $oLi.attr('class','');
	// $oLi.eq(iNow).attr('class','active');
	// $('.js_consumerCont1').stop().animate({left : -consumerCont_W *
	// iNow},1000);
	// }

	// 轮播图结束//////////////////

        

	// 男装女装的切换js_styleSelect
	$('.js_styleSelect').children('a').on(
			'click',
			function() {
				$(this).addClass('active').siblings('a').removeClass('active');
				var index = $(this).index()
				$('.js_styleSelectCont').eq(index).show().siblings(
						'.js_styleSelectCont').hide();
			})
	// 鼠标移上的时候其他的添加蒙版
	$('.js_styleSelectCont ul li').hover(function() {
		$(this).removeClass('onHover').siblings('li').addClass('onHover')
	}, function() {
		$('.js_styleSelectCont ul li').removeClass('onHover')
	});

//读取动态banner10001
function getbanner10001(){
	var zdy="10001";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {
		if(data.data==null){
			return ;
		}
        if(data.data.dmItemList.length  > 0){
        	$("#banner10001").html('');
        	$("#banner_ol_dont").html('');
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			var html="";
    			if(temp[i].clickEvent == "0"){
    				 html +='<li>';
    				 html +='<a href="javascript:;" target="_blank" style="background:url('+temp[i].picture+'?v=1.2.2) no-repeat center;"></a>';
    				 html +='</li>';
    			}else if(temp[i].clickEvent == "1"){
    				 html +='<li>';
    				 html +='<a href="'+temp[i].itemUrl+'" target="_blank" style="background:url('+temp[i].picture+'?v=1.2.2) no-repeat center;"></a>';
    				 html +='</li>';
    			}else if(temp[i].clickEvent == "2"){
    				if(temp[i].product == null || temp[i].product == ""){
    					return ;
    				}
    				 html +='<li>';
    				 html +='<a href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'" target="_blank" style="background:url('+temp[i].picture+'?v=1.2.2) no-repeat center;"></a>';
    				 html +='</li>';
    			}else if(temp[i].clickEvent == "3"){
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				 html +='<li>';
    				 html +='<a href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'" target="_blank" style="background:url('+temp[i].picture+'?v=1.2.2) no-repeat center;"></a>';
    				 html +='</li>';
    			}else if(temp[i].clickEvent == "4"){
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				html +='<li>';
   				 	html +='<a href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'" target="_blank" style="background:url('+temp[i].picture+'?v=1.2.2) no-repeat center;"></a>';
   				 	html +='</li>';
    			}
    			$("#banner10001").append(html);
    			$("#banner_ol_dont").append("<li></li>");
			}
             $(".js_banner_ol li:first").addClass("on");
    		 $(".js_banner_ul ul li:first").css({"display":"list-item"});
    		// 鼠标移上小点点时
    	    $('.js_banner_ol li').mouseover(function(){
    	        var This = this;
    	        sideBtn = setInterval(function(){
    	            $(This).addClass('on').siblings().removeClass('on');
    	            var index = $(This).index();
    	            $('.js_banner_ul li').eq(index).fadeIn(600).siblings('li').fadeOut(600);
    	            num = index;
    	        },100);
    	    });
    	    // 鼠标离开小点点时
    	    $('.js_banner_ol li').mouseout(function(){
    	        clearInterval(sideBtn);
    	    });
    	}
    });
}

//读取动态banner10002
function getbanner10002(){
	var zdy="10002";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {
		if(data.data==null){
			$("#checkShow10002").hide();
			return ;
		}
		$("#name10002").text(data.data.showName);
        if(data.data.dmItemList.length  > 0){
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			if(i==0){
    				var html="";
        			if(temp[i].clickEvent == "0"){
        				html +='<a href="javascript:;" >';
        				html +='<div class="featuredHover">';
        				html +='  <img  src="'+temp[i].picture+'"  alt=""  height="560" width="560"/>';
        				html +=' <div class="LTxt">';
        				html +=' </div>';
        				html +='   </div>';
        				html +='  </a>';
        			}else if(temp[i].clickEvent == "1"){
        				html +='<a href="'+temp[i].itemUrl+'" target="_blank">';
        				html +='<div class="featuredHover">';
        				html +='  <img  src="'+temp[i].picture+'"  alt=""   height="560" width="560"/>';
        				html +=' <div class="LTxt">';
        				html +=' </div>';
        				html +='   </div>';
        				html +='  </a>';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				
        				html +='<a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">';
        				html +='<div class="featuredHover">';
        				html +='  <img  src="'+temp[i].picture+'"  alt=""   height="560" width="560"/>';
        				html +=' <div class="LTxt">';
        				html +='  <p>'+temp[i].product.name+'</p>';
        				html +='  <p class="font18">¥'+temp[i].product.snackPrice+'</p>';
        				html +=' </div>';
        				html +='   </div>';
        				html +='  </a>';
        			}else if(temp[i].clickEvent == "3"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<a target="_blank" href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'">';
        				html +='<div class="featuredHover">';
        				html +='  <img  src="'+temp[i].picture+'"  alt=""  height="560" width="560"/>';
        				html +=' <div class="LTxt">';
        				html +='  <p>'+itemUrlSplit[0]+'</p>';
        				html +=' </div>';
        				html +='   </div>';
        				html +='  </a>';
        			}else if(temp[i].clickEvent == "4"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<a target="_blank" href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'">';
        				html +='<div class="featuredHover">';
        				html +='  <img  src="'+temp[i].picture+'"  alt=""  height="560" width="560"/>';
        				html +=' <div class="LTxt">';
        				html +='  <p>'+itemUrlSplit[0]+'</p>';
        				html +=' </div>';
        				html +='   </div>';
        				html +='  </a>';
        			}
        			$("#dynamic_maintenance_1").html(html);
    			}else if(i==1 ){
    				var html="";
        			if(temp[i].clickEvent == "0"){
        				html +='<a target="_blank" href="javascript:;">';
        				html +='<div class="R1Top marginBottom20" style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="270" width="600" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "1"){
        				html +='<a target="_blank" href="'+temp[i].itemUrl+'">';
        				html +='<div class="R1Top marginBottom20" style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="270" width="600" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				html +='<a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">';
        				html +='<div class="R1Top marginBottom20" style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="270"  width="600" /></div>';
        				html +=' <p class="R1Txt">'+temp[i].product.name+'</p>';
                        html +=' </div>';
                        html +='  </a>';
    
        			}else if(temp[i].clickEvent == "3"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				
        				html +='<a target="_blank" href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'">';
        				html +='<div class="R1Top marginBottom20" style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt=""  height="270" width="600" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "4"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<a target="_blank" href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'">';
        				html +='<div class="R1Top marginBottom20" style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt=""  height="270" width="600" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}
        			$("#dynamic_maintenance_2").html(html);
    			}else if(i==2 ){
    				var html="";
        			if(temp[i].clickEvent == "0"){
        				html +='<a target="_blank" href="javascript:;">';
        				html +='<div class="R1Down"  style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="270" width="600" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "1"){
        				html +='<a target="_blank" href="'+temp[i].itemUrl+'">';
        				html +='<div class="R1Down"  style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="270" width="600" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				html +='<a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">';
        				html +='<div class="R1Down"  style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="270" width="600" /></div>';
        				html +=' <p class="R1Txt">'+temp[i].product.name+'</p>';
                        html +=' </div>';
                        html +='  </a>';
    
        			}else if(temp[i].clickEvent == "3"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				
        				html +='<a target="_blank" href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'">';
        				html +='<div class="R1Down"  style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="270" width="600" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "4"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<a target="_blank" href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'">';
        				html +='<div class="R1Down"  style="height: 270px;width: 600px">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="270" width="600" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}
        			$("#dynamic_maintenance_2").append(html);
    			}else if(i==3 ){
    				var html="";
        			if(temp[i].clickEvent == "0"){
        				html +='<a target="_blank" href="javascript:;">';
        				html +='<div class="R1Down marginBottom20">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="280" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "1"){
        				html +='<a target="_blank" href="'+temp[i].itemUrl+'">';
        				html +='<div class="R1Down marginBottom20">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="280" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				html +='<a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">';
        				html +='<div class="R1Down marginBottom20">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="280" /></div>';
        				html +=' <p class="R1Txt">'+temp[i].product.name+'</p>';
                        html +=' </div>';
                        html +='  </a>';
    
        			}else if(temp[i].clickEvent == "3"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				
        				html +='<a target="_blank" href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'">';
        				html +='<div class="R1Down marginBottom20">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="280" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "4"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<a target="_blank" href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'">';
        				html +='<div class="R1Down marginBottom20">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="280" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}
        			$("#dynamic_maintenance_3").html(html);
    			}else if(i==4){
    				var html="";
        			if(temp[i].clickEvent == "0"){
        				html +='<a target="_blank" href="javascript:;">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="280" width="280" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "1"){
        				html +='<a target="_blank" href="'+temp[i].itemUrl+'">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="280" width="280" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				html +='<a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="280" width="280" /></div>';
        				html +=' <p class="R1Txt">'+temp[i].product.name+'</p>';
                        html +=' </div>';
                        html +='  </a>';
    
        			}else if(temp[i].clickEvent == "3"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				
        				html +='<a target="_blank" href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="280" width="280" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "4"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<a target="_blank" href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="280" width="280" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}
        			$("#dynamic_maintenance_3").append(html);
    			}else if(i==5){
    				var html="";
        			if(temp[i].clickEvent == "0"){
        				html +='<a target="_blank" href="javascript:;">';
        				html +='<div class="R1Top marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "1"){
        				html +='<a target="_blank" href="'+temp[i].itemUrl+'">';
        				html +='<div class="R1Top marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				html +='<a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">';
        				html +='<div class="R1Top marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
                        html +=' </div>';
                        html +='  </a>';
    
        			}else if(temp[i].clickEvent == "3"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				
        				html +='<a target="_blank" href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'">';
        				html +='<div class="R1Top marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "4"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<a target="_blank" href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'">';
        				html +='<div class="R1Top marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}
        			$("#dynamic_maintenance_4").html(html);
    			}else if(i==6){
    				var html="";
        			if(temp[i].clickEvent == "0"){
        				html +='<a target="_blank" href="javascript:;">';
        				html +='<div class="R1Down marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="200" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "1"){
        				html +='<a target="_blank" href="'+temp[i].itemUrl+'">';
        				html +='<div class="R1Down marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="200" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				html +='<a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">';
        				html +='<div class="R1Down marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="200" /></div>';
                        html +=' </div>';
                        html +='  </a>';
    
        			}else if(temp[i].clickEvent == "3"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				
        				html +='<a target="_blank" href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'">';
        				html +='<div class="R1Down marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="200" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "4"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<a target="_blank" href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'">';
        				html +='<div class="R1Down marginBottom10">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="200" width="200" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}
        			$("#dynamic_maintenance_4").append(html);
    			}else if(i==7){
    				var html="";
        			if(temp[i].clickEvent == "0"){
        				html +='<a target="_blank" href="javascript:;">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "1"){
        				html +='<a target="_blank" href="'+temp[i].itemUrl+'">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "2"){
        				if(temp[i].product == null || temp[i].product == ""){
        					return ;
        				}
        				html +='<a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
                        html +=' </div>';
                        html +='  </a>';
    
        			}else if(temp[i].clickEvent == "3"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				
        				html +='<a target="_blank" href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}else if(temp[i].clickEvent == "4"){
        				var itemUrlSplit=temp[i].itemUrl.split("###");
        				html +='<a target="_blank" href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'">';
        				html +='<div class="R1Top">';
        				html +='  <div><img src="'+temp[i].picture+'" alt="" height="140" width="200" /></div>';
        				html +=' <p class="R1Txt">'+itemUrlSplit[0]+'</p>';
                        html +=' </div>';
                        html +='  </a>';
        			}
        			$("#dynamic_maintenance_4").append(html);
    			}
			}
    	}
    });
}

//读取动态banner10003
function getbanner10003(){
	var zdy="10003";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {
		if(data.data==null){
			return ;
		}
        if(data.data.dmItemList.length  > 0){
        	$("#banner10003").html('');
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			var html="";
    			if(temp[i].clickEvent == "0"){
    				html +='<li>'; 
    				html +=' <a target="_blank" href="javascript:;">'; 
                    html +='   <div class="featuredHover">'; 
                    html +=' <img src="'+temp[i].picture+'?v=1.2.2" height="270" width="570" alt="" />'; 
                    html +='    </div>'; 
                    html +=' </a>'; 
                    html +=' </li>'; 
    			}else if(temp[i].clickEvent == "1"){
    				 html +='<li>'; 
     				html +=' <a target="_blank" href="'+temp[i].itemUrl+'">'; 
                     html +='   <div class="featuredHover">'; 
                     html +=' <img src="'+temp[i].picture+'?v=1.2.2" height="270" width="570" alt="" />'; 
                     html +='    </div>'; 
                     html +=' </a>'; 
                     html +=' </li>'; 
    			}else if(temp[i].clickEvent == "2"){
    				if(temp[i].product == null || temp[i].product == ""){
    					return ;
    				}
    				html +='<li>'; 
    				html +=' <a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">'; 
                    html +='   <div class="featuredHover">'; 
                    html +=' <img src="'+temp[i].picture+'?v=1.2.2" height="270" width="570" alt="" />'; 
                    html +='    </div>'; 
                    html +=' </a>'; 
                    html +=' </li>'; 
    			}else if(temp[i].clickEvent == "3"){
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				html +='<li>'; 
    				html +=' <a target="_blank" href="../../html/goods/freeCollocationList.html?id='+itemUrlSplit[1]+'">'; 
                    html +='   <div class="featuredHover">'; 
                    html +=' <img src="'+temp[i].picture+'?v=1.2.2" height="270" width="570" alt="" />'; 
                    html +='    </div>'; 
                    html +=' </a>'; 
                    html +=' </li>';
    			}else if(temp[i].clickEvent == "4"){
    				var itemUrlSplit=temp[i].itemUrl.split("###");
    				html +='<li>'; 
    				html +=' <a href="../../html/goods/freeCollocatArticle.html?id='+itemUrlSplit[2]+'">'; 
                    html +='   <div class="featuredHover">'; 
                    html +=' <img src="'+temp[i].picture+'?v=1.2.2" height="270" width="570" alt="" />'; 
                    html +='    </div>'; 
                    html +=' </a>'; 
                    html +=' </li>';
    			}
    			$("#banner10003").append(html);
			}
    	}
    });
}
//读取动态banner10099
function getbanner10099(){
	$("#banner10099").html('');
	var zdy="10099";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {
		if(data.data==null){
			return ;
		}
        if(data.data.dmItemList.length  > 0){
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			var html="";
    			 if(temp[i].clickEvent == "2"){
    				if(temp[i].product == null || temp[i].product == ""){
    					return ;
    				}
    				
    				html +='<li>'; 
	    				html +=' <a target="_blank" href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'">'; 
		                    html +='<img src="'+temp[i].picture+'?v=1.2.2" height="420" width="300" alt="" />';  
		                    html +='<p class="skipWords1 font14 height30 lineHeight30">'+temp[i].product.name+'</p>';
		                    html +='<p>￥'+temp[i].product.snackPrice+'</p>';
	                    html +=' </a>'; 
                    html +=' </li>'; 
    			}
    			$("#banner10099").append(html);
    		}
        }
	})
}

//读取动态banner10012
function getbanner10012(){
	$("#banner10012").html('');
	var zdy="10012";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {
		if(data.data==null){
			return ;
		}
        if(data.data.dmItemList.length  > 0){
        	
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			var html="";
    			 if(temp[i].clickEvent == "2"){
    				if(temp[i].product == null || temp[i].product == ""){
    					return ;
    				}
    				html +='<li>';
	    				html +=' <a href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'" target="_blank">';
		    				html +=' <img src="'+temp[i].picture+'" height="420" width="300" alt="" />';
		    				html +=' <p class="skipWords1 font14 height30 lineHeight30">'+temp[i].product.name+'</p>';
		    				html +='<p>￥'+temp[i].product.snackPrice+'</p>';
	    				html +=' </a>';
    			    html +=' </li>';
    				
    			}
    			$("#banner10012").append(html);
			}
    	}  
    });
}
//读取动态banner10022
function getbanner10022(){
	$("#banner10022").html('');
	var zdy="10022";//定义唯一编号
	$.getJSON("../../service/iDynamicMaintenance/selectUniqueNumber/"+zdy,function(data) {
		if(data.data==null){
			return ;
		}
        if(data.data.dmItemList.length  > 0){
    		var temp=data.data.dmItemList;
    		for (var i = 0; i < temp.length; i++) {
    			var html="";
    			 if(temp[i].clickEvent == "2"){
    				if(temp[i].product == null || temp[i].product == ""){
    					return ;
    				}
    				html +='<li>';
	    				html +=' <a href="../../html/goods/customersOrderIndex.html?id='+temp[i].product.productId+'" target="_blank">';
		    				html +=' <img src="'+temp[i].picture+'" height="420" width="300" alt="" />';
		    				html +=' <p class="skipWords1 font14 height30 lineHeight30">'+temp[i].product.name+'</p>';
		    				html +='<p>￥'+temp[i].product.snackPrice+'</p>';
	    				html +=' </a>';
    			    html +=' </li>';
    				
    			}
    			$("#banner10022").append(html);
			}
    	}  
    });
}

// DIY的获取
function getDiyProduct() {
    $.getJSON("/service/diyProduct",{isSelling:1},function(data) {
        if(data.code == 1 && data.data) {
            $('#diyProductCtn').append($('#productTmp').jqote(data.data.rows));
        }else {
            console.log(data.message);
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
function getDiyProduct2() {
    $.getJSON("/service/diyProduct",{isSelling:1,identification:1},function(data) {
        if(data.code == 1 && data.data) {
            $('#diyProductCtn').append($('#productTmp2').jqote(data.data.rows));
        }else {
            console.log(data.message);
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
// 男士女士专区特效开始////////////////////////////////////////////

//////////////////////////男士专区/////////////////////////////////////////////////
var getyxl = jQuery('.js_picLBxxl li').eq(0).width();

    // new一个构造函数
    var arartta1= window['arartta1'] = function(o){
        return new das1(o);
    }
    das1 = function(o){
        this.obj = $('#'+o.obj);
        this.bnt = $('#'+o.bnt);
        this.showLi = this.obj.find('li');
        this.current = 0;
        this.myTimersc = '';
        this.init()

    }
    das1.prototype = {
        // 图片变换
        chgPic:function(){
            var _this = this;
            _this.current++;
            
            if (_this.current > 1) {
                _this.current = 0 ;
            }

            var n=_this.current;
            for (var i = 0,l= _this.showLi.length; i < l; i++) {

                $('#picLBxxl1 dl:not(:animated)').animate({left: -(n * getyxl) + "px"}, {easing:"easeInOutExpo"}, 1500, function(){});
            }
        },
        init:function(){
            var _this = this;
            // 定时器
            var timer = null;
            var fn = function(){
                _this.chgPic();
                // _this.rotate();
            } 
            // 初始化定时器开启
            timer = setInterval(fn, 3000);
            // 鼠标移上时停止
            $('#picLBxxl1 dl').hover(function() {
                clearInterval(timer);
            }, function() {
                timer = setInterval(fn, 3000);
            });
        }

    }

// 调用
arartta1({
    obj:'picLBxxl1'
});

// ////////////////////////女士专区/////////////////////////////////////////////////
    var arartta2= window['arartta2'] = function(o){
        return new das2(o);
    }
    das2 = function(o){
        this.obj = $('#'+o.obj);
        this.bnt = $('#'+o.bnt);
        this.showLi = this.obj.find('li');
        this.current = 0;
        this.myTimersc = '';
        this.init()

    }
    das2.prototype = {
        // 图片变换
        chgPic:function(){
            var _this = this;
            _this.current++;
            
            if (_this.current > 1) {
                _this.current = 0 ;
            }

            var n=_this.current;
            for (var i = 0,l= _this.showLi.length; i < l; i++) {

                $('#picLBxxl2 dl:not(:animated)').animate({left: -(n * getyxl) + "px"}, {easing:"easeInOutExpo"}, 1500, function(){});
            }
        },
        init:function(){
            var _this = this;
            // 定时器
            var timer = null;
            var fn = function(){
                _this.chgPic();
                // _this.rotate();
            } 
            // 初始化定时器开启
            timer = setInterval(fn, 3500);
            // 鼠标移上时停止
            $('#picLBxxl2 dl').hover(function() {
                clearInterval(timer);
            }, function() {
                timer = setInterval(fn, 3500);
            });
        }

    }

arartta2({
    obj:'picLBxxl2'
});



// 男士女士专区特效结束////////////////////////////////////////////

// 三种定制途径切换
var customLoad_TLi = $('.js_customLoad_T ul li');
customLoad_TLi.on('click',function(){
	$(this).addClass('current').siblings('li').removeClass('current');
	var index = $(this).index();
	$('.js_customLoadCont').eq(index).removeClass('displayNone').siblings('.js_customLoadCont').addClass('displayNone');
})
// 约一约
var oScheduleBtn = $('.js_scheduleBtn') ;
oScheduleBtn.on('click',function(){
	$(this).parents('.js_LoadContUp').css({'display':'none'});
	$(this).parents('.js_LoadContUp').siblings('.js_LoadContDown').css({'display':'block'});
})
// 取消
var oCancelSchedule = $('.js_cancelSchedule');
oCancelSchedule.on('click',function(){
	$(this).parents('.js_LoadContDown').css({'display':'none'});
	$(this).parents('.js_LoadContDown').siblings('.js_LoadContUp').css({'display':'block'});
})



	//顶部男女导航，点击分类跳转到男女专区对应的分类
	$('.js_comListUl li').click(function(e) {
		var $parent = $(this).parent();
		var index = $parent.children().index(this);
		window.location.href = '/html/goods/index' + ($parent.hasClass('js_manListUl') ? 'Man' : 'Lady') + 'Special.html?c=' + index;
		return false;
	});
	$('#appointmentBtn').click(doAppointment);
	changeAddressGroup();
	changeAddress();
	loadCustomShopCity();
});
function U3DProductSwitch(id) {
	$("#u3dSuitExhibition_js").val(id);
	//window.__user = getLoginUser();
	if(isLogin()) {
		$('.js_clothesBox').hide();
		//$('#smallLoginPage').hide()
	//if(window.__user !=null){
		var mark=isShopStopCheck();
		if(mark){
			$(".js_virtual2").html('');
			$('.js_virtual1').html('');
			$(".js_virtual2").load("../html/goods/U3DCSOrderIndexFit.html"); 
		}else{
			$('.js_virtual1').html('');
			$('.js_virtual2').html('')
			$(".js_virtual1").load("../html/goods/U3DCustomersOrderIndex.html"); 
		}
	}else{
		$('.js_clothesBox').hide();
		//$('#smallLoginPage').show();
		$('.js_virtual1').html('');
		$('.js_virtual2').html('')
		$(".js_virtual1").load('../html/goods/U3DCustomersOrderIndex.html'); 
	}
}

// 预约量体、来图、来样提交成功
/*$('.js_scheduleBtn2').live('click', function() {
    $.MsgBox.Alert("温馨提示","<img src='../images/business/ok.jpg' alt='' width='43' height='29' style='vertical-align:middle'/>恭喜您，提交成功^_^~");
})*/

//来样定制
function dataCheckForm(formId) {
	if ($('#formRequirement').validate()) {
		$.ajax({
					type : "POST",
					url : "../../service/userRest/requirement/insertPersonRequirement",
					data : $('#formRequirement').serializeJSON(),
					async : false,
					dataType : "json",
					error : function(request) {
						$.MsgBox.Alert("提示","个人需求发布失败");
						//alert("个人需求发布失败");
					},
					success : function(data) {
						if (data.success == true || data.success == 'true') {
							$.MsgBox.Alert("温馨提示","<img src='../images/business/ok.jpg' alt='' width='43' height='29' style='vertical-align:middle'/>恭喜您，提交成功^_^~");
						} else {
							$.MsgBox.Alert("提示","需求发布不成功,请检查原因！！");
//							alert("需求发布不成功,请检查原因！！");
						}
					}
				});

	}

}
//来图定制
function dataCheck2(formId2) {
	if ($('#formRequirement2').validate()) {
		$.ajax({
					type : "POST",
					url : "../../service/userRest/requirement/insertPersonRequirement",
					data : $('#formRequirement2').serializeJSON(),
					async : false,
					dataType : "json",
					error : function(request) {
						$.MsgBox.Alert("提示","个人需求发布失败");
						//alert("个人需求发布失败");
					},
					success : function(data) {
						if (data.success == true || data.success == 'true') {
							$.MsgBox.Alert("温馨提示","<img src='../images/business/ok.jpg' alt='' width='43' height='29' style='vertical-align:middle'/>恭喜您，提交成功^_^~");
						} else {
							$.MsgBox.Alert("提示","需求发布不成功,请检查原因！！");
//							alert("需求发布不成功,请检查原因！！");
						}
					}
				});

	}

}
function renderCustomShopCity(citys) {
	  if(!citys || citys.length < 1) return;
	  $("#customShopCount").text(citys.length);
	  
	  var groupedAddress = groupAddressByFirstLetter(citys),
	  	  biggerGroup = {"ABCDE" : [],"FGHIJ" : [],"KLMNO" : [],"PQRST" : [],"UVWXYZ" : []};
	
	  for(var p in groupedAddress) {
		  for(var b in biggerGroup) {
			  if(b.indexOf(p) != -1) {
				  biggerGroup[b] = biggerGroup[b].concat(groupedAddress[p]);
			  }
		  }
	  }
	  for(var g in biggerGroup) {
		  $("#" + g).append($("#addressTmp").jqote(biggerGroup[g]));
	  }
}
function loadCustomShopCity() {
	$.getJSON("/service/customRest/customShopService/citys",function(data) {
		renderCustomShopCity(data);
	});
}
function changeAddressGroup() {
	  var regionTilBoxLi = $('.js_regionTilBox').find('li');
    
    regionTilBoxLi.on('click',function(){
      regionTilBoxLi.removeClass('current');
      $(this).addClass('current');
      var index = $(this).index();
      $('.js_regionBigCont').children('.js_regionListCont').eq(index).removeClass('displayNone');
      $('.js_regionBigCont').children('.js_regionListCont').eq(index).siblings().addClass('displayNone');
    });
}
function changeAddress() {
	  $('.js_regionBigCont').delegate("li", "click",function() {
		  $('.js_regionBigCont').find('li').removeClass("currentOn");
	      $(this).addClass('currentOn');
	  });
}
function getAppointment() {
	  var 	currentNode = $("#allAddress ul li.currentOn"),
	  		province = currentNode.data("province"),
	  		provinceName = currentNode.data("provinceName"),
	  		municipality = currentNode.data("municipality"),
	  		municipalityName = currentNode.data("municipalityName"),
	  		particularAddress = $("#particularAddress").val(),
	  		linkman = $("#nameIptTxt").val(),
	  		contactNumber = $("#phoneIptTxt").val();
	  return {
		  province : province,
		  provinceName : provinceName,
		  municipality : municipality,
		  municipalityName : municipalityName,
		  particularAddress : particularAddress,
		  linkman : linkman,
		  contactNumber : contactNumber
	  };
}
function checkInput(address) {
	  if(!$("#form1").validate()) return false;
	  if(!address.province || !address.municipality) {
		  $("#provinceError").append("<span>请选择城市</span>");
		  return false;
	  }
	  return true;
}
function doAppointment() {
	var appoint = getAppointment();
	if(!checkInput(appoint)) {
		return;
	}
	$.ajax({
	      type:'POST',
		  url:"/service/appointment-order",
	      data:JSON.stringify(appoint),
	      dataType:'json',
	      contentType:'json',
	      success:function(data) {
	    	  if(data.code == 1) {
	    		  $.MsgBox.Alert('温馨提示', "恭喜您，提交成功！");
	  		  }else {
	  			console.log(data.message);
	  			$.MsgBox.Alert('温馨提示', "预约失败！");
	  		  }
	      }
	});
}
function isShopStopCheck(){
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
	return mark
}










