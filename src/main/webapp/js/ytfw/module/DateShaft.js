/**
 * @Desc 理财日期轴
 */
(function() {
	var DateShaft = YT.DateShaft = {
		initDateShaft : function(panel,json) {
			var startDate=json.START_DATE;//起售日期
			var buyDate=json.BUY_DATE;//购买日期
			var endDate=json.END_DATE;//到期日期
			if(Fw.isEmpty(startDate) || Fw.isEmpty(buyDate) || Fw.isEmpty(endDate)){
				YT.log.warn("请检查上送参数");
				return;
			}
			var ele=panel.find(".y-data-shaft");
			if(ele.length<=0){
				return;
			}
			//计算到期日期-起售日期的天数
			var  allday=YT.DateUtils.dateDiff(endDate,startDate);
			//计算购买日期-起售日期的天数
			var loseday=YT.DateUtils.dateDiff(buyDate,startDate);
			//获取日期轴长度
			var len=panel.find(".x-data-shaft").width() || $(window).width();
			var left=loseday/allday * len;
			//移动购买日期位置达到布局效果
			panel.find(".x-data-shaft>span:nth-child(2)").css("left",left);
		},
	};
}());
