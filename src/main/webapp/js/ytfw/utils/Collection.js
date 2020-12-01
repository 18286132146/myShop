(function() {
	var TAG = "YT.Collection";
	YT.log.debug("init", TAG);
	var mainBody, pages;
	var curPath,curPageName,curPageId;
	var isMove = false;
	var startPosX = 0;
	var startPosY = 0;
	var cData = {
		en : '',//事件编号
		ct : '',//操作时间
		mt : '',//消息类型,1：登录、2：启动、3：操作、4：访问
		fp : '',//上一个页面地址(fromPage)
		pp : '',//当前页面地址
		st : '',//上一个页面停留时间
		ce : '',//扩展属性
		oc : '',//操作内容
		aoc : '',//操作前的内容
	}
	/**
	 * 	ad: 'address',//当前位置街道
	 * 	aoc: 'afterOperationContent',//操作前的内容
	 * 	bc : 'bankCode',//银行编号
	 * 	bv: 'bundleVersion',//设备系统版本
	 *	ce : 'collectExt',//扩展属性
	 * 	clt : 'cliType',//设备类型
	 * 	cn : 'carrierName',//运营商
	 * 	ci : 'channelId',//渠道ID
	 *	ct : 'currentTime',//操作时间
	 * 	dm: 'deviceModel',//设备型号
	 * 	dn: 'deviceNo',//设备标识
	 * 	en : 'eventNo',//事件编号
	 *	fp : 'formPath',//上一个页面地址(fromPage)
	 * 	gps: 'gps',//GPS
	 * 	ia: 'ipAddr',//客户端ip
	 * 	ij: 'isJailbreak',//是否越狱
	 * 	ind: 'isNewDevice',//是否安装新设备
	 *	mt : 'messageType',//消息类型,1：登录、2：启动、3：操作、4：访问
	 * 	nw : 'network',//网络类型
	 *  oc : 'operationContent', //操作内容
	 *	pp : 'pagePath',//当前页面地址
	 * 	rn: 'resolution',//设备分辨率
	 * 	si : 'startId',//启动ID
	 * 	sv: 'systemVersion',//设备系统版本
	 *	st : 'stayTime',//上一个页面停留时间
	 * 	stt : 'startTime',//启动时间
	 */
	var me = YT.Collection = {
		// 1.初始化首页面信息 2.绑定埋点标记
		init : function() {
			mainBody = $('#mainBody');
			pages = mainBody.find('.pages.ui-navbar-through');
			me.initDatas();
			me.initEvent();
		},
		// 初始化当前页面信息,发送采集信息给客户端
		initDatas : function() {
			var date = new Date();
			me.timeFormat = date.format('yyyy-MM-dd hh:mm:ss');
			var time = date.getTime();
			var datas = me.prevPages();
			if (!YT.isEmpty(datas)) {
				var collect = {};
				var page_time = datas.PAGE_TIME
				collect.pp = datas.PAGE_PATH;
				collect.st = time - page_time;
				collect.ct = me.timeFormat;
				YT.Client.setCollection(collect);
			}
			me.setPageDatas(time); // 设置当前页面停留信息
		},
		// 绑定埋点标记
		initEvent : function() {

			var panels = $('body');
			var collect = {};
			// 识别按钮事件 click事件，在页面非空验证时会被return false阻断掉
			// 识别录入项
			panels.on('touchstart', '[data-event]', me.btnTouchStart);
			panels.on('touchmove', '[data-event]', me.btnTouchMove);
			panels.on('touchend', '[data-event]', me.btnTouchEnd);
			panels.on("touchstart", "[data-name]", function() {
				var item = $(this);
				YT.log.debug("--click---" + item.data("name"));
			});
			//监控输入框是否变化
			panels.on('focus','input,textarea',function(){
				var thizz = $(this);
				thizz.attr('data-curCollVal',thizz.val());
			});
			panels.on('blur','input,textarea',function(){
				var thizz = $(this);
				var curVal = thizz.attr('data-curCollVal');
				var val = thizz.val();
				if(curVal !== val){
					me.monitorData(thizz);
				}
			});
		},
		monitorData : function(item){
			var eventNo = item.data('name');
			var mt = '3';
			var option = {
				mt: mt,
				oc : item.val(),
				aoc : item.attr('data-curCollVal')
			}
			me.setColl(option,eventNo);
		},
		btnTouchStart : function(e) {
			var item = $(e.currentTarget);
			var locHref = window.location.href;
			me.moduleNo = locHref.substring(locHref.lastIndexOf("/") + 1, locHref.indexOf(".html"));
			var el = e.originalEvent;
			startPosX = el.touches[0].pageX;
			startPosY = el.touches[0].pageY;
		},
		btnTouchMove : function(e) {
			var el = e.originalEvent;
			var x = el.touches[0].pageX;
			var y = el.touches[0].pageY;
			if (Math.abs(x - startPosX) > 10 || Math.abs(y - startPosY) > 10) {
				isMove = true;
			}
		},
		btnTouchEnd : function(e) {
			if (!isMove) {
				var item = $(e.currentTarget);
				var eventNo = item.data("event");
				var ext = '';
				var ce = item.attr('data-collectExt');
				var mt = item.attr('data-collectType');
				mt = mt ? mt : '3';
				if(!YT.isEmpty(ce)){
					ext = ce;
				}
				var option = {
					mt : mt,
					ce : ext
				}
				me.setColl(option,eventNo);
			}
			isMove = false;
		},
		setColl : function(option,eventNo){
			var collect = YT.apply({},cData);
			YT.apply(collect,option);
			var moduleNo = curPath.substring(curPath.lastIndexOf("/")+1, curPath.indexOf(".html"));
			var date = new Date();
			var timeFormat = date.format('yyyy-MM-dd hh:mm:ss');
			var time = date.getTime();
			var m = curPath.substring(curPath.indexOf('/')+1);
			m = m.substring(0,m.indexOf('/'));
			
			collect.en = "B001.C001.M"+m+"."+moduleNo+".E"+eventNo;
			collect.pn = curPageName; //页面名称
			collect.ct = timeFormat;
			collect.pp = curPath;
			collect.st = '';
			YT.log.info(collect);
			YT.Client.setCollection(collect);
		},
		// 页面间跳转时，采集当前页面停留时间,发送采集信息给客户端
		setDatas : function() {
			var datas = me.prevPages();
			var date = new Date();
			var timeFormat = date.format('yyyy-MM-dd hh:mm:ss');
			var time = date.getTime();
			if (datas) {
				var collect = YT.apply({},cData);
				var page_time = datas.PAGE_TIME;
				var currNo = datas.CURR_NO;
				var moduleNo = curPath.substring(curPath.lastIndexOf("/")+1, curPath.indexOf(".html"));
				var m = curPath.substring(curPath.indexOf('/')+1);
				m = m.substring(0,m.indexOf('/'));
				var titleName = me.getTitleName();
				var pp = pages.find('.page-view.page-on-center');
				pp = pp.attr('data-page');
				
				collect.en = "B001.C001.M"+m+"."+moduleNo+".V";
				collect.ct = timeFormat;
				collect.mt = '4';
				collect.fp = curPath;
				collect.fn = datas.PAGE_NAME;
				collect.pn = titleName;
				collect.st = (time - page_time).toString();
				collect.pp = pp;
				
				YT.Client.setCollection(collect);
			}
			me.setPageDatas(time);
		},
		// 获取上一个页面停留信息
		prevPages : function() {
			var collect = sessionStorage.getItem('PREV_COLLECTION');
			if (!YT.isEmpty(collect)) {
				sessionStorage.removeItem('PREV_COLLECTION');
				return YT.JsonEval(collect);
			} else {
				return null;
			}
		},
		// 设置当前页面停留信息
		setPageDatas : function(time) {
			var curPage = pages.find('.page-view.page-on-center');
			curPath = curPage.attr('data-page');
			var pageId;
			var titleName = me.getTitleName();
			
			pageId = curPage.find(">div").attr('id');
			curPageName = titleName;
			curPageId = pageId;
			var datas = {
				PAGE_PATH : curPath,
				PAGE_ID : pageId,
				PAGE_NAME : titleName,
				PAGE_TIME : time
			}
			// YT.log.info(YT.JsonToStr(datas));
			sessionStorage.setItem('PREV_COLLECTION', YT.JsonToStr(datas));
		},
		getTitleName : function(){
			var curPage = pages.find('.page-view.page-on-center');
			curPath = curPage.attr('data-page');
			var title = curPage.find('title');
			var titleName = '';
			if(title.length == 1){
				titleName = title.text();
				if(YT.isEmpty(titleName)){
					var page = curPage.find('div.page.current');
					titleName = page.attr('title');
				}
			}else{
				var page = curPage.find('div.page.current');
				titleName = page.attr('title');
			}
			return titleName;
		}
	};
	YT.log.debug("init-end--");

})();
