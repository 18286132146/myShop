$(function() {
	var TAG = "YT.Agreemen";
	YT.log.debug("---init--", TAG);
	YT.Agreemen = {
		/**
		 * 协议控件初始化
		 * 
		 * @param panel
		 * @param app
		 * @param json
		 */
		initAgmController : function(panel, app, json) {
			var ele = panel.find(".Agreemens");
			if (ele.length < 1) {
				return;
			}
			YT.log.info("agreemen ele ", ele.length);
			ele.on("click", function() {
				var url = ele.attr("data-url");
				YT.nextPage(url);
			});
		}
	};
	YT.log.debug("---end--", TAG);
});