/**
 * <code>
 * AresCardSlide 卡片横向滑动切换组件
 * 
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresCardSlide";
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
		var callback = widget.attr("data-callback");// 回调函数
		var tplHtmlFile = widget.attr("data-tplHtmlFile");// 模板文件路径
		var transUrl = widget.attr("data-transUrl");// 接口请求路径
		if (YT.isEmpty(transUrl)) {// 请求路径为空时
			YT.loadPage(widget, tplHtmlFile, json, function() {
				YT.CardMove.buildEle(widget, app[callback]);// 初始化卡片切换
				app[callback] && app[callback]();
			});
		} else {// 请求路径存在时
			var url = YT.dataUrl(transUrl);// 格式转换路径
			YT.ajaxData(url, json, function(data) {// 请求接口信息数据
				if (data.STATUS == '1') {
					YT.loadPage(widget, tplHtmlFile, data, function() {
						YT.CardMove.buildEle(widget, app[callback]);// 初始化卡片切换
						app[callback] && app[callback]();
					});
				} else {
					YT.hideWaitPanel();
					YT.alertinfo(rsp.MSG);
				}
			});
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