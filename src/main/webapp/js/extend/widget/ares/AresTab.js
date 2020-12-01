/**
 * <code>
 * AresTab 选项卡
 * 
 * 选项卡组件
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresTab";
	YT.log.debug("---内部组件--init----", TAG);
	// 内部组件不提供外部调用支持
	var me = {};// me为当前控件的函数命名空间
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
		YT.log.info('init begin', TAG);
		
		// 选项点击事件控制
		var tabItems = widget.find(".ui-tab-nav>*");
		var tabDivs = widget.find(".ui-tab-body>*");
		tabItems.on("click", function() {
			var tabItem = $(this);
			var index = tabItem.attr("data-index") * 1;
			var loaded = tabItem.attr("data-loaded");
			if (loaded == "true") {
				// 已加载不再加载
				// 控制显示项
				me.changeTab(tabItems, tabDivs, index);
				return;
			}
			var moduleUrl = tabItem.attr("data-ref");
			if (moduleUrl) {
				// 加载功能
				// 控制显示项
				me.changeTab(tabItems, tabDivs, index);
				var handle = tabDivs.eq(index);
				YT.loadPage(handle, moduleUrl, json, function() {
					tabItem.attr("data-loaded", "true");
				});
			}
		});

		tabItems.eq(0).click();

		YT.log.info('init finish', TAG);
	};

	me.changeTab = function(tabItems, tabDivs, index) {
		tabItems.removeClass("current");
		tabDivs.removeClass("current");
		YT.log.info('show tab index', index, TAG);
		tabItems.eq(index).addClass("current");
		tabDivs.eq(index).addClass("current");
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