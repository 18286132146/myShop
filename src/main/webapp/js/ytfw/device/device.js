/**
 * 设备调用接口（公共）
 */
(function() {
	var W = window;
	var is_sessionTimeout = true;
	var _WK_DATAS = {};
	var keyBoardEle;
	var me = YT.Device = {
		/**
		 * 隐藏键盘，仅供客户端调用
		 * 
		 * @param id
		 *            键盘容器id
		 * 
		 */
		_hideKeyboard : function() {
			$('#mainBody .navbar-views').css({
				'-webkit-transform' : "translateY(0)",
				'transform' : "translateY(0)"
			});
			$('#mainBody .yui-auth-form').css({
				'-webkit-transform' : 'translateY(0)',
				'transform' : 'translateY(0)'
			});
			
			$('#mainBody .navbar-views').css({
				'-webkit-transform' : "none",
				'transform' : "none"
			});
			$('#mainBody .yui-auth-form').css({
				'-webkit-transform' : 'none',
				'transform' : 'none'
			});
			
			
			
			
			
			
			try {
				keyBoardEle.blur();
			} catch (e) {
			}
		},
		/**
		 * 显示客户端键盘
		 * 
		 * @param $ele
		 *            装载键盘的页面对象
		 * @private
		 */
		_preShowKeyBoard : function($ele) {
			if (YT.isString($ele)) {
				aa = 
				$ele = $('#' + $ele);
			}
			
			var boardH = 280; // 自定义键盘高度
			var eh = $ele.height(); // 元素的高度
			var top = $ele.offset().top;
			var stop = $(window).scrollTop();// 滚动条高度
			//alert("eh:"+eh+"top:"+top+"stop:"+stop)
			var h = top;
			
			// 15为偏差量
			var newTop = W_HEIGHT + stop - top - eh;			
			
			
			if (newTop < boardH) {
				var tf_h = newTop - boardH;//(newTop - boardH)
				if($ele.attr("data-keyboard_date")=="date"){
					tf_h = stop-$ele.data("keyboard_h"); 
				}
				
				$('#mainBody .views').css(
						{
							'-webkit-transform' : 'translateY('
									+ tf_h + 'px)',
							'transform' : 'translateY(' + tf_h + 'px)'
						});
				$('#mainBody .yui-auth-form').css(
						{
							'-webkit-transform' : 'translateY('
									+ tf_h + 'px)',
							'transform' : 'translateY(' + tf_h
									+ 'px)'
						});
//				
				
				
				
				
				
			}
		},

		/**
		 * 初始化客户端键盘的组件，触发事件 对需要调取相应客户端键盘的相关页面元素，需要使用data-keyboard属性来标示调用哪一种键盘
		 * data-keyboard=TPwd：交易密码键盘 LPwd：登录密码键盘 Date：日期键盘 Money：金额键盘
		 * Number：数字键盘 IDC：身份证键盘
		 * 
		 * @private
		 */
		initEvent : function(panel) {
			var thizz = this;
			var evtName = {
				TPwd : 'showTPwdPicker', // 交易密码
				LPwd : 'showLPwdPicker', // 登录密码
				Date : 'showDatePicker', // 日期
				Money : 'showMoneyPicker',// 金额
				Number : 'showNumPicker', // 数字
				IDC : 'showIDCPicker' // 证件
			};
			// 注册控件调用方法
			panel.on('click', 'input[data-keyboard]', function(e) {
				e.preventDefault();
				var that = $(this);
				var clearFlag = that.attr("data-clear");
				if (clearFlag == "true") {
					that.val("");
				}
				YT.Client.showKeyBoard(that);
				var type = that.attr('data-keyboard');
				var evtFunc = evtName[type];
				keyBoardEle = that;
				thizz[evtFunc] && thizz[evtFunc](that);
				return false;
			});
		},
		/**
		 * @Desc 客户端native ajax 请求
		 * @param url
		 *            {url} 请求地址
		 * @param params
		 *            {json} 请求参数
		 * @param success
		 *            {string} 成功回调函数名称
		 * @param failure
		 *            {string} 失败回调函数名称
		 * @example YT.ajaxData('/mbank/login/login.do',{p1:'x'},'success');
		 */
		ajaxData : function(url, params, success, failure) {
			if (YT.isEmpty(failure) || !YT.isFunction(failure)) {
				failure = function(rsp) {
					YT.hideWaitPanel();
					YT.alertinfo(NS.MSG.MsgAjaxError);
				}
			}
			var cfg = {
				url : url,
				params : params,
				success : function(rpdata) {
					if (rpdata.STATUS == '005') {
						if(is_sessionTimeout){
							YT.sessionTimeout();
							is_sessionTimeout = false;
						}
						
						//YT.alertinfo('超时');
//						YT.alertinfo("请重新登陆888", "系统提示", function(){
//							YT.gotoClientLogin();
//						}, "好的");
						return false;
					}
					if (rpdata.STATUS == '009') {
						if(is_sessionTimeout){
							YT.sessionTimeout("确定","用户已在其他设备上登录！");
							is_sessionTimeout = false;
						}
						return false;
					}
					if(rpdata.STATUS == '008'){
						if(is_sessionTimeout){
							YT.sessionTimeout("确定","用户密码已被重置！");
							is_sessionTimeout = false;
						}
						return false;
					}
					success && success(rpdata);

				},
				failure : failure
			}
			YT.Client.post(cfg);
		},
		/**
		 * 客户端native ajaxCashe 缓存请求
		 * 
		 * @param url
		 *            {url} 请求地址
		 * @param version
		 *            {string} 版本
		 * @param type
		 *            {string} 类型
		 * @param params
		 *            {json} 请求参数
		 * @param success
		 *            {string} 成功回调函数名称
		 * @param failure
		 *            {string} 失败回调函数名称
		 * @example YT.ajaxCashe('/mbank/login/login.do','1.1','finance',{p1:'x'},'success');
		 */
		ajaxCashe : function(url, version, type, params, success, failure) {
			if (YT.isEmpty(failure) || !YT.isFunction(failure)) {
				failure = function(rsp) {
					YT.hideWaitPanel();
					YT.alertinfo(NS.MSG.MsgAjaxError);
				}
			}
			var cfg = {
				url : url,
				version : version,
				type : type,
				params : params,
				success : function(rpdata) {
					if (rpdata.STATUS == '005') {
						YT.alertinfo('超时');
						return false;
					}
					success && success(rpdata);

				},
				failure : failure
			}
			YT.Client.getNativeCache(cfg);
		},
		/**
		 * 首页页面跳转 openMenuPage
		 * 
		 * @param type
		 *            页面类型 N-原生；H-H5页面
		 * @param isLogin
		 *            是否登录：Y-需登录;N-不需登录
		 * @param menuId
		 *            菜单id：type为“N”时，必需，原生菜单的id
		 * @param url
		 *            跳转地址，type为“H”时，必需，H5跳转页面的半地址
		 */
		openMenuPage : function(cfg) {
			if (YT.isEmpty(cfg.type)) {
				YT.alertinfo('菜单未配置！', '提示');
				return;
			}
			YT.Client.openMenuPage(cfg);
		},
		/**
		 * @Desc 初始化页标题栏
		 * @param page
		 *            {string} 需要初始化dom的
		 * @example YT.initPageTitle(pageA);
		 */
		initPageTitle : function(page) {
			YT.Client.initPageTitle(page);
		},
		/**
		 * 搜索框标题
		 * 
		 * @param cfg {
		 *            placeholder: '请输入搜索内容'，<br>
		 *            callback: App.search }
		 */
		titleSearchBar : function(cfg) {
			YT.Client.titleSearchBar(cfg);
		},
		/**
		 * @Desc 显示页面区域
		 * @Desc 控制业务流程，换面切换
		 * @param showHandle
		 *            要展示的页面区域
		 * @param hideHandles
		 *            要隐藏的页面区域
		 * @param showTitle
		 *            是否显示title
		 * @example YT.showPageArea(App.pageA, [App.pageB,App.pageC], true);
		 */
		showPageArea : function(showHandle, hideHandles, showTitle) {
			$('#loaddingPage').hide();
			YT.hideWaitPanel();
			if (hideHandles) {
				var top = $(window).scrollTop();
				YT.each(hideHandles, function(item) {
					var areas = item.find('input,textarea');
					areas.each(function(i, n) {
						if ($(n).is(':focus')) {
							$(n).blur();
						}
					});
					if (item.is(":hidden") === false) {
						item.attr('data-pageTop', top);
					}
					item.removeClass("current");
				});
			}
			showHandle.addClass("current");
			var top = showHandle.attr('data-pageTop');
			top = top || 0;
			$('html, body').animate({
				scrollTop : top
			}, 100);
			if (showTitle === true) {
				YT.Device.initPageTitle(showHandle);
			}
		},
		/**
		 * @Desc 开启等待层
		 * @param msg
		 *            {string} 显示内容
		 * @example YT.openWaitPanel('正在拼命加载中。。。');
		 */
		openWaitPanel : function(msg) {
			msg = msg || "加载中...", YT.Client.openWaitPanel(msg);

		},
		/**
		 * @Desc 关闭等待层
		 * @param timeout
		 * @example YT.hideWaitPanel(timeout);
		 */
		hideWaitPanel : function(timeout) {
			timeout = timeout ? timeout : 100;
			setTimeout(YT.Client.hideWaitPanel, timeout);
		},

		/**
		 * @Desc 信息提示框
		 * @param msg
		 *            {string} 信息内容
		 * @param title
		 *            {string} 弹出框标题
		 * @param okAct
		 *            {func} 确认按钮事件
		 * @param okName
		 *            {string} 确认按钮名称
		 * @example YT.alertinfo('我是通知内容','标题');
		 */
		alertinfo : function(msg, title, okAct, okName) {
			okAct = YT.getFunctionName(okAct);
			if (okAct && okAct.substr(okAct.length - 1) != ")") {
				okAct = okAct + "()";
			}
			title = title || "温馨提示";
			okName = okName || "确定";
			YT.Client.alertinfo(msg, title, okAct, okName);
		},
		/**
		 * @Desc 弹出确认信息框
		 * @param msg
		 *            信息内容
		 * @param title
		 *            弹出框标题
		 * @param okAct
		 *            确认按钮事件
		 * @param cancleAct
		 *            取消按钮事件
		 * @param okName
		 *            确认按钮名称
		 * @param cancleName
		 *            取消按钮的名称
		 * @example YT.confirm("我是通知内容","标题","alert(2)")
		 */
		confirm : function(msg, title, okAct, cancleAct, okName, cancleName) {
			YT.log.debug("----init-1----", "YT.confirm");
			okAct = YT.getFunctionName(okAct);
			if (okAct && okAct.substr(okAct.length - 1) != ")") {
				okAct = okAct + "()";
			}
			cancleAct = YT.getFunctionName(cancleAct);
			if (cancleAct && cancleAct.substr(cancleAct.length - 1) != ")") {
				cancleAct = cancleAct + "()";
			}
			title = title || "温馨提示";
			okName = okName || "确定";
			cancleName = cancleName || "取消";
			YT.Client.confirm(msg, title, okAct, cancleAct, okName, cancleName);
		},
		/**
		 * @Desc session超时
		 * @param okName
		 *            {string} 确认按钮名称
		 * @example YT.sessionTimeout('我是通知内容','标题');
		 */
		sessionTimeout : function(okName,msg) {
			YT.log.debug("----init-1----", "YT.sessionTimeout");
			title = "温馨提示";
			msg = !!msg?msg:"会话超时，请重新登录";
			okName = okName || "确定";
			YT.Client.sessionTimeout(title, msg, okName);
		},
		/**
		 * 设置登录系统后存储客户端信息，json类型，数据内容变化极小的
		 * 
		 * @param sessData
		 *            {json} 会话数据 例如。{key1:'',key2:''}
		 * @example YT.Device.setSession({key1:'',key2:''});
		 * 
		 */
		setSession : function(sessData) {
			YT.Client.setSession(sessData);
		},
		/**
		 * 获取登录系统后存储客户端信息，json类型，数据内容变化极小的
		 * 
		 * @param callback
		 *            {func} 获取到回调 回调参数data为json字符串
		 * @param sessKey
		 *            {string} 会话的key，多个则以,分隔；eg:CUST_NAME,CUST_IPHONE；不传则返回全部
		 * @example YT.Device.getSession(function(data){ console.log(data); });
		 * 
		 */
		getSession : function(callback) {
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.getSession(callback);
		},
		/**
		 * @Desc 显示交易密码安全键盘(调用方法不需要在input里面加入) 密码键盘 1. 16位加密因子 2.
		 *       回调方法需要传递2个参数，在不隐藏键盘时调用回调函数不需要密文，写死为“1”，为了前端做判断用，隐藏键盘时回调需要返回密文与星号。
		 *       3. 密码加密规则为一输入一次迭代加密一次，在隐藏键盘时，客户端瞬间解密再进行AES加密
		 * @param $obj
		 *            {dom} input的dom
		 * @param rdm
		 *            16为随机数，用与加密因子
		 * @example &lt;input type="password" data-keyboard="TPWD" id="pwd"
		 *          readOnly>; input里面的id必填 readonly必填 data-keyboard="TPWD"
		 */
		showTPwdPicker : function($obj) {
			try {
				var rdm = Fw.getRandom(16);
				var cfg = {
					len : $obj.attr("data-len") || '6',
					transAuth : $obj.attr("data-transAuth"),
					random : rdm,
					type : "TPWD",
					callback : "_savePwd"
				}
				YT.Client.showTPwdPicker($obj, cfg);
				var wk = {
					ele : $obj
				};
				_WK_DATAS["PwdPick"] = YT.apply(wk, cfg);
			} catch (e) {
				alert("showTPwdPicker=" + e);
			}
		},
		/**
		 * @Desc 显示登录密码安全键盘(调用方法不需要在input里面加入) 密码键盘 1. 16位加密因子 2.
		 *       回调方法需要传递2个参数，在不隐藏键盘时调用回调函数不需要密文，写死为“1”，为了前端做判断用，隐藏键盘时回调需要返回密文与星号。
		 *       3. 密码加密规则为一输入一次迭代加密一次，在隐藏键盘时，客户端瞬间解密再进行AES加密
		 * @param $obj
		 *            {dom} input的dom
		 * @param rdm
		 *            16为随机数，用与加密因子
		 * @example &lt;input type="password" data-keyboard="LPWD" id="pwd"
		 *          readOnly>; input里面的id必填 readonly必填 data-keyboard="LPWD"
		 */
		showLPwdPicker : function($obj) {
			try {
				var rdm = Fw.getRandom(16);
				var cfg = {
					id : $obj.attr("id"),
					len : $obj.attr("data-maxlength") || '16',
					random : rdm,
					type : "LPWD",
					callback : "_savePwd"
				};
				YT.Client.showLPwdPicker($obj, cfg);
				var wk = {
					ele : $obj
				};
				_WK_DATAS["PwdPick"] = YT.apply(wk, cfg);
			} catch (e) {
				alert("showLPwdPicker:" + e);
			}
		},
		/**
		 * @Desc 显示日期键盘(调用方法不需要在input里面加入)
		 * @param $obj
		 *            {Object} input的dom
		 * @example &lt; input type="date" id="startDate" data-min="2014-11-13"
		 *          data-max="2015-11-13" data-format="yyyy-MM-dd"
		 *          type-keyboard="Date" data-endId="endDate" value="2014-11-15"
		 *          readOnly>; &lt; input type="date" id="endDate"
		 *          data-min="2014-11-13" data-max="2015-11-13"
		 *          data-format="yyyy-MM-dd" type-keyboard="Date"
		 *          data-startId="startDate" value="2014-11-15" readOnly>;
		 *          input里面的id必填 readonly必填 type="date" data-min 最小日期 data-max
		 *          最大日期 data-format 日期格式化 type-keyboard="Date"
		 */
		showDatePicker : function($obj) {
			try {
				var cfg = {
					text : $obj.val() || new Date().format("yyyy-MM-dd"),
					format : $obj.attr("data-format") || 'yyyy-MM-dd',
					min : '1900-01-01',
					max : '2099-12-31',
					callback : '_saveDate',
				};
				var min = $obj.attr("data-min");
				var max = $obj.attr("data-max");

				var startId = $obj.attr("data-startId");
				var endId = $obj.attr("data-endId");

				if (startId && $("#" + startId).val()) {
					cfg.min = $("#" + startId).val();
				} else if (min) {
					cfg.min = min;
				}
				if (endId && $("#" + endId).val()) {
					cfg.max = $("#" + endId).val();
				} else if (max) {
					cfg.max = max;
				}
				YT.Client.showDatePicker($obj, cfg);
				var wk = {
					ele : $obj
				};
				_WK_DATAS["datePick"] = YT.apply(wk, cfg);
			} catch (e) {
				alert('showDatePicker=' + e);
			}
		},
		/**
		 * @Desc 显示金额键盘(调用方法不需要在input里面加入)
		 * @param $obj
		 *            {Object} input的dom
		 * @example &lt; input type="money" type-keyboard="Money" id="amt"
		 *          data-maxlength="10" readOnly>; input里面的id必填 readonly必填
		 *          data-min 最小值 data-max 最大值 type-keyboard="Money"
		 */
		showMoneyPicker : function($obj) {
			try {
				var input_val = YT.Format.unfmtAmt($obj.val());
				if (input_val != "0.00" && input_val != "") {
					input_val = (input_val * 1) + "";
				} else {
					input_val = "";
				}
				var cfg = {
					text : input_val,
					len : $obj.attr("data-maxlength") || '9',
					decimalLength : $obj.attr("data-decimalLength") || '2',
					type : "MONEY",
					callback : "_saveMoney"
				};
				YT.Client.showMoneyPicker($obj, cfg);
				var wk = {
					ele : $obj
				};
				_WK_DATAS["moneyPick"] = YT.apply(wk, cfg);
			} catch (e) {
				alert('showMoneyPicker=' + e);
			}
		},
		/**
		 * @Desc 显示纯数字键盘(调用方法不需要在input里面加入)
		 * @param $obj
		 *            {Object} input的dom
		 * @example &lt; input type="text" type-keyboard="Number" id="mobile"
		 *          data-len="11" readOnly>; input里面的id必填 readonly必填
		 *          type-keyboard="Number"
		 */
		showNumPicker : function($obj) {
			try {
				var cfg = {
					text : $obj.val(),
					len : $obj.attr("data-maxlength") || '19',
					type : "NUMBER",
					callback : "_saveNumber"
				}
				YT.Client.showNumPicker($obj, cfg);
				var wk = {
					ele : $obj
				};
				_WK_DATAS["numberPick"] = YT.apply(wk, cfg);
			} catch (e) {
				alert("showNumPicker=" + e);
			}
		},
		/**
		 * @Desc 显示身份证键盘(调用方法不需要在input里面加入)
		 * @param $obj
		 *            {Object} input的dom
		 * @example &lt; input type="text" id="identity" data-keyboard="IDC"
		 *          data-minlength="16" data-maxlength="18" readOnly>;
		 *          input里面的id必填 readonly必填 type-keyboard="IDC"
		 */
		showIDCPicker : function($obj) {
			try {
				var cfg = {
					id : $obj.attr("id"),
					text : $obj.val(),
					len : $obj.attr("data-maxlength") || '18',
					type : "IDC",
					callback : "_saveIDC"
				}
				YT.Client.showIDCPicker($obj, cfg);
				var wk = {
					ele : $obj
				};
				_WK_DATAS["IDCPick"] = YT.apply(wk, cfg);
			} catch (e) {
				alert("showIDCPicker=" + e);
			}

		},
		/**
		 * 开通通讯录
		 * 
		 * @param func
		 */
		openPhoneBook : function(func) {
			func = YT.getFunctionName(func);
			YT.Client.openPhoneBook(func);
		},
		/**
		 * 二维码生成
		 * 
		 * @param data
		 *            二维码需要的参数
		 * @param callback
		 *            回掉函数
		 */
		geneQRC : function(data, callback) {
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.geneQRC(data || {}, callback);
		},
		/**
		 * 二维码扫描
		 * 
		 * @param callback
		 *            回掉函数 YT.sweepQRC(callback);
		 */
		sweepQRC : function(callback) {
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.sweepQRC(callback);
		},
		/**
		 * 分享公用方法跳转
		 * 
		 * @param data
		 *            {json} 分享参数
		 * @param callback
		 *            {string} 回调函数名称
		 * 
		 * @example YT.sharePages(data,callback);
		 */
		sharePages : function(data, callback) {
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.sharePages(data, callback)
		},
		/**
		 * 分享电子回单
		 * 
		 * @param data
		 *            {json} 分享参数
		 * @param callback
		 *            {string} 回调函数名称
		 * 
		 * @example YT.Client.shareReceipt(data,callback);
		 */
		shareReceipt : function(data, callback) {
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.shareReceipt(data, callback);
		},
		/**
		 * 调用手机拍照/相册
		 * 
		 * @param data
		 *            {json} 压缩系数等 <br>
		 *            COMP_RATE 压缩系数 0.1-1 可不传，默认0.5 HEIGHT 图片高度 可不传 WIDTH 图片宽度
		 *            可不传
		 * @param callback
		 *            {function} 回调函数名
		 * 
		 * @example YT.Device.openMobilePhoto(data,funcion(data){...});
		 */
		openMobilePhoto : function(data, callback) {
			data.type = 'photo';// 相册的type值
			data.COMP_RATE = data.COMP_RATE ? data.COMP_RATE : '0.5';// 默认值
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.openMobilePhoto(data, callback);
		},
		/**
		 * 调用手机相册
		 * 
		 * @param data
		 *            {json} 压缩系数等 <br>
		 *            COMP_RATE 压缩系数 0.1-1 可不传，默认0.5 HEIGHT 图片高度 可不传 WIDTH 图片宽度
		 *            可不传
		 * 
		 * @param callback
		 *            {function} 回调函数名
		 * 
		 * @example YT.Device.openMobilePhotoAlbum(funcion(data){...});
		 */
		openMobilePhotoAlbum : function(data, callback) {
			data.type = 'photoAlbum';// 相册和拍照的type值
			data.COMP_RATE = data.COMP_RATE ? data.COMP_RATE : '0.5';// 默认值
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.openMobilePhoto(data, callback);
		},
		/**
		 * 退出
		 * 
		 */
		appExit : function(data, callback) {
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.appExit(data, callback);
		},
		/**
		 * 下载附件
		 * 
		 */
		fileDownLoad : function(data, callback) {
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.fileDownLoad(data, callback);
		},
		/**
		 * 调用手机拍照
		 * 
		 * @param data
		 *            {json} 压缩系数等 <br>
		 *            COMP_RATE 压缩系数 0.1-1 可不传，默认0.5 HEIGHT 图片高度 可不传 WIDTH 图片宽度
		 *            可不传
		 * 
		 * @param callback
		 *            {function} 回调函数名
		 * 
		 * @example YT.Device.openMobileCamera(data,funcion(data){...});
		 */
		openMobileCamera : function(data, callback) {
			data.type = 'camera';// 相册和拍照的type值
			data.COMP_RATE = data.COMP_RATE ? data.COMP_RATE : '0.5';// 默认值
			// 获取回调函数方法名
			callback = YT.getFunctionName(callback);
			YT.Client.openMobilePhoto(data, callback);
		},
		/**
		 * 发送短信
		 * 
		 * @param func
		 */
		sendSms : function(phoneNo) {
			var cfg = {
				phoneNo : phoneNo
			}
			YT.Client.sendSms(cfg);
		},
		/**
		 * @Desc 弹出菜单层
		 * @param {array}
		 *            cfg 选择项的数组对象,每个元素包含 name ,func
		 * @example YT.showPopupWindow( [ { name: "修改别名", func:"App.modify()" }, {
		 *          name: "删除账户", func: "App.updateAlias()" }, { name: "设为默认账户",
		 *          func:"App.innerTrans()" } ]);
		 */
		showPopupWindow : function(cfg) {
			var list = [];
			$.each(cfg, function(i) {
				var map = {};
				var m = cfg[i];
				map.name = m.name;
				var func = m.func;
				func = YT.getFunctionName(func);
				map.func = func;
				list.push(map);
			});
			YT.Client.showPopupWindow(list);
		},
		/**
		 * 数据加密
		 */
		encryptData : function(func, data) {
			func = YT.getFunctionName(func);
			var cfg = {
				callback : func,
				text : data
			}
			YT.Client.encryptData(func);
		},
		/**
		 * 数据解密
		 * 
		 * @param cfg
		 */
		decodeData : function(func, data) {
			func = YT.getFunctionName(func);
			var cfg = {
				callback : func,
				text : data
			}
			YT.Client.decodeData(func);
		},
		/**
		 * 客户端坐标 {longitude,latitude}
		 */
		location : function(func) {
			func = YT.getFunctionName(func);
			YT.Client.location(func);
		},
		/**
		 * 获取城市列表
		 * 
		 * @param deep
		 * @param func
		 */
		showCityPicker : function(deep, func) {
			func = YT.getFunctionName(func);
			var cfg = {
				deep : deep,
				callback : func
			}
			YT.Client.showCityPicker(cfg);
		},
		/**
		 * 搜索框标题
		 * 
		 * @param cfg {
		 *            placeholder: '请输入搜索内容'，<br>
		 *            callback: function }
		 */
		titleSearchBar : function(placeholder, func) {
			func = YT.getFunctionName(func);
			var cfg = {
				placeholder : deep,
				callback : func
			}
			YT.Client.titleSearchBar(cfg);
		},
		/**
		 * 返回系统首页
		 */
		gotoIndex : function() {
			YT.Client.gotoIndex();
		},
		/**
		 * 返回客户端上一级
		 */
		gotoBack : function() {
			YT.Client.gotoBack();
		},
		/**
		 * 获取客户端缓存首页布局信息
		 * 
		 * @param cfg
		 */
		getLayoutData : function(func) {
			var func = YT.getFunctionName(func);
			var cfg = {
				callback : func
			}
			YT.Client.getLayoutData(cfg);
		},
		/**
		 * 设置客户端缓存首页布局信息
		 * 
		 * @param cfg
		 */
		setLayoutData : function(data) {
			YT.Client.setLayoutData(data);
		},
		/**
		 * 设置手势
		 * 
		 * @param callback
		 */
		setGesture_2 : function(callback) {
			var func = YT.getFunctionName(callback);
			YT.Client.setGesture_2(func);
		},
		/**
		 * 设置手势
		 * 
		 * @param callback
		 */
		setGesture : function(data,callback) {
			var func = YT.getFunctionName(callback);
			YT.Client.setGesture(data,func);
		},
		/**
		 * 验证手势(iphone)
		 * 
		 * @param callback
		 */
		checkGesture : function(callback) {
			var func = YT.getFunctionName(callback);
			YT.Client.checkGesture(func);
		},
		/**
		 * 开通指纹验证(iphone)
		 * 
		 * @param callback
		 */
		openFingerPrint_2 : function(callback) {
			var func = YT.getFunctionName(callback);
			YT.Client.openFingerPrint_2(func);
		},
		/**
		 * 开通指纹验证(iphone)
		 * 
		 * @param callback
		 */
		openFingerPrint : function(data,callback) {
			var func = YT.getFunctionName(callback);
			YT.Client.openFingerPrint(data,func);
		},
		/**
		 * 开启/关闭 手势或指纹登录通知客户端(iphone)
		 * 
		 * @param callback
		 */
		openOrClose : function(data,callback) {
			var func = YT.getFunctionName(callback);
			YT.Client.openOrClose(data,func);
		},
		/**
		 * 指纹验证
		 * 
		 * @param callback
		 * 
		 */
		fingerPrint : function(callback) {
			var func = YT.getFunctionName(callback);
			YT.Client.checkFingerPrint(func);
		},
		//调用拍照
		picImgs : function(data,callback) {
			try{
				var func = YT.getFunctionName(callback);
				YT.Client.picImgs(data,func);
			}catch(error){
				YT.hideWaitPanel();
			}
			
		},
		//删除图片
		imgsRomove : function(data,callback) {
			try{
				var func = YT.getFunctionName(callback);
				YT.Client.imgsRomove(data,func);
			}catch(error){
				YT.hideWaitPanel();
				if(data.isTestData){
					callback({
						flag:"1"
					})
				}
			}
			
		},
		//上传图片
		imgsUpload : function(data,callback) {
			var func = YT.getFunctionName(callback);
			YT.Client.imgsUpload(data,func);
		},
		/**
		 * 清空上传的附件
		 * clearUploadImgs
		 */
		clearUploadImgs : function() {
			YT.Client.clearUploadImgs();
		},
		/**
		 *	选择文件（录音文件）
		 **/
		singleFileChoose : function(callback){
			var func = YT.getFunctionName(callback);
			YT.Client.singleFileChoose(func);
		},
		/**
		 * 上传文件 (录音文件)
		 */
		fileUpload : function(callback){
			var func = YT.getFunctionName(callback);
			YT.Client.fileUpload(func);
		},
		//获取经纬度
		getLocation : function(data,callback) {
			var func = YT.getFunctionName(callback);
			try {
			YT.Client.getLocation(data,func);
			} catch (error) {
	        	YT.hideWaitPanel();
	        	YT.showTips("获取当前位置错误");
	        	callback({
	        		"latitude":"1333",
	        		"longitude":"识别成功",
	        		"address":"45656识别成功"
	        	});
	        }
		},
		/**
		 * 语音识别
		 */
		speechSearch : function(data,callback) {
			var func = YT.getFunctionName(callback);
			
			try {
				YT.Client.speechSearch(data,func);
			} catch (error) {
	        	YT.hideWaitPanel();
	        	
	        	
	        	YT.showTips("语音识别失败--测试");
	        	callback({
	        		"STATUS":"1",
	        		"MSG":"识别成功",
	        		"result":"45656识别成功"
	        	})
	        	
	        	
	        }
		},
		/**
		 * 打电话
		 */	
		callPhone : function(data,callback) {
			try{
				var func = YT.getFunctionName(callback);
				YT.Client.callPhone(data,func);
			}catch(error){
				YT.hideWaitPanel();
				YT.showTips("拨打电话失败");
			}
			
		},
		/**
		 * 附件阅览
		 */	
		filePreview : function(data,callback) {
			var func = YT.getFunctionName(callback);
			try {
				YT.Client.filePreview(data,func);
			} catch (error) {
	        	YT.hideWaitPanel();
	        	YT.showTips("附件阅览失败");
	        }
		},
		
	};
	/**
	 * 回显密码
	 * 
	 * @param jsonData
	 *            {json} 密文与显号 eg.{passVal:"12FABC123",showVal:"******"}
	 * @returns
	 */
	W._savePwd = function(jsonData) {
		try {
			if (YT.isString(jsonData)) {
				jsonData = YT.JsonEval(jsonData);
			}
			var passVal = jsonData.passVal;
			var showVal = jsonData.showVal;
			var cfg = _WK_DATAS["PwdPick"];
			var curObj = cfg.ele;
			var transAuth = cfg.transAuth;
			if (YT.isEmpty(passVal) || YT.isEmpty(showVal)) {
				curObj.attr("data-value", "").val("");
				// 交易认证专用
				if (!YT.isEmpty(transAuth) && transAuth == "true") {
					YT.AuthBox.TPwdCallBack(curObj);
				}
				return;
			}
			curObj.attr("data-value", passVal); // 密文
			curObj.val(showVal); // 星号
			curObj.attr("data-random", cfg.random); // 加密因子
			// 交易认证专用
			if (!YT.isEmpty(transAuth) && transAuth == "true") {
				YT.AuthBox.TPwdCallBack(curObj);
			}
		} catch (e) {
			alert("PwdPick:" + e);
		}
	};
	/**
	 * 回显日期
	 * 
	 * @param data
	 *            控件选择的的日期 默认格式 yyyy-MM-dd 或 yyyy-MM
	 */
	W._saveDate = function(data) {
		var cfg = _WK_DATAS["datePick"];
		var curObj = cfg.ele;
		curObj.val(data);
		curObj.trigger("change");
	};
	/**
	 * 回显金额
	 * 
	 * @param data
	 *            键盘输入的值
	 */
	W._saveMoney = function(data) {
		var cfg = _WK_DATAS["moneyPick"];
		var curObj = cfg.ele;
		curObj.val(data);
		curObj.trigger("change");
		curObj.trigger("input");
	};
	/**
	 * 回显数字
	 * 
	 * @param data
	 *            键盘输入的值
	 */
	W._saveNumber = function(data) {
		var cfg = _WK_DATAS["numberPick"];
		var curObj = cfg.ele;
		curObj.val(data);
		curObj.trigger("change");
		curObj.trigger("input");
	};
	/**
	 * 回显证件号
	 * 
	 * @param data
	 *            键盘输入的值
	 */
	W._saveIDC = function(data) {
		var cfg = _WK_DATAS["IDCPick"];
		var curObj = cfg.ele;
		curObj.val(data);
		curObj.trigger("change");
		curObj.trigger("input");
	}

}());
