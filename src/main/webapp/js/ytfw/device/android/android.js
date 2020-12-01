/**
 * 
 * @FileName: android.js
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
 * 30.获取坐标缓存 location ----
 * 
 * 31.获取坐标详细地址 locationAddress ----
 * 
 * 带下划线内内部方法，不支持外围直接调用，如： _callHandler
 * 
 */
;(function(){
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
	                       "showIDCKeyboard","showLPwdKeyboard","showCalendarView"];
	
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
		return  {
			exist : "false"
		} ;
	}
	
	var android = {
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
			 */
			initPageTitle : function(pageId) {
				var json = this._getPageTitle(pageId);
				_callHandler("initPageTitle", JSON.stringify(json));
			},
			/**
			 * 开启等待层
			 */
			openWaitPanel : function(msg) {
				try{
					var cfg = {
						msg : msg,
						touchable : 'false'
					};
					_callHandler("openWaitPanel", JSON.stringify(cfg));
				}catch(e){
					alert("openWaitPanel="+e);
				}
			},
			/**
			 * 关闭等待层
			 */
			hideWaitPanel : function() {
				_callHandler("hideWaitPanel", JSON.stringify({}));
			},
			/**
			 * 弹出信息
			 */
			alertinfo : function(msg, title, okAct, okName) {
				try {
					var cfg = {
						title : title,
						msg : msg,
						ok_text : okName,
						ok_func : okAct || ""
					};
					_callHandler("alertinfo", JSON.stringify(cfg));
				} catch(e){
					alert('alertinfo=' + e);
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
						ok_func : okAct,
						cancel_text : cancleName,
						cancel_func : cancleAct || ""
					};
					_callHandler("confirm", JSON.stringify(cfg));
				}catch(e){
					alert("confirm:"+e)
				}
			},
			/**
			 * 打开手机电话薄
			 */
			openPhoneBook : function(func) {
				var cfg = {
					'callback' : func
				};
				_callHandler("showAddressBook", JSON.stringify(cfg));
			},
			/**
			 * 发送短信
			 * @param json{"phoneNo":""}
			 */
			sendSms : function(cfg){
				_callHandler("sendSms", JSON.stringify(cfg));
			},
			/**
			 * 打电话
			 * @param json{"phoneNo":""}
			 */
			callPhone : function(cfg){
				_callHandler("callPhone", JSON.stringify(cfg));
			},
			/**
			 * 服务端超时
			 */
			sessionTimeout : function(title, msg, okName) {
				try {
					var cfg = {
						title : title,
						msg : msg,
						ok_text : okName
					};
					_callHandler("sessionTimeout", JSON.stringify(cfg));
				}catch (e){
					alert("sessionTimeout="+e)
				}
			},
			/**
			 * @Desc 获取登录系统后存储客户端信息，json类型，数据内容变化极小的
			 * @param callback
			 *            {func} 获取到回调
			 * @example YT.Client.getSession('App.getSession'); App.getSession=function(data){ console.log(data); }
			 */
			getSession : function(func) {
				try {
					var cfg = {
						callback : func
					};
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
					_callHandler("setSession", JSON.stringify(cfg));
				} catch (e) {
					alert('setSession=' + e);
				}
			},
			/**
			 * 客户端native ajax 请求
			 * 
			 * @param url
			 *            请求地址
			 * @param params
			 *            请求参数
			 * @param success
			 *            成功回调函数
			 * @param failure
			 *            失败回调函数
			 */
			post : function(cfg) {
				cfg.success = YT.getFunctionName(cfg.success);
				cfg.failure = YT.getFunctionName(cfg.failure);
				_callHandler("post", JSON.stringify(cfg));
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
					alert('fingerPrint=' + e);
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
					_callHandler("openFingerPrint", JSON.stringify(cfg));
				} catch (e) {
					alert('openFingerPrint=' + e);
				}
			},
			/**
			 * 弹出菜单层
			 */
			showPopupWindow : function(cfg) {
				_callHandler("showPopupWindow", JSON.stringify(cfg));
			},
			/**
			 * @Desc 返回系统首页(此方法直接使用,客户端会自动监听
			 * @example YT.gotoIndex();
			 */
			gotoIndex : function() {
				YT.showTips('gotoIndex');
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
			 * 日期键盘显示
			 */
			showDatePicker : function(handle,cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showCalendarView", cfg);
			},
			/**
			 * 显示金额键盘
			 */
			showMoneyPicker : function(handle,cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showMoneyKeyboard", cfg);
			},
			/**
			 * 显示纯数字键盘
			 */
			showNumPicker : function(handle,cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showNumberKeyboard", cfg);
			},
			/**
			 * @Desc 显示身份证键盘(调用方法不需要在input里面加入)
			 */
			showIDCPicker : function(handle,cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showIDCKeyboard", cfg);
			},
			/**
			 * 显示交易密码安全键盘(调用方法不需要在input里面加入)
			 */
			showTPwdPicker : function(handle,cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showTPwdKeyboard", cfg);
			},
			/**
			 * @Desc 显示登录密码安全键盘(调用方法不需要在input里面加入)
			 */
			showLPwdPicker : function(handle,cfg) {
				// 调用键盘页面上滑处理
				YT.Client.showKeyBoard(handle);
				_callHandler("showLPwdKeyboard", cfg);
			},
			/**
			 * 将页面往上推
			 * @param thizz
			 */
			showKeyBoard : function(thizz){
				YT.Device._preShowKeyBoard(thizz);
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
					_callHandler("sweepQRC", JSON.stringify(cfg));
				} catch (e) {
					alert('sweepQRC=' + e);
				}
			},
			/**
			 * 打开附件
			 */
			openAttach : function(url, title, func) {
				if (url) {
					clientJs.lookFile(url, title, func);
				} else {
					this.alertinfo("文件链接不存在");
				}
			},
			
			/**
			 * 分享页面跳转
			 * 
			 * @returns {*} 参数1 func_id 分享功能编号 参数2 title 分享标题 参数3 content 分享摘要 参数4 code 分享编号ID 参数5 fucback 回调函数
			 */
			sharePages : function(callback) {
				try {
					YT.ajaxData('/common/shareInfoQuery.do', {
						FUNC_ID : callback.func_id
					}, function(dat) {
						var datas = {
							callback : callback.fucback,// 回调函数
							type : dat.SHARE_CHANNEL.split(','),// 分享渠道
							data : {
								title : callback.title,// 分享标题
								content : callback.content,// 分享摘要
								href_url : basePath + dat.SHARE_URL + callback.code,// 外网跳转路径
								img_url : basePath + dat.SHARE_IMG_URL,// 分享图片来源分享页，也可默认值
								iphone : '',// 短信号码
								XH_href_url : basePath + dat.SHARE_FRIEND_URL, // 好友圈分享路径
							}
						}
						_callHandler("share", JSON.stringify(datas));
					});
				} catch (e) {
					YT.alertinfo('sharePages=' + e);
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
					_callHandler("shareReceipt", JSON.stringify(cfg));
				} catch (e) {
					alert('shareReceipt=' + e);
				}
			},
			/**
			 * 网点查询
			 * 
			 * @returns {*}
			 */
			branchPages : function(callback) {
				try {
					clientJs && clientJs.getWebParams(callback);
				} catch (e) {
					YT.alertinfo('branchPages=' + e);
				}
			},
			/**
			 * 行为采集
			 * 
			 * @param data {
			 *            EVENTNO : 事件编号, CURRENTTIMESTRING : 操作时间, MESSAGETYPE : 消息类型,
			 *            //1-登陆报文,2-操作报文,3-启动日志,4-登出报文,5-注册日志,6-产品报文,7-商品报文 默认为2 PAGE_ACTIVE : 页面地址, STAY_TIME : 页面停留时间 }
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
						_callHandler("BehaviorCollection", JSON.stringify(data));
					} catch (e) {
						YT.alertinfo('BehaviorCollection=' + e);
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
					_callHandler("openMobilePhoto", JSON.stringify(cfg));
				} catch (e) {
					alert('openMobilePhoto=' + e);
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
					alert('openMobileCamera=' + e);
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
				alert("Y2")
				return false;
				try {
					var cfg = {
						data : data,
						callback : callback
					};
					_callHandler("openMobilePhotoAlbum", JSON.stringify(cfg));
				} catch (e) {
					alert('openMobilePhotoAlbum=' + e);
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
					_callHandler("createEvent", JSON.stringify(cfg));
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
					_callHandler("deleteEvent", JSON.stringify(cfg));
				} catch (e) {
					alert('deleteSchedule=' + e);
				}
			},
			
			location : function(callback) {
				YT.log.info("---client.location---");
				var json = {
					"callback" : jsonCallback(callback || YT.alertinfo)
				};
				YT.log.info("client input params: ", json);
				YT.log.info("client input params: ", JSON.stringify(json));
				_callHandler("location", JSON.stringify(json));
			},
			/**
			 * 2018/7/19 将locationAddress改为了location
			 */
			locationAddress : function(callback) {
				YT.log.info("---client.location---");
				var json = {
					"callback" : jsonCallback(callback || YT.alertinfo)
				};
				YT.log.info("client input params: ", JSON.stringify(json));
				_callHandler("location", JSON.stringify(json));
			},
			showCityPicker : function(conf) {
				YT.log.info("---client.showCityPicker---");
				var json = $.extend({}, conf);
				json.callback = jsonCallback(json.callback || YT.alertinfo);
				YT.log.info("client input params: ", JSON.stringify(json));
				_callHandler("showCityPicker", JSON.stringify(json));
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
					_callHandler("setGesture", JSON.stringify(cfg));
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
					_callHandler("checkGesture", JSON.stringify(cfg));
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
					_callHandler("openOrColse", JSON.stringify(cfg));
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
	
	/**
	 * 将客户端返回文本 JSON 转成对象 JSON
	 */
	function jsonCallback(callback) {
		return YT.getFunctionName(function(data) {
			callback && callback(YT.isString(data) ? YT.evalJson(data) : data);
		});
	}
	
	YT.Client = android;
})();