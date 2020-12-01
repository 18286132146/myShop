/**
 *
 * @classDesc 核心js基类,提供全局可用api
 * @namespace YT
 */
var YT = {
	/* 绑定关闭pdf方法 */
	/* bindClosePdf : function(){
		var closePdf = $("#closePdf");
		closePdf.on("click",function(){
			var showPdf = $("#showPdf").attr("src","").hide();
			var content = $("#views-content").show();
			closePdf.hide();
		});
	}, */
	
	
	idSeed : 10000,
	/**
	 * 返回一个id
	 *
	 * @returns {string}
	 */
	id : function() {
		return 'yt_gen_' + (++YT.idSeed);
	},
	/**
	 * 空方法
	 */
	emptyFn : function() {
	},
	/**
	 * 日志输出
	 *
	 * @param info
	 * @param tag
	 */
	log : function() {
		if (console && DEBUG) {
			return console;
		} else {
			return {
				/**
				 * 日志信息
				 */
				info : function() {
				},
				/**
				 * 调试信息
				 */
				debug : function() {
				},
				/**
				 * 警告信息
				 */
				warn : function() {
				},
				/**
				 * 错误信息
				 */
				error : function() {
				}
			};
		}
	}(),
	/**
	 * 定义命名空间
	 *
	 * @returns {*} 返回命名空间
	 */
	namespace : function() {
		var space = null, path;
		YT.each(arguments, function(v) {
			path = v.split('.');
			space = window[path[0]] = window[path[0]] || {};
			YT.each(path.slice(1), function(v2) {
				space = space[v2] = space[v2] || {};
			});
		});
		return space;
	},
	/**
	 * 属性复制（同jQuery的$.extend）
	 *
	 * @param object
	 * @param config
	 * @param defaults
	 * @returns {*}
	 */
	apply : function(object, config, defaults) {
		if (defaults) {
			YT.apply(object, defaults);
		}
		if (object && config && YT.isObject(config)) {
			for ( var property in config) {
				object[property] = config[property];
			}
		}
		return object;
	},
	/**
	 * 属性复制（仅复制object中不存在的属性）
	 *
	 * @param object
	 * @param config
	 * @returns {*}
	 */
	applyIf : function(object, config) {
		if (object) {
			for ( var p in config) {
				if (!YT.isDefined(object[p])) {
					object[p] = config[p];
				}
			}
		}
		return object;
	},
	/**
	 * 继承
	 */
	extend : function() {
		var objectConstructor = Object.prototype.constructor, inlineOverrides = function(
				o) {
			for ( var m in o) {
				if (!o.hasOwnProperty(m)) {
					continue;
				}
				this[m] = o[m];
			}
		};
		return function(subclass, superclass, overrides) {
			if (YT.isObject(superclass)) {
				overrides = superclass;
				superclass = subclass;
				subclass = overrides.constructor !== objectConstructor ? overrides.constructor
						: function() {
							superclass.apply(this, arguments);
						};
			}
			if (!superclass) {
				return null;
			}
			//
			var F = function() {
			};
			var subclassProto, superclassProto = superclass.prototype;
			F.prototype = superclassProto;
			subclassProto = subclass.prototype = new F();
			subclassProto.constructor = subclass;
			subclass.superclass = superclassProto;
			if (superclassProto.constructor === objectConstructor) {
				superclassProto.constructor = superclass;
			}
			subclass.override = function(overrides) {
				YT.override(subclass, overrides);
			};
			subclassProto.override = inlineOverrides;
			subclassProto.proto = subclassProto;
			subclass.override(overrides);
			subclass.extend = function(o) {
				return YT.extend(subclass, o);
			};
			return subclass;
		};
	}(),
	/**
	 * 覆盖
	 *
	 * @param cls
	 *            {object} 源对象
	 * @param overrides
	 *            {object} 新对象
	 */
	override : function(cls, overrides) {
		YT.apply(cls.prototype, overrides);
	},
	/**
	 * 转换为字符
	 *
	 * @param v
	 *            {object}
	 * @returns {string}
	 */
	toString : function(v) {
		return Object.prototype.toString.apply(v);
	},
	/**
	 * 判断值是否已定义
	 *
	 * @param v
	 *            {*}
	 * @returns {boolean}
	 */
	isDefined : function(v) {
		return typeof v !== 'undefined';
	},
	/**
	 * 是否为空
	 *
	 * @param v
	 *            {*} 值
	 * @param allowBlank
	 *            {boolean} 是否允许空
	 * @returns {boolean|*}
	 */
	isEmpty : function(v, allowBlank) {
		return v === null || v === undefined
				|| String(v).toUpperCase() === 'NULL'
				|| ((YT.isArray(v) && !v.length))
				|| (!allowBlank ? v === '' : false);
	},
	/**
	 * 是否是数组
	 *
	 * @param v
	 * @returns {boolean}
	 */
	isArray : function(v) {
		return YT.toString(v) === '[object Array]';
	},
	/**
	 * 是否是日期
	 *
	 * @param v
	 * @returns {boolean}
	 */
	isDate : function(v) {
		return YT.toString(v) === '[object Date]';
	},
	/**
	 * 是否是对象
	 *
	 * @param v
	 * @returns {boolean}
	 */
	isObject : function(v) {
		return !!v && YT.toString(v) === '[object Object]';
	},
	/**
	 * 是否是函数
	 *
	 * @param v
	 * @returns {boolean}
	 */
	isFunction : function(v) {
		return YT.toString(v) === '[object Function]';
	},
	/**
	 * 是否是数值型
	 *
	 * @param v
	 * @returns {boolean}
	 */
	isNumber : function(v) {
		return typeof v === 'number' && isFinite(v);
	},
	/**
	 * 是否是字符型
	 *
	 * @param v
	 * @returns {boolean}
	 */
	isString : function(v) {
		return typeof v === 'string';
	},
	/**
	 * 是否是布尔型
	 *
	 * @param v
	 * @returns {boolean}
	 */
	isBoolean : function(v) {
		return typeof v === 'boolean';
	},
	/**
	 * 是否是原始类型
	 *
	 * @param v
	 * @returns {*|boolean}
	 */
	isPrimitive : function(v) {
		return YT.isString(v) || YT.isNumber(v) || YT.isBoolean(v);
	},
	/**
	 * 是否可迭代
	 *
	 * @param v
	 * @returns {*}
	 */
	isIterable : function(v) {
		return (v && typeof v !== 'string') ? YT.isDefined(v.length) : false;
	},
	/**
	 * 是否是URL
	 *
	 * @param v
	 * @returns {boolean}
	 */
	isUrl : function(v) {
		return /(((^https?)|(^ftp)):\/\/((([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;~=%!]*)(\.\w{2,})?)*)|(localhost|LOCALHOST|127.0.0.1))\/?)/i
				.test(v);
	},
	/**
	 * 获取指定位数的随机数
	 *
	 * @param num
	 * @returns {string}
	 */
	getRandom : function(num) {
		var tmp = "";
		if (num && num > 0) {
			for (var i = 0; i < num; i++) {
				tmp += Math.floor(Math.random() * 10);
			}
		}
		return tmp;
	},
	/**
	 * 获取client高度
	 *
	 * @returns {string}
	 */
	getClientHeight : function() {
		return document.body.clientHeight;
	},
	/**
	 * 获取设备类型
	 *
	 * @returns {string}
	 */
	getClientOS : function(){
		var os = 'index';  //设备标识
		var ua = navigator.userAgent;
		var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
		if (android) {
			os = 'android'; 
		} else if (ipad || iphone || ipod) {
		    os = 'iphone';
		} else {
			os = 'android';
		}
		return os;
	},
	
	/**
	 * 保存parameters参数
	 */
	setParameters : function(params) {
		YT._data = params;
	},
	/**
	 * 返回parameters参数 特指页面跳转间传递的参数
	 *
	 * @returns {*}
	 */
	getParameters : function() {
		return YT._data || {};
	},
	/**
	 * 清空 页面间跳转的参数
	 */
	clearParameters : function() {
		YT._data = {};
	},
	/**
	 * 遍历数组
	 *
	 * @param value
	 * @param fn
	 * @param scope
	 * @returns {number}
	 */
	each : function(value, fn, scope) {
		if (YT.isEmpty(value)) {
			return;
		}
		if (!YT.isDefined(scope)) {
			scope = value;
		}
		if (YT.isObject(value)) {
			var i = 0;
			for ( var prop in value) {
				if (value.hasOwnProperty(prop)) {
					if (fn.call(scope || value, prop, value[prop], i++, value) === false) {
						return;
					}
				}
			}
		} else {
			if (!YT.isIterable(value) || YT.isPrimitive(value)) {
				value = [ value ];
			}
			for (var i = 0, len = value.length; i < len; i++) {
				if (fn.call(scope || value[i], value[i], i, value) === false) {
					return i;
				}
			}
		}
	},
	/**
	 * 绑定作用域
	 *
	 * @param fn
	 * @param scope
	 * @returns {*}
	 */
	bind : function(fn, scope) {
		if (!YT.isFunction(fn)) {
			return fn;
		}
		return function() {
			return fn.apply(scope, arguments);
		};
	},
	/**
	 * 定义模块 桥接Seajs http://seajs.org
	 *
	 * @param factory
	 */
	define : function(factory) {
		var args = arguments;
		if (args.length > 1 || !YT.isFunction(factory)) {
			define.apply(this, args);
		} else {
			define.call(this, factory);
		}
	},
	/**
	 * 模版 桥接Juicer http://juicer.name
	 *
	 * @returns {*}
	 */
	template : function() {
		var args = arguments;
		var tpl = args[0];
		if (YT.isArray(tpl)) {
			if (tpl.length > 1) {
				var arr = [], funs = {};
				// 从模版中分出自定义函数
				YT.each(tpl, function(item) {
					if (YT.isObject(item)) {
						YT.apply(funs, item);
					} else {
						arr.push(item);
					}
				});
				// 注册自定义函数
				YT.each(funs, function(prop, fun) {
					if (YT.isFunction(fun)) {
						juicer.register(prop, fun);
					}
				});
				args[0] = arr.join('');
			} else {
				args[0] = tpl[0];
			}
		}
		return juicer.apply(this, args);
	},
	/**
	 * JSON对象转换为String
	 *
	 * @param json
	 * @constructor
	 */
	JsonToStr : function(json) {
		return JSON.stringify(json);
	},
	/**
	 * String转换为JSON
	 *
	 * @param str
	 * @returns {Object}
	 * @constructor
	 */
	JsonEval : function(str) {
		return eval("(" + str + ")");
	},

	/* ===================客户端交互事件 start====================== */
	/**
	 * 隐藏键盘，仅供客户端调用
	 *
	 * @param id
	 *            键盘容器id
	 *
	 */
	_hideKeyboard : function(id) {
		YT.Device._hideKeyboard(id);
	},
	/**
	 * 是否支持touch事件
	 *
	 * @returns {Boolean}
	 */
	touch : function() {
		return !!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch));
	},
	/**
	 * 初始化页面事件
	 *
	 * @param panel
	 *            面板
	 * @param app
	 *            控制器
	 */
	initPageEvent : function(panel, app) {
		var func = function(e, elem, prop) {
			var evtName = elem.data(prop);
			YT.log.debug("event ", prop, ":", evtName);
			app[evtName] && app[evtName](e, elem);
		};
		// 点击事件
		panel.on("click", "[data-event]", function(e) {
			func && func(e, $(this), "event")
		});
		// 下拉列表 change事件
		panel.on("change", "[data-change]", function(e) {
			func && func(e, $(this), "change");
		});
		// 输入框 change事件
		panel.on("input", "[data-input]", function(e) {
			func && func(e, $(this), "input");
		});
		// 输入框 失去焦点事件
		panel.on("blur", "[data-blur]", function(e) {
			func && func(e, $(this), "blur");
		});
		// 输入框 失去焦点事件
		panel.on("keydown", "[data-keydown]", function(e) {
			func && func(e, $(this), "keydown");
		});
		// 初始化客户端键盘事件
		YT.Device.initEvent(panel);
	},

	/**
	 * @Desc 初始化页标题栏
	 * @param page
	 *            {string} 需要初始化dom
	 * @example YT.initPageTitle(pageA);
	 */
	initPageTitle : function(page) {
		YT.Device.initPageTitle(page);
	},
	/**
	 * 搜索框标题
	 *
	 * @param cfg {
	 *            defalutVal:'默认值',<br>
	 *            placeholder: '请输入搜索内容'，<br>
	 *            callback: App.search }
	 */
	titleSearchBar : function(cfg) {
		YT.Device.titleSearchBar(cfg);
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
		YT.Device.showPageArea(showHandle, hideHandles, showTitle);
	},
	/**
	 * @Desc 加载页面模板
	 * @param page
	 *            页面对象
	 * @param tplUrl
	 *            页面模板路径
	 * @param params
	 *            初始化页面参数
	 * @param callback
	 *            回调方法
	 * @param app
	 *            功能控制器
	 */
	loadPage : function(pageHandle, tplUrl, params, callback, app) {
		YT.AjaxUtil.loadPage(pageHandle, tplUrl, params, callback, app);
	},
	/**
	 * 加载模板页面
	 *
	 * @param url
	 *            页面路径
	 * @param params
	 *            初始化参数
	 * @param callback
	 *            回调方法
	 */
	getPage : function(url, params, callback) {
		YT.AjaxUtil.getPage(url, params, callback);
	},
	/**
	 * @Desc 开启等待层
	 * @param msg
	 *            {string} 显示内容
	 * @example YT.openWaitPanel('正在拼命加载中。。。');
	 */
	openWaitPanel : function(msg) {
		YT.Device.openWaitPanel(msg);
	},
	/**
	 * @Desc 关闭等待层
	 * @param timeout
	 * @example YT.hideWaitPanel(timeout);
	 */
	hideWaitPanel : function(timeout) {
		YT.Device.hideWaitPanel(timeout);
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
		YT.Device.alertinfo(msg, title, okAct, okName);
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
		YT.Device.confirm(msg, title, okAct, cancleAct, okName, cancleName);
	},
	/**
	 * @Desc session超时
	 * @param okName
	 *            {string} 确认按钮名称
	 * @example YT.sessionTimeout('我是通知内容','标题');
	 */
	sessionTimeout : function(okName,msg) {
		YT.Device.sessionTimeout(okName,msg)
	},
	/**
	 * 获取登录系统后存储客户端信息，json类型，数据内容变化极小的
	 *
	 * @param callback
	 *            {func} 获取到回调 回调参数data为json字符串
	 * @param sessKey
	 *            {string} 会话的key，多个则以,分隔；eg:CUST_NAME,CUST_IPHONE；不传则返回全部
	 * @example YT.getSession(function(data){ console.log(data); },"KEY1,KEY2");
	 *
	 */
	getSession : function(callback) {
		YT.Device.getSession(callback);
	},
	/**
	 * 获取登录系统后存储客户端信息，json类型，数据内容变化极小的
	 *
	 * @param sessData
	 *            {json} 会话数据 例如。{key1:'',key2:''}
	 * @example YT.setSession({key1:'',key2:''});
	 *
	 */
	setSession : function(sessData) {
		YT.Device.setSession(sessData);
	},
	/**
	 * 显示警告提示信息
	 */
	showTips : function(msg) {
		YT.Tips.showTips({
			content : msg,
			stayTime : 2000,
			type : "warn"
		})
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
		YT.Device.ajaxData(url, params, success, failure);
	},
	/**
	 * @Desc 控制重复提交和重复报文ajax 请求
	 * @param url
	 *            {url} 请求地址
	 * @param params
	 *            {json} 请求参数
	 * @param success
	 *            {string} 成功回调函数名称
	 * @param failure
	 *            {string} 失败回调函数名称
	 * @example YT.onceAjaxData('/mbank/login/login.do',{p1:'x'},'success');
	 */
	onceAjaxData : function(url, params, success, failure) {
		YT.AjaxUtil.onceAjaxData(url, params, success, failure);
	},
	/**
	 * 同步加载页面等文本
	 *
	 * @param url
	 * @return text
	 */
	ajaxText : function(url) {
		YT.AjaxUtil.ajaxText(url);
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
		YT.Device.ajaxCashe(url, version, type, params, success, failure);
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
		YT.Device.openMenuPage(cfg);
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
		YT.Device.geneQRC(data, callback);
	},
	/**
	 * 二维码扫描
	 *
	 * @param callback
	 *            回掉函数
	 */
	sweepQRC : function(callback) {
		YT.Device.sweepQRC(callback);
	},
	/**
	 * 分享公用方法跳转
	 *
	 * @param data
	 *            {json} 分享参数
	 * @param callback
	 *            {string} 回调函数名称
	 *
	 * @example YT.Device.sharePages(data,callback);
	 */
	sharePages : function(data, callback) {
		YT.Device.sharePages(data, callback);
	},
	/**
	 * 分享电子回单
	 *
	 * @param data
	 *            {json} 分享参数
	 * @param callback
	 *            {string} 回调函数名称
	 *
	 * @example YT.Device.shareReceipt(data,callback);
	 */
	shareReceipt : function(data, callback) {
		YT.Device.shareReceipt(data, callback);
	},
	/**
	 * 调用手机拍照/相册
	 *
	 * @param data
	 *            {json} 压缩系数等 <br>
	 *            COMP_RATE 压缩系数 0.1-1 可不传，默认0.5 HEIGHT 图片高度 可不传 WIDTH 图片宽度 可不传
	 *
	 * @param callback
	 *            {string} 回调函数名称
	 *
	 * @example YT.Device.openMobilePhoto(callback);
	 */
	openMobilePhoto : function(data, callback) {
		YT.Device.openMobilePhoto(data, callback);
	},
	/**
	 * 调用手机相册
	 *
	 * @param data
	 *            {json} 压缩系数等 <br>
	 *            COMP_RATE 压缩系数 0.1-1 可不传，默认0.5 HEIGHT 图片高度 可不传 WIDTH 图片宽度 可不传
	 *
	 * @param callback
	 *            {function} 回调函数名
	 *
	 * @example YT.Device.openMobilePhotoAlbum(funcion(data){...});
	 */
	openMobilePhotoAlbum : function(data, callback) {
		YT.Device.openMobilePhotoAlbum(data, callback);
	},
	/**
	 * 退出app
	 *
	 */
	appExit : function(data, callback) {
		YT.Device.appExit(data, callback);
	},
	/**
	 * 下载附件
	 *
	 */
	fileDownLoad : function(data, callback) {
		YT.Device.fileDownLoad(data, callback);
	},
	/**
	 * 拍照
	 *
	 * @param data
	 *
	 * @param callback
	 *
	 */
	
	picImgs : function(data, callback) {
		YT.Device.picImgs(data, callback);
	},
	/**
	 * 删除图片
	 *
	 */
	imgsRomove : function(data, callback) {
		YT.Device.imgsRomove(data, callback);
	},
	/**
	 * 上传图片
	 *
	 */
	imgsUpload : function(data, callback) {
		YT.Device.imgsUpload(data, callback);
	},
	/**
	 * 上传图片
	 */
	clearUploadImgs : function() {
		YT.Device.clearUploadImgs();
	},
	/**
	 * 选择文件 (录音文件)
	 */
	singleFileChoose : function(callback){
		YT.Device.singleFileChoose(callback);
	},
	/**
	 * 上传文件 (录音文件)
	 */
	fileUpload : function(callback){
		YT.Device.fileUpload(callback);
	},
	/**
	 * 语音识别
	 */
	speechSearch : function(data, callback) {
		YT.Device.speechSearch(data, callback);
	},
	/**
	 * 打电话
	 */
	callPhone : function(data, callback) {
		YT.Device.callPhone(data, callback);
	},
	/**
	 * 获取经纬度
	 *
	 */
	location : function(data, callback) {
		YT.Device.getLocation(data, callback);
	},
	/**
	 * 附件阅览
	 */	
	filePreview : function(data, callback) {
		YT.Device.filePreview(data, callback);
	},
	
	/**
	 * 调用手机拍照
	 *
	 * @param data
	 *            {json} 压缩系数等 <br>
	 *            COMP_RATE 压缩系数 0.1-1 可不传，默认0.5 HEIGHT 图片高度 可不传 WIDTH 图片宽度 可不传
	 *
	 * @param callback
	 *            {function} 回调函数名
	 *
	 * @example YT.Device.openMobileCamera(data,funcion(data){...});
	 */
	openMobileCamera : function(data, callback) {
		YT.Device.openMobileCamera(data, callback);
	},
	/**
	 * 指纹验证(iphone)
	 *
	 * @param callback
	 *            {string} 回调函数名称
	 *
	 * @example YT.Device.fingerPrint(callback);
	 */
	fingerPrint : function(callback) {
		YT.Device.fingerPrint(callback);
	},
	/**
	 * 开通指纹验证(iphone)
	 *
	 * @param callback
	 */
	openFingerPrint_2 : function(callback) {
		YT.Device.openFingerPrint_2(callback);
	},
	/**
	 * 开通指纹验证(iphone)
	 *
	 * @param callback
	 */
	openFingerPrint : function(data,callback) {
		YT.Device.openFingerPrint(data,callback);
	},
	/**
	 * 设置手势(iphone)
	 *
	 */
	setGesture_2 : function(callback) {
		YT.Device.setGesture_2(callback);
	},
	/**
	 * 设置手势(iphone)
	 *
	 * @param callback
	 */
	setGesture : function(data,callback) {
		YT.Device.setGesture(data,callback);
	},
	/**
	 * 验证手势(iphone)
	 *
	 * @param callback
	 */
	checkGesture : function(callback) {
		YT.Device.checkGesture(callback);
	},
	/**
	 * 开启/关闭 手势或指纹登录通知客户端(iphone)
	 *
	 * @param callback
	 */
	openOrColse : function(callback) {
		YT.Device.openOrColse(callback);
	},
	/**
	 * 返回客户端首页
	 *
	 * @example YT.gotoClientIndex();
	 */
	gotoClientIndex : function() {
		YT.Device.gotoIndex();
	},
	/**
	 * 返回客户端上一级
	 *
	 * @example YT.gotoClientBack();
	 */
	gotoClientBack : function() {
		YT.Device.gotoBack();
	},
	/**
	 * 登录页
	 *
	 * @example YT.gotoClientLogin();
	 */
	gotoClientLogin : function() {
		YT.Client.gotoLogin();
	},
	/* ===================客户端交互事件 end====================== */
	/**
	 * 组装请求URL
	 *
	 * @param url
	 *            原始URL，只针对具体业务交易，类似于transCode
	 * @param debug
	 *            是否调试模式，在调试模式下采用JSON挡板数据 DEBUG 全局变量，只有DEBUG为true时，debug才生效
	 * @returns {*} 返回拼装好的URL
	 */
	dataUrl : function(url, debug, plugin, jsonFlag) {
		url = (url.indexOf("/") == 0) ? url : ("/" + url);
		if (DEBUG) {
			if (YT.isEmpty(debug) || debug) {
				var tools = YT.TestUtil;
				var plus = plugin
						&& (YT.isString(plugin) ? plugin : (tools && tools
								.dispatch(url, plugin))) || "";
				return basePath + "/data/json" + url + plus
						+ (jsonFlag ? ".json" : ".js");
			}
			//return "http://192.168.100.187:8083/ares-channel-server" + url + ".do";
			return basePath + url + ".do";
		}
		//return "http://192.168.100.95:8083/ares-channel-server" + url + ".do";
		return basePath + url + ".do";
		
	},
	/**
	 * 格式化URL， 在url之后拼接时间戳，避免缓存
	 *
	 * @param s
	 * @returns {string}
	 */
	formatUrl : function(s) {
		return s + (s.indexOf('?') > 0 ? '&t=' : '?t=') + new Date().getTime();
	},
	/**
	 * 切换元素Class
	 *
	 * @param addHandles
	 *            添加目标class的元素(集合)
	 * @param delHandles
	 *            删除目标class的元素(集合)
	 * @param css
	 *            目标class
	 */
	exchangeCss : function(addHandles, delHandles, css) {
		YT.log.debug("----run----" + css, "YT.exchangeCss");
		if (delHandles) {
			delHandles.removeClass(css);
		}
		if (addHandles)
			addHandles.addClass(css);
	},
	/**
	 * 获取方法名称
	 *
	 * @param func
	 *            方法对象
	 * @param decodeURL
	 *            是否转码，如果该函数的接收参数中包含URL，则该参数需要置为true
	 * @returns {*}
	 */
	getFunctionName : function(func, decodeURL) {
		if (func == null || func == "") {
			return "";
		}
		if (Object.prototype.toString.apply(func) !== '[object Function]') {
			return func;
		}
		var funcName = YT.id();
		// 创建可被调用的临时方法
		window[funcName] = function() {
			var args = [];
			YT.each(arguments, function(arg) {
				if (true == decodeURL) {
					arg = decodeURIComponent(arg);
				}
				if ('string' === typeof arg && '{' === arg.charAt(0)
						&& '}' === arg.charAt(arg.length - 1)) {
					arg = YT.JsonEval(arg.replace(/<\/?[^>]*>/g, '').replace(
							/[\r\n]/g, '<br>'));
				}
				args.push(arg);
			}, this);
			func.apply(this, args);
			delete window[funcName];// 删除临时方法
		};
		return funcName;
	},
	/**
	 * 执行回调方法
	 *
	 * @param cfg
	 * @param callback
	 */
	executeFunc : function(cfg, callback) {
		callback && callback(cfg)
	},
	/**
	 *
	 * @param {array}
	 *            cfg 选择项的数组对象,每个元素包含 name ,func<br>
	 *            YT.showPopuMenus([ {name:'修改别名',func:'App.modify'},
	 *            {name:'删除账户',func:'App.updateAlias'},
	 *            {name:'默认账户',func:'App.innerTrans'} ]);
	 */
	showPopuMenus : function(cfg) {
		YT.Util.showPopuMenus(cfg);
	},
	/**
	 * 获取服务器时间
	 *
	 * @param callback
	 */
	sysdate : function(callback) {
		YT.DateUtil.sysdate(callback);
	},
	/**
	 * 获取当前日期前n天
	 *
	 * @param callback
	 */
	getDate : function(AddDayCount, startDate) {
		return YT.DateUtil.getDate(AddDayCount, startDate);
	},
	/**
	 * 进入系统首页
	 *
	 * @param url
	 *            地址
	 */
	loadIndexPage : function(url, func) {
		YT.NavUtil.loadIndexPage(url, func);
	},
	/**
	 * 下一页
	 *
	 * @param url
	 * @param params
	 */
	nextPage : function(url, params) {
		YT.setParameters(params);
		YT.NavUtil.nextPage(url);
	},
	/**
	 * 返回上一页
	 */
	prevPage : function() {
		YT.NavUtil.prevPage();
	},
	/**
	 * 返回上一页
	 */
	prevPageAndRefresh : function() {
		YT.NavUtil.prevPageAndRefresh();
		
	},
	/**
	 * 返回首页
	 *
	 * @example gotoIndex();
	 */
	gotoIndex : function() {
		YT.NavUtil.gotoIndex();
	},
	/**
	 * 刷新当前页面
	 */
	refreshPage : function() {
		YT.NavUtil.refreshPage();
	},
	/**
	 * 显示左侧菜单
	 *
	 * @param url
	 */
	openLeftMenu : function(url) {
		YT.NavUtil.openLeftMenu();
	},
	/**
	 * 显示右侧菜单
	 *
	 * @param url
	 */
	openRightMenu : function(url) {
		YT.NavUtil.openRightMenu();
	},
	/**
	 * 获取客户端缓存信息
	 *
	 * @param callback
	 */
	getLayoutData : function(callback) {
		YT.Device.getLayoutData(callback);
	},
	/**
	 * 设置客户端缓存信息
	 *
	 * @param data
	 */
	setLayoutData : function(data) {
		YT.Device.setLayoutData(data);
	},
	
/* 	/* 自定义关闭pdf文件方法 
	closePdf: function(content,showPdf,closePdf){
		var content = $("#views-content");
		var showPdf = $("#showPdf");
		var closePdf = $("#closePdf");
		var params = {
			content: content,
			showPdf: showPdf,
			closePdf: closePdf
		}
		closePdf.on("click",params,function(data){
			showPdf.attr("src","");
			
		});
	 }*/
};
YT.namespace('YT.core', 'YT.util', 'YT.device');
Fw = YT;
$.postAjax = {};

// 扩展jquery方法
$.fn.extend({
	/**
	 * 根据css样式，冒泡选取上级节点
	 *
	 * @param {Object}
	 *            cls
	 * @return {object}
	 */
	bubbleByCls : function(cls) {
		var parent = this.parent();
		if (!cls || !parent)
			return null;
		if (parent.hasClass(cls)) {
			return parent;
		}
		return parent.bubbleByCls(cls);
	}
});
