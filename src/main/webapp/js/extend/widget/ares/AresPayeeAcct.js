/**
 * <code>
 * AresPayeeAcct 收款账号
 * 
 * 外部关系
 * 1、卡BIN显示
 * 2、汇路显示
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresPayeeAcct";
	YT.log.debug("---内部组件--init----", TAG);
	// 内部组件不提供外部调用支持
	var me = {};// me为当前控件的函数命名空间
	/**
	 * <code>
	 * 初始化控件的事件、值、展现等信息 
	 * @param widget 	当前组件
	 * @param panel 	当前容器作用域，通常为page容器
	 * @param app 		处理器
	 * @param json 		数据处理
	 * </code>
	 */
	me.init = function(widget, panel, app, json) {
		YT.log.info('init begin', TAG);
		var elemAcctNo = widget.find("[data-name]");// 收款人账号
		var elemPicker = widget.find(".x-picker-payee");// 收款人选择器
		var url = elemPicker.data("goto");
		elemAcctNo.on("input", function() {
			// 更新卡BIN
			me.cardBinQuery(elemAcctNo, panel, app, json);
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
		var elemAcctNo = widget.find("[data-name]");// 收款人账号
		// 更新卡BIN
		me.cardBinQuery(elemAcctNo, panel, app, json);
		YT.log.info('reset finish', TAG);
	};

	// 卡 BIN 更新
	me.cardBinQuery = function(elemAcctNo, panel, app, json) {
		YT.log.info('cardBinQuery begin', TAG);
		var recAcct = YT.Format.removeSpace(elemAcctNo.val());
		var cardBinLength = elemAcctNo.attr("data-binlen") || "9";
		var binLen = cardBinLength * 1;
		if (recAcct.length > binLen) {
			var lastBin = elemAcctNo.data("lastBin");
			var tmpBin = recAcct.substring(0, binLen);
			if (lastBin == tmpBin) {
				return;// 只有 卡BIN 变更后才触发更新
			}
			elemAcctNo.data("lastBin", tmpBin);// 保留BIN历史
			var url = YT.dataUrl("transfer/acctInfoByBinQuery");
			var params = {
				REC_ACCT : recAcct
			}
			YT.ajaxData(url, params, function(data) {
				if (data.STATUS == '1') {
					if (YT.isEmpty(data.TRANS_ROUTE)) {
						// 如果查询到信息为空
						me.clear(panel.find(".y-rec-bank"));
						me.clearAndHide(panel.find(".y-rec-branch"));
					} else {
						// 收款行赋值
						panel.find(".x-recbank-name").val(data.BANK_NAME);
						panel.find("[data-name=BANK_CODE]").val(data.BANK_CODE);
						panel.find("[data-name=TRANS_ROUTE]").val(data.TRANS_ROUTE);
						// 更新转账方式
						var elemTransFlag = panel.find(".y-trans-way");
						YT.Form.resetWidget(elemTransFlag, panel, app, json);
					}
				} else {
					YT.alertinfo(data.MSG);
					return;
				}
				YT.hideWaitPanel();
			});
		}
		YT.log.info('cardBinQuery finish', TAG);
	};

	// 清理值
	me.clear = function(elems) {
		elems.find("[data-name]").val("");
		elems.filter("[data-name]").val("");
	};
	// 清理并隐藏
	me.clearAndHide = function(elems) {
		elems.addClass("hidden");
		me.clear(elems);
	};

	// 组件的外置接口
	exports.init = me.init;
	exports.reset = me.reset;

})