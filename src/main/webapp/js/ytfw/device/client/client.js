/**
 * 
 * @FileName: client.js
 * @demo: demo/client.html
 * @Desc: 客户端交互方法定义（ios与android相同）
 * @author: HY
 * @date: 2018年07月30日
 * 
 * 名称 方法名 交互编号|类型 客户端方法名
 * 
 * 1. 初始化导航栏 initPageTitle initPageTitle
 * 
 * 2. 信息提示框 alertinfo |ALERT alertinfo
 * 
 * 3. 信息确认框 confirm |CONFIRM alertinfo
 * 
 * 4. 开启等待层 openWaitPanel |OPEN openWaitPanel
 * 
 * 5. 关闭等待层 hideWaitPanel |CLOSE hideWaitPanel
 * 
 * 6. 金额键盘 showMoneyPicker |MONEY showMoneyKeyboard
 * 
 * 7. 交易密码键盘 showTPwdPicker |TPWD showTPwdKeyboard
 * 
 * 8. 日期控件 showDatePicker showCalendarView
 * 
 * 9. 纯数字键盘 showNumPicker |NUMBER showNumberKeyboard
 * 
 * 10.身份证键盘 showIDCPicker |IDC showIDCKeyboard
 * 
 * 11.登录密码键盘 showLPwdPicker |LPWD showLPwdKeyboard
 * 
 * 12.打开手机电话薄 openPhoneBook showAddressBook
 * 
 * 13.发送短信 sendSms sendSms
 * 
 * 14.打电话 callPhone callPhone
 * 
 * 15.会话超时 sessionTimeout |TIMEOUT sessionTimeout
 * 
 * 16.登录session获取 getSession getSession
 * 
 * 17.登录session设置 setSession setSession
 * 
 * 18.Ajax请求 post post
 * 
 * 19.返回首页 gotoIndex gotoIndex
 * 
 * 20.返回上一页 gotoBack gotoBack
 * 
 * 21.返回登录页 gotoLogin gotoLogin
 * 
 * 22.二维码生成 geneQRC geneQRC
 * 
 * 23.二维码扫一扫 sweepQRC sweepQRC
 * 
 * 24.分享公用方法跳转 sharePages share
 * 
 * 25.分享电子回单 shareReceipt shareReceipt
 * 
 * 26.行为采集 setCollection BehaviorCollection
 * 
 * 27.调用手机拍照/相册 openMobilePhoto openMobileCamera
 * 
 * 28.调用手机拍照 openMobileCamera openMobileCamera
 * 
 * 29.调用手机相册 openMobilePhotoAlbum openMobileCamera
 * 
 * 32.获取坐标缓存 location location
 * 
 * 34.指纹验证 checkFingerPrint checkFingerPrint
 * 
 * 35.开通指纹验证 openFingerPrint openFingerPrint
 * 
 * 36.弹出菜单层 showPopupWindow showPopupWindow
 * 
 * 40.分享 infoShareView InfoShareView
 * 
 * 43.获取客户端缓存首页布局信息 getLayoutData getLayoutData
 * 
 * 44.设置客户端缓存首页布局信息 setLayoutData setLayoutData
 * 
 * 45.设置手势 setGesture setGesture
 * 
 * 46.验证手势 checkGesture checkGesture
 * 
 * 47.开启/关闭 手势或指纹登录通知客户端 openOrColse openOrColse
 * 
 * 48.获取城市列表 showCityPicker showCityPicker
 * 
 * 49.首页页面跳转 openMenuPage openMenuFunc
 * 
 * 带下划线内内部方法，不支持外围直接调用，如： _callHandler
 * 
 */
