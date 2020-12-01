/**
 * <code>
 * AresRadiobox 特殊格式的单选框样式
 * 
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresRadiobox";
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
		var radios = widget.find('.y-radio');// 获取单选框的组件子信息
		var callback = widget.attr('data-callback');// 回调函数
		// 初始化默认的参数
		radios.each(function() {
			var box = $(this).find('input[type="radio"]');
			if (box.prop("checked")) {
				$(this).addClass("current");
			} else {
				$(this).removeClass("current");
			}
		});
		// 绑定绑定事件
		widget.on('click', '.y-radio', function() {
			var radio = $(this).find('input[type=radio]');// 获取当前点击的单选框
			var name = radio.attr('name');
			var radios = widget.find('input[type=radio]').filter(
					'[name=' + name + ']');
			radios.each(function() {
				$(this).parent().removeClass('current');
				$(this).removeAttr("checked");
			});
			$(this).addClass('current');
			radio.attr('checked', 'true');
			app[callback] && app[callback]();
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