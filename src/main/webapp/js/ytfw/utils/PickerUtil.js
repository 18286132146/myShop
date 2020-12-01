/**
 * @Desc picker相关工具类
 */
(function() {
	var me = YT.PickerUtil = {
		init : function(panel,app,json){
			me.initPickerPayee(panel,app,json);
			me.initRecBank(panel,app,json);
			me.initprovice(panel,app,json);
			me.initbranch(panel,app,json);
		},
		/**
		 * 初始化选择收款人
		 */
		initPickerPayee:function(panel,app,json){
			var elem = panel.find(".x-picker-payee");
			if (elem.length < 1) {
				return;
			}
			var url = elem.data("goto");
			elem.on("click",function(){
				var func = elem.attr('data-callback');
				func = YT.getFunctionName(app[func]);
				elem.attr('data-func',func);
				YT.nextPage(url,panel)
			})
		},
		/**
		 * 初始化选择收款行
		 */
		initRecBank:function(panel,app,json){//
			var elem = panel.find(".x-recbank-name");
			if (elem.length < 1) {
				return;
			}
			var url = elem.data("goto");
			elem.on("click",function(){
				var func = elem.attr('data-callback');
				func = YT.getFunctionName(app[func]);
				elem.attr('data-func',func);
				YT.nextPage(url,panel)
			})
		},
		/**
		 * 初始化省,市
		 */
		initprovice : function(panel,app,json){
			var elem = panel.find(".y-picker-zone");
			var elel = panel.find(".x-picker-zone");
			if (elem.length < 1 || elel.length < 1) {
				return;
			}
			var url = elem.data("goto");
			elem.on("click",function(){
				YT.nextPage(url,panel)
			})
		},
		/**
		 * 初始化支行
		 */
		initbranch : function(panel,app,json){
			var elem = panel.find(".y-picker-branch");
			if (elem.length < 1) {
				return;
			}
			var url = elem.data("goto");
			panel.AJAXURL=elem.data("url");
			elem.on("click",function(){
				YT.nextPage(url,panel)
			})
		}
	};

}());