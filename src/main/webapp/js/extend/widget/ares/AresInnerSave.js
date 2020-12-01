/**
 * <code>
 * AresInnerSave 栏目内嵌保存事件；
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresInnerSave";
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
		var dataUrl = widget.attr("data-url");
		if (YT.isEmpty(dataUrl)) {
			YT.log.warn("data-url is empty ", TAG);
			return;
		}
		widget.on("click", function() {
			if (YT.Form.readyLock(panel, app)) {
				return;// 防页面初始化未结束而被提交
			}
			// 页面元素校验
			if (!YT.Form.validator(panel)) {
				return false;
			}
			// 获取页面元素值
			var json = YT.Form.getFormJson(panel);
			// 数据请求
			var url = YT.dataUrl(dataUrl, true, json);
			YT.openWaitPanel();
			YT.ajaxData(url, json, function(data) {
				YT.hideWaitPanel(100);
				YT.alertinfo("保存成功！");
			});
		});

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