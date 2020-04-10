/*
    PageBox({
        pagesId: "id",       //ID值
        pagesType: 1,        //样式类型
        totalPages: 100,     //总页数
        visiblePages: 10,    //页面可见的页数范围
        currentPage: 3,      //当前页
        replaceChar: '...',   //替代字符 &hellip;
        defaultEvents:[]        //默认的事件绑定
    },callback);

*/
(function($){
    var defaults = {  
                pagesId: "",       //ID值
                pagesType: 1,        //样式类型
                totalPages: 1,     //总页数
                visiblePages: 10,    //页面可见的页数范围
                currentPage: 1,      //当前页
                replaceChar: '&hellip;' //省略字符
    };
    var opts = {};
    $.pageBox = function(options) {
        if(!(this instanceof $.pageBox)) {
            return new $.pageBox(options)
        }
        this.opts = $.extend({}, defaults, options); 
        this.opts.totalPages = parseInt(this.opts.totalPages);
        this.opts.visiblePages = parseInt(this.opts.visiblePages);
        this.opts.currentPage = parseInt(this.opts.currentPage);
    }
      
    $.pageBox.prototype = {
        //初始化组件
        init: function() {
            var pages = this.pageNum();
            this.container = $("#"+this.opts.pagesId);
            this.container.undelegate();
            this.container.html(this.createPages(pages));
            this.bindEvent();
        },
        createNum:function(pages){
            var html='';
            if(this.opts.currentPage === 1 ){
                html += "<span href='javascript:;' class='disable'>&lt;上一页</span>";
            }else{
                html += "<a href='javascript:;' class='prev' value="+(this.opts.currentPage-1)+">&lt;上一页</a>";
            }
            if(pages[0] >= 2 ){
                html += "<a href='javascript:;' class='pages' value='1'>1</a>";
                html += "<em class='replacechar'>"+this.opts.replaceChar+"</em>";
            }
            for(var i in pages){
                if (this.opts.currentPage === pages[i]) {
                    html += "<a href='javascript:;' value = "+pages[i]+" class='pages current'>"+pages[i]+"</a>";
                }else{
                    html += "<a href='javascript:;' value = "+pages[i]+" class='pages'>"+pages[i]+"</a>";
                }
            }
            if(pages[pages.length-1] <= this.opts.totalPages-1 ){
                html += "<em class='replacechar'>"+this.opts.replaceChar+"</em>";
                html += "<a href='javascript:;' class='pages' value='"+ this.opts.totalPages +"'>"+ this.opts.totalPages +"</a>";
            }
            if (this.opts.currentPage === this.opts.totalPages) {
                html += "<span href='javascript:;' class='disable'>下一页&gt;</span>";
            }else{
                html += "<a href='javascript:;' class='next' value="+(this.opts.currentPage+1)+">下一页&gt;</a>";
            };
            return html;
        },
        //根据pagesType生成不同的样式
        createPages : function(pages){
            var html = '';
            if(this.opts.pagesType === 1){
                html += '<div class="pb_num">'+this.createNum(pages)+'</div>';
                html += "<em>共"+this.opts.totalPages+"页，到<input type='type' class='pageNum' "+(this.opts.totalPages == 1?"disabled":"")+" />页</em>";
                if (this.opts.totalPages == 1) {
                    html += "<span class='disable'> 确定 </span>";
                }else{
                    html += "<a href='javascript:;' class='gotopage'> 确定 </a>";
                };
            }
            return html;
        },
        //根据可见页数范围生成相应页数
        pageNum :function(){
            var pages = [],
                visiblePages = this.opts.visiblePages,
                currentPage = this.opts.currentPage,
                totalPages = this.opts.totalPages;
            if (visiblePages > totalPages) {
                visiblePages = totalPages;
            }
            var half = Math.floor(visiblePages / 2);
            var start = currentPage - half + 1 - visiblePages % 2;
            var end = currentPage + half;
            if (start < 1) {
                start = 1;
                end = visiblePages;
            }
            if (end > totalPages) {
                end = totalPages;
                start = 1 + totalPages - visiblePages;
            }
            var itPage = start;
            while (itPage <= end) {
                pages.push(itPage);
                itPage++;
            }
            return pages;
        },

        //换页
        setPages : function(num){
            this.opts.currentPage = num;
            var pages = this.pageNum();
            this.container.find(".pb_num").html(this.createNum(pages)); 
        },
        //给每个分页绑定事件
        bindEvent : function(){
            var _this = this; 
            _this.container.delegate('a:not(".gotopage")','click',function(){
                _this.setPages(parseInt($(this).attr("value")));
            });
            _this.container.delegate('a.gotopage','click',function(){
                var pageNum = $.trim(_this.container.find('.pageNum').val());
                if(!isNaN(pageNum)&&pageNum >= 1 && pageNum <= _this.opts.totalPages){
                    _this.setPages(parseInt(pageNum));
                }else{
                    alert("请输入有效的页码数！");
                }
           });
            _this.container.delegate('.pageNum','keydown',function(e){
                var a=e.keyCode;  
                if(a===13){  
                    var pageNum = $.trim($(this).val());
                    if(!isNaN(pageNum)&&pageNum >= 1 && pageNum <= _this.opts.totalPages){
                        _this.setPages(parseInt(pageNum));
                    }else{
                        alert("请输入有效的页码数！");
                    }
                }
            })
        },
        addNumClick: function(callback) {
            this.container.delegate('.pages','click',function(){
                callback.call(this,$(this).attr("value"));
            });
        },
        addPrevClick: function(callback) {
            this.container.on("click",".prev",function(){
                callback.call(this,$(this).attr("value"));
            });
        },
        addNextClick: function(callback) {
            this.container.on("click",".next",function(){
                callback.call(this,$(this).attr("value"));
            });
        },
        addGotoClick: function(callback) {
            var _this = this;
            _this.container.undelegate('a.gotopage','click');
            _this.container.undelegate('.pageNum','keydown');
            _this.container.delegate('a.gotopage','click',function(){
                var pageNum = $.trim(_this.container.find('.pageNum').val());
                if(!isNaN(pageNum)&&pageNum >= 1 && pageNum <= _this.opts.totalPages){
                    _this.setPages(parseInt(pageNum));
                    callback.call(this,pageNum);
                }else{
                   alert("请输入有效的页码数！");
                }
           });
            _this.container.delegate('.pageNum','keydown',function(e){
                var a=e.keyCode;  
                if(a===13){  
                    var pageNum = $.trim($(this).val());
                    if(!isNaN(pageNum)&&pageNum >= 1 && pageNum <= _this.opts.totalPages){
                        _this.setPages(parseInt(pageNum));
                        callback.call(this,pageNum);
                    }else{
                        alert("请输入有效的页码数！");
                    }
                }
            })
        },
        addBtnClick: function(callback) {
            this.container.on('click',"a:not('.gotopage')",function(){
                callback.call(this,$(this).attr("value"));
            });
        }
    };
    
})(jQuery)