;
(function() {
	/**
	 * 调用客户端方法
	 * 
	 * <br>
	 * 
	 * @param funcName
	 *            {string} 方法名，js与客户端约定
	 * @param jsonData
	 *            {string} 传递参数
	 * 
	 * @callback responseData 回调参数{json}<br>
	 *           eg. {func : **,data: **}
	 */
	var _callHandler = function(funcName, jsonData) {
		window.WebViewJavascriptBridge.callHandler(funcName, jsonData);
	}
	var _connectWebViewJavascriptBridge = function(callback) {
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
		} else {
			document.addEventListener('WebViewJavascriptBridgeReady',
					function() {
						callback(WebViewJavascriptBridge)
					}, false);
		}
	}
	var _nativeCall = function(bridge) {
		bridge.init(function(message, responseCallback) {
			responseCallback && responseCallback();
		});
	}
	// 开启jsbridge监听
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
	function generyTitleConf(cfg) {
		var ary = [];
		if (cfg && cfg[0] == "true" && ((cfg.length - 1) % 2 == 0)) {
			for (var i = 1; i < cfg.length;) {
				var name = cfg[i];
				var func = cfg[i + 1];
				if (name && func) {
					var name = cfg[i];
					ary.push({
						exist : "true",
						name : name,
						icon : "back",
						sort : ((i - 1) / 2),
						func : func
					});
				} else {
					break;
				}
				i += 2;
			}
			return ary[0];
		}
		return {
			exist : "false"
		};
	}

	var client = { /* 修改 */
		_getPageTitle : function(pageId) {
			var page = $(pageId);
			var cfg = {
				title : page.attr("title")
			};
			var leftCfg = page.attr("data-btnLeft").split("|");
			cfg.leftButton = generyTitleConf(leftCfg);
			var rightCfg = page.attr("data-btnRight").split("|");
			cfg.rightButton = generyTitleConf(rightCfg);
			var theme = page.data('theme');
			cfg.theme = theme;
			return cfg;
		},
		/**
		 * 初始化页标题栏
		 * 
		 * @param pageId
		 *            {string} 需要初始化dom的id
		 * @example YT.Client.initPageTitle("pageA");
		 */
		initPageTitle : function(pageId) {
			try {
				var json = this._getPageTitle(pageId);
				_callHandler("initPageTitle", JSON.stringify(json));
			} catch (e) {
				alertinfo('初始化页标题栏异常', 'initPageTitle:' + e);
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
				_callHandler("alertinfo", JSON.stringify(cfg));
			} catch (e) {
				alert('alertinfo:' + e);
			}
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
				_callHandler("alertinfo", JSON.stringify(cfg));
			} catch (e) {
				alert("confirm:" + e)
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
				_callHandler("openWaitPanel", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('开启等待层异常', "openWaitPanel=" + e);
			}
		},
		/**
		 * 关闭等待层
		 */
		hideWaitPanel : function() {
			try {
				var cfg = {
					type : 'CLOSE'
				};
				_callHandler("hideWaitPanel", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('关闭等待层异常', 'hideWaitPanel:' + e);
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
			try {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showMoneyKeyboard", cfg);
			} catch (e) {
				alertinfo('开启金额键盘异常', 'showMoneyPicker:' + e);
			}
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
			try {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showTPwdKeyboard", cfg);
			} catch (e) {
				alertinfo('开启交易密码安全键盘异常', 'showTPwdPicker:' + e);
			}
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
			try {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showCalendarView", cfg);
			} catch (e) {
				alertinfo('开启日期键盘异常', 'showCalendarView:' + e);
			}
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
			try {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showNumberKeyboard", cfg);
			} catch (e) {
				alertinfo('开启数字键盘异常', 'showNumPicker:' + e);
			}
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
			try {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showIDCKeyboard", cfg);
			} catch (e) {
				alertinfo('开启身份证键盘异常', 'showIDCKeyboard:' + e);
			}
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
			try {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showLPwdKeyboard", cfg);
			} catch (e) {
				alertinfo('开启登录密码安全键盘异常', 'showLPwdPicker:' + e);
			}
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
			try {
				var cfg = {
					'callback' : func
				};
				_callHandler("showAddressBook", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('打开手机电话薄异常', 'openPhoneBook:' + e);
			}
		},
		/**
		 * 发送短信
		 * 
		 * @param json{"phoneNo":""}
		 */
		sendSms : function(cfg) {
			try {
				_callHandler("sendSms", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('发送短信异常', 'sendSms:' + e);
			}
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
				_callHandler("sessionTimeout", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('session超时', "sessionTimeout:" + e)
			}
		},
		/**
		 * @Desc 获取登录系统后存储客户端信息，json类型，数据内容变化极小的
		 * @param callback
		 *            {func} 获取到回调
		 * @example YT.Client.getSession('App.getSession');
		 *          App.getSession=function(data){ console.log(data); }
		 */
		getSession : function(func) {
			try {
				var cfg = {
					callback : func
				};
				_callHandler("getSession", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('获取登录用户信息异常', 'getSession:' + e);
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
				_callHandler("setSession", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('设置登录用户信息异常', 'setSession:' + e);
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
				_callHandler("post", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('通讯组件异常', 'post:' + e);
			}
		},
		/**
		 * 返回系统首页
		 * 
		 * @example YT.Client.gotoIndex();
		 */
		gotoIndex : function() {
			try {
				_callHandler("gotoIndex", {});
			} catch (e) {
				alertinfo('返回系统首页异常', 'gotoIndex:' + e);
			}
		},
		/**
		 * 返回上一页
		 * 
		 * @example YT.Client.gotoIndex();
		 */
		gotoBack : function() {
			try {
				_callHandler("gotoBack", {});
			} catch (e) {
				alertinfo('返回上一页异常', 'gotoBack:' + e);
			}
		},
		/**
		 * 返回登录页
		 * 
		 * @example YT.Client.gotoLogin();
		 */
		gotoLogin : function() {
			try {
				_callHandler("gotoLogin", {});
			} catch (e) {
				alertinfo('返回登录页异常', 'gotoLogin:' + e);
			}
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
				_callHandler("geneQRC", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('二维码生成异常', 'geneQRC:' + e);
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
				_callHandler("sweepQRC", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('二维码扫一扫异常', 'sweepQRC:' + e);
			}
		},
		/**
		 * 分享页面跳转 修改
		 * 
		 * @param data
		 *            分享参数
		 * @param 回调函数
		 * 
		 * @returns {*} 参数1 func_id 分享功能编号 参数2 title 分享标题 参数3 content 分享摘要 参数4
		 *          code 分享编号ID 参数5 fucback 回调函数
		 */
		sharePages : function(data, callback) {
			try {
				YT.ajaxData('/common/shareInfoQuery.do', {
					FUNC_ID : data.func_id
				},
						function(dat) {
							var datas = {
								callback : callback,// 回调函数
								type : dat.SHARE_CHANNEL.split(','),// 分享渠道
								data : {
									title : callback.title,// 分享标题
									content : callback.content,// 分享摘要
									href_url : basePath + dat.SHARE_URL
											+ callback.code,// 外网跳转路径
									img_url : basePath + dat.SHARE_IMG_URL,// 分享图片来源分享页，也可默认值
									iphone : '',// 短信号码
									XH_href_url : basePath
											+ dat.SHARE_FRIEND_URL, // 好友圈分享路径
								}
							}
							_callHandler("share", JSON.stringify(datas));
						});
			} catch (e) {
				alertinfo('页面分享异常', 'sharePages:' + e);
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
					data : data,
					callback : callback,
				}
				_callHandler("shareReceipt", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('分享图片信息异常', 'shareReceipt:' + e);
			}
		},
		/**
		 * 行为采集
		 * 
		 * @param data {
		 *            EVENTNO : 事件编号, CURRENTTIMESTRING : 操作时间, MESSAGETYPE :
		 *            消息类型, //1-登陆报文,2-操作报文,3-启动日志,4-登出报文,5-注册日志,6-产品报文,7-商品报文
		 *            默认为2 PAGE_ACTIVE : 页面地址, STAY_TIME : 页面停留时间 }
		 */
		setCollection : function(data) {
			if (!YT.isEmpty(data)) {
				var time = data.STAY_TIME;
				var page = data.PAGE_ACTIVE;
				var time = data.CURRENTTIMESTRING;
				var stayTime = data.STAY_TIME;
				if (!YT.isEmpty(stayTime)) {
					YT.log.info('用户在:' + page + '，页面中停留:' + stayTime + '毫秒'
							+ '，当前时间:' + time);
				} else {
					var eventNo = data.EVENTNO
					YT.log.info('用户在:' + page + '，页面点击了:' + eventNo + '，当前时间:'
							+ time);
				}
				try {
					_callHandler("BehaviorCollection", JSON.stringify(data));
				} catch (e) {
					alertinfo('行为采集异常', 'BehaviorCollection:' + e);
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
				//alert("插件传的参数："+JSON.stringify(cfg))
				_callHandler("openMobileCamera", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('调用拍照&相册异常', 'openMobileCamera:' + e);
			}
		},
		/**
		 * 退出app
		 * 
		 */
		appExit : function(data, callback) {
			try {
				var cfg = {
					data : data,
					callback : callback
				};
				//exit 退出app gotoLogin
				_callHandler("exit", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('退出app异常', 'exit:' + e);
			}
		},
		/**
		 * 下载附件
		 * 
		 */
		fileDownLoad : function(data, callback) {
			try {
				var cfg = {
					name : data.name,
					file_id : data.file_id,
					file_type : data.file_type,
					callback : callback
				};
				_callHandler("fileDownLoad", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('下载附件异常',"fileDownLoad:"+e);
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
		 */
		openMobileCamera : function(data, callback) {
			try {
				var cfg = {
					data : data,
					callback : callback
				};
				
				_callHandler("openMobileCamera", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('调用拍照异常', 'openMobileCamera:' + e);
			}
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
		 *            {string} 回调函数名称
		 * 
		 * @example YT.Client.openMobilePhotoAlbum(callback);
		 */
		openMobilePhotoAlbum : function(data, callback) {
			try {
				var cfg = {
					//data : data,
					USER_ID:data.USER_ID,
					callback : callback
				};
				_callHandler("openMobileCamera", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('调用相册异常', 'openMobileCamera:' + e);
			}
		},
		/**
		 * 获取坐标数据
		 * 
		 */
		getLocation : function(data,callback) {
			try {
				var json = {
					"callback" : callback
				};
				_callHandler("location", JSON.stringify(json));
			} catch (e) {
				alertinfo('获取坐标信息异常', 'location:' + e);
			}
		},
		/**
		 * 语音识别
		 */	
		callPhone : function(data,callback) {
			try {
				var json = {
					"cust_phone" : data.cust_phone,
					"callback" : callback
				};
				_callHandler("phoneDial", JSON.stringify(json));
			} catch (e) {
				alertinfo('拨打电话', 'callPhone:' + e);
			}
		},
		/**
		 * 语音识别
		 */	
		speechSearch : function(data,callback) {
			try {
				var json = {
					"callback" : callback
				};
				_callHandler("speechSearch", JSON.stringify(json));
			} catch (e) {
				alertinfo('语音识别', 'speechSearch:' + e);
			}
		},
		/**
		 * 附件阅览
		 */	
		filePreview : function(data,callback) {
			try {
				var json = {
					"callback" : callback
				};
				Object.assign(json,data);
				_callHandler("filePreview", JSON.stringify(json));
			} catch (e) {
				alertinfo('附件阅览', 'filePreview:' + e);
			}
		},
		
		/**
		 * 指纹验证
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
				_callHandler("checkFingerPrint", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('调用指纹验证异常', 'checkFingerPrint:' + e);
			}
		},
		/**
		 * 拍照
		 * picImgs
		 */
		picImgs : function(data, callback) {
			try {
				var cfg = {
					callback : callback,
					data : data
				};
				//Object.assign(cfg,data);
				_callHandler("singleImagePic", JSON.stringify(cfg));
				
			} catch (e) {
				alertinfo('拍照', 'singleImagePic:' + e);
			}
		},
		/**
		 * 删除图片
		 * imgsRomove
		 */
		imgsRomove : function(data, callback) {
			try {
				var cfg = {
					callback : callback
				};
				Object.assign(cfg,data);
				_callHandler("removeImage", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('拍照', 'removeImage:' + e);
			}
		},
		/**
		 * 上传图片
		 * imgsUpload
		 */
		imgsUpload : function(data, callback) {
			try {
				var cfg = {
					callback : callback
				};
				Object.assign(cfg,data);
				//alert("开始调插件：singleImagesUpload");
				_callHandler("singleImagesUpload", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('拍照', 'singleImagesUpload:' + e);
			}
		},
		/**
		 * 清空上传的附件
		 * clearUploadImgs
		 */
		clearUploadImgs : function() {
			try {
				var cfg = {
						callback : "",
					};
				_callHandler("clearUploads", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('清空上传的附件', 'clearUploads:' + e);
			}
		},
		/**
		 * 选择文件（录音文件）
		 **/
		singleFileChoose : function(callback){
			try {
				var cfg = {
					callback : callback
				};
				//Object.assign(cfg,data);
				_callHandler("singleFileChoose", JSON.stringify(cfg));
				
			} catch (e) {
				alertinfo('选择录音文件', 'singleFileChoose:' + e);
			}
		},
		/**
		 * 上传文件（录音文件）
		 **/
		fileUpload : function(callback){
			try {
				var cfg = {
					callback : callback
				};
				//Object.assign(cfg,data);
				_callHandler("fileUpload", JSON.stringify(cfg));
				
			} catch (e) {
				alertinfo('上传录音文件', 'fileUpload:' + e);
			}
		},
		/**
		 * 获取经纬度
		 */
//		location : function(data, callback) {
//			try {
//				var cfg = {
//					callback : callback
//				};
//				Object.assign(cfg,data);
//				_callHandler("location", JSON.stringify(cfg));
//			} catch (e) {
//				alertinfo('拍照', 'location:' + e);
//			}
//		},
		/**
		 * 开通指纹验证(iphone)
		 * 
		 * @param callback
		 *            {string} 回调函数名称
		 * 
		 * @example YT.Client.openFingerPrint(callback);
		 */
		openFingerPrint_2 : function(callback) {
			try {
				var cfg = {
					callback : callback ,
				};
				//alert(JSON.stringify(cfg));
				//openFingerPrint
				//alert("插件名： openFingerPrint");
				_callHandler("openFingerPrint", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('开通指纹验证异常', 'openFingerPrint:' + e);
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
		openFingerPrint : function(data,callback) {
			try {
				var cfg = {
					callback : callback
				};
				if(data.write_switch=="9"){
					cfg.write_switch = "";
				}else{
					cfg.write_switch = data.write_switch;
				}
				//alert(JSON.stringify(cfg));
				//openFingerPrint
				//alert("插件名： fingerSwitch");
				_callHandler("fingerSwitch", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('开通指纹验证异常', 'openFingerPrint:' + e);
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
			try {
				_callHandler("showPopupWindow", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('开启弹出菜单层异常', 'showPopupWindow:' + e);
			}
		},
		/**
		 * 获取客户端缓存信息
		 * 
		 * @param cfg
		 */
		getLayoutData : function(cfg) {
			try {
				_callHandler("getLayoutData", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('获取客户端缓存信息', 'showPopupWindow:' + e);
			}
		},
		/**
		 * 设置客户端缓存信息
		 * 
		 * @param cfg
		 */
		setLayoutData : function(data) {
			try {
				_callHandler("setLayoutData", JSON.stringify(data));
			} catch (e) {
				alertinfo('设置客户端缓存信息', 'setLayoutData:' + e);
			}
		},
		/**
		 * 设置手势
		 * 
		 * @param callback
		 */
		setGesture_2 : function(callback) {
			try {
				var cfg = {
					callback : callback
				};
				_callHandler("setGesture", JSON.stringify(cfg));
				//alert('插件名2：setGesture');
			} catch (e) {
				alertinfo('设置手势异常', 'setGesture:' + e);
			}
		},
		/**
		 * 设置手势
		 * 
		 * @param callback
		 */
		setGesture : function(data,callback) {
			try {
				var cfg = {
					callback : callback
				};
				if(data.write_switch=="9"){
					cfg.write_switch = "";
				}else{
					cfg.write_switch = data.write_switch;
				}
				//alert("gestureSwitch:"+JSON.stringify(cfg));
				//setGesture write_switch
				
				_callHandler("gestureSwitch", JSON.stringify(cfg));
				//alert('插件名1：gestureSwitch');
			} catch (e) {
				alertinfo('设置手势异常', 'setGesture:' + e);
			}
		},
		/**
		 * 验证手势(iphone)
		 * 
		 * @param callback
		 */
		checkGesture : function(callback) {
			try {
				var cfg = {
					callback : callback
				};
				_callHandler("checkGesture", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('手势验证异常', 'checkGesture:' + e);
			}
		},
		/**
		 * 开启/关闭 手势或指纹登录通知客户端
		 * 
		 * @param callback
		 */
	/*	openOrColse : function(callback) {
			try {
				var cfg = {
					callback : callback,
				};
				_callHandler("openOrColse", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('开启手势或指纹登录异常', 'openOrColse:' + e);
			}
		},  */
		
		//重写通知客户端方法
		openOrClose : function(data,callback){
			try{
				var cfg={
					callback: callback,
					isshow : data.isshow
				};
				
				 console.log("++++++++===最后传递===+++++"+cfg.isshow);
				_callHandler("openOrClose",JSON.stringify(cfg));
			}catch(e){
				alertinfo('开启手势异常', 'openOrClose:' + e);
			}
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
		 * @example YT.Client.getNativeCache('/mbank/login/login.do','1.1','finance',{p1:'x'},'success');
		 */
		getNativeCache : function(cfg) {
			try {
				cfg.success = YT.getFunctionName(cfg.success);
				cfg.failure = YT.getFunctionName(cfg.failure);
				_callHandler("getNativeCache", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('调用缓存请求通讯组件异常', 'getNativeCache:' + e);
			}
		},
		/**
		 * 首页页面跳转 openMenuPage openMenuFunc
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
			try {
				_callHandler("openMenuFunc", JSON.stringify(cfg));
			} catch (e) {
				alertinfo('Web首页跳转组件异常', 'openMenuFunc:' + e);
			}
		}
	};

	/**
	 * 将客户端返回文本 JSON 转成对象 JSON
	 */
	function jsonCallback(callback) {
		return YT.getFunctionName(function(data) {
			callback && callback(YT.isString(data) ? YT.evalJson(data) : data);
		});
	}

	YT.Client = client;
})();