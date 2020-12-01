/**
 * <code>
 * AresPickerPayee 收款人组件
 * 
 * 切换收款人
 * 
 * 构成关系
 * 1、收款人
 * 2、收款人输入项
 * 3、收款人选择
 * 外部关系
 * 1、卡BIN显示
 * 2、汇路显示
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresPickerPayee";
	YT.log.debug("---内部组件--init----", TAG);
	// 内部组件不提供外部调用支持
	var me = {};// me为当前控件的函数命名空间
	/**
	 * 初始化控件的事件、值、展现等信息
	 * 
	 * @param widget
	 *            当前组件
	 * @param panel
	 *            当前容器作用域，通常为page容器
	 * @param app
	 *            处理器
	 * @param json
	 *            数据处理
	 * 
	 */
	me.init = function(widget, panel, app, json) {
		YT.log.info('init begin', TAG);
		var elemPayee = widget.find("[data-name]");// 收款人名称
		var elemPicker = widget.find(".x-picker-payee");// 收款人选择器
		var url = elemPicker.data("goto");
		elemPicker.on("click", function() {
			var callback = elemPicker.attr('data-callback');
			// 回调函数示例
			var func = YT.getFunctionName(function() {
				// 收款账号
				var elemPayeeAcct = panel.find(".y-payee-acct");
				YT.Form.resetWidget(elemPayeeAcct, panel, app, json);
				// 回调扩展
				app[callback] && app[callback](arguments);
			});
			elemPicker.attr('data-func', func);
			// 页面跳转
			YT.nextPage(url, panel)
		})

		YT.log.info('init finish', TAG);
	};

	/**
	 * 重置控件的值、展现等信息
	 * 
	 * @param widget
	 *            当前组件
	 * @param panel
	 *            当前容器作用域，通常为page容器
	 * @param app
	 *            处理器
	 * @param json
	 *            数据处理
	 * 
	 */
	me.reset = function(widget, panel, app, json) {
		YT.log.info('reset begin', TAG);
		YT.log.info('reset finish', TAG);
	};

	// 组件的外置接口
	exports.init = me.init;
	exports.reset = me.reset;

})