/**
 * 
 * @FileName: ios.js
 * @demo: demo/client.html
 * @Desc: 客户端交互方法定义（ios与android相同）
 * @author: FXB
 * @date: 2017年12月26日
 * 
 * 名称 方法名 交互编号|类型
 * 
 * 1. 初始化导航栏 initPageTitle
 * 
 * 2. 信息提示框 alertinfo |ALERT
 * 
 * 3. 信息确认框 confirm |CONFIRM
 * 
 * 4. 开启等待层 openWaitPanel |OPEN
 * 
 * 5. 关闭等待层 hideWaitPanel |CLOSE
 * 
 * 6. 金额键盘 showMoneyPicker |MONEY
 * 
 * 7. 交易密码键盘 showTPwdPicker |TPWD
 * 
 * 8. 日期控件 showDatePicker
 * 
 * 9. 纯数字键盘 showNumPicker |NUMBER
 * 
 * 10.身份证键盘 showIDCPicker |IDC
 * 
 * 11.登录密码键盘 showLPwdPicker |LPWD
 * 
 * 12.打开手机电话薄 openPhoneBook
 * 
 * 13.会话超时 sessionTimeout |TIMEOUT
 * 
 * 14.登录session获取 getSession
 * 
 * 15.登录session设置 setSession
 * 
 * 16.Ajax请求 post
 * 
 * 17.返回首页 gotoIndex
 * 
 * 18.返回上一页 gotoBack
 * 
 * 19.返回登录页 gotoLogin
 * 
 * 20.二维码生成 geneQRC
 * 
 * 21.二维码扫一扫 sweepQRC
 * 
 * 22.分享公用方法跳转 sharePages
 * 
 * 23.分享电子回单 shareReceipt
 * 
 * 24.行为采集 setCollection
 * 
 * 25.调用手机拍照/相册 openMobilePhoto
 * 
 * 26.调用手机拍照 openMobileCamera
 * 
 * 27.调用手机相册 openMobilePhotoAlbum
 * 
 * 28.添加日程（iphone） addSchedule
 * 
 * 29.删除日程（iphone） deleteSchedule
 * 
 * 30.获取坐标缓存 location
 * 
 * 31.获取坐标详细地址 locationAddress
 * 
 * 带下划线内内部方法，不支持外围直接调用，如： _callHandler
 * 
 */
