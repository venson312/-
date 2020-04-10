/**
 *  author: leunpha
 *  date: 2014-5-1
 *  version 2.0
 *  dependency: jquery.js
 */
$.fn.upload = function (options) {
    options = options || {};
    options.dom = this;
    $.upload(options);
}
$.upload = function (options) {
    var settings = {
        dom: "",	//触发弹出选择上传文件框的dom元素，该项不需要手动配置
        //上传文件URL路径,由上传文件后端逻辑直接使用百度ueditor的所以默认配置百度ueditor上传文件的URL
        action: window.UEDITOR_CONFIG ? window.UEDITOR_CONFIG.serverUrl : './ueditor/jsp/controller.jsp',	
        fileName: 'upfile',
        //图片访问路径前缀
        //当图片存储路径为虚拟目录或存储在其他主机时则需要配置访问前缀才能正确在页面显示图片
        imageUrlPrefix:'pictures/',
        //参数
        /**
         * 百度ueditor上传文件时需要使用action参数指定上传文件的格式
         * action = uploadimage 图片文件<br />
         * action = uploadvideo 视频文件<br />
         * action = uploadfile	其他文件<br />
         */
        params: {action:'uploadimage'},
        //选择上传文件时支持选择的文件类型，默认支持选择jpg及png
        accept: ".jpg,.png",
        ieSubmitBtnText: "上传",
        //后端返回数据格式，支持json\text\xml
		dataType:"json",
		//上传完成后回调函数
        complete: function (result) {
        },
        //上传前执行
        submit: function () {
        },
        progress:function(loaded, total){
        	//文件上传进度，开发者可以重写此方法实现文件上传进度条；
        	//该方法不支持IE10以下版本
        	//loaded 当前已经上传的大小，total文件总大小
        }
    }
    settings = $.extend(true, settings, options);
    var ele = settings.dom;
    var join = '?',	//url与参数初始连接字符，默认为?
		index = settings.action.indexOf(join);
	join = index >= 0 ? '&' : join;
	for (var param in settings.params) {
	//    var div = $("<input type='hidden'/>").attr({name: param, value: settings.params[param]});
	//    input.after(div)
	//    div = null;
	//    delete div;
	//	参数以表单隐藏域的形式在表单提交时将数据传递给后台
	//	在表单的enctype的值为multipart/form-data时有可能出现request.getParamter方法获取到相应参数值的情况
	//	所以现在将所有参数追加到url的后面来将参数传递给后端服务器，这样能保证request.getParamter方法能获取到参数值
		settings.action = settings.action + join + param + '=' + settings.params[param];
	//	在url与第一个参数进行拼接后将连接字符值修改为&
		join = '&';
	}
    var iframeName = "leunpha_iframe_v" + Math.random() * 100,
    	formId = "leunpha_input_v" + Math.random() * 100;
    ele.attr('for', formId);
    var width = ele.outerWidth();
    var height = ele.outerHeight();
    var iframe = $("<iframe name='"+iframeName+"' style='display:none;' id='"+iframeName+"'></iframe>");
    var form = $("<form></form>");
    var top = -ele.height();
    var _cssTop = ele.css('top');
    if(_cssTop != 'auto'){
    	top = top + parseInt(_cssTop.replace('px', ''));
    }
    form.attr({
        target: iframeName,
        action: settings.action,
        method: "post",
        "class": "ajax_form",
        enctype: "multipart/form-data"
    }).css({
            width: width,
            height: height,
            position: "relative",
            zIndex:	99998,
            top: top
            //,left: (ele.position().left)
        });
    var input = $("<input type='file'/>");
    input.attr({
        accept: settings.accept,
        name: settings.fileName
    })
        .css({
            opacity: 0,
            //position: "absolute",
            width: width,
            height: height + "px",
            cursor: "pointer"
        });
    input.change(function () {
    	var args = arguments || [],
    		target = args[0].target;
        if(settings.submit.call(form, this.value, target.files[0].size) !== false){
	        if(window.XMLHttpRequest && window.FormData){
	        	ajaxUpload(target);
	        }else{
	        	$(this).parent("form").submit();
	        }
        }
    });
    function ajaxUpload(target){
    	var xhr = new XMLHttpRequest(),
    		formData = new FormData(),
        	file = target.files[0];
        formData.append('file', file);
        xhr.open('POST', settings.action);
        xhr.onload = function(){
        	var text = this.responseText;
        	callback(text);
        };
        xhr.upload.onprogress = function(evt){
        	if(evt.lengthComputable){
        		settings.progress.call(null, evt.loaded , evt.total);
        	}
        };
        xhr.send(formData);
    }
    form.append(input);
    ele.after(iframe);
    ele.after(form);
    //上传完成后根据dataType的类型对数据进行相应处理
    function callback(text){
    	if(text){
			var dataType = settings.dataType.toLocaleUpperCase();
			if( dataType == "JSON"){
				try{
					if(typeof text=="string"){
						text = $.parseJSON(text);
						text['rawUrl'] = text.url;
						if(settings.imageUrlPrefix){
							text.url = settings.imageUrlPrefix + text.url;
						}
					}
				}catch(e){
					text = "error";
				}
			}else if(dataType == "xml"){
				//字符串转xml 需开发者个人手动转换
				//参考 http://www.baidu.com/#wd=js%E5%AD%97%E7%AC%A6%E4%B8%B2%E8%BD%ACxm
			}else{
				//默认就是text
			}
		}
		settings.complete.call(null, text);
    };
    iframe.load(function () {
        var im = document.getElementById(iframeName);
        var text = $(im.contentWindow.document.body).text();
        callback(text);
    });
};