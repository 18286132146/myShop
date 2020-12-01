/**
 * 账户相关工具类
 */
(function() {
	var get;
	var s;
	var acctGroupTpl = [
			'<select class="x-p-acct" data-name="${dataName}" data-change="${eventChange}">',
			'{@each LIST as item,index}',
			'<option value="${item.ACCT_NO}" data-acctLv="${item.ACCT_LV}" ',
			'{@if chooseAcct == item.ACCT_NO} selected ',
			'{@else if item.IS_DEFL == "Y" } selected {@/if}',
			'{@if isShowAlias == "false"}',
			'data-acctOrg="${item.ACC_OPEN_ORG}" data-acctType="${item.ACCT_TYPE}">${item.ACCT_NO|fmtAcctNo,true}</option>',
			'{@else}',
			'{@if item.ACCT_TYPE == "01"}data-acctOrg="${item.ACC_OPEN_ORG}" data-acctType="${item.ACCT_TYPE}">${item.ACCT_NO|fmtAcctNo,true}-借记卡</option>{@/if}',
			'{@if item.ACCT_TYPE == "02"}data-acctOrg="${item.ACC_OPEN_ORG}" data-acctType="${item.ACCT_TYPE}">${item.ACCT_NO|fmtAcctNo,true}-信用卡</option>{@/if}',
			'{@/if}',
			'{@/each}',// 
			'</select>'].join('');
	var acctCard = [
	        '{@each LIST as item, index}',
	        '<div class="ui-card ui-bf-fff x-acct-card" data-item="${item.ACCT_NO}">',
	        '<div class="ui-card-header ui-card-line">',
			'<div class="ui-card-item">',
			'{@if isShowIcon == "true"}',
			'<i class="yui-cmbc-icon"></i>',
			'{@/if}',
			'<label class="ui-txt-info ui-padding-l45">卡号 ${item.ACCT_NO|fmtAcctNo,true}</label>',
			'<p class="ui-display-field ui-txt-success"></p>',
			'</div></div>',
			'<div id="r-acct-card${index}" class="r-acct-card${index}"></div>',
			'</div>',
	       '{@/each}',
	].join('');
	
	var acctSubCard = [
	    '{@each SUBLIST as item, index}',
		'<div class="ui-card-section">',
		'<div class="ui-card-item ui-list-link ui-height30">',
		'<label class="ui-txt-info">${item.ACCT_ALIAS}</label>',
		'<p class="ui-display-field ui-txt-success">${item.ACCT_STAT}</p>',
		'</div>', 
		'</div>{@/each}',
		
	 ].join('');
	YT.AcctUtil = {
		/**
		 * 查询账号列表
		 * 
		 * @param callback
		 * @param acctType
		 *            查询账号类型，默认全部 数组类型<br>
		 * @Desc 账号类型 <br>
		 *       借记卡 NS.ACCT_TYPE.SA<br>
		 *       电子账户 NS.ACCT_TYPE.ELE<br>
		 *       信用卡 NS.ACCT_TYPE.CC
		 */
		queryUserAccts : function(callback, acctType) {
			var thizz = this;
			// IS_DEFL 默认账户
			var url = YT.dataUrl("account/acctListQuery");
			var acctLists = []; // 账户列表
			var sessListStr = YT.BANK_ACCT_LIST;
			if (!YT.isEmpty(sessListStr)) {
				var sessList = YT.JsonEval(sessListStr);
				if (acctType && acctType.length > 0) {
					sessList = thizz.screenAccts(sessList, acctType);
				}
				callback && callback(sessList);
				return;
			}
			YT.ajaxData(url, {}, function(rsp) {
				if (rsp.STATUS == '1') {
					acctLists = rsp.LIST;
					YT.BANK_ACCT_LIST = YT.JsonToStr(acctLists);
					if (acctType && acctType.length > 0) {
						acctLists = thizz.screenAccts(acctLists, acctType);
					}
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
		screenAccts : function(accts, types) {
			var tmpAccts = [];
			$.each(accts, function(i, n) {
				var type = n['ACCT_TYPE'];
				if (typeof types == 'string') {
					if (types == type) {
						tmpAccts.push(n);
					}
				} else {
					$.each(types, function(ind, t) {
						if (t == type) {
							tmpAccts.push(n);
						}
					});
				}
			});
			return tmpAccts;
		},
		/**
		 * 查询账户详情（可通过该接口获取某一账户余额）
		 * 
		 * @param acctNo：账号
		 * @param callback：回调方法
		 * @param acctType
		 *            查询账号类型，默认全部 数组类型<br>
		 * @Desc 账号类型 <br>
		 *       借记卡 NS.ACCT_TYPE.SA<br>
		 *       电子账户 NS.ACCT_TYPE.ELE<br>
		 *       信用卡 NS.ACCT_TYPE.CC
		 */
		queryAcctInfo : function(acctNo, acctType, callback) {
			var url = YT.dataUrl('account/acctDetailQuery');
			if (acctType) {
				if (acctType == NS.ACCT_TYPE.ELE) { // 电子账户
					url = YT.dataUrl('account/eleAcctInfoQuery');
				} else if (acctType == NS.ACCT_TYPE.CC) { // 信用卡
					url = YT.dataUrl('credit/creditCardInfoQuery');
				}
			}
			var params = {
				ACCT_NO : acctNo
			}
			
			YT.ajaxData(url,params, function(rsp) {
				if (rsp.STATUS == '1') {
					callback && callback(rsp);
				} else {
					YT.alertinfo(rsp.MSG);
				}
			}, function(rsp) {
				YT.hideWaitPanel();
				YT.alertinfo(rsp.MSG);
			});
		},
		/**
		 * 可选操作账号控件，可定制是否显示余额
		 * 
		 * @param ele
		 * @param acctTypes  账号类型  01、借记卡  02、信用卡
		 * @param callback  回调函数
		 * @param chooseAcct  选中账号
		 * data-amt  是否显示余额
		 * data-alias  是否显示账户别名
		 */
		initAcctController : function(panel, acctTypes, chooseAcct,callback) {
			var ele = panel.find(".y-acct");
			if (ele.length < 1) {
				YT.log.info("ele ", ele.length);
				return;
			}
			var isShowBal = ele.attr("data-amt") == "r-amt";    //是否显示余额
			YT.log.info('isShowBal:'+isShowBal);
			var isShowAlias = ele.attr("data-alias");   //显示别名
			if(isShowBal){//显示余额
				var item = panel.find(".r-amt-alive");
				item.removeClass("hidden");
			}
			this.queryUserAccts(buildGroup, acctTypes);
			// 生成账户组
			function buildGroup(accts) {
				var html = YT.template(acctGroupTpl, {
					isShowAlias : isShowAlias || "false",
					showBal : isShowBal,
					dataName : ele.data("name") || "ACCT_NO",
					eventChange : ele.data("change") || "changePayAcct",
					chooseAcct:chooseAcct,
					LIST : accts
				});
				ele.html(html);
				ele.attr("data-ready", "true");// 实例化完成
				isShowBal && balQuery();
				callback && callback();
			}
			// 查询余额
			function balQuery() {
				var payAcct = ele.find(".x-p-acct");
				var acct = payAcct.val();
				var type = payAcct.find('option:selected').attr('data-acctType');
				YT.queryAcctInfo(acct, type, showBal);
			}
			function showBal(datas) {
				// TODO:余额的属性值，这个地方需要修改，并固定
				var bal = datas.BALANCE_AVAILABLE||datas.AVAL_BAL||datas.USA_BLE_BAL;
				panel.find(".r-amt-alive").find(".r-amt-alive-num").text(YT.Format.fmtAmt(bal));
			}
			if(isShowBal){//显示余额
				ele.on('change', '.x-p-acct', balQuery);
			}
		},
		/**
		 * 卡片账号选择
		 * @param panel  
		 * @param acctTypes 账户类型
		 * @param callBack  回调函数
		 */
		initCardController:function(panel,acctTypes,callBack){
			var ele = panel.find(".y-acct-card");
			if (ele.length < 1) {
				YT.log.info("ele ", ele.length);
				return;
			}
			var isShowBal = ele.data("amt") == "r-amt";    //是否显示余额
			var isShowAlias = ele.data("alias");   //显示别名
			var isShowIcon = ele.data("icon");
			this.queryUserAccts(buildGroup, acctTypes);//查询账号
			function buildGroup(accts){
				var html = YT.template(acctCard, {
					isShowAlias : isShowAlias || "false",
					showBal : isShowBal,
					dataName : ele.data("name") || "ACCT_NO",
					isShowIcon: isShowIcon || "false",
					LIST : accts
				});
				ele.html(html);
				ele.attr("data-ready", "true");// 实例化完成
				
				$.each(accts,function(index,val){
					console.log(val+"==========="+index);
					YT.AcctUtil.querySubAcct(val.ACCT_NO,setSubAcctData,index);//查询子账户
					function setSubAcctData(accts,index){//回调后展示子账户
						var html = YT.template(acctSubCard, {
							SUBLIST : accts
						});
						console.log("#r-acct-card"+index);
						ele.find(".x-acct-card").find(".r-acct-card"+index).html(html);
					}
				});
			}
		},
		//查询子账户信息
		querySubAcct:function(zh,callback,index){
			var url = YT.dataUrl('account/subAcctListQuery');
			var params = {
				ACCT_NO : zh
			}
			YT.ajaxData(url, {}, function(rsp) {
				if (rsp.STATUS == '1') {
					callback && callback(rsp.SUBLIST,index);
				} else {
					YT.alertinfo(rsp.MSG);
				}
			}, function(rsp) {
				YT.hideWaitPanel();
				YT.alertinfo(rsp.MSG);
			});
		}
	};

}());