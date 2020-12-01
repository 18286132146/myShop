;
(function() {
	// 返回URL中的参数
	var _param = window['_getParameter'];
	var _pp = window['__pageParam'];

	// 兼容库代码
	window.Zepto = $;

	window.Device = (function() {
		var device = {};
		var ua = navigator.userAgent;
		var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
		var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
		var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

		device.ios = device.android = device.iphone = device.ipad = false;

		device.os = 'web';
		// Android
		if (android) {
			device.os = 'android';
			device.osVersion = android[2];
			device.android = true;
		}
		if (ipad || iphone || ipod) {
			device.os = 'iphone';
			device.ios = true;
		}
		// iOS
		if (iphone && !ipod) {
			device.osVersion = iphone[2].replace(/_/g, '.');
			device.iphone = true;
		}
		if (ipad) {
			device.osVersion = ipad[2].replace(/_/g, '.');
			device.ipad = true;
		}
		if (ipod) {
			device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
			device.iphone = true;
		}
		// iOS 8+ changed UA
		if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
			if (device.osVersion.split('.')[0] === '10') {
				device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
			}
		}
		// Webview
		// device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
		// Export object
		device.os = 'web';
		return device;
	})();

	var config = {
		os : _param('os') || Device.os,
		lang : _param('lang') || 'zh-CN'
	};
	window.DEBUG = true;
	// 内部库
	var vars = [ '<script type="text/javascript" src="' + basePath + '/', '?v=' + SID + '" charset="utf-8"></script>' ];
	// 框架脚本
	var html = '';
	// config.os = 'web'
	if (DEBUG) {
		html += '{0}js/ytfw/ns/NS.js{1}';
		html += '{0}js/ytfw/ns/NS_ACCT_TYPE.js{1}';
		html += '{0}js/ytfw/core/YT.js{1}';
		html += '{0}js/ytfw/utils/Observable.js{1}';
		html += '{0}js/ytfw/widget/Ajax.js{1}';
		html += '{0}js/ytfw/utils/Format.js{1}';
		html += '{0}js/ytfw/utils/Form.js{1}';
        html += '{0}js/plugin/seajs/sea-2.3.0.min.js{1}';
		/*html += '{0}js/ytfw/utils/Util.js?v={1}';*/
		html += '{0}js/ytfw/utils/NavUtil.js?v={1}';
		html += '{0}js/ytfw/utils/AcctUtil.js?v={1}';
		/*html += '{0}js/ytfw/utils/SMSUtil.js?v={1}';*/
		html += '{0}js/ytfw/utils/DateUtils.js?v={1}';
		html += '{0}js/ytfw/utils/Collection.js?v={1}';
		html += '{0}js/ytfw/widget/Component.js{1}';
		html += '{0}js/ytfw/widget/Tips.js{1}';

		html += '{0}js/ytfw/device/device.js{1}';
		html += '{0}js/ytfw/device/' + config.os + '.js{1}';
		if (config.os == 'web') {
			html += '{0}js/ytfw/widget/Layer.js{1}';
			html += '{0}js/ytfw/widget/MsgBox.js{1}';
			html += '{0}js/ytfw/widget/Titlebar.js{1}';
            html += '{0}js/ytfw/WY.js{1}';
		} else {
		}

	} else {
		html += '{0}dist/js/' + config.os + '-min.js{1}';
		// html += '{0}js/ytfw/all/' + config.os + '-min.js {1}';
	}
	html = html.replace(/\{(\d+)\}/g, function(m, i) {
		return vars[i];
	});
	document.write(html);
	// 自动构建APP脚本
	// 每个页面都绑定一个同名JS
	function afterInitSession() {
		var path = document.location.href;
		path = path.substring(basePath.length + 1, path.indexOf(".htm"));
		seajs.use([ path ] + ".js");
	/*	seajs.use('js/ytfw/utils/Collection.js', function(main) {
			main.init();
		});*/
	}
	;

	$(function() {
		/** ***************客户端自定义键盘键盘，调取/隐藏控制**************** */
		// 窗口初始高度，用于计算显示键盘时，推动页面的高度
		window.W_HEIGHT = $(window).height();
		// 隐藏键盘，供客户端调用
		window._hideKeyboard = YT._hideKeyboard;
		/** ***************客户端自定义键盘键盘，调取/隐藏控制**************** */
		$("head").append('<base href="' + basePath + '/"/>');
		// SEA配置
		seajs.config({
			base : basePath,
			alias : {
				'YT.AssistiveTouch' : 'js/ytfw/widget/AssistiveTouch',// 屏幕辅助功能按钮
				'YT.TimerGlider' : 'js/ytfw/widget/TimerGlider',// 时间轴列表
				'YT.ListView' : 'js/ytfw/widget/ListView',
				'YT.TimerGlider' : 'js/ytfw/widget/TimerGlider',
				'YT.TouchMove' : 'js/ytfw/widget/TouchMove',
				'YT.Pullrefresh' : 'js/ytfw/widget/Pullrefresh',
				'YT.echarts' : 'js/ytfw/widget/echarts-all',
				'YT.AuthBox' : 'js/ytfw/widget/AuthBox',
				'YT.Dropdown' : 'js/ytfw/widget/Dropdown',
				'YT.Picker' : 'js/ytfw/widget/Picker',// 联动下拉菜单
				'YT.CardMove' : 'js/ytfw/widget/CardMove',// 卡片切换
				'YT.Swipe' : 'js/ytfw/util/Swipe',// 轮播图片
				'YT.Range' : 'js/ytfw/util/Range',// 滑块(range)
				'YT.CharToPin' : 'js/ytfw/util/CharToPin',// 
				'YT.echarts-all' : 'js/ytfw/widget/echarts.min',// 新增echarts插件引入
				'YT.WXUtil' : 'js/ytfw/util/WXUtil'// 微信JS-SDK接口
			},
			map : [ [ /^(.*\.(?:css|js))(?:.*)$/i, '$1?v=' + (SID) ] ]
		});
		YT.os = config.os;
		afterInitSession();
		// YT.afterInitSession=afterInitSession;
		// console.log("YT.start before");
		// YT.start();
		// console.log("YT.start end");
	});
})();
