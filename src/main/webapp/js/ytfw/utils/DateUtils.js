(function() {
	var me = YT.DateUtils = {
		/**
		 * 获取服务器时间
		 * 
		 * @param callback
		 */
		sysdate : function(callback) {
			var url = YT.dataUrl('common/sysDate', true);
			YT.ajaxData(url, {}, function(rpdata) {
				callback && callback(rpdata)
			});
		},
		serverDate : function(callback) {
			var url = YT.dataUrl('common/serverDate', true);
			YT.ajaxData(url, {}, function(rpdata) {
				callback && callback(rpdata)
			});
		},
		/**
		 * 查询当前日前几天的日期
		 * 
		 * @param AddDayCount
		 *            {int} 负数为前X天 正数为后X天
		 * @returns {string}
		 * @exaple YT.getDate(-6)
		 */
		getDate : function(addDayCount, startDate) {
			var dd = startDate ? new Date(startDate) : new Date();
			var date = dd.getDate();
			addDayCount = addDayCount ? addDayCount : 0;
			dd.setDate(date + addDayCount);
			date = dd.getDate();
			var month = dd.getMonth();
			var y = dd.getYear() + 1900;
			var m = (month + 1) < 10 ? "0" + (month + 1) : (month + 1);
			var d = date < 10 ? "0" + date : date;
			return y + "-" + m + "-" + d;
		},
		/**
		 * 计算两个日期相差天数
		 * 
		 * @param aVal
		 *            2016-12-12
		 * @param bVal
		 *            2012-12-10
		 */
		dateDiff : function(aVal, bVal) {
			try {
				var s1 = aVal.replace(/-/g, "/");
				var s2 = bVal.replace(/-/g, "/");
				d1 = new Date(s1);
				d2 = new Date(s2);
				var time = d1.getTime() - d2.getTime();
				return parseInt(time / (1000 * 60 * 60 * 24));
			} catch (e) {
				YT.log.debug(e);
				return 0;
			}
		},
		/**
		 * 日期字符串转星期
		 * 
		 * @param dataStr
		 *            2017-12-12
		 */
		dateToWeek : function(dataStr) {
			var weekDay = [ "星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
			var date = new Date(Date.parse(dataStr.replace(/-/g, "/")));
			return weekDay[date.getDay()];
		},
		/**
		 * 初始化日期相关控件
		 */
		initDateController : function(panel, app, json) {
			var dateEl = panel.find(".y-date");
			if (dateEl.length < 1) {
				return;
			}
			
			// 使用服务器日期进行赋值
			me.sysdate(function(data) {
				var today = data && (data.SYS_DATE || data.CUR_DATE);
				
				me.initDateControllers(dateEl,today,panel, app, json);
				
			});
			
			
			
		},
		/**
		 * 初始化多个日期控件
		 */
		initDateControllers  : function(_dateEl,today,panel, app, json) {
			_dateEl.each(function(i,el){
				var dateEl = $(el);
				//dateEl.find("input[data-name]").val(today);// 赋初始值  === 
				if( dateEl.attr("data-bj") ){
					var startDateEl = panel.find(".y-date ."+dateEl.attr("data-bj")+"start");
					var endDateEl = panel.find(".y-date ."+dateEl.attr("data-bj")+"end");
					// 初始化查询日期
					me.initQueryDateControll(startDateEl, endDateEl, today);
					// 初始化日期快捷方式
					me.initDateTab(panel, app, today, startDateEl, endDateEl);
				}else{
					var startDateEl = panel.find(".y-date .x-date-start");
					var endDateEl = panel.find(".y-date .x-date-end");
					// 初始化查询日期
					me.initQueryDateControll(startDateEl, endDateEl, today);
					// 初始化日期快捷方式
					me.initDateTab(panel, app, today, startDateEl, endDateEl);
				}
			});
		},
		/**
		 * 查询日期初始化
		 */
		initQueryDateControll : function(startDateEl, endDateEl, today) {
			var validtor = YT.Form.resultCustomerValidator;
			startDateEl.on("validator", function(e, elem) {
				var gid = $(elem).data("gid"); // 可用于多组日期校验
				var startDate = $(elem).val();
				var endDate = filterWithGid(endDateEl, gid).val();
				var preDate = me.getDate(0, today);
				var sd = startDate.replace(/-/g, "").replace(/\//g,"");
				var ed = endDate.replace(/-/g, "").replace(/\//g,"");
				var pd = preDate.replace(/-/g, "");
				var d365 = me.getDate(-365, today).replace(/-/g, "");
				var d90 = me.getDate(-90, endDate).replace(/-/g, "");
				var startDateEl_name = startDateEl.attr("data-label")||"起始日期";
				var endDateEl_name = endDateEl.attr("data-label")||"结束日期";
				if (ed < sd) {
					validtor(startDateEl, false, startDateEl_name+'不能大于'+endDateEl_name);
					return false;
				}
			/*	if (sd < d365) {
					validtor(startDateEl, false, '只能查询一年内记录');
					return false;
				}
				
				if (sd < d90) {
					validtor(startDateEl, false, '查询区间不能大于90天');
					return false;
				}*/
				if( !endDateEl.attr("data-flag")=="99" ){
					if (ed > pd) {
						validtor(endDateEl, false, endDateEl_name+'不能大于今天');
						return false;
					}
				}
				
				validtor(startDateEl, true);
				validtor(endDateEl, true);
				return true;
			});
		},
		/**
		 * 快捷日期区间初始化，当天、7天、一个月、三个月、半年、一年
		 * 
		 * @param panel
		 * @param app
		 * @param today
		 */
		initDateTab : function(panel, app, today, startDateEl, endDateEl) {
			var dateQuickEl = panel.find(".y-date-quick");
			if (dateQuickEl.length < 1) {
				return;
			}
			var change = dateQuickEl.data("change");
			// 切换按钮绑定事件
			dateQuickEl.on('click', "label.ui-radio-s", function(e) {
				var item = $(this).find('input.x-item');
				var gid = item.data("gid"); // 可用于多组日期校验
				dateQuickEl.find("li").removeClass("current");
				item.addClass("current");
				var v = item.data('value');// 差异化日期值
				var endDate = today;
				var startDate = me.getDate(v, today);
				filterWithGid(startDateEl, gid).val(startDate);
				filterWithGid(endDateEl, gid).val(endDate);
				change && app && app[change] && app[change]();
			});
			dateQuickEl.find("li.current").trigger("click");
		}
	};

	/**
	 * 按组别过滤
	 */
	function filterWithGid(items, gid) {
		if (gid) {
			return items.filter("[data-gid='" + gid + "']");
		} else {
			return items;
		}
	}

}());