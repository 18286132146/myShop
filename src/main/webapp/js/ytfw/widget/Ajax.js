/**
 * @classDesc 异步请求工具类，不支持跨域访问
 * @exports Fw/Ajax
 */
YT.Ajax = function(config) {
	YT.apply(this, config);
	YT.Ajax.superclass.constructor.call(this);
	return this;
};
YT.extend(YT.Ajax, YT.util.Observable, {
	autoLoad : true,
	autoDecode : true,
	params : {},
	/**
	 * 加载数据/页面
	 * 
	 * @param options
	 */
	load : function(options) {
		var me = this;
		YT.apply(me.params, options);
		me.lastOptions = options;
		if (me.fireEvent('beforeload', me) !== false) {
			me.isLoading = true;
			YT.log.debug("--ajax.url---", me.url);
			YT.ajaxData(me.url, me.params, function(data) {
				me.fireEvent('load', me, data);
				me.isLoading = false;
			});
		}
	},
	/**
	 * 重载
	 */
	reload : function() {
		this.load(this.lastOptions);
	}
});

/**
 * AJAX:通讯封装
 */
;
(function() {
	YT.TransAjax = function() {
		return {
			_timeoutflg : true,// 是否超时信息的标记
			options : {
				timeout : 120000,// 超时时长
				showError : true,// 是否显示错误信息
				loadText : false
			// 只加载文本
			},
			init : function(conf) {
				YT.apply(this.options, conf);
			},
			clear : function() {
				// 取消超时提醒时，需调用此方法。
				this._timeoutflg = false;
				if (this._timeoutHandle) {
					clearTimeout(this._timeoutHandle);
				}
			},
			start : function() {
			},
			newXhr : function() {
				var xmlHttpObj = null;
				try {
					xmlHttpObj = new XMLHttpRequest();
				} catch (e) {
				}
				return xmlHttpObj;
			},
			loadData : function(conf) {
				YT.log.debug("---ajaxData-init----", "TransAjax");
				conf = YT.apply({
					loadText : false,
					mediaType : "application/json"
				}, conf);
				this.post(conf);
			},
			post : function(conf) {
				var ajax = this;
				var opts = ajax.options;
				YT.apply(opts, conf);
				ajax.start();
				var xhr = this.newXhr();
				xhr.onreadystatechange = function() {
					var me = this;
					if (me.readyState == 4) {
						if (me.status == 200) {
							ajax.clear();
							YT.log.debug("---callback ", "TransAjax");
							var rpdata = YT.JsonEval(me.responseText);
							if (rpdata) {
								if (rpdata.STATUS == "005") {// Session超时
									YT.hideWaitPanel();
									setTimeout(function() {
										var P400 = 'page/00/P400.html';
										YT.nextPage(P400);	
									}, 500);
									return;
								} else if (rpdata.STATUS == "006") {// 重复提交
									YT.hideWaitPanel();
									YT.alertinfo("" + rpdata.MSG);
									return;
								} else if (rpdata.STATUS != "1") {// 状态码非成功状态
									if(rpdata.STATUS == "009"){
										//会话无效，用户已在其他设备上登录
										YT.hideWaitPanel();
										YT.sessionTimeout();
										return;
									}else if(opts.showError){
										YT.hideWaitPanel();
										YT.alertinfo(rpdata.MSG);
										return;
									}
								}
								opts.success && opts.success(rpdata);
							} else {
								if (opts.showError) {
									YT.alertinfo(NS.MSG.MsgAjaxError);
								}
								opts.failure && opts.failure(rpdata);
							}
						} else {
							if (opts.showError) {
								YT.alertinfo(NS.MSG.MsgAjaxError);
							}
						}
					}
				};
				xhr.open("POST", opts.url, true);
				xhr.setRequestHeader('Content-Type', opts.mediaType
						|| 'application/json');
				xhr.send(YT.JsonToStr(opts.param || opts.params || {}));
				if (opts.timeout > 0) {
					ajax._timeoutHandle = setTimeout(function() {
						if (xhr && ajax._timeoutflg) {
							YT.hideWaitPanel();
							xhr.abort();
							if (opts.showError) {
								YT.alertinfo(NS.MSG.MsgAjaxError);
							}
						}
					}, opts.timeout);
				}
			}
		};
	};
})();