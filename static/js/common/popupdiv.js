$.fn.popup = function(config){
	config = config || {};
	config['contentEl'] = this;
	var popup = new $.fn._popup(config);
	this.data('popup', popup)
	return this;
}
$.fn.getPopup = function(){
	return this.data('popup');
}
$.fn._popup = function(config){
	$.extend(this, config);
	this.init();
}
$.fn._popup.prototype = {
		autoShow:true,//是否自动显示
		type:'content',//内容加载方式, content将显示content属性或元素自身静态内容，ajax将使用ajax动态加载
		content:null,//弹窗显示内容，只有type为content有效
		url:null,//ajax加载数据URL,只有type为ajax是有效
		width:100,//弹出层宽度
		height:100,//弹出层高度
		el:null,
		contentEl:null,
		cloneContentEl:null,
		modal:true,//是否为模式窗体，默认为true
		popupContentWrapEl:null,
		//method:'GET',//内容请求方式，默认为GET
		lazy:false,//是否进行懒加载，true表示只有在弹出层显示时才加载弹出层内容
		popupMask:null,
		isCloseDestroy:true,
		onLoad:function(){},
		init:function(){
			this.generPopupHtml();
			var scope = this;
			this.popupClose.click(function(){
				scope.close();
			});
			if(this.lazy === false){
				this.load();
			}
			if(this.autoShow === true){
				this.show();
			}
		},
		generPopupHtml:function(){
			this.el = $('<div>').addClass('dialog').css({'width':this.width,'height':this.height,'opacity':1,'filter':'alpha(opacity=1)','alpha':0,'dispaly':'none'});
			
			var width = this.pageWidth();
			var height = this.pageHeight();
			var left = this.leftPosition();
			var top = this.topPosition();
			var dialogwidth = this.width;
			var topposition = (height / 2) - (this.height / 2);
			var leftposition = (width / 2) - (this.width / 2);
			
			var header = $('<div>').addClass('dialog-header').appendTo(this.el);
			this.popupTitle = $('<div>').addClass('dialog-title').appendTo(header);
			this.popupClose = $('<div>').addClass('dialog-close').appendTo(header).css('left', (this.width - 5) + 'px');
			this.popupContentWrapEl = $('<div>').addClass('dialog-content').appendTo(this.el);
			this.cloneContentEl = this.contentEl.clone();
			if(this.contentEl){
				this.contentEl.appendTo(this.popupContentWrapEl);
			}
			this.el.css('top', topposition + 'px').css('left', leftposition + 'px');
			$(document.body).append(this.el);
		},
		load:function(){
			if(this.type === 'content' && this.content){
				//var content = this.content || this.contentEl
				this.contentEl.append(this.content);
				this.onLoad();
			}else if(this.type === 'ajax'){
				if(!this.url){
					throw new Error("[popup] type Error: url is empty or undefined");
				}
				this.contentEl.load(this.url, this.onLoad);
			}else if(this.type === 'iframe'){
				var ifarme = $('<iframe name="popiframe" width="'+this.width+'" height="'+(this.height)+'" class="uploadiframe" border="0" src="'+this.url+'"></iframe>').appendTo(this.contentEl)
				iframe.load(this.onLoad);
			}
		},
		pageWidth:function(){
			return window.innerWidth != null ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body != null ? document.body.clientWidth : null;
		},
		pageHeight:function(){
			return window.innerHeight != null? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body != null? document.body.clientHeight : null;
		},
		topPosition:function(){
			return typeof window.pageYOffset != 'undefined' ? window.pageYOffset : document.documentElement && document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop ? document.body.scrollTop : 0;
		},
		leftPosition:function(){
			return typeof window.pageXOffset != 'undefined' ? window.pageXOffset : document.documentElement && document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft ? document.body.scrollLeft : 0;
		},
		onClose:function(){},//弹出层关闭事件，弹出层关闭后执行
		onBeforeClose:function(){},//弹出层关闭前事件，返回false将阻止关闭
		onShow:function(){},//弹出层显示事件，弹出层显示后执行
		onBeforeShow:function(){},//弹出层显示前事件，返回false将阻止显示
		show:function(){
			if(this.onBeforeShow() === false){
				return;
			}
			if(this.modal === true){
				this.popupMask = $('<div>').addClass('dialog-mask').css('height',document.body.scrollHeight + 'px').appendTo($(document.body));
			}
			this.el.show();
			this.onShow();
		},
		//弹出层关闭方法
		close:function(destory){
			if(this.onBeforeClose() === false){
				return;
			}
			if(destory !== false && this.isCloseDestroy === true){
				this.destory();
			}else{
				this.el.hide();
			}
			if(this.popupMask){
				this.popupMask.remove();
			}
		},
		//弹出层销毁方法
		destory:function(){
			this.el.remove();
			this.cloneContentEl.appendTo($(document.body));
		}
}