(function() {
	var PAGE_HISTORY_TEM = [];
	var PAGE_HISTORY = [];
	var HISTORY_LEN = 3; // 历史页面保存个数
	var PAGE_INDEX = "";
	var CURRENT_URL = ""; // 当前页面路径
	var body = $('#mainBody'); // 顶层面板
	var _pages = $(".navbar-pages");// 顶层可切换页面
	var overlay = $('.ui-view-overlay');// 蒙版层
	var left = $('.ui-view-left');// 左侧滑页
	var right = $('.ui-view-right');// 右侧滑页
	var loadingPage;
	var isMore = false;
	var viewHeight = 0;
	var me = YT.NavUtil = {
		idSeed : 10000,
		getId : function() {
			return 'yt_pid_' + (++me.idSeed);
		},
		init : function() {
			me.initEvent();
		},
		initEvent : function() {
			overlay && overlay.on('click', me.closeBtnMenu);
		},
		/**
		 * 加载首页
		 */
		loadIndexPage : function(url,func) {
			if(W_HEIGHT < 650){
				viewHeight = 650;
			}else{
				viewHeight = W_HEIGHT;
			}
			loadingPage = $('#loaddingPage');
			var indexPage = $('<div data-page="index" class="page-view page-transform page-on-center"></div>');
			_pages.append(indexPage);
			PAGE_INDEX = url;
			this.loadPage(url, function(html) {
				indexPage.html(html);
				indexPage.attr('data-page', url);
				func && func();
			}, function() {
				func && func();
			});
		},
		/**
		 * 返回首页
		 */
		gotoIndex : function() {
			YT.log.info('返回首页');
			var history = _pages.find('.page-view:not(.page-on-center)');
			history.remove(); // PAGE_HISTORY
			var map = {
				pid : me.getId(),
				url : PAGE_INDEX
			}
			PAGE_HISTORY = [];
			PAGE_HISTORY_TEM = [];
			PAGE_HISTORY.push(map);
			me.prevPage();
		},
		/**
		 * 调转到下一页
		 * 
		 * @param url
		 * @returns {Boolean}
		 */
		nextPage : function(url) {
			if (isMore) {
				return false;
			}
			me.closeBtnMenu();
			isMore = true;
			// var thisUrl = document.location.href; //当前页面地址
			//YT.log.info('当前页面:'+CURRENT_URL+' ，跳转页面:'+url);
			if (CURRENT_URL == url) {
				isMore = false;
				return false;
			}
			YT.AuthBox && YT.AuthBox.hideAuthPanel();
			me.removeHistoryPage(CURRENT_URL); // 防止页面重复
			YT.openWaitPanel();
			this.loadPage(url, function(html) { // 加载新的页面
				var top = $(window).scrollTop();
				CURRENT_URL = url;
				loadingPage.show();
				if (PAGE_HISTORY_TEM.length >= HISTORY_LEN) {
					YT.log.info('超过历史页面保存长度');
					var history = PAGE_HISTORY_TEM.shift();
					var pid = history.pid;
					_pages.find('[data-pid=' + pid + ']').remove();
				}
				scroll(0, 0);
				$('body,html').css({'height':viewHeight+'px'});
				var current = _pages.find(".page-on-center"); // 当前页面
				body.addClass("page-transform");
				current.addClass('page-transform'); // 添加切换效果

				var prevPage = _pages.find('.page-on-left');// 上一个页面
				prevPage.removeClass('page-on-left').addClass('page-on-history');// 将上一页面改变成历史页面
				var id = me.getId();
				var thisUrl = current.attr('data-page'); // 当前页面地址
				current.attr("data-pid", id);
				current.addClass("page-on-left page-center-to-left").removeClass("page-on-center"); // 将当前页面变成上一页面
				var loaded = $("<div data-page='" + url + "' class='page-view page-transform page-on-center'></div>");
				_pages.append(loaded); // 生成新页面
				loaded.html(html).addClass("page-right-to-center");

				/* ########保存当前页面到历史中---begin---######## */
				var map = {
					pid : id,
					url : thisUrl,
					top : top
				}
				PAGE_HISTORY_TEM.push(map); // 保存当前页面地址到历史中
				PAGE_HISTORY.push(map);
				/* ########保存当前页面到历史中---end---######## */
				setTimeout(function() {
					current.removeClass("page-center-to-left");
					loaded.removeClass("page-right-to-center");
					loaded.removeClass("page-transform");
					body.removeClass("page-transform");
					$('body,html').css({'height':'auto'});
					isMore = false;
				}, 400);
				YT.Collection.setDatas();
				YT.hideWaitPanel();
				loadingPage.hide();
			}, function() { // 加载页面失败
				isMore = false;
			});
		},
		/**
		 * 返回上一页面(历史页面)
		 * 
		 * @returns {Boolean}
		 */
		prevPage : function() {
			if (isMore) {
				return false;
			}
			me.closeBtnMenu();
			isMore = true;
			if (PAGE_HISTORY.length == 0) {
				isMore = false;
				YT.gotoClientBack();
				return;
			}
			YT.AuthBox && YT.AuthBox.hideAuthPanel();
			var history = PAGE_HISTORY.pop();
			PAGE_HISTORY_TEM.pop();
			var pid = history.pid;
			var url = history.url;
			var top = history.top;
			CURRENT_URL = url;
			var hisPage = _pages.find('[data-pid=' + pid + ']');
			if (hisPage.length > 0) { // 存在历史页面
				YT.log.info('存在历史页面');
				$('body,html').css({'height':viewHeight+'px'});
				var left = _pages.find(".page-on-left");
				var center = _pages.find(".page-on-center");
				body.addClass("page-transform");
				center.addClass('page-transform');
				left.addClass("page-left-to-center page-on-center").removeClass("page-on-left");
				center.addClass("page-center-to-right").removeClass("page-on-center");
				_pages.find('.page-on-history:last').addClass('page-on-left').removeClass('page-on-history');
				$('html, body').animate({
					scrollTop: top
				}, 100);
				setTimeout(function() {
					left.removeClass("page-left-to-center");
					left.removeClass('page-transform');
					body.removeClass("page-transform");
					$('body,html').css({'height':'auto'});
					center.remove();
					isMore = false;
				}, 400);
				YT.hideWaitPanel();
				me.reloadPageTitle();
				YT.Collection.setDatas();
			} else {
				YT.log.info('历史页面中不存在----重新加载历史页面');
				YT.openWaitPanel();
				this.loadPage(url, function(html) {
					YT.hideWaitPanel();
					loadingPage.show();
					var left = $("<div data-page='" + url + "' class='page-view page-transform page-on-left'></div>");
					_pages.prepend(left);
					$('body,html').css({'height':viewHeight+'px'});
					var center = _pages.find(".page-on-center");
					center.addClass('page-transform');
					body.addClass("page-transform");
					left.addClass("page-left-to-center page-on-center").removeClass("page-on-left");
					center.addClass("page-center-to-right").removeClass("page-on-center");
					left.html(html);
					$('html, body').animate({
						scrollTop: top
					}, 100);
					setTimeout(function() {
						left.removeClass("page-left-to-center");
						left.removeClass('page-transform');
						body.removeClass("page-transform");
						$('body,html').css({'height':'auto'});
						center.remove();
						isMore = false;
					}, 400);
					YT.Collection.setDatas();
				}, function() {
					isMore = false;
				});
			}
		},
		/**
		 * 返回上一页面(并刷新)
		 * 
		 * @returns {Boolean}
		 */
		prevPageAndRefresh : function() {
			if (isMore) {
				return false;
			}
			me.closeBtnMenu();
			isMore = true;
			if (PAGE_HISTORY.length == 0) {
				isMore = false;
				YT.gotoClientBack();
				return;
			}
			YT.AuthBox && YT.AuthBox.hideAuthPanel();
			var history = PAGE_HISTORY.pop();
			PAGE_HISTORY_TEM.pop();
			var pid = history.pid;
			var url = history.url;
			var top = history.top;
			CURRENT_URL = url;
			var hisPage = _pages.find('[data-pid=' + pid + ']');
			if (hisPage.length > 0) { // 存在历史页面
				YT.log.info('存在历史页面');
				$('body,html').css({'height':viewHeight+'px'});
				var left = _pages.find(".page-on-left");
				var center = _pages.find(".page-on-center");
				body.addClass("page-transform");
				center.addClass('page-transform');
				left.addClass("page-left-to-center page-on-center").removeClass("page-on-left");
				center.addClass("page-center-to-right").removeClass("page-on-center");
				_pages.find('.page-on-history:last').addClass('page-on-left').removeClass('page-on-history');
				$('html, body').animate({
					scrollTop: top
				}, 100);
				setTimeout(function() {
					left.removeClass("page-left-to-center");
					left.removeClass('page-transform');
					body.removeClass("page-transform");
					$('body,html').css({'height':'auto'});
					center.remove();
					isMore = false;
				}, 400);
				YT.hideWaitPanel();
				me.reloadPageTitle();
				YT.Collection.setDatas();
				this.refreshPage();
			} else {
				YT.log.info('历史页面中不存在----重新加载历史页面');
				YT.openWaitPanel();
				this.loadPage(url, function(html) {
					YT.hideWaitPanel();
					loadingPage.show();
					var left = $("<div data-page='" + url + "' class='page-view page-transform page-on-left'></div>");
					_pages.prepend(left);
					$('body,html').css({'height':viewHeight+'px'});
					var center = _pages.find(".page-on-center");
					center.addClass('page-transform');
					body.addClass("page-transform");
					left.addClass("page-left-to-center page-on-center").removeClass("page-on-left");
					center.addClass("page-center-to-right").removeClass("page-on-center");
					left.html(html);
					$('html, body').animate({
						scrollTop: top
					}, 100);
					setTimeout(function() {
						left.removeClass("page-left-to-center");
						left.removeClass('page-transform');
						body.removeClass("page-transform");
						$('body,html').css({'height':'auto'});
						center.remove();
						isMore = false;
					}, 400);
					YT.Collection.setDatas();
					this.refreshPage();
				}, function() {
					isMore = false;
				});
			}
		},
		/**
		 * 重新载入当前页面
		 */
		refreshPage : function(){
			var url = YT.isEmpty(CURRENT_URL) ? PAGE_INDEX : CURRENT_URL;
			if(YT.isEmpty(url)){ //如果地址为空，调用客户端返回
				YT.gotoClientBack(); //
				return false;
			}
			var currPage = _pages.find('.page-on-center');
			YT.openWaitPanel();
			me.loadPage(url,function(txt){
				YT.hideWaitPanel();
				currPage.html(txt)
			});
		},
		/**
		 * 删除历史中存在的页面
		 */
		removeHistoryPage : function(url) {
			var h = [];
			var ht = [];
			$.each(PAGE_HISTORY, function(i, n) {
				var path = n.url;
				var pid = n.pid;
				if (url != path && path.indexOf(url) < 0) {
					h.push(n)
				} else {
					_pages.find('[data-pid=' + pid + ']').remove();
				}
			});
			$.each(PAGE_HISTORY_TEM, function(i, n) {
				var path = n.url;
				if (url != path && path.indexOf(url) < 0) {
					ht.push(n)
				}
			});
			PAGE_HISTORY = h;
			PAGE_HISTORY_TEM = ht;
		},
		/**
		 * 左侧菜单
		 */
		openLeftMenu : function() {
			// var overlay = $('.ui-view-overlay');
			overlay && overlay.show();
			// var left = $('.ui-view-left');
			left && left.show();
			setTimeout(function() {
				left.addClass('active');
			}, 100);
		},
		/**
		 * 右侧菜单
		 */
		openRightMenu : function() {
			// var overlay = $('.ui-view-overlay');
			overlay && overlay.show();
			// var right = $('.ui-view-right');
			right && right.show();
			body && body.addClass('ui-right-reveal');
			if (me.timeRight) {
				clearTimeout(me.timeRight);
			}
			me.timeRight = setTimeout(function() {
				right.addClass('active');
			}, 400);
		},
		/**
		 * 关闭两侧菜单
		 */
		closeBtnMenu : function() {
			me.closeLeftBtnMenu();
			me.closeRightBtnMenu();
		},
		/**
		 * 关闭左侧菜单
		 */
		closeLeftBtnMenu : function() {
			// var overlay = $('.ui-view-overlay');
			overlay && overlay.hide();
			// var left = $('.ui-view-left');
			body && body.removeClass('ui-right-reveal');
			left.addClass('close-view-left');
			if (me.timeLeftClose) {
				clearTimeout(me.timeLeftClose);
			}
			me.timeLeftClose = setTimeout(function() {
				left.removeClass('active close-view-left').hide();
			}, 400);
		},
		/**
		 * 关闭右侧菜单
		 */
		closeRightBtnMenu : function() {
			// var overlay = $('.ui-view-overlay');
			overlay && overlay.hide();
			// var right = $('.ui-view-right');
			right && right.removeClass('active');
			body && body.removeClass('ui-right-reveal');
			if (me.timeRightClose) {
				clearTimeout(me.timeRightClose);
			}
			me.timeRightClose = setTimeout(function() {
				right.hide();
			}, 400);
		},
		/**
		 * 重新加载页面菜单
		 */
		reloadPageTitle : function() {
			var page = _pages.find(".page-on-center"); // 当前页面
			var current = page.find('.page.current');
			YT.initPageTitle(current);
		},
		loadPage : function(url, success, error) {
			var xhr = $.ajax({
				url : url,
				data : {},
				type : 'get',
				success : success,
				timeout : 8000,
				error : function(data){
					error && error();
				},
				complete : function(XMLHttpRequest,status){
					YT.hideWaitPanel();
					if(status=='timeout'){
						xhr.abort();
					}else if(status == '0'){
						YT.alertinfo('网络连接异常!请检查您的网络');
					}else if(status == '404'){
						YT.alertinfo('请求页面不存在！');
					}
				}
			});
		}
	}
	me.init();
})();
