/**
 * <code>
 * AresTabInnerNext 步骤导航条下一步
 * 
 * 选项卡组件
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresTabInnerNext";
	YT.log.debug("---内部组件--init----", TAG);
	// 内部组件不提供外部调用支持
	var me = {};// me为当前控件的函数命名空间
	var currentTab, nextTab, preTab, curDiv, nextDiv;
	var tabCach = [];// 用于缓存每个页面数据，与当前页面数据比对是否需要重新走后台
	/**
	 * <code>
	 * 初始化控件的事件、值、展现等信息
	 * 
	 * @param widget 当前组件
	 * @param panel 当前容器作用域，通常为page容器
	 * @param app 处理器
	 * @param json 数据处理
	 * </code>
	 */
	me.init = function(widget, panel, app, json) {
		widget.on('click', function() {
					me.nextStep(widget, panel, app, json);
				});

	};

	me.nextStep = function(widget, panel, app, json) {
		YT.log.info('init begin', TAG);

		currentTab = panel.find(".yui-tab-step-nav>li.current");
		// 下一个tab
		nextTab = currentTab.next();
		// 当前选项卡对应的div区域
		curDiv = panel.find(".ui-tab-body>div.current");
		// 下一个div
		nextDiv = curDiv.next();

		var isLast = (nextTab.length == 0) ? true : false;

		// 最后一步之前把“下一步”改成完成
		if (nextTab.next().length == 0) {
			widget.html("完成");
		}
		// 页面跳转
		var dataRef = nextTab.attr("data-ref");
		if (YT.isEmpty(dataRef) && !isLast) {
			YT.log.info("data-Ref is null");
			return;
		}
		// 如果页面已点过保存按钮，直接做页面切换
		if (currentTab.attr("data-save")) {
			if (!isLast) {
				YT.loadPage(nextDiv, dataRef, {}, function() {
							me.changeTabCss();
						});
				currentTab.attr("data-loaded", "true");
			}
			YT.log.info('init finish', TAG);
			return;

		}

		// 数据提交
		var dataUrl = currentTab.attr("data-url");
		if (YT.isEmpty(dataUrl)) {
			YT.log.info("data-url is null");
			return;
		}
		if (YT.Form.readyLock(curDiv, me)) {
			return;// 防页面初始化未结束而被提交
		}

		// 页面元素校验
		if (!YT.Form.validator(curDiv)) {
			return false;
		}
		// 获取页面元素值
		json = YT.Form.getFormJson(curDiv);
		// 数据请求
		var url = YT.dataUrl(dataUrl, true, json);
		YT.openWaitPanel();
		YT.ajaxData(url, json, function(data) {
			YT.hideWaitPanel(100);
			if (data.STATUS == '1' && !isLast) {
				YT.loadPage(nextDiv, dataRef, {}, function() {
					panel.find(".ui-btn-wrap>button[data-extlib='AresTabInnerPre']").removeClass("hidden");
					me.changeTabCss();
				});

			} else {
				YT.showTips(data.MSG);
			}
		});
		YT.log.info('init finish', TAG);
	}

	/**
	 * 标签样式切换
	 */
	me.changeTabCss = function() {
		me.changeCss("", "current", currentTab);
		me.changeCss("current", "", nextTab);
		me.changeCss("over", "", nextTab.find("div"));
		me.changeCss("", "current", curDiv);
		me.changeCss("current", "", nextDiv);
	}
	/**
	 * 样式切换
	 */
	me.changeCss = function(addClass, removeClass, widget) {
		if (widget != "undefined" && widget != "" && widget != null) {
			widget.removeClass(removeClass);
			widget.addClass(addClass);
		}
	}

	/**
	 * <code>
	 * 重置控件的值、展现等信息，不含事件定义
	 * 
	 * @param widget 当前组件
	 * @param panel 当前容器作用域，通常为page容器
	 * @param app 处理器
	 * @param json 数据处理
	 * </code>
	 */
	me.reset = function(widget, panel, app, json) {
		YT.log.info('reset begin', TAG);
		YT.log.info('reset finish', TAG);
	};

	// 组件的外置接口
	exports.init = me.init;
	exports.reset = me.reset;

})