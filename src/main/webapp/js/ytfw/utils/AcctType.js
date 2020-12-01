(function() {
	var acctTypeTpl = [
	        			'<select id="cardTypeSelect">',
	        			'{@each LIST as item,index}',
	        			'<option value="${item.value}">${item.text}</option>',
	        			'{@/each}',// 
	        			'</select>'].join('');

	var me = YT.AcctType = {
			/**
			 * 查询账户类型
			 * @param panel
			 * @param app
			 * @param json
			 */
			queryAcctType: function(url,callback){
				var thizz = this;
				// IS_DEFL 默认账户
				var url = url || YT.dataUrl("core/acctTypeQuery", false);
				var acctLists = []; // 账户列表
				var sessListStr = YT.BANK_ACCT_LIST;
				YT.ajaxData(url, {}, function(rsp) {
					if (rsp.STATUS == '1') {
						acctLists = rsp.LIST;
						callback && callback(acctLists);
					} else {
						YT.hideWaitPanel();
						YT.alertinfo(rsp.MSG);
					}
				}, function(rst) {
					YT.hideWaitPanel();
					YT.alertinfo(rst.MSG);
				});
			},
			/**
			 * 账号类型初始化
			 * @param panel
			 * @param app
			 * @param json
			 */
			initAcctType : function(panel, app, json){
				var ele = panel.find('.select-params');
				if(ele.length == 0){
					return;
				}
				var url = ele.attr('data-url');
				var key;
				var val;
				var eventChange = ele.attr('data-change');

				this.queryAcctType(url,buildGroup);
				// 生成账户类型
				function buildGroup(acctTypes) {
					var list = acctTypes;
					var acctType = [];
					for(var i=0; i<list.length; i++){
						var map = list[i];
						var value;
						var text;
						for (key in map){
						    value = key;
						    text = map[key];
						}

						var data = {
								"value":value,
								"text": text
						};
						acctType.push(data);
					}
					var html = YT.template(acctTypeTpl, {
						LIST : acctType
					});
					ele.find('.select-acctType').html(html);
					selectStart();//默认选中第一个
					ele.attr("data-ready", "true");// 实例化完成
					ele.on('change', change);//注册onChange事件
				}
				function change(){
					//赋值
					ele.attr('data-key',ele1.find("option:selected").text());
					ele.attr('data-val',ele1.val());
					eventChange && app && app[eventChange] && app[eventChange]();
				}
				function selectStart(){
					var ele1 = panel.find(".select-acctType").find("#cardTypeSelect");
					//赋值
					ele.attr('data-key',ele1.find("option:first()").text());
					ele.attr('data-val',ele1.find("option:first()").val());
				}
				
			}
			
	};

}());