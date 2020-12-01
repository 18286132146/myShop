/**
 * <code>
 * AresTransWay 转账方式组件
 * 
 * 通过转账金额、转账汇路来更新转账方式
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresTransWay";
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
		YT.log.info('init begin', TAG);
		me.smartMatchTransWay(widget, panel, (json.NUM || 0) * 1);
		YT.log.info('reset finish', TAG);
	};

	// 回显转账方式根据金额和汇路
	me.smartMatchTransWay = function(widget, panel, num) {
		num = num ? num : 0;
		var _val1 = widget.find("option[value='1']");
		var _val2 = widget.find("option[value='2']");
		var _val3 = widget.find("option[value='3']");
		if (num == 1) {// 行内转账；超级网银 ，默认实时，可以更换转账方式为次日
			_val1.show();
			_val2.hide();
			_val3.show();
			widget.val("1");
		}
		if (num == 3) {// 大小额：默认普通，可以选择次日
			_val1.hide();
			_val2.show();
			_val3.show();
			widget.val("2");
		}
		if (num == 4) {// 信用卡还款，默认实时
			_val1.show();
			_val2.hide();
			_val3.hide();
			widget.val("1");
		}
	};

	// 组件的外置接口
	exports.init = me.init;
	exports.reset = me.reset;

})