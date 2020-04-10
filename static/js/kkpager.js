(function($) {
	$.kkpager = function(el, config, enforceInit) {
		this.el = el;
		if (enforceInit || !this.inited) {
			this.init(config);
		}
		
		this.el.addClass('kkpager');

	}
	$.kkpager.prototype = {
		// pagerid : 'kkpager', //divID
		mode : 'link', // 模式(link 或者 click)
		pno : 1, // 当前页码
		// total : 1, //总页码
		status : 0,
		pageSize : 10, // 每页显示条数
		totalRecords : 0, // 总数据条数
		isShowFirstPageBtn : true, // 是否显示首页按钮
		isShowLastPageBtn : true, // 是否显示尾页按钮
		isShowPrePageBtn : true, // 是否显示上一页按钮
		isShowNextPageBtn : true, // 是否显示下一页按钮
		isShowTotalPage : true, // 是否显示总页数
		isShowCurrPage : true,// 是否显示当前页
		isShowTotalRecords : false, // 是否显示总记录数
		isGoPage : true, // 是否显示页码跳转输入框
		isWrapedPageBtns : true, // 是否用span包裹住页码按钮
		isWrapedInfoTextAndGoPageBtn : true, // 是否用span包裹住分页信息和跳转按钮
		hrefFormer : '', // 链接前部
		hrefLatter : '', // 链接尾部
		gopageWrapId : 'kkpager_gopage_wrap',
		gopageButtonId : 'kkpager_btn_go',
		gopageTextboxId : 'kkpager_btn_go_input',
		method:'GET',
		lang : {
			firstPageText : '首页',
			firstPageTipText : '首页',
			lastPageText : '尾页',
			lastPageTipText : '尾页',
			prePageText : '上一页',
			prePageTipText : '上一页',
			nextPageText : '下一页',
			nextPageTipText : '下一页',
			totalPageBeforeText : '共',
			totalPageAfterText : '页',
			currPageBeforeText : '当前第',
			currPageAfterText : '页',
			totalInfoSplitStr : '/',
			totalRecordsBeforeText : '共',
			totalRecordsAfterText : '条数据',
			gopageBeforeText : '&nbsp;转到',
			gopageButtonOkText : '确定',
			gopageAfterText : '页',
			buttonTipBeforeText : '第',
			buttonTipAfterText : '页'
		},
		initEvent : function() {
			var self = this;
			if (this.mode == 'click') {
				this.el.find('a.page_btn').click(function() {
					self._click(this);
				});
			}
			$('#' + this.gopageButtonId).click(function() {
				self.gopage.call(self);
			});
			$('#' + this.gopageTextboxId).focus(function() {
				self.focus_gopage.call(self);
			});
			$('#' + this.gopageTextboxId).keypress(function(evt) {
				self.keypress_gopage.call(self, evt);
			}).blur(function() {
				self.blur_gopage.call(self);
			});
		},
		_click : function(_el) {
			var pno = parseInt($(_el).attr('pno'));
			this.prv = (pno <= 2) ? 1 : (pno - 1);
			this.next = (pno >= this.total - 1) ? this.total : (pno + 1);
			this.hasPrv = (pno > 1);
			this.hasNext = (pno < this.total);
			return this._clickHandler(pno);
		},
		// 链接算法（当处于link模式）,参数n为页码
		getLink : function(n) {
			// 这里的算法适用于比如：
			// hrefFormer=http://www.xx.com/news/20131212
			// hrefLatter=.html
			// 那么首页（第1页）就是http://www.xx.com/news/20131212.html
			// 第2页就是http://www.xx.com/news/20131212_2.html
			// 第n页就是http://www.xx.com/news/20131212_n.html
			if (n == 1) {
				return this.hrefFormer + this.hrefLatter;
			}
			return this.hrefFormer + '_' + n + this.hrefLatter;
		},
		// 页码单击事件处理函数（当处于mode模式）,参数n为页码
		click : function(n) {
			// 这里自己实现
			// 这里可以用this或者kkpager访问kkpager对象
			return false;
		},
		// 获取href的值（当处于mode模式）,参数n为页码
		getHref : function(n) {
			// 默认返回'#'
			return '#';
		},
		// 跳转框得到输入焦点时
		focus_gopage : function() {
			var btnGo = $('#' + this.gopageButtonId);
			$('#' + this.gopageTextboxId).attr('hideFocus', true);
			btnGo.show();
			btnGo.css('left', '10px');
			$('#' + this.gopageTextboxId).addClass('focus');
			btnGo.animate({
				left : '+=30'
			}, 50);
		},
		// 跳转框失去输入焦点时
		blur_gopage : function() {
			var _this = this;
			setTimeout(function() {
				var btnGo = $('#' + _this.gopageButtonId);
				btnGo.animate({
					left : '-=25'
				}, 100, function() {
					btnGo.hide();
					$('#' + _this.gopageTextboxId).removeClass('focus');
				});
			}, 400);
		},
		// 跳转输入框按键操作
		keypress_gopage : function() {
			var event = arguments[0] || window.event;
			var code = event.keyCode || event.charCode;
			// delete key
			if (code == 8)
				return true;
			// enter key
			if (code == 13) {
				this.gopage();
				return false;
			}
			// copy and paste
			if (event.ctrlKey && (code == 99 || code == 118))
				return true;
			// only number key
			if (code < 48 || code > 57)
				return false;
			return true;
		},
		// 跳转框页面跳转
		gopage : function() {
			var str_page = $('#' + this.gopageTextboxId).val();
			if (isNaN(str_page)) {
				$('#' + this.gopageTextboxId).val(this.next);
				return;
			}
			var n = parseInt(str_page);
			if (n < 1)
				n = 1;
			if (n > this.total)
				n = this.total;
			if (this.mode == 'click') {
				this._clickHandler(n);
			} else {
				window.location = this.getLink(n);
			}
		},
		// 不刷新页面直接手动调用选中某一页码
		selectPage : function(n) {
			this['pno'] = n;
			this.generPageHtml();
		},
		// 分页使用ajax请求数据成功后回调函数
		// 在这方法中可以自定义数据渲染方式
		callback : function(data, pno) {
		},
		// 生成控件代码
		generPageHtml : function() {
			// if(enforceInit || !this.inited){
			// this.init(config);
			// }

			var str_first = '', str_prv = '', str_next = '', str_last = '';
			if (this.isShowFirstPageBtn) {
				if (this.hasPrv) {
					str_first = '<a '
							+ this._getHandlerStr(1)
							+ ' title="'
							+ (this.lang.firstPageTipText || this.lang.firstPageText)
							+ '">' + this.lang.firstPageText + '</a>';
				} else {
					str_first = '<span class="disabled">'
							+ this.lang.firstPageText + '</span>';
				}
			}
			if (this.isShowPrePageBtn) {
				if (this.hasPrv) {
					str_prv = '<a '
							+ this._getHandlerStr(this.prv)
							+ ' title="'
							+ (this.lang.prePageTipText || this.lang.prePageText)
							+ '">' + this.lang.prePageText + '</a>';
				} else {
					str_prv = '<span class="disabled">' + this.lang.prePageText
							+ '</span>';
				}
			}
			if (this.isShowNextPageBtn) {
				if (this.hasNext) {
					str_next = '<a '
							+ this._getHandlerStr(this.next)
							+ ' title="'
							+ (this.lang.nextPageTipText || this.lang.nextPageText)
							+ '">' + this.lang.nextPageText + '</a>';
				} else {
					str_next = '<span class="disabled">'
							+ this.lang.nextPageText + '</span>';
				}
			}
			if (this.isShowLastPageBtn) {
				if (this.hasNext) {
					str_last = '<a '
							+ this._getHandlerStr(this.total)
							+ ' title="'
							+ (this.lang.lastPageTipText || this.lang.lastPageText)
							+ '">' + this.lang.lastPageText + '</a>';
				} else {
					str_last = '<span class="disabled">'
							+ this.lang.lastPageText + '</span>';
				}
			}
			var str = '';
			var dot = '<span class="spanDot">...</span>';
			var total_info = '<span class="totalText">';
			var total_info_splitstr = '<span class="totalInfoSplitStr">'
					+ this.lang.totalInfoSplitStr + '</span>';
			if (this.isShowCurrPage) {
				total_info += this.lang.currPageBeforeText
						+ '<span class="currPageNum">' + this.pno + '</span>'
						+ this.lang.currPageAfterText;
				if (this.isShowTotalPage) {
					total_info += total_info_splitstr;
					total_info += this.lang.totalPageBeforeText
							+ '<span class="totalPageNum">' + this.total
							+ '</span>' + this.lang.totalPageAfterText;
				} else if (this.isShowTotalRecords) {
					total_info += total_info_splitstr;
					total_info += this.lang.totalRecordsBeforeText
							+ '<span class="totalRecordNum">'
							+ this.totalRecords + '</span>'
							+ this.lang.totalRecordsAfterText;
				}
			} else if (this.isShowTotalPage) {
				total_info += this.lang.totalPageBeforeText
						+ '<span class="totalPageNum">' + this.total
						+ '</span>' + this.lang.totalPageAfterText;
				;
				if (this.isShowTotalRecords) {
					total_info += total_info_splitstr;
					total_info += this.lang.totalRecordsBeforeText
							+ '<span class="totalRecordNum">'
							+ this.totalRecords + '</span>'
							+ this.lang.totalRecordsAfterText;
				}
			} else if (this.isShowTotalRecords) {
				total_info += this.lang.totalRecordsBeforeText
						+ '<span class="totalRecordNum">' + this.totalRecords
						+ '</span>' + this.lang.totalRecordsAfterText;
			}
			total_info += '</span>';

			var gopage_info = '';
			if (this.isGoPage) {
				gopage_info = '<span class="goPageBox">'
						+ this.lang.gopageBeforeText + '<span id="'
						+ this.gopageWrapId + '" class="kkpager_gopage_wrap">'
						+ '<input type="button" id="' + this.gopageButtonId
						+ '" class="kkpager_btn_go"  value="'
						+ this.lang.gopageButtonOkText + '" />'
						+ '<input type="text" id="' + this.gopageTextboxId
						+ '" class="kkpager_btn_go_input" value="' + this.next
						+ '" /></span>' + this.lang.gopageAfterText + '</span>';
			}

			// 分页处理
			if (this.total <= 8) {
				for (var i = 1; i <= this.total; i++) {
					if (this.pno == i) {
						str += '<span class="curr">' + i + '</span>';
					} else {
						str += '<a ' + this._getHandlerStr(i) + ' title="'
								+ this.lang.buttonTipBeforeText + i
								+ this.lang.buttonTipAfterText + '">' + i
								+ '</a>';
					}
				}
			} else {
				if (this.pno <= 5) {
					for (var i = 1; i <= 7; i++) {
						if (this.pno == i) {
							str += '<span class="curr">' + i + '</span>';
						} else {
							str += '<a ' + this._getHandlerStr(i) + ' title="'
									+ this.lang.buttonTipBeforeText + i
									+ this.lang.buttonTipAfterText + '">' + i
									+ '</a>';
						}
					}
					str += dot;
				} else {
					str += '<a ' + this._getHandlerStr(1) + ' title="'
							+ this.lang.buttonTipBeforeText + '1'
							+ this.lang.buttonTipAfterText + '">1</a>';
					str += '<a ' + this._getHandlerStr(2) + ' title="'
							+ this.lang.buttonTipBeforeText + '2'
							+ this.lang.buttonTipAfterText + '">2</a>';
					str += dot;

					var begin = this.pno - 2;
					var end = this.pno + 2;
					if (end > this.total) {
						end = this.total;
						begin = end - 4;
						if (this.pno - begin < 2) {
							begin = begin - 1;
						}
					} else if (end + 1 == this.total) {
						end = this.total;
					}
					for (var i = begin; i <= end; i++) {
						if (this.pno == i) {
							str += '<span class="curr">' + i + '</span>';
						} else {
							str += '<a ' + this._getHandlerStr(i) + ' title="'
									+ this.lang.buttonTipBeforeText + i
									+ this.lang.buttonTipAfterText + '">' + i
									+ '</a>';
						}
					}
					if (end != this.total) {
						str += dot;
					}
				}
			}
			var pagerHtml = '<div>';
			if (this.isWrapedPageBtns) {
				pagerHtml += '<span class="pageBtnWrap">' + str_first + str_prv
						+ str + str_next + str_last + '</span>'
			} else {
				pagerHtml += str_first + str_prv + str + str_next + str_last;
			}
			if (this.isWrapedInfoTextAndGoPageBtn) {
				pagerHtml += '<span class="infoTextAndGoPageBtnWrap">'
						+ total_info + gopage_info + '</span>';
			} else {
				pagerHtml += total_info + gopage_info;
			}
			pagerHtml += '</div><div style="clear:both;"></div>';
			this.el.html(pagerHtml);
			this.initEvent();
		},
		// 分页按钮控件初始化
		init : function(config) {
			$.extend(true, this, config);
			this.verify();
			// 如果当前配置包含url，则将当前分页的模式设置为click
			// url有值时表示当前分页控件将通过ajax的方式去请求数据，使用ajax方式请求数据时分布模式必须为click
			// mode为link时加载数据的方式采用的是传统的页面跳转方式来实现数据的加载
			if (this.url) {
				this.mode = 'click';
			}

			if (this.pno < 1)
				this.pno = 1;
			if (this.url) {
				this._ajaxHandler(true);
			}
			// this.total = (this.total <= 1) ? 1: this.total;
			this.total = (this.totalRecords <= this.pageSize) ? 1
					: (this.totalRecords % this.pageSize == 0 ? this.totalRecords
							/ this.pageSize
							: Math.floor(this.totalRecords / this.pageSize) + 1);
			if (this.pno > this.total)
				this.pno = this.total;
			this.prv = (this.pno <= 2) ? 1 : (this.pno - 1);
			this.next = (this.pno >= this.total - 1) ? this.total
					: (this.pno + 1);
			this.hasPrv = (this.pno > 1);
			this.hasNext = (this.pno < this.total);
			
			this.gopageWrapId = this.gopageWrapId + "_" + new Date().getTime();
			this.gopageButtonId = this.gopageButtonId + "_" + new Date().getTime();
			this.gopageTextboxId = this.gopageTextboxId + "_"
					+ new Date().getTime();
			this.generPageHtml();
			this.inited = true;
			
		},
		verify : function() {
			if (!$.isNumeric(this.pno)) {
				throw new Error("[kkpager] type error: pno");
			}
			// if(!$.isNumeric(this.total)){
			// throw new Error("[kkpager] type error: total");
			// }
			if (!$.isNumeric(this.totalRecords)) {
				throw new Error("[kkpager] type error: totalRecords");
			}
			if (!$.isNumeric(this.pageSize)) {
				throw new Error("[kkpager] type error: pageSize");
			}
		},
		_getHandlerStr : function(n) {
			if (this.mode == 'click') {
				// return 'href="'+this.getHref(n)+'" onclick="return
				// kkpager._clickHandler('+n+')"';
				return 'href="' + this.getHref(n) + '" pno="' + n
						+ '" class="page_btn"';
			}
			// link模式，也是默认的
			return 'href="' + this.getLink(n) + '"';
		},
		_clickHandler : function(n) {
			var res = false;
			if (this.click && typeof this.click == 'function') {
				this.selectPage(n);
				res = this.click.call(this, n) || false;
				if (this.url) {
					this._ajaxHandler();
				}
			}
			return res;
		},
		// ajax请求前调用方法，可以在该方法中配置ajax请求需要传递的参数
		beforeAjax : function() {},
		query:function(){
			this.pno = 1;
			this.init();
		},
		reload: function() {
			this.init();
		},
		_ajaxHandler : function(isInit) {
			if(this.beforeAjax() === false)return;
			var self = this;
			var params = $.extend({
				'pno' : this.pno,
				'pageSize' : this.pageSize
			}, this.params || {});
			$.ajax(this.url, {
				async : isInit ? false : true,
				data : params,
				dataType : 'json',
				type:this.method,
				success : function(data) {
					if (typeof data == 'string') {
						data = $.parseJSON(data);
					}
					if (isInit) {
						self.totalRecords = data.total;
					}
					self.callback(data.rows, self.pno);
				}
			});

		}
	}
	$.fn.kkpager = function() {
		var self = this, args = Array.prototype.slice.call(arguments);
		var kkpager = new $.kkpager(this, args[0], args[1]);
		this.data('kkpager', kkpager);
		return this;
	}
	$.fn.getKkpager = function(){
		return this.data('kkpager');
	}
})(jQuery);