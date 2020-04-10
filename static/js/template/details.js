/* 
* @Author: Marte
* @Date:   2016-10-11 11:16:13
* @Last Modified by:   Marte
* @Last Modified time: 2016-10-12 11:26:14
*/

$(function(){
    var oPatternParameter = $('.js_patternParameter').find('li');
    oPatternParameter.on('click',function(){
        $(this).addClass('current').siblings('li').removeClass('current');
        var index = $(this).index()
        $('#js_fDetails_Down').children('.js_fDetails_Down:eq('+index+')').css({'display':'block'})
        $('#js_fDetails_Down').children('.js_fDetails_Down:eq('+index+')').siblings('.js_fDetails_Down').css({'display':'none'})
    });


    var oPatternCloseBtn = $('.js_patternCloseBtn');  //弹框关闭
    var oIKnowBtn = $('.js_iKnowBtn');
    var oSubmitOrder = $('#submitOrder');

    function closeBouncedBtn(){
        $('#printerManualsBox').css({'display':'none'})
    };
    function openBouncedBtn(){
        $('#printerManualsBox').css({'display':'block'})
    };
    oPatternCloseBtn.on('click',function(){
        closeBouncedBtn()
    })
    oIKnowBtn.on('click',function(){
        closeBouncedBtn()
    })
    oSubmitOrder.on('click',function(){
        openBouncedBtn()
    })

     $('#etalage').etalage({
				 	thumb_image_width: 414,
					thumb_image_height: 414,
					source_image_width: 915,
					source_image_height: 1255,
					show_hint: true,
			 });
    var templateId = getURLParam().id,
    	template = loadTemplate(templateId);
    if(template) {
    	renderView(template);
    }
    $("#templateImages li").mouseover(function(event) {
    	var src = $(this).children('img').attr("src");
    	$("#bigStylePic1 img").attr("src",src);
    });
})
function loadTemplate(templateId) {
    	var template = null;
    	$.ajax({
			type:'get',
			url:'../../service/template/' + templateId,
			async:false,
			success:function(result) {
				if(result.code == 1) {
					template = result.data;
				}
			}
		});
    	return template;
}
function renderView(template) {
	$("#bigStylePic1 img").attr("src",template.stylePic1);
	$("#templateImages").append($("#imageTemplate").jqote(template));
	$("#templateName").text(template.name);
	$("#templateNum").text("纸样编号：" + template.no);
	$("#printNumber").text(template.no);
	$("#creator").text("作者：" + template.creator);
	$("#category").text("作品类别：" + template.categoryName);
	$("#createdDate").text("上传时间：" + new Date(template.createdDate).format("yyyy-MM-dd"));
	$("#printTimes").text("打印次数：" + template.printTimes);
	$("#shapeName").text("版型：" + template.shapeName);
	$("#styleName").text("风格：" + template.styleName);
	$("#printPrice").text("￥" + template.printPrice + "/次");
	$("#snapshot").attr("src",template.snapshot);
	var sizeInfo = template.sizeInfo;
	sizeInfo = JSON.parse(sizeInfo);
	$("#sizeInfo").append($("#sizeInfoTemplate").jqote(sizeInfo));
}