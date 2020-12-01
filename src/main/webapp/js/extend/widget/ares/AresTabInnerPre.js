/**
 * <code>
 * AresTabInnerPre 步骤导航条上一步
 * 
 * 选项卡组件
 * 
 * </code>
 */
define(function(require, exports) {
			var TAG = "AresTabInnerPre";
			YT.log.debug("---内部组件--init----", TAG);
			// 内部组件不提供外部调用支持
			var me = {};// me为当前控件的函数命名空间
			var currentTab, nextTab, preTab, curDiv, nextDiv;
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
							me.nextPre(widget, panel, app, json);
						});

			};

			me.nextPre = function(widget, panel, app, json) {
				YT.log.info('init begin', TAG);

				currentTab = panel.find(".yui-tab-step-nav>li.current");
				// 前一个tab
				preTab = currentTab.prev();
				// 当前选项卡对应的div区域
				curDiv = panel.find(".ui-tab-body>div.current");
				// 下一个div
				preDiv = curDiv.prev();

				var isFirst = (preTab.length == 0) ? true : false;

				panel.find(".ui-btn-wrap>button[data-extlib='AresTabInnerNext']").html("下一步");
				// 最前面一步之前隐藏“上一步”
				if (preTab.prev().length == 0) {
					widget.addClass("hidden");
				};
				me.changeTabCss();

				YT.log.info('init finish', TAG);
			}

			/**
			 * 标签样式切换
			 */
			me.changeTabCss = function() {
				me.changeCss("", "current", currentTab);
				me.changeCss("current", "", preTab);
				me.changeCss("", "over", currentTab.find("div"));
				me.changeCss("over", "", preTab.find("div"));
				me.changeCss("", "current", curDiv);
				me.changeCss("current", "", preDiv);
			}
			/**
			 * 样式切换
			 */
			me.changeCss = function(addClass, removeClass, widget) {
				if (widget != "undefined" && widget != "" && widget != null) {
					widget.removeClass(removeClass);
					widget.addClass(addClass);
				}
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