$(function() {
	var TAG = "YT.Input";
	YT.log.debug("---init--", TAG);
	var FormatUtil = YT.Format;
	var selectParams = [ '{@each LIST as item,index}',
			'<option value="${item.KEY}">${item.VALUE}</option>', '{@/each}' ]
			.join('');
	var selectWeeks = [ '{@each LIST as item,index}',
			'<option value="${item.ID}">${item.WEEK}</option>', '{@/each}' ]
			.join('');
	var selectEdit = [ '{@each LIST as item,index}',
			'<option>${item.VALUE}</option>', '{@/each}' ].join('');
	var wb_checkbox = [ '{@each LIST as item,index}',
		'<span class="wbui-radio" data-value="${item.KEY}">${item.VALUE}</span>', '{@/each}' ]
	.join('')
	var me = YT.Input = {
		/**
		 * 初始化事件
		 * 
		 * @param panel
		 * @param app
		 * @param json
		 */
		init : function(panel, app, json) {
			me.initMoneyController(panel, app, json);
			me.initAcctNo(panel, app, json);
			me.initSwitch(panel, app, json);
			me.initSelect(panel, app, json);
			me.initSelectParams(panel, app, json);
			me.initSelectWeek(panel, app, json);
			me.initPhoneBook(panel, app, json);
			me.initSms(panel, app, json);
			me.callPhone(panel, app, json);
			me.initAgreement(panel, app, json);
			me.initCheckbox(panel, app, json);
		},
		/**
		 * 初始化协议
		 */
		initAgreement : function(panel, app, json) {
			var ele = panel.find(".Agreemens");
			if (ele.length < 1) {
				return;
			}
			YT.log.info("agreemen ele ", ele.length);
			ele.on("click", function() {
				var url = ele.attr("data-url");
				YT.nextPage(url);
			});
		},
		/**
		 * 金额控件初始化
		 * 
		 * @param panel
		 * @param app
		 * @param json
		 */
		initMoneyController : function(panel, app, json) {
			var ele = panel.find("[data-type='money']");
			if (ele.length < 1) {
				return;
			}

			YT.log.info("money ele ", ele.length);
			var cnEle = panel.find("[data-zh='r-amt-zh']");// 中文金额
			var change = ele.data("change");
			ele.on("input", function() {
				var amt = YT.Format.unfmtAmt(ele.val());
				if (YT.isEmpty(amt) || YT.isEmpty(amt.trim())) {
					cnEle.text("");
				} else {
					var chinese = YT.Format.fmtNumber2Chinese(amt);
					cnEle && cnEle.text(chinese);
					change && app && app[change] && app[change]();
				}
			});
		},
		/**
		 * 格式化账号
		 */
		initAcctNo : function(panel, app, json) {
			var ele = panel
					.find("input[data-type$='acct'],input[data-type^='acct']");
			ele.on("input", function() {
				var value = this.value.replace(/^\D*$/g, "");
				var txt = YT.Format.fmtAcctNo(value, false);
				var item = $(this);
				item.val(txt);
			});
		},
		/**
		 * 开关组件
		 * 
		 * @param panel
		 * @param app
		 * @param json
		 * @desc data-handle="r-switch" //开关操作区域 <br>
		 *       data-toggle="clazz" //控制开关操作区域
		 * 
		 */
		initSwitch : function(panel, app, json) {
			var ele = panel.find("[data-type='switch']");
			if (ele.length < 1) {
				return;
			}
			var rs, clazz;
			var rh = ele.attr('data-handle');
			if (YT.isEmpty(rh)) {
				rs = panel.find('[data-handle="r-switch"]');
				clazz = rs.attr('data-toggle');
			} else {
				rs = panel.find('.' + rh);
				clazz = ele.attr('data-toggle');
			}
			if (rs.length < 1) {
				return;
			}
			ele.on('click', function() {
				changeClazz();
			});
			function changeClazz() {
				if (ele.prop("checked")) {
					rs.removeClass(clazz)
				} else {
					rs.addClass(clazz);
				}
			}
			changeClazz();
		},
		/**
		 * 可输可选组件
		 * 
		 * @param panel
		 * @param app
		 * @param json
		 */
		initSelect : function(panel, app, json) {
			var ele = panel.find(".y-select-edit");// 自身组件区域
			if (ele.length < 1) {
				return;
			}

			var xele = ele.find(".x-picker");// 内部组件区域
			if (xele.length < 1) {
				return;
			}

			var exele = xele.find("select");

			if (exele.length < 1) {
				return;
			}
			var value = xele.attr('data-value');
			value = YT.isEmpty(value) ? "VALUE" : value;

			var url = xele.attr('data-url');
			url = YT.isEmpty(url) ? "core/remark" : url;
			url = YT.dataUrl(url);
			ele.attr("data-ready", "false");
			YT.ajaxData(url, {}, function(data) {
				if (data.STATUS == '1') {
					var list = data.LIST;
					var tempList = [];
					tempList.push({});// 设置第一条数据为空
					$.each(list, function(i, n) {
						var map = {
							"VALUE" : n[value]
						}
						tempList.push(map);
					});
					var html = YT.template(selectEdit, {
						LIST : tempList
					});
					exele.html(html);
					ele.attr("data-ready", "true"); // 实例化完成
				} else {
					YT.hideWaitPanel();
					YT.alertinfo(data.MSG);
				}
				exele.on('change', function() {//
					var element = $(this);
					var text = element.find('option:checked').text();
					panel.find('.y-select-edit input').val(text);
				});
			});

		},
		/**
		 * 模拟checkbox
		 * * 
		 * @param panel
		 * @param app
		 * @param json
		 * @desc 
		 
 			<div class="wbui-form-item-radio-group wb_simulate_checkbox" data-key="PAR_VALUE" data-value="PAR_NAME" 
            data-url="mParameterService/queryParameter" data-getparams="getParams_03" data-callback="callback_03"></div>
		 * 
		 */
		initCheckbox : function(panel, app, json) {
			var ele = panel.find(".wb_simulate_checkbox"); // 自身组件区域
			if (ele.length < 1) {
				return;
			}
			ele.each(function(i,el){
				var ele = $(el);
				
				var key = ele.attr('data-key');
				key = YT.isEmpty(key) ? "KEY" : key;
				var value = ele.attr('data-value');
				value = YT.isEmpty(value) ? "VLAUE" : value;
				var url = ele.attr('data-url');
				url = YT.dataUrl(url);
				var params = ele.attr('data-getparams');
				params = YT.isEmpty(params) ? {} : app[params]();
				ele.attr("data-ready", "false");
				
				YT.ajaxData(url, params, function(data) {
					if (data.STATUS == "1") {
						var list = data.LIST;
						var tempList = [];
						$.each(list, function(i, n) {
							var item = n;
							var map = {
								"KEY" : item[key],
								"VALUE" : item[value]
							}
							tempList.push(map);
						});

						var html = YT.template(wb_checkbox, {
							LIST : tempList
						});
						ele.html(html);
						callback();
						ele.attr("data-ready", "true"); // 实例化完成
					} else {
						YT.hideWaitPanel();
						YT.alertinfo(data.MSG);
					}
					ele.find(".wbui-radio").on('click', function(e) {
						var that = $(this);
						that.addClass("active").siblings().removeClass("active");
						callback(that);
					});
					function callback(that) {
						var callback = ele.data('callback');
						if (!YT.isEmpty(callback)) {
							var val = !that?"":that.data("value");
							app[callback] && app[callback](val);
						}
					}
				});
				
				
			});
			
			
			
			
			
			
			var ele = panel
					.find("input[data-type$='acct'],input[data-type^='acct']");
			ele.on("input", function() {
				var value = this.value.replace(/^\D*$/g, "");
				var txt = YT.Format.fmtAcctNo(value, false);
				var item = $(this);
				item.val(txt);
			});
		},
		/**
		 * 系统参数选择组件：<br>
		 * 例如：证件类型 <br>
		 * data-key --与报文KEY值保持一致 例如证件号对应字段：ID <br>
		 * data-value --与报文VALUE值对应一致，例如证件类型：ID_TYPE <br>
		 * data-url --URL地址 data-callback --回调函数 <br>
		 */
		initSelectParams : function(panel, app, json) {
			var ele = panel.find(".y-select-params"); // 自身组件区域
			if (ele.length < 1) {
				return;
			}
			var xele = ele.find("select")
			if (xele.length < 1) {
				return;
			}
			
			ele.each(function(i,el){
				var ele = $(el);
				var xele = ele.find("select");
				
				
				var key = ele.attr('data-key');
				key = YT.isEmpty(key) ? "KEY" : key;
				var value = ele.attr('data-value');
				value = YT.isEmpty(value) ? "VLAUE" : value;
				var url = ele.attr('data-url');
				url = YT.isEmpty(url) ? "core/cert" : url;
				url = YT.dataUrl(url);
				ele.attr("data-ready", "false");
				var params = ele.attr('data-getparams');
				params = YT.isEmpty(params) ? {} : app[params]();
				
				YT.ajaxData(url, params, function(data) {
					if (data.STATUS == "1") {
						var list = data.LIST;
						var tempList = [];
						var _default = ele.attr('data-default');
						if(!!_default){
							var defaultJson = {};
							defaultJson[key]="";
							defaultJson[value]=_default;
							list.unshift(defaultJson);
						}
						$.each(list, function(i, n) {
							var item = n;
							var map = {
								"KEY" : item[key],
								"VALUE" : item[value]
							}
							tempList.push(map);
						});

						var html = YT.template(selectParams, {
							LIST : tempList
						});
						xele.html(html);
						callback();
						ele.attr("data-ready", "true"); // 实例化完成
					} else {
						YT.hideWaitPanel();
						YT.alertinfo(data.MSG);
					}
					xele.on('change', function() {
						callback();
					});
					function callback() {
						var callback = ele.data('callback');
						if (!YT.isEmpty(callback)) {
							var val = xele.val();
							app[callback] && app[callback](val);
						}
					}
				});
				
				
			});
			
			
			
			
			
			
			
		},

		/**
		 * 初始化日期-星期
		 * 
		 * @param panel
		 * @param app
		 * @param json
		 */
		initSelectWeek : function(panel, app, json) {
			var ele = panel.find(".y-date-week");// 自身组件区域
			if (ele.length < 1) {
				return;
			}
			var xele = ele.find("select")
			if (xele.length < 1) {
				return;
			}
			var params = [ {
				"ID" : "1",
				"WEEK" : "星期一"
			}, {
				"ID" : "2",
				"WEEK" : "星期二"
			}, {
				"ID" : "3",
				"WEEK" : "星期三"
			}, {
				"ID" : "4",
				"WEEK" : "星期四"
			}, {
				"ID" : "6",
				"WEEK" : "星期六"
			}, {
				"ID" : "0",
				"WEEK" : "星期日"
			} ]
			var html = YT.template(selectWeeks, {
				LIST : params
			});
			xele.html(html);
		},
		/**
		 * 初始化电话簿
		 */
		initPhoneBook : function(panel, app, json) {
			var ele = panel.find(".y-phone-book");// 自身组件区域
			if (ele.length < 1) {
				return;
			}
			ele.on('click', function() {
				YT.Device.openPhoneBook(function(data) {
					panel.find(".x-phone-book").val(data.phoneNumber);
				});
			});
		},
		/**
		 * 初始化发短信
		 * 
		 * @returns
		 */
		initSms : function(panel, app, json) {
			var ele = panel.find(".y-sms-mess");// 自身组件区域
			if (ele.length < 1) {
				return;
			}
			ele.on('click', function() {
				var phoneNo = panel.find(".x-sms-mess").val();
				YT.Device.sendSms(phoneNo);
			});
		},
		/**
		 * 初始化打电话
		 * 
		 * @returns
		 */
		callPhone : function(panel, app, json) {
			var ele = panel.find(".y-call-phone");// 自身组件区域
			if (ele.length < 1) {
				return;
			}
			ele.on('click', function() {
				var phoneNo = panel.find(".x-call-phone").val();
				YT.Device.callPhone(phoneNo);
			});
		}
	};

	YT.log.debug("---end--", TAG);
});