/**
 * 
 * @classDesc 格式化通用类
 * @exports Fw/util
 * @mixin
 * 
 */
(function() {
	var me = YT.Format = {
	/*====    ===*/
			//
			String_getLength : function(val){
				return val.length;
			},
			//大额异动 - 异动类型
			GZ_DEYD_WARN_TYPE_getVal : function(val){
				var r = "";
				NS.RF.GZ_DEYD_WARN_TYPE.forEach(function(item,i){
					if(item.key==val){
						r = item.value;
					}
				});
				if( r=="" ){
					r = val;
				}
				return r;
			},	
			//到期预警 & 大额异动 - 客户类型
			GZ_DQYJ_CUST_TYPE_getVal : function(val){
				var r = "";
				NS.RF.GZ_DQYJ_CUST_TYPE.forEach(function(item,i){
					if(item.key==val){
						r = item.value;
					}
				});
				if( r=="" ){
					r = val;
				}
				return r;
			},	
			//大额异动 - 异动方向
			GZ_DEYD_DC_FLAG_getVal : function(val){
				var r = "";
				NS.RF.GZ_DEYD_DC_FLAG.forEach(function(item,i){
					if(item.key==val){
						r = item.value;
					}
				});
				if( r=="" ){
					r = val;
				}
				return r;
			},	
			//类型 SN_TYPE
			GZ_GGXX_SN_TYPE_getVal : function(val){
				var r = "";
				NS.RF.GZ_GGXX_SN_TYPE.forEach(function(item,i){
					if(item.PAR_VALUE==val){
						r = item.PAR_NAME;
					}
				});
				if( r=="" ){
					r = val;
				}
				return r;
			},	
			//营销任务 - 任务状态(0未下发,1已下发,2已接收,9已删除)
			GZ_YXRW_TI_STATUS_getVal : function(val){
				var r = "";
				NS.RF.GZ_YXRW_TI_STATUS.forEach(function(item,i){
					if(item.key==val){
						r = item.value;
					}
				});
				if( r=="" ){
					r = val;
				}
				return r;
			},	
			//
			GZ_YXRW_TI_TIME_TYPE_getVal : function(val){
				var r = "";
				NS.RF.GZ_YXRW_TI_TIME_TYPE.forEach(function(item,i){
					if(item.key==val){
						r = item.value;
					}
				});
				if( r=="" ){
					r = val;
				}
				return r;
			},	
			/*====   ===*/
			//手机录音地址
			modi_audio_Format : function(val){
				return "http://192.168.101.73/epbx/20170101/infs/getrecordfile.json?reqid="+val;
			},	
			//pc录音地址
			pc_audio_Format : function(val){
				return "http://192.168.101.73/yscrm/servlet/filedown?agentuuid="+val;
			},	
			//公告类型
			SN_TYPE_Format_getValue : function(val){
				var r = "";
				NS.RF.SN_TYPE.forEach(function(item,i){
					if(item.key==val){
						r = item.value;
					}
				});
				if( r=="" ){
					r = val;
				}
				return r;
			},	
			//审批管理 - 审批类型
			SPGL_FLOW_TYPE_Format_getValue : function(val){
				var r = "";
				NS.RF.GZ_SPGL_FLOW_TYPE.forEach(function(item,i){
					if(item.key==val){
						r = item.value;
					}
				});
				if( r=="" ){
					r = val;
				}
				return r;
			},	
			// YT.Format.WARN_TYPE_1_Format_getKey()
			WARN_TYPE_1_Format_getKey : function(val){
				var r = "";
				NS.RF.WARN_TYPE_1.forEach(function(item,i){
					if(item.val==val){
						r = item.key;
					}
				});
				if( r=="" ){
					r = val;
				}
				return r;
			},
			
		//潜在客户-客户类型  value 转成key
		//YT.Format.POTE_TYPE_Format_getKey()
		POTE_TYPE_Format_getKey : function(val){
			var r = "";
			NS.RF.POTE_TYPE.forEach(function(item,i){
				if(item.value==val){
					r = item.key;
				}
			});
			if( r=="" ){
				r = val;
			}
			return r;
		},
		//潜在客户-客户类型  value 转成key
		//YT.Format.POTE_TYPE_Format_getKey()
		POTE_TYPE_Format_getValue : function(val){
			var r = "";
			NS.RF.POTE_TYPE.forEach(function(item,i){
				if(item.key==val){
					r = item.value;
				}
			});
			if( r=="" ){
				r = val;
			}
			return r;
		},	
		//潜在客户-证件类型  value 转成key
		POTE_IDT_Format_getKey : function(val){
			var r = "";
			NS.RF.CUST_IDT.forEach(function(item,i){
				if(item.value==val){
					r = item.key;
				}
			});
			if( r=="" ){
				r = val;
			}
			return r;
		},	
		//访谈类型
		VISIT_TYPE_Format : function(val){
			var r = "";
			NS.RF.VISIT_TYPE.forEach(function(item,i){
				if(item.key==val){
					r = item.value;
				}
			});
			if( r=="" ){
				r = val;
			}
			return r;
		},
		//客户态度
		CUST_ATTITUDE_Format : function(val){
			var r = "";
			NS.RF.CUST_ATTITUDE.forEach(function(item,i){
				if(item.key==val){
					r = item.value;
				}
			});
			if(r == ""){
				r = val;
			}
			return r;
		},
		//访谈类型
		VISIT_CHANNEL_Format : function(val){
			var r = "";
			NS.RF.VISIT_CHANNEL.forEach(function(item,i){
				if(item.key==val){
					r = item.value;
				}
			});
			if( r =="" ){
				r = val;
			}
			return r;
		},
		//借贷标志(0取 1存)
		DC_FLAG_Format : function(val){
			if(val =="0"){
				return "取";
			}else if(val =="1"){
				return "存";
			}
		},
		//状态(0为浏览,1已浏览)  |--[STATUS]
		STATUS_Format : function(val){
			if(val =="0"){
				return "未浏览";
			}else if(val =="1"){
				return "已浏览";
			}
		},
		//状态( 0未处理,1已处理)  |--[STATUS]
		STATUS_Format2 : function(val){
			if(val =="0"){
				return "未处理";
			}else if(val =="1"){
				return "已处理 ";
			}
		},
		//状态( 0未处理,1已处理)  |--[STATUS]
		STATUS_Format3 : function(val){
			if(val =="0"){
				return "未读";
			}else if(val =="1"){
				return "已读 ";
			}
		},
		//状态 |--[STATUS]
		STATUS_Format4 : function(val){
			if(val =="0"){
				return "未发布";
			}else if(val =="1"){
				return "已发布";
			}
		},
		//紧急程度 G.普通 I.重要  |--[US_TYPE]:
		US_TYPE_Format : function(val){
			if( val =="G" ){
				return "普通";
			}else if( val =="I" ){
				return "重要 ";
			}else{
				return val;
			}
		},
		//日程状态 W-待办 E-完成
		rc_STATUS_Format : function(val){
			if(val =="W"){
				return "待办";
			}else if(val =="E"){
				return "完成";
			}else{
				return val;
			}
		},
		//日志类型   1对私。2对公。3社区
		//1 家金经理日志   3 社区经理日志  2 公司经理日志
		WK_TYPE_Format : function(val){
			if(val =="1"){
				return "对私";
			}else if(val =="2"){
				return " 对公";
			}else if(val =="3"){
				return "社区";
			}else{
				return val;
			}
		},
		// 状态  0未提交1已提交
		TJ_STATUS_Format : function(val){
			if(val =="0"){
				return "未提交";
			}else{
				return " 已提交";
			}
		},
		// 字节转换为K
		FILE_SIZE_Format : function(val){
			if(!Number(val)){
				return "0 KB"
			}else{
				var b = Math.floor((Number(val)/1024)*100)/100;
				var r = "";
				
				if(b>=1){
					r = b+" KB"
				}else{
					r = val+" bytes"
				}
				return r
				
			}
		},
		// 去掉html标签
		delHtmlTag_Format: function(val){			
			return val.replace(/(<[^>]+>)|(&nbsp;)/g,"")
		},
		// 头像图片下载
		HEAD_IMG_Format: function(val){	
			if(!YT.isEmpty(val)){
				//http://localhost:8083/ares-channel-server/file/download.do?fileName=48827516B075405D8CD7411E23993BD9&flag=true
				//return basePath+"/data/file/"+val;
				//return basePath+"/file/download.do?fileName="+val+"&flag=true";
				//alert(basePath+"/file/getHeadImg.do?fileName="+val);
				return basePath+"/file/getHeadImg.do?fileName="+val;
			}else{
				return "";
			}
		},
		//取月份
		VISIT_DATE_Format: function(val){			
			if(typeof val =="string"){
				return val.substr(5,2)+"月"
			}else{
				return "";
			}
		},
		// 字符长度限制
		string_maxLength_Format : function(val,num){
			var maxL = 3;
			if(typeof val =="string"){
				if(typeof num !="undefined"){
					maxL = Number(num);
				}
				if(val.length<=maxL){
					return val
				}else{
					return val.substr(0,maxL)+"..."
				}
			}else{
				return "";
			}
		},
		// 字符长度限制
		string_maxFirstLength_Format : function(val,num){
			var maxL = 18;
			if(typeof val =="string"){
				if(typeof b !="undefined"){
					maxL = Number(num);
				}
				if(val.length<=maxL){
					return val
				}else{
					return val.substr(0,maxL)
				}
			}else{
				return "";
			}
		},
		// 字符长度限制
		string_maxSecondLength_Format : function(val,num){
			var maxL = 18;
			if(typeof val =="string"){
				if(typeof b !="undefined"){
					maxL = Number(num);
				}
				if(val.length<=maxL){
					return val
				}else{
					return val.substr(maxL,val.length)
				}
			}else{
				return "";
			}
		},
		// 字符长度限制
		string_max10Length_Format : function(val,num){
			var maxL = 10;
			if(typeof val =="string"){
				if(typeof b !="undefined"){
					maxL = Number(num);
				}
				if(val.length<=maxL){
					return val
				}else{
					return val.substr(0,maxL)+"..."
				}
			}else{
				return "";
			}
		},	
		// 字符长度限制
		string_max13Length_Format : function(val,num){
			var maxL = 13;
			if(typeof val =="string"){
				if(typeof b !="undefined"){
					maxL = Number(num);
				}
				if(val.length<=maxL){
					return val
				}else{
					return val.substr(0,maxL)+"..." 
				}
			}else{
				return "";
			}
		},		
		// 字符长度限制
		string_max15Length_Format : function(val,num){
			var maxL = 15;
			if(typeof val =="string"){
				if(typeof b !="undefined"){
					maxL = Number(num);
				}
				if(val.length<=maxL){
					return val
				}else{
					return val.substr(0,maxL) +"..." 
				}
			}else{
				return "";
			}
		},		
		// 字符长度限制
		string_max20Length_Format : function(val,num){
			var maxL = 20;
			if(typeof val =="string"){
				if(typeof b !="undefined"){
					maxL = Number(num);
				}
				if(val.length<=maxL){
					return val
				}else{
					return val.substr(0,maxL)+"..."
				}
			}else{
				return "";
			}
		},
		// 字符长度限制
		string_max30Length_Format : function(val,num){
			var maxL = 30;
			if(typeof val =="string"){
				if(typeof b !="undefined"){
					maxL = Number(num);
				}
				if(val.length<=maxL){
					return val
				}else{
					return val.substr(0,maxL)+"..."
				}
			}else{
				return "";
			}
		},
		unitToBigUnit : function(val){
			if(typeof val =="string"){
				return val.replace(/元/g,"万元");
			}else{
				return "";
			}
		},
		/**
		 * 列表索引默认为从0开始计数，修正为从1开始计数
		 * 
		 * @param i
		 * @returns {Number}
		 */
		listIndex : function(i) {
			return i * 1 + 1;
		},
		/**
		 * <code>
		 * 转译 NS键值，如：
		 * 证件类型 ${value|fmtNsType,'IDT_TYPE'} 
		 * 账号类型 ${value|fmtNsType,'ACCT_TYPE'}
		 * </code>
		 */
		fmtNsType : function(key, type) {
			return NS[type] && NS[type][key] || key;
		},
		/**
		 * 帐号格式化、 添加空格分隔符 hidden = true将隐藏部分号码
		 * 
		 * @param value
		 *            {string}账户
		 * @param hidden
		 *            {bool} 是否隐藏账户 true为隐藏
		 */
		fmtAcctNo : function(value, hidden) {
			if (YT.isEmpty(value)) {
				return "";
			}
			value = me.removeSpace(value);
			var tmpStr = "";
			if (hidden) {
				var start = value.length - 4;
				if (start < 4) {
					start = 4;
				}
				tmpStr = tmpStr + value.substring(0, 4) + " **** **** " + value.substring(start, value.length);
			} else {
				while (value.length > 4) {
					tmpStr = tmpStr + value.substring(0, 4);
					tmpStr = tmpStr + " ";
					value = value.substring(4, value.length);
				}
				tmpStr = tmpStr + value;
			}
			return tmpStr;
		},
		/**
		 * 卡号末4位
		 */
		fmtAcctStop4 : function(value) {
			if (YT.isEmpty(value)) {
				return "";
			}
			var n = 4;
			var acct4 = value.substring(value.length - n, value.length);
			return acct4;
		},
		fmtAccInput : function(ele) {
			ele.on("keyup", function() {
				var oW = ele.val();
				ele.val(oW.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, "$1 "));
			});
		},
		/**
		 * 格式化手机 data-type='phone'
		 */
		fmtPhoneNo : function(value) {
			if (YT.isEmpty(value)) {
				return "";
			}
			value = me.removeSpace(value);
			var tmpStr = "";
			var start = value.length - 4;
			if (start < 4) {
				start = 4;
			}
			tmpStr = tmpStr + value.substring(0, 3) + " **** " + value.substring(start, value.length);
			return tmpStr;
		},
		/**
		 * 格式化证件号码
		 */
		fmtIdNo : function(value) {
			if (YT.isEmpty(value)) {
				return "";
			}
			value = me.removeSpace(value);
			var tmpStr = "";
			var start = value.length - 2;
			if (start < 2) {
				start = 2;
			}
			tmpStr = tmpStr + value.substring(0, 2) + " **** **** " + value.substring(start, value.length);
			return tmpStr;
		},
		/**
		 * 用户姓名格式化
		 */
		fmtCustName : function(value) {
			if (YT.isEmpty(value)) {
				return "";
			}
			value = me.removeSpace(value);
			var tmpStr = "";
			var start = value.length - 1;
			if (start < 1) {
				start = 1;
			}
			tmpStr = tmpStr + value.substring(0, 1) + "*" + value.substring(start, value.length);
			return tmpStr;
		},
		/**
		 * 去除字符串空格
		 * 
		 * @param value
		 * @returns {string}
		 */
		removeSpace : function(value) {
			if (YT.isEmpty(value)) {
				return "";
			}
			return value.replace(/\s/g, "");
		}, 
		/**
		 * <code>日期格式化 
		 * @param {} v
		 * @param {} format
		 * example: 
		 * 	var str = "2017-12-18 11:21:22"; //var str = "20171218112122";
		 * 	YT.Format.fmtDate(str,'yyyy年MM月dd日 HH点mm分ss秒'); ==> 2017年12月18日11点21分22秒 
		 * 	YT.Format.fmtDate(str,'yyyy-MM-dd HH:mm:ss'); ==> 2017-12-18 11:21:22 <br>
		 * 	YT.Format.fmtDate(str,'yyyy-MM-dd HH:mm'); ==> 2017-12-18 11:21
		 * 	YT.Format.fmtDate(str,'yyyy-MM-dd'); ==> 2017-12-18 <br>
		 * </code>
		 */
		fmtDate : function(v, format, parse) {
			if (YT.isEmpty(v)){
				return "";
			}
			if (!YT.isDate(v)) {
				if(v.length==8){
					v = v.substr(0,4)+"-"+v.substr(4,2)+"-"+v.substr(6,2);
				}
				if(v.length>10){
					v = v.replace(/-/g,"/").substr(0,v.length-2);
				}
				v = new Date(v);
			}
			return v.format(format || 'yyyy年MM月dd日');
		},
		fmtDate2 : function(v) {
			if (YT.isEmpty(v)){
				return "";
			}
			return v.replace(/-/g, ".");
		},
		fmtDate3 : function(v, format, parse) {
			if (YT.isEmpty(v)){
				return "";
			}
			if (!YT.isDate(v)) {
				if(v.length==8){
					v = v.substr(0,4)+"-"+v.substr(4,2)+"-"+v.substr(6,2);
				}
				if(v.length>10){
					v = v.replace(/-/g,"/").substr(0,v.length-2);
				}
				v = new Date(v);
			}
			return v.format(format || 'yyyy-MM-dd');
		},
		/**
		 * 格式化金额
		 * 
		 * @param v
		 *            原始金额
		 * @param c
		 *            小数点后保留为数（默认为2）
		 * @param d
		 *            小数点
		 * @param t
		 *            整数区千位分割（默认为逗号）
		 * @returns {string}
		 */
		fmtMoney : function(v, c, d, t) {
			v = v + "";
			v = v.replace(/,/g, "");
			v *= 1;
			var p = v < 0 ? '-' : '';
			c = c || 2;
			v = v.toFixed(c);
			c = Math.abs(c) + 1 ? c : 2;
			d = d || '.';
			t = t==""?"":',';
			var m = (/(\d+)(?:(\.\d+)|)/.exec(v + ''));
			var x = m[1].length > 3 ? m[1].length % 3 : 0;
			return p + (x ? m[1].substr(0, x) + t : '') + m[1].substr(x).replace(/(\d{3})(?=\d)/g, '$1' + t)
					+ (c ? d + (+m[2] || 0).toFixed(c).substr(2) : '');
		},

		/**
		 * 金额格式化保留2位小数点
		 * 
		 * @param s
		 * @returns {*}
		 */
		fmtAmt : function(s) {
			try {
				return me.fmtMoney(s, 2, ".", ",");
			} catch (e) {
				return "0.00";
			}
		},
		/**
		 * 金额格式化保留3位小数点
		 * 
		 * @param s
		 * @returns {*}
		 */
		fmtAmt_3 : function(s) {
			try {
				return me.fmtMoney(s, 3, ".", "");
			} catch (e) {
				return "0.000";
			}
		},
		/**
		 * 数量格式化""显示为0否则返回s
		 * 
		 * @param s
		 * @returns {*}
		 */
		fmtNum : function(s) {
			if (s == "") {
				return "0";
			} else {
				return s;
			}
		},
		/**
		 * 距离格式化如果s为""显示为""如果s<1000? s+"m" : (s/1000).toFixed(1)+"km"
		 * 
		 * @param s
		 * @returns {*}
		 */
		fmtDistance : function(s) {
			if (s == "") {
				return s;
			} else {
				s = parseInt(s * 100 / 100);// 去掉小数部分
				s1 = s + "";
				if (s1.length > 4 || s1.length == 4) {// 整数部分大于等于4位显示km，小数部分保留一位
					return (s1 / 1000.0).toFixed(1) + "km";
				} else {// 整数部分小于4位，显示m
					return s1 + "m";
				}
			}
		},
		/**
		 * 金额格式化保留4位小数点
		 * 
		 * @param s
		 * @returns {*}
		 */
		fmtAmt4s : function(s) {
			try {
				return me.fmtMoney(1.0000 * s, 4, ".", ",");
			} catch (e) {
				return "0.0000";
			}
		},

		/**
		 * 去除金额格式化
		 * 
		 * @param b
		 * @returns {string}
		 */
		delFmtMony : function(b) {
			var a = b.trim() + "";
			if (a.indexOf(".") != -1) {
				a = a.substr(0, a.indexOf(".") + 3);
			}
			return a.replace(/,/g, "");
		},

		/**
		 * 金额去格式化
		 * 
		 * @param s
		 * @returns {string|void|XML}
		 */
		unfmtAmt : function(s) {
			if (YT.isEmpty(s)) {
				return "";
			}
			return s.replace(/,/g, "");
		},

		/**
		 * 利率格式化
		 * 
		 * @param b
		 * @returns {string}
		 */
		fmtAddPercent : function(b) {
			var a = Math.floor(b * 100) / 100;
			a = (a.toFixed(2));
			return a + "%";
		},
		/**
		 * 格式化数字为大写汉字
		 * 
		 * @param num
		 * @returns {string}
		 */
		fmtNumber2Chinese : function(num) {
			num = num.replace(/,/g, '');
			try {
				num = parseFloat(num);
				if (num == 0) {
					num = '';
				}
			} catch (e) {
			}
			if (!/^\d*(\.\d*)?$/.test(num))
				throw (new Error(-1, "Number is wrong!"));
			var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
			var BB = new Array("", "拾", "佰", "仟", "萬", "億", "圆", "");
			var CC = new Array("角", "分", "厘");
			var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
			for (var i = a[0].length - 1; i >= 0; i--) {
				switch (k) {
				case 0:
					re = BB[7] + re;
					break;
				case 4:
					if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
						re = BB[4] + re;
					break;
				case 8:
					re = BB[5] + re;
					BB[7] = BB[5];
					k = 0;
					break;
				}
				if (k % 4 == 2 && a[0].charAt(i) == "0" && a[0].charAt(i + 2) != "0")
					re = AA[0] + re;
				if (a[0].charAt(i) != 0)
					re = AA[a[0].charAt(i)] + BB[k % 4] + re;
				k++;
			}
			if (a.length > 1) {
				re += BB[6];
				for (var i = 0; i < a[1].length; i++) {
					re += AA[a[1].charAt(i)] + CC[i];
					if (i == 2)
						break;
				}
				if (a[1].charAt(0) == "0" && a[1].charAt(1) == "0") {
					re += "元整";
				}
			} else {
				re += '元整';
			}
			if (YT.isEmpty(a[0])) {
				re = '零元整';
			}
			return re;
		},
		/**
		 * 获取图片全路径
		 * 
		 * @param url
		 *            (img/face.png)
		 * @returns http://host:port/serviceName/img/face.png
		 */
		fmtImgUrl : function(url) {
			if (YT.isEmpyt(url)) {
				return '';
			}
			url = (url.indexOf("/") == 0) ? url : ("/" + url);
			return basePath + url;
		},
		
		/**
		 * 列表数值转换，用于列表中的信息数据进行数据转换操作
		 * 
		 * @param datas
		 *            原列表数据
		 * 
		 * @param kmap
		 *            数据转换的键值对字符串，格式 a=N,b=X|c=M
		 * 
		 */
		fmtListCovert:function(datas, kmap){
			if (datas && kmap) {
				var items = kmap.split(",|，|\|");
				for (var i = 0; i < datas.length; i++) {
					var tdata = datas[i];
					for (var j = 0; j < items.length; j++) {
						var keys = items[j].split("=");
						if (keys.length == 2) {
							tdata[keys[0]] = tdata[keys[1]];
						}
					}
				}
			}
			return datas;
		},
		/**
		 * JSON对象转换为String
		 *
		 * @param json
		 * @constructor
		 */
		JsonToStr : function(json) {
			return JSON.stringify(json);
		}
	};

	/**
	 * 注册到juicer
	 */
	YT.each(me, function(prop, fun) {
		if (YT.isFunction(fun)) {
			juicer.register(prop, fun);
		}
	});
	/**
	 * 时间对象格式化
	 * 
	 * @param {}
	 *            mask
	 * @return {}
	 */

	Date.prototype.format = function(mask) {
		var d = this;
		var zeroize = function(value, length) {
			if (!length)
				length = 2;
			value = String(value);
			for (var i = 0, zeros = ''; i < (length - value.length); i++) {
				zeros += '0';
			}
			return zeros + value;
		};
		return mask.replace(/"[^"]*"|'[^']*'|\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmMstT])\1?|[lLZ])\b/g, function($0) {
			switch ($0) {
			case 'd':
				return d.getDate();
			case 'dd':
				return zeroize(d.getDate());
			case 'ddd':
				return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat' ][d.getDay()];
			case 'dddd':
				return [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ][d.getDay()];
			case 'M':
				return d.getMonth() + 1;
			case 'MM':
				return zeroize(d.getMonth() + 1);
			case 'MMM':
				return [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ][d
						.getMonth()];
			case 'MMMM':
				return [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
						'October', 'November', 'December' ][d.getMonth()];
			case 'yy':
				return String(d.getFullYear()).substr(2);
			case 'yyyy':
				return d.getFullYear();
			case 'h':
				return d.getHours() % 12 || 12;
			case 'hh':
				return zeroize(d.getHours() % 12 || 12);
			case 'H':
				return d.getHours();
			case 'HH':
				return zeroize(d.getHours());
			case 'm':
				return d.getMinutes();
			case 'mm':
				return zeroize(d.getMinutes());
			case 's':
				return d.getSeconds();
			case 'ss':
				return zeroize(d.getSeconds());
			case 'l':
				return zeroize(d.getMilliseconds(), 3);
			case 'L':
				var m = d.getMilliseconds();
				if (m > 99)
					m = Math.round(m / 10);
				return zeroize(m);
			case 'tt':
				return d.getHours() < 12 ? 'am' : 'pm';
			case 'TT':
				return d.getHours() < 12 ? 'AM' : 'PM';
			case 'Z':
				return d.toUTCString().match(/[A-Z]+$/);
			default:
				return $0.substr(1, $0.length - 2);
			}
		});
	};

})();
