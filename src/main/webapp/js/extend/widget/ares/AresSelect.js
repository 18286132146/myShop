/**
 * <code>
 * AresSelect 下拉框
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresSelect";
	YT.log.debug("---内部组件--init----", TAG);
	// 内部组件不提供外部调用支持
	var me = {};// me为当前控件的函数命名空间
	// 下拉选项模板
	me.selectGroupTpl = [
			'<select class="x-p-select" data-name="${dataName}"',
			'{@each LIST as item,index}',
			'<option value="${item[itemValue]}">${item[itemLabel]}</option>',
			'{@/each}', '</select>' ].join('');
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
		var ele = widget.find('.y-select');
		if (ele.length < 1) {
			YT.log.debug("ele ", ele.length);
			return;
		}
		var transUrl = widget.attr('data-url');// 数据请求路径
		if (YT.isEmpty(transUrl)) {// 判断请求路径是否存在
			YT.log.debug("transUrl is null ", TAG);
			return;
		}
		var paramKeys = widget.attr('data-param-key');// 上送参数过滤
		// 过滤请求参数
		var params = {};
		if (!YT.isEmpty(paramKeys)) {
			var keys = paramKeys.split(',');
			for (var i = 0; i < keys.length; i++) {
				var k = keys[i];
				params[k] = json[k];
			}
		}
		var listKey = widget.attr('data-list-key');// 列表元素主键
		var lkey = YT.isEmpty(listKey) ? "LIST" : listKey;
		var itemValue = widget.attr('data-item-value');// 元素值key
		var itemLabel = widget.attr('data-item-label');// 元素文本key
		var dataName = widget.attr('data-name');// 字段名称
		var eventChange = widget.attr('data-change');// 下拉框选择事件
		// ajax请求列表数据
		ele.attr("data-ready", "false");
		var url = YT.dataUrl(transUrl);
		function initTpl(tpl, data) {// 渲染相关的模板文件
			var html = YT.template(tpl, {
				dataName : dataName,
				itemValue : itemValue,
				itemLabel : itemLabel,
				LIST : data[lkey]
			});
			ele.html(html);
			ele.attr("data-ready", "true");
			if (!YT.isEmpty(eventChange)) {// 设置下拉选框change回调
				ele.find('.x-p-select').attr('data-change', eventChange);
				ele.trigger('change');// 模拟选择事件
			}
		}
		var tplHtml = widget.attr('data-tpl-html');// 模板文件路径
		me.querySelectOption(url, params, tplHtml, initTpl);
		YT.log.info('init finish', TAG);
	};
	/**
	 * <code>
	 * 查询下拉框选项信息参数
	 * @param url 请求交易路径
	 * @param params 请求参数
	 * @param tplHtml 模板内容
	 * @param callback 回调函数
	 * </code>
	 */
	me.querySelectOption = function(url, params, tplHtml, callback) {
		YT.ajaxData(url, params, function(data) {
			if (data.STATUS == '1') {// 交易成功
				if (!YT.isEmpty(tplHtml)) {
					YT.getPage(tplHtml, {}, function(tpl_html) {
						callback && callback(tpl_html, data);
					});
				} else {
					callback && callback(me.selectGroupTpl, data);
				}
			} else {
				YT.alertinfo('列表信息加载失败!');
			}
		});
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