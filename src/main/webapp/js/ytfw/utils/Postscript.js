(function() {
	var me = YT.Postscript = {
			initPotController: function(panel, app, json) {
			// 绑定事件
			var handle = panel.find(".select-postscript");
			if (handle.length < 1) {
				return;
			}
			var target = handle.data(".target");//
			handle.on("click", function(e) {
				var ele = $(this);
				var way = ele.attr("data-url");
				YT.setParameters({
					callback : function(txt) {
						target.val(txt);
					}
				})
				YT.nextPage(way);
			})
		}
	}

})($)