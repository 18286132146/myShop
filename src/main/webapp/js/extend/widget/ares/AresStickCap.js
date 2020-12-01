/**
 * <code>
 * AresStickCap 粘性滚动
 * 
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresStickCap";
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
		var capClazz = widget.attr("data-capClazz");// 浮动的模块
		var cap = panel.find('.' + capClazz);
		var listCap = widget.attr("data-listCap");// 列表框
		var list = panel.find(listCap);
		$(window).scroll(function() {
			var capH = cap.innerHeight();//当前模块的高度
			var t = document.documentElement.scrollTop || document.body.scrollTop; //获取滚动条的位置
			var scrollTop = cap.offset().top;//当前模块距离顶部的距离
			if(t>=(scrollTop+capH)){
				cap.addClass('ui-cap-fixed');
				list.addClass("ui-cap-padding");
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