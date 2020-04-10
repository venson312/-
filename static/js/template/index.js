/* 
 * @Author: Marte
 * @Date:   2016-10-07 13:49:14
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-03-08 10:32:35
 */

$(function() {

	// 纸样中心banner
	var oMinbanner = $('.js_patternBannerBox');
        var oBanner_ul = $('.js_patternBannerList');   //大图片
        var oBanner_ol = $('.js_patternBannerDot');   //小图片

        var num=0
        // 点击小图片时
        $('.js_patternBannerDot li').mouseover(function(e) {
            $(this).addClass('current').siblings().removeClass('current');
            var index=$(this).index()
            $('.js_patternBannerList li').eq(index).stop().show().siblings('li').stop().hide();
            num=index
        });
        var timer = null;
        var myFn = function(){ 
            num++
            if(num>3){
                num=0
            }
            $('.js_patternBannerList li').eq(num).stop().show().siblings('li').stop().hide();
            $('.js_patternBannerDot li').eq(num).addClass('current').siblings().removeClass('current');
        }
        timer = setInterval(myFn,3500)
        
        // 鼠标移上大图片的时候停止
        oMinbanner.mouseenter(function(e) {
            clearInterval(timer)        
        }).mouseleave(function(e) {
            clearInterval(timer)
            timer = setInterval(myFn,3500)    
        });
        

	// 点击li的时候出现侧边栏切换
	var oOptionsLi = $('#container_options .options_list li');
	oOptionsLi.on('click', function() {
		$(this).children('.js_options_L').addClass('current');
		$(this).siblings('li').children('.js_options_L').removeClass('current');
		$('#container_options').addClass('min');
		var index = $(this).index();

		$('#box_optsBox .js_box_opts:eq(' + index + ')').addClass('active').siblings('#box_optsBox .js_box_opts').removeClass('active');

	});

	// 点击返回时，还原页面
	var oButton1 = $('.js_getBackBtn');
	oButton1.on('click', function() {

		$(this).parents('.js_box_opts').removeClass('active');
		$('#container_options').removeClass('min');

	});
	
	var i = 0;
	$('.js_boxOptsUl1, .js_boxOptsUl2, .js_boxOptsUl3').find('li[data-categoryId]').click(function() {
		console.log(i++)
		$('.js_box_opts li').removeClass('current');
		$(this).addClass('current');
		$('.js_classifyBox').text('')

		$('.js_classifyBox').css({
			'width' : '160px',
			'text-align' : 'left'
		})

        $('.select .select-result dl').css({'padding-left':'60px'})
		$('.js_classifyBox').append('<span class="allCategories js_allCategories">所有分类</span> ' + '>' + $(this).parents('.js_box_opts').find('.js_box_optsTil').text() + '-' + $(this).text() + ':')
		
		requery('categoryId', $(this).attr('data-categoryId'));
	});
	
	// 点击所有分类的时候回到全部分类筛选
	 $('.js_classifyBox').live('click', function() {
		$(this).html('所有分类:');
		$(this).css({
			'width' : '100px',
			'text-align' : 'center'
		})

        $('.select .select-result dl ').css({'padding-left':'10px'})
		
		requery('categoryId', '');
		$('.boxOptsUl li').removeClass('current');
	});

	// 面包屑筛选	
	$('#select2 dd[data-shapeId], #select3 dd[data-styleId]').click(function() {
		var $this = $(this);
		$this.addClass("selected").siblings().removeClass("selected");
		
		var selectedId = typeof $this.attr('data-shapeId') != 'undefined' ? 'selectB' : 'selectC';
		
		if ($this.hasClass('select-all')) {
			$("#" + selectedId).remove();
		} else {
			if ($('#'+selectedId).length > 0) {
				$('#'+selectedId + ' a').html($this.text());
			} else {
				$(".select-result dl").append($(this).clone().attr('id', selectedId));
			}
		}
		
		if (typeof $this.attr('data-shapeId') == 'undefined') {
			requery('styleId', $(this).attr('data-styleId'));
		} else {
			requery('shapeId', $(this).attr('data-shapeId'));
		}
	});

	$("#selectB").live("click", function() {
		$(this).remove();
		$("#select2 .select-all").addClass("selected").siblings().removeClass("selected");
		requery('shapeId', '');
	});

	$("#selectC").live("click", function() {
		$(this).remove();
		$("#select3 .select-all").addClass("selected").siblings().removeClass("selected");
		requery('styleId', '');
	});

	$(".select dd").live("click", function() {
		if ($(".select-result dd").length > 1) {
			$(".select-no").hide();
		} else {
			$(".select-no").show();
		}
	});
	
	$('.js_screenTopBox li').click(function() {
		$(this).addClass('current').siblings('li').removeClass('current');
		requery('orderBy', $(this).attr('data-orderBy'));
	});

	$('#pager').kkpager({
		url : '/service/template/',
		pno : 1,
		pageSize : 20,
		mode : 'click',
		beforeAjax : function() {
			this.params = this.params = $('form[name=params]').serializeJSON();;
		},
		callback : function(data) {
			
			var $list = $('.screenContBox ul');
			$list.html('');
			if (!data || data.length == 0) {
				return;
			}
			
			var $tmpl = $('#template');
			for (var i = 0; i < data.length; i++) {
				var item = data[i];
				$list.append($tmpl.jqote(item));
			}
			
		},
		getHref : function(n) {
			return '#patterSelect';
		}
    });
	
	$('#pagerDesigners').kkpager({
		url : '/service/template/designers/page',
		pno : 1,
		pageSize : 15,
		mode : 'click',
		beforeAjax : function() {
			var param = $('#formYi').serializeJSON();
			this.params = param;
		},
		callback : function(data) {
			$("#templateDesignersFindLisrt").html("");
			if (!data || data.length == 0) {
				return;
			}
			var templateDesigners=$("#templateDesigners");
			$("#templateDesignersFindLisrt").append(templateDesigners.jqote(data));
		}
	})
	
	
	$('#x-search-btn').click(function() {
		var no = $.trim($('#x-search-no').val());
		if (no == '') {
			location.reload([false]);
			return;
		}
		
		requery("no", no);
	});
	
	function requery(field, value) {
		if (field == 'no') {
			$('#param-categoryId').val('');
			$('#param-shapeId').val('');
			$('#param-styleId').val('');

			$("#selectB").remove();
			$("#selectC").remove();
			
			$('li[data-categoryId]').removeClass('current');
		} else if (field == 'styleId' || field == 'shapeId' || field == 'categoryId') {
			$('#x-search-no').val('');
			$('#param-no').val('');
		}
		
		$('#param-' + field).val(value);
		$('#pager').getKkpager().query();
	}

})