/**
 * <code>
 * AresLoad 深度加载
 * 
 * 加载内容；
 * 
 * 1、无请求加载
 * <div data-tpl="path" data-extlib="AresLoad"></div>
 * 2、请求后加载
 * <div data-tpl="path" data-url="x/xx" data-keys="A1,B2,C3" data-extlib="AresLoad"></div>
 * 将指定路径的模版内容装配到功能中，装配时，会深度加载；
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresLoad";
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
		YT.log.info('init begin');
		var tplUrl = widget.attr("data-tpl");
		var transUrl = widget.attr("data-url");
		YT.log.info('init tpl:', tplUrl, ",url", transUrl);
		if (transUrl) {
			// 调AJAX请求
			var params = {};
			var keys = widget.attr("data-keys");
			YT.log.info('init keys:', keys);
			for ( var key in keys) {
				params[key] = json[key];
			}
			var url = YT.dataUrl(transUrl, true);
			YT.ajaxData(url, params, function(data) {
				// 加载当前元素的页面内容
				YT.loadPage(widget, tplUrl, data, null, me);
			});

		} else {
			YT.loadPage(widget, tplUrl, json, null, me);
		}
		YT.log.info('init finish', TAG);
	};

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