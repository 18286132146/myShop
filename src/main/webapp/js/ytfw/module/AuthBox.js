;(function() {
	var TAG = "YT.AuthBox";
	var isInit = false,animated = false;
	var authBox;
	var authBoxList;
	var me = YT.AuthBox = {
		_authBoxId : "_authBox",
		init : function(func){
			seajs.use('assets/css/func/auth.css',function(){
				isInit = true;
				func && func();
			});
		},
		/**
		 * 
		 * @param conf
		 *  var conf = {<br>
		 *  	tpl : '<div></div>',//模板<br>
		 *  	params: params, //填充模板信息<br>
		 *  	type: <br>//认证方式
		 *  		{
		 *  			1.查询(短信、UK、OTP)
		 *				2.取款密码
		 *				3.取款密码+安全认证方式(短信、UK、OTP)
		 *				4.查询(短信、UK、OTP[过滤掉短信认证])
		 *  		}
		 *  	success: App.success, //成功回调方法<br>
		 *  	error: App.error //失败回调方法<br>
		 *  }
		 */
		openAuthPanel : function(conf) {
			animated = false;
			if(!isInit){
				me.init(function(){
					me.openAuthPanel(conf);
				});
				return false;
			}
			me.hideAuthPanel();
			this._conf = conf;
			var tpl = conf.tpl ? conf.tpl : "";
			var layer = document.createElement("div");
			document.body.appendChild(layer);
			layer.id = this._authBoxId;
			var params = conf.params;
			var html_tpl = 
				'<div class="yui-auth-layer">'+
					'<div class="yui-auth-panel">'+
						'<div class="yui-auth-types">'+
							'<div class="yui-auth-types-header">'+
								'<div class="yui-auth-header-back" data-event="authBack"></div>'+
								'<div>请选择认证方式</div>'+
							'</div>'+
							'{@each AUTH_TYPE_LIST as auth,index}'+
							'<p data-type="${auth.AUTH_WAY}" data-event="changeAuth">${auth.AUTH_WAY_CN}</p>'+
							'{@/each}'+
						'</div>'+
						'<div class="yui-auth-form auth-animated ">'+
							'<div class="yui-auth-close">'+
							'<i data-event="closeAuth"></i>'+
							'</div>'+
							tpl +
							'<div class="ui-form-item ui-form-item-r ui-border-b y-sms hidden" data-authInput="0">'+
								'<label class="ui-nowrap">验证码</label>'+
								'<input type="text" class="ui-padding-r65" maxlength="6" data-maxlength="6" data-keyboard="Number" readonly data-required="true" data-name="MSG_CODE" data-label="验证码" placeholder="请输入验证码"/>'+
								'<button type="button" class="ui-btn ui-btn-primary ui-border-l x-sms-send">获取验证码</button>'+
							'</div>'+
							'<div class="ui-form-item ui-border-b hidden" data-authInput="1">'+
							'<label class="ui-nowrap">otp</label>'+
							'<input type="text" maxlength="6" data-maxlength="6" data-required="true" data-name="OTP_CODE" data-label="OTP码" placeholder="请输入OTP码"/>'+
							'</div>'+
							'<div class="ui-form-item ui-border-b hidden" data-authInput="2">'+
							'<label class="ui-nowrap">USBKEY</label>'+
							'<input type="text" maxlength="6" data-maxlength="6" data-required="true" data-name="USBKEY_CODE" data-label="USBKEY" placeholder="请输入USBKEY"/>'+
							'</div>'+
							'<div class="ui-form-item ui-border-b hidden" data-authInput="3">'+
							'<label class="ui-nowrap">蓝牙Key</label>'+
							'<input type="text" maxlength="6" data-maxlength="6" data-required="true" data-name="BLUE_CODE" data-label="蓝牙Key" placeholder="请输入蓝牙Key"/>'+
							'</div>'+
							'<div class="yui-auth-form-item ui-auth-pwd-wrap">'+
							'	<label class="ui-txt-info ui-txt-tips pwd_tips">请输入交易密码</label>'+
							'	<span class="pwd-container">'+
							'		<input type="password" data-keyboard="TPwd" maxlength="6" id="DRAW_PWD" data-transAuth="true" data-name="PASSWORD" readonly data-label="交易密码" data-required="true" />'+
							'		<div class="sixDigitPassword" data-event="showKeyboard">'+
										'<i><b></b></i>'+
										'<i><b></b></i>'+
										'<i><b></b></i>'+
										'<i><b></b></i>'+
										'<i><b></b></i>'+
										'<i><b></b></i>'+
									'</div>'+
								'</span>'+
							'</div>'+
							'<div class="yui-auth-form-item ui-margin-t10">'+
								'<a class="ui-txt-success choiceAuth" data-event="choiceAuth">更换其他认证方式</a>'+
							'</div>'+
							'<div class="ui-btn-wrap ">'+
								'<button class="ui-btn-primary ui-btn-lg" data-event="submit">确认</button>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>';
			var params = conf.params ? conf.params : {};
			var _at = conf.type;
			me.qryAuthType(function(authList,num){
				YT.hideWaitPanel();
				authBox = $(layer);
				authBoxList = authList;
				params.AUTH_TYPE_LIST = authList;
				authBox.html(YT.template(html_tpl, params));
				YT.initPageEvent(authBox, me);
				YT.Form.initPanel(authBox, {}, me);
				try{
					var is_check_pwd = authList[num].IS_CHECK_PWD;
					if(is_check_pwd != '1'){
						authBox.find('.ui-auth-pwd-wrap').hide()
					}
				}catch(e){
					
				}
				authBox.find('[data-authInput='+num+']').show();
				var header = authBox.find('.yui-auth-types');
				header.find('[data-type='+num+']').addClass('current');
				me.animatedT = setTimeout(function(){
					authBox.find(".yui-auth-form").removeClass("auth-animated");
					animated = true;
				},900);
			});
		},
		authLayer : function(e){
			if(!animated){
				return false;
			}
			var ele = $(e.target);
			if(ele.hasClass('yui-auth-layer')){
				if(me.closeT){
					clearTimeout(me.closeT);
				}
				if(me.animatedT){
					clearTimeout(me.animatedT);
				}
				me.closeAuth();
			}
		},
		showKeyboard: function(e){
			var el = $(e.currentTarget);
			var pwd = el.prev();
			//active
			YT.Device.showTPwdPicker(pwd,null);
			YT.Device._preShowKeyBoard(pwd);
		},
		TPwdCallBack: function(pwd){
			var val = pwd.val();
			var dataVal = pwd.attr("data-value");
			var sixPwd = pwd.next();
			var ii = sixPwd.find('i');
			ii.find('b').css("visibility","hidden");
			if(!YT.isEmpty(val)){
				var len = val.length;
				for(var i=0; i<len; i++){
					var v = val.substring(i,i+1);
					ii.eq(i).find('b').css("visibility","visible");
				}
			}
		},
		hideAuthPanel : function(timeout) {
			this.removeDivId(this._authBoxId);
		},
		/**
		 * 关闭认证页面
		 */
		closeAuth: function(){
			authBox.find(".yui-auth-form").addClass("close-animated");
			me.closeT = setTimeout(function(){
				me.hideAuthPanel();
			},1000);
		},
		
		/**
		 * 提交
		 */
		submit: function(){
			if(!YT.Form.validator(authBox)){
				return false;
			}
			if(authBox.find('.yui-auth-pwd').is(":hidden") != true){
				var pwd = $("#DRAW_PWD").val();
				if(YT.isEmpty(pwd)){
					YT.showTips("请输入交易密码");
					return false;
				}
			}
			YT.openWaitPanel();
			var json = YT.Form.getFormJson(authBox,params);
			var url = me._conf.url;
			var params = YT.apply(json,me._conf.params);
			YT.ajaxData(url,params,function(data){
				YT.hideWaitPanel();
				if(data.STATUS =="1"){
					if(me._conf.success){
						me.hideAuthPanel();
						me._conf.success(data);
					}else{
						me.hideAuthPanel();
					}
				}else{
					authBox.find('input').val('');
					var sixPwd = authBox.find('.sixDigitPassword')
					sixPwd.find('b').css("visibility","hidden");
					if(me._conf.error){
						me._conf.error(data);
					}else{
						YT.alertinfo(data.MSG);
					}
				}
			});
		},
		removeDivId : function(divId) {
			var handle = document.getElementById(divId);
			if (handle) {
				handle.parentNode.removeChild(handle);
			}
		},
		//切换到选择认证方式界面
		choiceAuth : function(){
			authBox.find('.yui-auth-types').show();
			authBox.find('.yui-auth-form').hide();
		},
		//从选择认证方式界面返回
		authBack : function(){
			authBox.find('.yui-auth-types').hide();
			authBox.find('.yui-auth-form').show();
		},
		//修改认证方式
		changeAuth : function(e){
			var ele = $(e.currentTarget);
			var num = ele.attr('data-type')
			var header = authBox.find('.yui-auth-types');
			header.find('p').removeClass('current');
			ele.addClass('current');
			var authInput =authBox.find('[data-authInput]');
			authInput.hide();
			try{
				var is_check_pwd = authBoxList[num].IS_CHECK_PWD;
				if(is_check_pwd != '1'){
					authBox.find('.ui-auth-pwd-wrap').hide()
				}else{
					authBox.find('.ui-auth-pwd-wrap').show()
				}
			}catch(e){
				
			}
			if(num == 'xxx'){
				authBox.find('.pwd_tips').html('请输入支付密码');
				authBox.find('.pwd-container input').attr('data-label','支付密码');
			}else{
				authBox.find('.pwd_tips').html('请输入交易密码');
				authBox.find('.pwd-container input').attr('data-label','交易密码');
			}
			authInput.filter('[data-authInput='+num+']').show();
			authInput.find('input').val('');
			me.authBack();
		},
		/**
		 * 查询认证方式
		 * @param obj
		 * @param callback
		 */
		qryAuthType : function(callback){
			var params = {TRADE_NO:'T020201'};
			var url = YT.dataUrl('common/queryAuth');
			YT.ajaxData(url,params,function(data){
				var defNum = 0;
				if(data.STATUS == '1'){
					var list = data.LIST;
					$.each(list,function(i,n){
						var authWay = n.AUTH_WAY;
						authWay = YT.isEmpty(authWay) ? 'xxx' : authWay;
						var isDef = n.IS_DEFAULT;
						var authWayCn = "";
						switch (authWay) {
						case "0":
							authWayCn = "动态密码+交易密码";
							break;
						case "1":
							authWayCn = "otp";
							break;
						case "2":
							authWayCn = "USBKEY";
							break;
						case "3":
							authWayCn = "蓝牙Key";
							break;
						case "4":
							authWayCn = "云证通";
							break;
						case "xxx":
							authWayCn = "支付密码";
							n.AUTH_WAY = 'xxx';
							break;
						default:
							break;
						}
						n.AUTH_WAY_CN = authWayCn;
						if(isDef == "1"){
							defNum = authWay;
						}
					});
					callback && callback(list,defNum); 
				}
			});
		}
	};
})();