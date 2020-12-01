/**
 * <code>
 * AresFormGroup 分类表单
 *
 *
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresFormGroup";
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
		var icons = widget.find('.ui-icon-form-group');
		icons.on('click', function(e) {
			var ele = $(e.currentTarget);// 获取当前元素节点
			var formGroup = ele.parent().parent().parent().parent();// 获取当前表单的根节点
			var hasCurrent = ele.parent().hasClass('current');
			if (hasCurrent) {// 当前节点可视状态
				ele.parent().removeClass('current');
				ele.removeClass('ui-icon-upArrow');
				ele.addClass('ui-icon-downArrow');
				formGroup.find('.y-form-group-body').addClass('hidden');
			} else {// 当前节点不可视状态
				ele.parent().addClass('current');
				ele.removeClass('ui-icon-downArrow');
				ele.addClass('ui-icon-upArrow');
				formGroup.find('.y-form-group-body').removeClass('hidden');
			}
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