/**
 * @Desc 金融计算器
 */
(function() {
	var Counter = YT.Counter = {
			//模板
			tpl:'<div class="x-counter">'+
					/*'<div class="ui-container"></div>'+*/
					'<div class="ui-counter">'+
						'<div class="desc">以下计算结果仅作参考,最终收益请以到账结果为准</div>'+
						'<div class="buy-amt-tlt">'+
							'<span>购买金额(元)</span>'+
							'<span class="position-right" data-name="buy-amt"></span>'+
						'</div>'+
						'<div class="buyafter-amt-tlt">'+
							'<span>预计收益(元)</span>'+
							'<span class="position-right" data-name="buyafter-amt"></span>'+
						'</div>'+
						'<div class="ui-line">'+
							'<div class="row">'+
								'<span data-number="7">7</span><span data-number="8">8</span><span data-number="9">9</span>'+
								'<span data-number="clear" class="tool cheng">清空</span>'+
							'</div>'+
							'<div class="row">'+
								'<span data-number="4">4</span><span data-number="5">5</span><span data-number="6">6</span>'+
								'<span data-number="X" class="tool jiang">X</span>'+
							'</div>'+
							'<div class="row">'+
								'<span data-number="1">1</span><span data-number="2">2</span><span data-number="3">3</span>'+
								'<span data-number="pay" class="tool add" style="height:200%;background-color:${BTN_COLOR};">${BTN_NAME}</span>'+
							'</div>'+
							'<div class="row">'+
								'<span data-number="0" class="zero">0</span>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>',
		/**
		 * 
		 * @param app
		 * @param panel //作用域对象
		 * @param id	//放置容器对象
		 * @param json={
		 * 		Rate :"",//年华收益率(小数形式如0.02)	
		 * 		DESC:json.Counter_desc || "以上计算结果仅作参考,最终收益请以到账结果为准",//描述
		 *		BTN_NAME:json.BTN_NAME || "现在就买",//按钮名称
		 *		BTN_COLOR:json.BTN_COLOR || "#F5923E",//按钮背景色
		 * }
		 */
		initCounter : function(panel,id,app,json) {
			//金融计算器组件识别
			var ele=panel.find(".y-counter");
			if(ele.length<=0){
				return;
			}
			//年华收益率由页面上送，默认为0.1
			Counter.rate=json.Rate || 0.1;
			Counter.App=app;
			Counter.Panel=panel;
			var params={
					DESC:json.Counter_desc || "以下计算结果仅作参考,最终收益请以到账结果为准",
					BTN_NAME:json.BTN_NAME || "现在就买",
					BTN_COLOR:json.BTN_COLOR || "#F5923E",
			};
			var html=YT.template(Counter.tpl,params);
			id.html(html);
			Counter.initEvent();
		},
		/**
		 * 金融计算器事件绑定
		 */
		initEvent : function(){
			$(".x-counter").find("[data-number]").on('click',Fw.bind(Counter.NumberEvent, this));
		},
		/**
		 * 点击事件处理
		 */
		NumberEvent : function(event){
			var el=event.target;
			var datanumber=$(el).attr("data-number");
			switch(datanumber) {
	            case 'clear'://清空
	            	$(".x-counter").find("[data-name=buy-amt]").html("");
	            	$(".x-counter").find("[data-name=buyafter-amt]").html("");
	                return;
                case 'pay'://现在购买
                	var callback=Counter.Panel.find(".y-counter").attr("data-callback");
    				if(!YT.isEmpty(callback)){
    					Counter.closeCounter();
    					Counter.App[callback] && Counter.App[callback]();
    				}else{
    					YT.log.warn("页面缺少回调函数");
    				}
	                return;
	            default://数字
	            	var amt=$(".x-counter").find("[data-name=buy-amt]").html();
	            	//当第一个数字为0时后面不允许再输入0
	            	if(datanumber=="0" && amt=="0"){
	            		return;
	            	}
	            	//当第一个数字为0时,后面数字不为0，清楚前面0
	            	if(datanumber!="0" && amt=="0"){
	            		amt="";
	            	}
	            	var newamt="";
	            	if(datanumber=="X"){//回退
	            		newamt=amt.substring(0,amt.length-1);
	            	}else{
	            		newamt=amt+datanumber;
	            	}
            		$(".x-counter").find("[data-name=buy-amt]").html(newamt);
            		var result=YT.isEmpty(newamt) ? "" : parseFloat(newamt)*parseFloat(Counter.rate);
            		//取4位小数
            		if(YT.isFunction(YT.Format.fmtAmt4s)){
            			YT.log.info("调用YT.Format.fmtAmt4s方法取4为小数");
            			if(!YT.isEmpty(result)){
            				result=YT.Format.fmtAmt4s(result);
            			}
            			$(".x-counter").find("[data-name=buyafter-amt]").html(result);
            		}else{
            			YT.log.info("YT.Format.fmtAmt4s方法不存在,请添加");
            			$(".x-counter").find("[data-name=buyafter-amt]").html(result);
            		}
	                return;
			}
		},
		/**
		 * 销毁金融计算器
		 */
		closeCounter : function(){
			$(".x-counter").remove();
		},
	};
}());
