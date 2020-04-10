//$(表单元素).read();
(function($){
	//只读
    $.fn.read = function(){
    	this.find(':input').each(function(index){
    		var $this = $(this);
    		$this.attr("readonly","readonly");
    	});
    }
    //可写
    $.fn.write = function(){
    	this.find(':input').each(function(index){
    		var $this = $(this);
    		$this.removeAttr("readonly","readonly");
    	});
    }
})(jQuery);