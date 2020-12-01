/**
 * 账户相关工具类
 */
(function() {
	var me = YT.Session = {
		/**
		 * @Desc 获取登录系统后存储session信息，json类型，数据内容变化极小的
		 * @param callback
		 *            {func} 获取到回调
		 * @example YT.getSession('App.getSession');
		 */
		getSession : function(callback) {
			try {
				YT.log.info("--sessionStorage--", "App");
				var loginsession =""; //YT.JsonEval(sessionStorage.getItem("loginsession"));
				if (!YT.isEmpty(loginsession)) {// 默认先取缓存
					callback(loginsession);
				} else {// 第一次访问从后端加载数据
					var url = YT.dataUrl("session/getSessionDetail");
					YT.ajaxData(url, {}, function(rst) {
						if (rst && rst.STATUS == "1") {
							sessionStorage.setItem("loginsession", JSON.stringify(rst));
							callback(rst);
						} else { // 回话超时
							YT.alertinfo(rst.MSG, "");
							YT.hideWaitPanel();
						}
					}, function() {
					});
				}
			} catch (e) {
				YT.log.debug(e);
			}
		}
	}
}());