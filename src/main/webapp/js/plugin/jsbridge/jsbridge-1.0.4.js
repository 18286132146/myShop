//notation: js file can only use this kind of comments
//since comments will cause error when use in webview.loadurl,
//comments will be remove by java use regexp
;
(function() {
	if (window.WebViewJavascriptBridge) {
		return;
	}

	var messagingIframe;
	var sendMessageQueue = [];
	var receiveMessageQueue = [];
	var messageHandlers = {};

	var CUSTOM_PROTOCOL_SCHEME = 'ytscheme';
	var QUEUE_HAS_MESSAGE = '__YTBASE_QUEUE_MESSAGE__/';

	var uniqueId = 1;
	var queueId = 1;
	var iframeId = 1;

	function isAndroid() {
		var ua = navigator.userAgent.toLowerCase();
		var isA = ua.indexOf("android") > -1;
		if (isA) {
			return true;
		}
		return false;
	}

	function isIphone() {
		var ua = navigator.userAgent.toLowerCase();
		var isIph = ua.indexOf("iphone") > -1;
		if (isIph) {
			return true;
		}
		return false;
	}

	// set default messageHandler 初始化默认的消息线程
	function init(messageHandler) {
		if (WebViewJavascriptBridge._messageHandler) {
			throw new Error('WebViewJavascriptBridge.init called twice');
		}
		WebViewJavascriptBridge._messageHandler = messageHandler;
		var receivedMessages = receiveMessageQueue;
		receiveMessageQueue = null;
		for (var i = 0; i < receivedMessages.length; i++) {
			_dispatchMessageFromNative(receivedMessages[i]);
		}
	}

	// 发送
	function send(data) {
		_doSend({
			data : data
		});
	}

	// 注册线程 往数组里面添加值
	function registerHandler(handlerName, handler) {
		messageHandlers[handlerName] = handler;
	}
	// 调用线程
	function callHandler(handlerName, data) {
		if (typeof data === 'string') {
			data = YT.JsonEval(data);
		}
		_doSend({
			handlerName : handlerName,
			data : data
		});
	}
	var iframeQueue = [];
	// sendMessage add message, 触发native处理 sendMessage
	function _doSend(message) {
		sendMessageQueue.push(message);
		var id = buildIframe();
		iframeQueue.push(id);
		var iframe = $('#' + id);
		var list = [];
		list.push(message);
		var listStr = JSON.stringify(list)
		var key = '_' + (queueId++) + '_' + message.handlerName;
		iframe.attr('src', CUSTOM_PROTOCOL_SCHEME + '://' + QUEUE_HAS_MESSAGE + key);
		iframe.attr('data-message', encodeURIComponent(listStr));
		iframe.attr('data-key', key);
	}
	function buildIframe() {
		var id = 'iframe_' + (iframeId++) + '_Id';
		messagingIframe = document.createElement('iframe');
		messagingIframe.style.display = 'none';
		messagingIframe.style.opacity = '0';
		messagingIframe.style.border = '0';
		messagingIframe.style.heigth = '0';
		messagingIframe.id = id;
		document.documentElement.appendChild(messagingIframe);
		return id;
	}
	function removeIframe() {
		var iframes = $('iframe');
		$.each(iframes, function(i, n) {
			var id = $(n).attr('id');
			if (iframeQueue.indexOf(id) < 0) {
				$(n).remove();
			}
		});
	}

	// 提供给native调用,该函数作用:获取sendMessageQueue返回给native,由于android不能直接获取返回的内容,所以使用url
	// shouldOverrideUrlLoading 的方式返回内容
	function _fetchQueue() {
		var messageQueueString = JSON.stringify(sendMessageQueue);
		sendMessageQueue = [];
		var id = iframeQueue.shift();
		// add by hq
		if (isIphone()) {
			return messageQueueString;
			// android can't read directly the return data, so we can reload
			// iframe src to communicate with java
		} else if (isAndroid()) {
			var iframe = $('#' + id);
			var msg = iframe.attr('data-message');
			iframe.attr('data-message', '');
			var key = iframe.attr('data-key');
			iframe.attr('src', CUSTOM_PROTOCOL_SCHEME + '://return/' + key + '/' + msg);
			setTimeout(function() {
				removeIframe();
			}, 1000);
			// messagingIframe.src = CUSTOM_PROTOCOL_SCHEME +
			// '://return/_fetchQueue/' +
			// encodeURIComponent(messageQueueString);
		}
	}

	// 提供给native使用,
	function _dispatchMessageFromNative(messageJSON) {}

	// 提供给native调用,receiveMessageQueue 在会在页面加载完后赋值为null,所以
	function _handleMessageFromNative(messageJSON) {
		if (receiveMessageQueue) {
			receiveMessageQueue.push(messageJSON);
		}
		_dispatchMessageFromNative(messageJSON);

	}

	var WebViewJavascriptBridge = window.WebViewJavascriptBridge = {
		init : init,
		send : send,
		registerHandler : registerHandler,
		callHandler : callHandler,
		_fetchQueue : _fetchQueue,
		_handleMessageFromNative : _handleMessageFromNative
	};

	var doc = document;
	var readyEvent = doc.createEvent('Events');
	readyEvent.initEvent('WebViewJavascriptBridgeReady');
	readyEvent.bridge = WebViewJavascriptBridge;
	doc.dispatchEvent(readyEvent);
})();