;
(function() {
	/**
	 * 客户端原生回调的方法名集合
	 * 
	 * <br>
	 * showMoneyKeyboard 客户端原生金额键盘回调方法<br>
	 * showTPwdKeyboard 客户端原生交易密码键盘回调方法<br>
	 * showNumberKeyboard 客户端原生数字键盘回调方法<br>
	 * showIDCKeyboard 客户端原生身份证键盘回调方法<br>
	 * showLPwdKeyboard 客户端原生登录密码键盘回调方法<br>
	 */
	var _nativeCallNames = ["showMoneyKeyboard","showTPwdKeyboard","showNumberKeyboard",
	                       "showIDCKeyboard","showLPwdKeyboard"];
	
	/**
	 * 调用客户端方法
	 *
	 * <br>
	 * @param funcName
	 * 				{string} 方法名，js与客户端约定
	 * @param jsonData
	 * 				{string} 传递参数
	 *
	 * @callback responseData
	 * 				回调参数{json}<br>
	 *  eg. {func : **,data: **}
	 */
	var _callHandler = function(funcName,jsonData){
		window.WebViewJavascriptBridge.callHandler(funcName, jsonData);
	}

	var _connectWebViewJavascriptBridge = function(callback){
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
		} else {
			document.addEventListener(
				'WebViewJavascriptBridgeReady'
				, function() {
					callback(WebViewJavascriptBridge)
				},
				false
			);
		}
	}
	var _nativeCall = function(bridge){
		bridge.init(function(message, responseCallback) {
			responseCallback && responseCallback();
		});
		//循环注册全部的客户端调用方法，并根据客户端传递过来的回调函数执行
		Fw.each(_nativeCallNames,function(val){
			bridge.registerHandler(val, function(paramData, responseCallback) {
				var responseData;
				//如果客户端传递过来的参数
				if(paramData) {
					//获取方法名
					var funcName = paramData.func;
					//获取返回数据
					var jsonData = paramData.data;
					//执行前端自定义回调方法
					responseData = window[funcName](jsonData);
				}
				if(responseData && responseCallback) {
					responseCallback(responseData);
				}
			});
		});
	}
	//开启jsbridge监听
    _connectWebViewJavascriptBridge(_nativeCall);
	/**
	 * 标题按钮json配置生成
	 * 
	 * @param {json}
	 *            cfg 按钮参数 <br>
	 * @returns json对象
	 * 
	 * exist:是否存在 text:按钮名字/图片代码 handler:处理方法
	 */
	var _generyTitleButton = function(cfg) {
		if (cfg && cfg.length == 3) {
			var name = cfg[1];
			var func = cfg[2];
			return {
				exist : cfg[0],
				text : name,
				handler : func
			};
		}
		return {
			exist : "false"
		};
	};
	/**
	 * 初始化页面title参数
	 * 
	 * @param pageId
	 *            页面id（div的id）
	 * 
	 * @return json对象
	 */
	var _getPageTitle = function(pageId) {
		var page = $(pageId);
		var cfg = {
			title : page.attr("title")
		};
		var leftCfg = page.attr("data-btnLeft").split("|");
		cfg.leftButton = _generyTitleButton(leftCfg);
		var rightCfg = page.attr("data-btnRight").split("|");
		cfg.rightButton = _generyTitleButton(rightCfg);
		var theme = page.data('theme');
		cfg.theme = theme;
		return cfg;
	};

	var iphone = {
			/**
			 * 初始化页标题栏
			 * 
			 * @param pageId
			 *            {string} 需要初始化dom的id
			 * @example YT.Client.initPageTitle("pageA");
			 */
			initPageTitle : function(pageId) {
				try {
					var titleJson = _getPageTitle(pageId);
					_callHandler("initPageTitle", titleJson);
				} catch (e) {
					alert('initPageTitle=' + e);
				}
			},
			/**
			 * 信息提示框
			 * 
			 * @param msg
			 *            {string} 信息内容
			 * @param title
			 *            {string} 弹出框标题
			 * @param okAct
			 *            {func} 确认按钮事件
			 * @param okName
			 *            {string} 确认按钮名称
			 * @example YT.Client.alertinfo('我是通知内容','标题');
			 */
			alertinfo : function(msg, title, okAct, okName) {
				try {
					var cfg = {
						title : title,
						msg : msg,
						ok_text : okName,
						ok_func : okAct || "",
						type : "ALERT"
					};
					_callHandler("alertinfo", cfg);
				} catch (e) {
					alert('alertinfo=' + e);
				}
			},
			/**
			 * 弹出确认信息框
			 * 
			 * @param msg
			 *            {string} 信息内容
			 * @param title
			 *            {string} 弹出框标题
			 * @param okAct
			 *            {string} 确认按钮事件
			 * @param cancleAct
			 *            {string} 取消按钮事件
			 * @param okName
			 *            {string} 确认按钮名称
			 * @param cancleName
			 *            {string} 取消按钮的名称
			 * @example YT.Client.confirm("我是通知内容","标题","alert(2)")
			 */
			confirm : function(msg, title, okAct, cancleAct, okName, cancleName) {
				try {
					var cfg = {
						title : title,
						msg : msg,
						ok_text : okName,
						ok_func : okAct || "",
						cancel_text : cancleName,
						cancel_func : cancleAct || "",
						type : "CONFIRM"
					};
					_callHandler("alertinfo", cfg);
				} catch (e) {
					alert('confirm=' + e);
				}
			},
			/**
			 * 开启等待层
			 * 
			 * @param msg
			 *            {string} 显示内容
			 * @example YT.Client.openWaitPanel('正在拼命加载中。。。');
			 */
			openWaitPanel : function(msg) {
				try {
					var cfg = {
						msg : msg,
						touchable : 'false',
						type : 'OPEN'
					};
					_callHandler("showWaitPanel", cfg);
				} catch (e) {
					alert('openWaitPanel=' + e);
				}
			},
			/**
			 * 关闭等待层
			 * 
			 * @param msg
			 *            {string} 显示内容
			 * @example YT.Client.openWaitPanel('正在拼命加载中。。。');
			 */
			hideWaitPanel : function() {
				try {
					var cfg = {
						type : 'CLOSE'
					};
					_callHandler("hideWaitPanel", cfg);
				} catch (e) {
					alert('hideWaitPanel=' + e);
				}
			},
			/**
			 * 显示金额键盘(调用方法不需要在input里面加入)
			 * 
			 * @param handle
			 *            {$ele} dom对象
			 * @param cfg
			 *            {json} 键盘参数
			 * @example YT.Client.showMoneyPicker($ele,cfg);
			 * 
			 */
			showMoneyPicker : function(handle, cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showMoneyKeyboard", cfg);
			},
			/**
			 * 显示交易密码安全键盘(调用方法不需要在input里面加入)
			 * 
			 * @param handle
			 *            {$ele} dom对象
			 * @param cfg
			 *            {json} 键盘参数
			 * @example YT.Client.showTPwdPicker($ele,cfg);
			 */
			showTPwdPicker : function(handle, cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showTPwdKeyboard", cfg);
				
			},
			/**
			 * 显示日期键盘(调用方法不需要在input里面加入)
			 * 
			 * @param handle
			 *            {$ele} dom对象
			 * @param cfg
			 *            {json} 键盘参数
			 * @example YT.Client.showDatePicker($ele,cfg);
			 */
			showDatePicker : function(handle, cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showCalendarView", cfg);
			},
			/**
			 * 显示纯数字键盘(调用方法不需要在input里面加入)
			 * 
			 * @param handle
			 *            {$ele} dom对象
			 * @param cfg
			 *            {json} 键盘参数
			 * @example YT.Client.showNumPicker($ele,cfg);
			 */
			showNumPicker : function(handle, cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showNumberKeyboard", cfg);
			},
			/**
			 * 显示身份证键盘(调用方法不需要在input里面加入)
			 * 
			 * @param handle
			 *            {$ele} dom对象
			 * @param cfg
			 *            {json} 键盘参数
			 * @example YT.Client.showIDCPicker($ele,cfg);
			 */
			showIDCPicker : function(handle, cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showIDCKeyboard", cfg);
			},
			/**
			 * 显示登录密码安全键盘(调用方法不需要在input里面加入)
			 * 
			 * @param handle
			 *            {$ele} dom对象
			 * @param cfg
			 *            {json} 键盘参数
			 * @example YT.Client.showLPwdPicker($ele,cfg);
			 */
			showLPwdPicker : function(handle, cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showLPwdKeyboard", cfg);
			},
			/**
			 * 将页面往上推
			 * 
			 * @param thizz
			 *            {$ele} dom对象
			 * 
			 * @example YT.Client.showKeyBoard($ele);
			 */
			showKeyBoard : function(thizz) {
				YT.Device._preShowKeyBoard(thizz);
			},
			/**
			 * 打开手机电话薄
			 * 
			 * @param callback
			 *            {string} 回调函数名称
			 * @example YT。Client.openPhoneBook(callback);
			 */
			openPhoneBook : function(func) {
				var cfg = {
					'callback' : func
				};
				_callHandler("showAddressBook", cfg);
			},
			/**
			 * 发送短信
			 * @param json{"phoneNo":""}
			 */
			sendSms : function(cfg){
				alert(YT.JsonToStr(cfg));
				_callHandler("sendSms", cfg);
			},
			/**
			 * 打电话
			 * @param json{"phoneNo":""}
			 */
			callPhone : function(cfg){
				_callHandler("callPhone", cfg);
			},
			/**
			 * session超时
			 * 
			 * @param okName
			 *            {string} 确认按钮名称
			 * @param title
			 *            {string} 标题名称名称
			 * @param msg
			 *            {string} 内容
			 * @example YT.Client.sessionTimeout('我是通知内容','标题');
			 */
			sessionTimeout : function(title, msg, okName) {
				try {
					var cfg = {
						title : title,
						msg : msg,
						ok_text : okName,
						type : "TIMEOUT"
					};
					_callHandler("sessionTimeout", cfg);
				} catch (e) {
					alert('sessionTimeout=' + e);
				}
			},
			/**
			 * 获取登录系统后存储客户端信息，json类型，数据内容变化极小的
			 * 
			 * @param callback
			 *            {string} 获取到回调 回调参数data为json字符串
			 * @param sessKey
			 *            {string}
			 *            客户端保存会话数据的key，多个则以,分隔；eg:CUST_NAME,CUST_IPHONE；不传则返回全部
			 * @example YT.Client.getSession(callback);
			 */
			getSession : function(callback) {
				
				try {
					var cfg = {
						callback : callback
					}
					_callHandler("getSession", JSON.stringify(cfg));
				} catch (e) {
					alert('getSession=' + e);
				}
			},
			/**
			 * 获取登录系统后存储客户端信息，json类型，数据内容变化极小的
			 * 
			 * @param sessData
			 *            {json} 会话数据 例如。{key1:'',key2:''}
			 * @example YT.Client.setSession({key1:'',key2:''});
			 * 
			 */
			setSession : function(sessData) {
				try {
					var cfg = {
						sessData : sessData,
					}
					_callHandler("setSession", cfg);
				} catch (e) {
					alert('setSession=' + e);
				}
			},
			/**
			 * 客户端native ajax 请求
			 * 
			 * @param url
			 *            {url} 请求地址
			 * @param params
			 *            {json} 请求参数
			 * @param succFuncName
			 *            {string} 成功回调函数名称
			 * @param failFuncName
			 *            {string} 失败回调函数名称
			 * @example YT.Client.post('/mbank/login/login.do',{p1:'x'},'success');
			 */
			post : function(cfg) {
				try {
					cfg.success = YT.getFunctionName(cfg.success);
					cfg.failure = YT.getFunctionName(cfg.failure);
					_callHandler("post", cfg);
				} catch (e) {
					alert('post=' + e);
				}
			},

			/**
			 * 返回系统首页
			 * 
			 * @example YT.Client.gotoIndex();
			 */
			gotoIndex : function() {
				YT.log.debug("--gotoIndex--");
				_callHandler("gotoIndex", {});
			},
			/**
			 * 返回上一页
			 * 
			 * @example YT.Client.gotoIndex();
			 */
			gotoBack : function() {
				YT.log.debug("--gotoBack--");
				_callHandler("gotoBack", {});
			},
			/**
			 * 返回登录页
			 * 
			 * @example YT.Client.gotoLogin();
			 */
			gotoLogin : function() {
				YT.log.debug("--gotoLogin--");
				_callHandler("gotoLogin", {});
			},

			/**
			 * 二维码生成
			 * 
			 * @param data
			 *            {json} 二维码参数
			 * @param callback
			 *            {string} 回调函数名称
			 * 
			 * @example YT.Client.geneQRC(data,callback);
			 */
			geneQRC : function(data, callback) {
				try {
					var cfg = {
						data : JSON.stringify(data),
						callback : callback,
					};
					_callHandler("geneQRC", cfg);
				} catch (e) {
					alert('geneQRC=' + e);
				}
			},
			/**
			 * 二维码扫一扫
			 * 
			 * @param callback
			 *            {string} 回调函数名称
			 * 
			 * @example YT.Client.sweepQRC(callback);
			 */
			sweepQRC : function(callback) {
				try {
					var cfg = {
						callback : callback,
					};
					_callHandler("sweepQRC", cfg);
				} catch (e) {
					alert('sweepQRC=' + e);
				}
			},
			/**
			 * 分享公用方法跳转
			 * 
			 * @param data
			 *            {json} 分享参数
			 * @param callback
			 *            {string} 回调函数名称
			 * 
			 * @example YT.Client.sharePages(data,callback);
			 */
			sharePages : function(data, callback) {
				try {
					var cfg = {
						data:data,
						callback:callback,
					}
					_callHandler("sharePages", cfg);
				} catch (e) {
					alert('sharePage=' + e);
				}
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
				try {
					var cfg = {
						data:data,
						callback:callback,
					}
					_callHandler("shareReceipt", cfg);
				} catch (e) {
					alert('shareReceipt=' + e);
				}
			},
			/**
			 * 行为采集
			 * 
			 * @param data {
			 *            EVENTNO : 事件编号, CURRENTTIMESTRING : 操作时间, MESSAGETYPE :
			 *            消息类型, //1-登陆报文,2-操作报文,3-启动日志,4-登出报文,5-注册日志,6-产品报文,7-商品报文
			 *            默认为2 PAGE_ACTIVE : 页面地址, STAY_TIME : 页面停留时间 }
			 * 
			 * @example YT.Client.setCollection(data);
			 */
			setCollection : function(data) {
				if (!YT.isEmpty(data)) {
					var time = data.STAY_TIME;
					var page = data.PAGE_ACTIVE;
					var time = data.CURRENTTIMESTRING;
					var stayTime = data.STAY_TIME;
					if (!YT.isEmpty(stayTime)) {
						YT.log.info('用户在:' + page + '，页面中停留:' + stayTime + '毫秒' + '，当前时间:' + time);
					} else {
						var eventNo = data.EVENTNO
						YT.log.info('用户在:' + page + '，页面点击了:' + eventNo + '，当前时间:' + time);
					}
					try {
						_callHandler("BehaviorCollection", data);
					} catch (e) {
						alert('BehaviorCollection=' + e);
					}
				}
			},

			/**
			 * 调用手机拍照/相册
			 * 
			 * @param data
			 *            {json} 压缩系数等 <br>
			 *            COMP_RATE 压缩系数 0.1-1 可不传，默认0.5 HEIGHT 图片高度 可不传 WIDTH 图片宽度
			 *            可不传
			 * 
			 * @param callback
			 *            {string} 回调函数名称
			 * 
			 * @example YT.Client.openMobilePhoto(callback);
			 */
			openMobilePhoto : function(data, callback) {
				try {
					var cfg = {
						data : data,
						callback : callback
					};
					_callHandler("openMobileCamera", cfg);
				} catch (e) {
					alert('openMobileCamera=' + e);
				}
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
			 *            {string} 回调函数名称
			 * 
			 * @example YT.Client.openMobileCamera(callback);
			 *//*
			openMobileCamera : function(data, callback) {
				try {
					var cfg = {
						data : data,
						callback : callback
					};
					_callHandler("openMobileCamera", cfg);
				} catch (e) {
					alert('openMobileCamera=' + e);
				}

			},
			*//**
			 * 调用手机相册
			 * 
			 * @param data
			 *            {json} 压缩系数等 <br>
			 *            COMP_RATE 压缩系数 0.1-1 可不传，默认0.5 HEIGHT 图片高度 可不传 WIDTH 图片宽度
			 *            可不传
			 * 
			 * @param callback
			 *            {string} 回调函数名称
			 * 
			 * @example YT.Client.openMobilePhotoAlbum(callback);
			 */
			openMobilePhotoAlbum : function(data, callback) {
				alert("Y3")
				return false;
				try {
					var cfg = {
						data : data,
						callback : callback
					};
					_callHandler("openMobileCamera", cfg);
				} catch (e) {
					alert('openMobileCamera=' + e);
				}
			},

			/**
			 * 添加日程（iphone）
			 * 
			 * @param data
			 *            {json} 日程参数 <br>
			 *            title //标题 location //地点 startDateStr //开始时间 endDateStr
			 *            //结束时间 allDay //是否全天 true or false notes //备注 alarmStr
			 *            //提醒
			 * @param callback
			 *            {string} 回调函数名称<br>
			 *            回调参数为{string},日程id
			 * 
			 * @example YT.Client.addSchedule(data,callback);
			 */
			addSchedule : function(data, callback) {
				try {
					var cfg = {
						data : data,
						callback : callback,
					};
					_callHandler("createEvent", cfg);
				} catch (e) {
					alert('addSchedule=' + e);
				}
			},
			/**
			 * 删除日程（iphone）
			 * 
			 * @param data
			 *            {json} 日程参数 <br>
			 *            id //日程id
			 * @param callback
			 *            {string} 回调函数名称
			 * 
			 * @example YT.Client.deleteSchedule(data,callback);
			 */
			deleteSchedule : function(data, callback) {
				try {
					var cfg = {
						data : data,
						callback : callback,
					};
					_callHandler("deleteEvent", cfg);
				} catch (e) {
					alert('deleteSchedule=' + e);
				}
			},

			/**
			 * 获取坐标数据
			 * 
			 * @param callback
			 *            {string} 回调函数名称<br>
			 *            回调参数为json，latitude:纬度 longitude:经度
			 * 
			 * @example YT.Client.location(callback);
			 */
			location : function(callback) {
				YT.log.info("---client.location---");
				try {
					var cfg = {
						callback : callback,
					};
					_callHandler("location", cfg);
				} catch (e) {
					alert('location=' + e);
				}
			},
			/**
			 * 获取坐标中文地址数据
			 * 
			 * @param callback
			 *            {string} 回调函数名称<br>
			 *            回调参数为json，latitude:纬度 longitude:经度 address:地址
			 * 
			 * @example YT.Client.locationAddress(callback);
			 * 
			 * 2018/7/19 将locationAddress改为了location
			 */
			locationAddress : function(callback) {
				YT.log.info("---client.location---");
				try {
					var cfg = {
						callback : callback,
					};
					_callHandler("location", cfg);
				} catch (e) {
					alert('location=' + e);
				}
			},
			/**
			 * 指纹验证(iphone)
			 * 
			 * @param callback
			 *            {string} 回调函数名称
			 * 
			 * @example YT.Client.fingerPrint(callback);
			 */
			checkFingerPrint : function(callback) {
				try {
					var cfg = {
						callback : callback,
					};
					_callHandler("checkFingerPrint", cfg);
				} catch (e) {
					alert('checkFingerPrint=' + e);
				}
			},
			/**
			 * 开通指纹验证(iphone)
			 * 
			 * @param callback
			 *            {string} 回调函数名称
			 * 
			 * @example YT.Client.openFingerPrint(callback);
			 */
			openFingerPrint : function(callback) {
				try {
					var cfg = {
						callback : callback,
					};
					_callHandler("openFingerPrint", cfg);
				} catch (e) {
					alert('openFingerPrint=' + e);
				}
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
				_callHandler("showPopupWindow", cfg);
			},
			/**
			 * 身份证扫描
			 * @param cfg
			 */
			idCardOCR : function(cfg){
				_callHandler("idCardOCR", JSON.stringify(cfg));
			},
			/**
			 * 识别银行卡
			 * @param callback
			 */
			bankCardOCR : function(cfg){
				_callHandler("bankCardOCR", JSON.stringify(cfg));
			},
			/**
			 * 人脸识别
			 * @param callback
			 */
			liveFaceCheck : function(cfg){
				_callHandler("liveFaceCheck", JSON.stringify(cfg));
			},
			/**
			 * 人脸识别
			 * @param callback
			 */
			infoShareView : function(cfg){
				_callHandler("InfoShareView", JSON.stringify(cfg));
			},
			/**
			 * 语音播报
			 * @param cfg
			 */
			ttsVoice : function(cfg){
				_callHandler("ttsVoice", JSON.stringify(cfg));
			},
			bankPageQueryPlugin : function(cfg){
				_callHandler("bankPageQueryPlugin", JSON.stringify(cfg));
			},
			/**
			 * 获取客户端缓存首页布局信息
			 * @param cfg
			 */
			getLayoutData : function(cfg){
				_callHandler("getLayoutData", JSON.stringify(cfg));
			},
			/**
			 * 设置客户端缓存首页布局信息
			 * @param cfg
			 */
			setLayoutData : function(data){
				_callHandler("setLayoutData", JSON.stringify(data));
			},
			/**
			 * 设置手势
			 * @param callback
			 */
			setGesture:function(callback){
				try {
					var cfg = {
						callback : callback,
					};
					_callHandler("setGesture", cfg);
				} catch (e) {
					alert('setGesture=' + e);
				}
			},
			/**
			 * 验证手势(iphone)
			 * 
			 * @param callback
			 */
			checkGesture:function(callback){
				try {
					var cfg = {
						callback : callback,
					};
					_callHandler("checkGesture", cfg);
				} catch (e) {
					alert('checkGesture=' + e);
				}
			},
			/**
			 * 开启/关闭 手势或指纹登录通知客户端(iphone)
			 * 
			 * @param callback
			 */
			openOrColse:function(callback){
				try {
					var cfg = {
						callback : callback,
					};
					_callHandler("openOrColse", cfg);
				} catch (e) {
					alert('openOrColse=' + e);
				}
			},
			/**
			 * 下载附件
			 * 
			 */
			fileDownLoad : function(data, callback) {
				alertinfo('下载附件', "333");
				try {
					var cfg = {
						data : data,
						callback : callback
					};
					_callHandler("fileDownLoad", JSON.stringify(cfg));
				} catch (e) {
					alertinfo('下载附件异常', 'exit:' + e);
				}
			},

	};

	YT.Client = iphone;
})();
