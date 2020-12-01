/**
 * 
 * @FileName: web
 * @Desc: web交互方法定义
 * @author: LQ
 * @date: 2015年8月12日
 * 
 */
/**
 * 名称 方法名
 * 
 * @code 1. 初始化导航栏 initPageTitle
 * @code 2. 开启等待层 openWaitPanel
 * @code 3. 关闭等待层 hideWaitPanel
 * @code 4. 信息提示框 alertinfo
 * @code 5. 信息确认框 confirm
 * @code 6. 会话超时 sessionTimeout
 * @code 7. 登录session获取 getSession
 * @code 8. Ajax请求 post
 * @code 9. 弹出菜单 showPopupWindow
 * @code 10.返回首页 gotoIndex
 * @code 11.日期控件 showDatePicker
 * @code 12.金额键盘 showMoneyPicker
 * @code 13.纯数字键盘 showNumPicker
 * @code 14.身份证键盘 showIDCPicker
 * @code 15.交易密码键盘 showTPwdPicker
 * @code 16.登录密码键盘 showLPwdPicker
 * @code 17.全键盘 showAllPicker
 * 
 */
$(function() {
	var TAG = "YT.Web";
	YT.log.debug("---init--", TAG);
	NS.EVT = {
		TOUCH_START : "mousedown",
		TOUCH_END : "mouseup",
		TOUCH_MOVE : "scroll"
	};
	initEvent();
	function initEvent() {
		$(document).on('click', '#_authBox .sixDigitPassword i', function() {
			/*
			 * $(this).hide(); $(this).prev().show().focus();
			 */
			$('#DRAW_PWD').focus();
		});
		$(document).on(
				'keyup',
				'#DRAW_PWD',
				function(e) {
					var _this = $("div.sixDigitPassword").find('i');
					curIndex = 0;
					var e = (e) ? e : window.event;
					YT.log.debug("============keyup=========", e);
					if (e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57)
							|| (e.keyCode >= 96 && e.keyCode <= 105)) {
						curIndex = this.value.length - 1;
						l = _this.size();
						for (; l--;) {
							if ($("#DRAW_PWD").attr("type") == "password") {
								_this.eq(l).html("·");
							} else {
								_this.eq(l).html(this.value.split('')[l]);
							}

							if (l > curIndex) {
								_this.eq(l).html('');
							}
						}
						if (this.value.length == 6) {
							YT.log.debug('===密码===', this.value);
						}
					} else {
						this.value = this.value.replace(/\D/g, '');
					}
				});

	}

	function confTitleButton(cfg) {
		if (cfg && cfg.length == 3) {
			return {
				exist : cfg[0],
				name : cfg[1],
				func : cfg[2]
			};
		}
		return {
			exist : false
		};
	}
	function confPageTitle(pageId) {
		var page = $(pageId);
		var cfg = {
			title : page.attr("title")
		};
		var leftCfg = page.attr("data-btnLeft").split("|");
		cfg.leftButton = confTitleButton(leftCfg);
		var rightCfg = page.attr("data-btnRight").split("|");
		cfg.rightButton = confTitleButton(rightCfg);
		var theme = page.data('theme');
		cfg.theme = theme;
		return cfg;
	}
	YT.Client = {
		/**
		 * AA提示框(iphone)
		 * 
		 * @param callback
		 */
		aaDialog : function(callback) {
			YT.log.debug('AA收款提示框調用成功');
			callback && callback();
		},
		/**
		 * 页面跳转
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
			YT.nextPage(cfg.url);
		},
		/**
		 * 初始化标题
		 */
		initPageTitle : function(pageId) {
			YT.log.debug("--initPageTitle-----", "Client.web");
			var conf = confPageTitle(pageId);
			YT.Titlebar.change(conf);
		},
		/**
		 * 搜索框标题
		 * 
		 * @param cfg
		 */
		titleSearchBar : function(cfg) {
			YT.Titlebar.changeTitle(cfg);
		},
		/**
		 * 开通指纹验证(iphone)
		 * 
		 * @param callback
		 */
		openFingerPrint : function(callback) {
			YT.log.debug('开通指纹验证');
			callback && callback();
		},
		/**
		 * 下载附件
		 * 
		 */
		fileDownLoad : function(callback) {
			YT.log.debug('下载附件');
		},
		/**
		 * 指纹验证(iphone)
		 * 
		 * @param callback
		 */
		fingerPrint : function(callback) {
			YT.log.debug('指纹验证调用成功');
			callback && callback();
		},
		/**
		 * 调用手机相册(iphone)
		 * 
		 * @param callback
		 */
		openMobilePhoto : function(callback) {
			YT.log.debug('手机相册调用成功');
			callback && callback();
		},
		/**
		 * 打开通讯录
		 * 
		 * @param callback
		 */
		openPhoneBook : function(func) {
			YT.showTips('打开通讯录');
			eval('(' + func + '())');
		},
		/**
		 * 发送短信
		 * 
		 * @param func
		 */
		sendSms : function(cfg) {
			YT.showTips(cfg.phoneNo);
		},
		/**
		 * 打电话
		 * 
		 * @param func
		 */
		callPhone : function(cfg) {
			YT.showTips(cfg.phoneNo);
		},
		/**
		 * 开启等待层
		 */
		openWaitPanel : function() {
			// YT.log.debug("--openWaitPanel-----", "Client.web");
			YT.Layer.openWaitPanel();
		},
		/**
		 * 关闭等待层
		 */
		hideWaitPanel : function(timeout) {
			// YT.log.debug("--hideWaitPanel-----", "Client.web");
			YT.Layer.hideWaitPanel(timeout);
		},
		/**
		 * 弹出信息
		 * 
		 * @example : <br>
		 * 
		 */
		alertinfo : function(msg, title, okAct, okName) {
			YT.log.debug("alertinfo--callback", TAG);
			YT.MsgBox.hideMsgBox();
			YT.MsgBox.alertinfo(msg, title, function() {
				YT.log.debug(okAct, TAG);
				if (okAct) {
					if (okAct.substr(okAct.length - 1) != ")") {
						okAct = okAct + "()";
					}

					eval("(" + okAct + ")");
					YT.MsgBox.hideMsgBox();
				} else {
					YT.MsgBox.hideMsgBox();
				}
			}, okName);
		},
		confirm : function(msg, title, okAct, cancleAct, okName, cancleName) {
			// YT.confirm(msg,title,okAct,cancleAct);

			YT.log.debug("-confirm-1-", TAG);
			YT.MsgBox.hideMsgBox();
			YT.MsgBox.confirm(msg, title, function() {
				YT.log.debug("confirm-21-", TAG);
				YT.MsgBox.hideMsgBox();
				// okAct();
				okAct && eval("(" + okAct + ")");
			}, function() {
				YT.log.debug("-confirm-22-", TAG);
				if (cancleAct) {
					eval("(" + cancleAct + ")");
					YT.MsgBox.hideMsgBox();
				} else {
					YT.MsgBox.hideMsgBox();
				}
			}, okName, cancleName);
		},
		/**
		 * 服务端超时
		 */
		sessionTimeout : function() {
			YT.Client.alertinfo("会话超时，请重新登录", "温馨提示",
					"YT.redirect('http://www.baidu.com')");
		},
		/**
		 * @Desc 获取登录系统后存储客户端信息，json类型，数据内容变化极小的
		 * @param callback
		 *            {func} 获取到回调
		 * @example YT.Client.getSession('App.getSession');
		 *          App.getSession=function(data){ console.log(data); }
		 */
		getSession : function(callback) {
			try {
				var info = {
					mobile : "15609693868",
					cerType : "01",
					cerId : "3401221988181810213"
				};

				return window[callback](info);
			} catch (e) {
				alert('getSession=' + e);
			}
		},
		post : function(cfg) {
			YT.AjaxUtil.ajaxData(cfg);
		},
		/**
		 * 弹出菜单层
		 */
		showPopupWindow : function(cfg) {
			var actionSheetButtons = [];
			var buttons = [];
			if (cfg.length > 0) {
				$.each(cfg, function(i, v) {
					var a = {
						text : v.name,
						onClick : v.func
					};
					buttons.push(a);

				});
				actionSheetButtons = [ buttons, [ {
					text : '取消',
					bold : true
				} ] ];
				YT.actions(actionSheetButtons);
			}
		},
		_hidePopupWindow : function() {
			// $("#popupwindow").hide();
		},
		/**
		 * @Desc 返回系统首页(此方法直接使用,客户端会自动监听
		 * @example YT.gotoIndex();
		 */
		gotoIndex : function() {
			YT.Client.alertinfo("返回系统首页");
		},
		/**
		 * @Desc 返回上一级(此方法直接使用,客户端会自动监听
		 * @example gotoBack();
		 */
		gotoBack : function() {
			YT.Client.alertinfo("返回上一级");
		},
		showPopupWindow : function() {
			YT.Client.alertinfo("showPopupWindow");
		},
		/**
		 * 显示日期键盘
		 * 
		 * @param obj
		 * @example <br>
		 *          &lt;input type="text" id="startDate" data-min="" data-max=""
		 *          data-startId="" data-endId="" readOnly
		 *          onclick="YT.Client.showDatePicker(this)"&gt; <br>
		 */
		showDatePicker : function(handle, cfg) {
			if (handle.attr("data-init") == "true")
				return;
			handle.attr("data-init", "true");
			handle.off("click").removeAttr("readonly");
		},
		/**
		 * 显示金额键盘
		 * 
		 * @param obj
		 */
		showMoneyPicker : function(handle, cfg) {
			if (handle.attr("data-init") == "true")
				return;
			handle.attr("data-init", "true").off('click')
					.removeAttr('readonly');
		},
		showNumPicker : function(handle, cfg) {
			if (handle.attr("data-init") == "true")
				return;
			handle.attr("data-init", "true").off('click')
					.removeAttr('readonly');
		},
		showIDCPicker : function(handle, cfg) {
			if (handle.attr("data-init") == "true")
				return;
			handle.attr("data-init", "true").off('click')
					.removeAttr('readonly');
		},
		/**
		 * 显示安全键盘
		 * 
		 * @example <br>
		 *          &gt;input type="password" id="password" data-maxlength=""
		 *          data-minlength="" data-kind="" （键盘模式）
		 *          onclick="YT.Client.showPwdPicker(this)"&gt; <br>
		 */
		showTPwdPicker : function(handle, cfg) {
			if (handle.attr("data-init") == "true")
				return;
			handle.attr("data-init", "true").off('click')
					.removeAttr('readonly');
		},
		showLPwdPicker : function(handle, cfg) {
			if (handle.attr("data-init") == "true")
				return;
			handle.attr("data-init", "true").off('click')
					.removeAttr('readonly');
		},
		/**
		 * 将页面往上推
		 * 
		 * @param thizz
		 */
		showKeyBoard : function(thizz) {
			YT.log.info('showKeyBoard');
			// YT.Device._preShowKeyBoard(thizz);
		},
		/**
		 * 下拉更新
		 * 
		 * @param callback
		 */
		pullToRefresh : function(callback) {
			console.log('初始化下拉更新' + callback);
		},
		login : function(loginName, password) {
			YT.ajaxData('login', {
				"LOGIN_TYPE" : "00",
				"LOGIN_ID" : loginName,
				"SYS_VERSION" : "",
				"CLIENT_OS_TYPE" : "iphone",
				"APP_VERSION" : "1.31",
				"DEVICE_UUID" : "",
				"LOGIN_PASS" : password
			}, function(data) {
				if (1 == data.STATUS) {
					console.log("登录成功");
					sessionStorage.setItem('session', JSON.stringify(data));
					window.location.reload();
					return false;
				}
				YT.alert(data.MSG, '提示', function() {
					window.location.reload();
				});
			}, function(data) {
				YT.alert(data.MSG, '提示', function() {
					window.location.reload();
				});
			})
		},
		logout : function() {
			YT.confirm('确认退出登录', '提示', function() {
				YT.ajaxData('logout', {}, function() {
					window.location.reload();
				});
				sessionStorage.removeItem('session');
			});
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
			var config = {
				ad : '当前位置街道',
				aoc : '操作前的内容',
				bc : '银行编号',
				bv : '设备系统版本',
				ce : '扩展属性',
				clt : '设备类型',
				cn : '运营商',
				ci : '渠道ID',
				ct : '操作时间',
				dm : '设备型号',
				dn : '设备标识',
				en : '事件编号',
				fp : '上一个页面地址',
				gps : 'GPS',
				ia : '客户端ip',
				ij : '是否越狱',
				ind : '是否安装新设备',
				mt : '消息类型',// ,1：登录、2：启动、3：操作、4：访问
				nw : '网络类型',
				oc : '操作内容',
				pp : '当前页面地址',
				rn : '设备分辨率',
				si : '启动ID',
				sv : '设备系统版本',
				st : '上一个页面停留时间',
				stt : '启动时间'
			};
			var logs = '#########################################################\n';
			$.each(data,function(k,v){
				var val = config[k];
				if(k == 'mt'){
					if(v == '3'){
						v = '操作'
					}else if(v == '4'){
						v = '访问';
					}
				}
				if(!YT.isEmpty(val)){
					logs += val +': '+v + '\n';
				}
			});
			logs += '#########################################################';
			YT.log.info(logs);
			
			var wcd = localStorage.getItem('WEB_COLLECT_STORAGE');
			var storageList = [];
			if(!YT.isEmpty(wcd)){
				storageList = YT.JsonEval(wcd);
			}
			storageList.push(data);
			localStorage.setItem('WEB_COLLECT_STORAGE',YT.JsonToStr(storageList));
			var len = storageList.length;
			if(len>=10){ //采集大于10条时，发送采集信息
				localStorage.removeItem('WEB_COLLECT_STORAGE');
				//发送行为采集信息
				//ajax
				YT.log.info(storageList);
			}
		},
		/**
		 * 获取客户端缓存首页布局信息
		 * 
		 * @param cfg
		 */
		getLayoutData : function(cfg) {
			var data = localStorage.getItem("APP_LAYOUT_STORAGE");
			if (YT.isEmpty(data)) {
				data = null;
			} else {
				data = JSON.parse(data);
			}
			var callback = cfg.callback;
			callback && window[callback](data);
		},
		/**
		 * 设置客户端缓存首页布局信息
		 * 
		 * @param cfg
		 */
		setLayoutData : function(data) {
			localStorage.setItem("APP_LAYOUT_STORAGE", JSON.stringify(data));
		}
	};
	YT.log.debug("---end---", TAG);
});
