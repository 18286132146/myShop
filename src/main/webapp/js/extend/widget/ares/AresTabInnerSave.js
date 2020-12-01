/**
 * <code>
 * AresTabInnerSave 步骤导航条保存
 * 
 * 选项卡组件
 * 
 * </code>
 */
define(function(require, exports) {
			var TAG = "AresTabInnerSave";
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
				widget.on('click', function() {
							me.tabSave(widget, panel, app, json);
						});

			};

			me.tabSave = function(widget, panel, app, json) {
				YT.log.info('init begin', TAG);
				currentTab = panel.find(".yui-tab-step-nav>li.current");
				// 当前选项卡对应的div区域
				curDiv = panel.find(".ui-tab-body>div.current");
				// 数据提交
				var dataUrl = currentTab.attr("data-url");
				if (YT.isEmpty(dataUrl)) {
					YT.log.info("data-url is null");
					return;
				}
				if (YT.Form.readyLock(curDiv, me)) {
					return;// 防页面初始化未结束而被提交
				}
				// 页面元素校验
				if (!YT.Form.validator(curDiv)) {
					return false;
				}

				// 获取页面元素值
				json = YT.Form.getFormJson(curDiv);
				// 数据请求
				var url = YT.dataUrl(dataUrl, true, json);
				YT.openWaitPanel();
				YT.ajaxData(url, json, function(data) {
							YT.hideWaitPanel(100);
							if (data.STATUS == '1') {
								currentTab.attr("data-save", "true");
								YT.showTips(data.MSG);
							} else {
								YT.showTips(data.MSG);
							}
						});
				YT.log.info('init finish', TAG);
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