/**
 * @Desc Echarts
 */
(function() {
	var me = YT.EchartsTpl = {
		/**
		 * 初始化Echarts插件
		 * @param panel
		 * @param app
		 * @param params 包括 图标显然模板 和交易请求参数
		 * 			如params={
		 * 				options :{},
		 * 				data :"",
		 * 			}
		 */
		initEchartsTpl : function(panel, app, conf) {
			//var ele = panel.find('.y-echarts');
			var ele = panel.find('[data-chart]');
			me.APP = app;
			if (ele.length <= 0) {
				return;
			}
			seajs.use('assets/js/plugin/echarts/echarts', function() {
				me.initEcharts(panel, app, conf, ele);
			});

		},
		initEcharts : function(panel, app, conf, ele) {
			ele.each(function() {
				var el = me.el = $(this);
				el.css("width", $(window).width());
				var dataurl = el.data("url");
				if (Fw.isEmpty(dataurl)) {
					return;
				}
				dataurl = YT.dataUrl(dataurl);
				//插件参数
				if (Fw.isEmpty(conf) || Fw.isEmpty(conf.options)) {
					return;
				}
				//交易请求参数
				var params = {};
				if (!Fw.isEmpty(conf) && !Fw.isEmpty(conf.params)) {
					params = conf.params;
				}
				//获取渲染插件的数据
				var dataname = el.attr("data-chart");
				Fw.ajaxData(dataurl, params || {},function(data) {
					if ("1" != data.STATUS) {
						return;
					}
					me.myChart = echarts.init($(el).get(0));
					var json = conf.options;
					switch(dataname) {
	    	            case 'pie'://饼状图
	    	            	options=json.pie;
							
	    	            	var pieLegendData = [];
	    	            	var pieSeriesData = [];
	    	            	if(data.LIST){
	    	            		$.each(data.LIST, function(i, item) {
	    	            			
	    	            			var radarData_json = {
	    	            					value:0, 
	    	            					name:''
	    	            				};
	    	            			//金融资产 CUST_SD  贷款余额 CUST_LN   中间业务 CUST_MID   综合创立 CUST_CONTRIBUTE  忠诚度 CUST_LOYAL
	    	            			var _TRADE_TIME = Number(item.TRADE_TIME)?Number(item.TRADE_TIME):0;
	    	            			radarData_json.value = _TRADE_TIME ;
	    	            			radarData_json.name = item.CHANNEL_TYPE ;
	    	            			pieSeriesData.push(radarData_json);
	    	            			pieLegendData.push(item.CHANNEL_TYPE);
								});
	    	            	}else{
	    	            		pieSeriesData = [];
	    	            		pieLegendData = [];
	    	            	}
	    	            	
	    	            	options.legend.data = pieLegendData;
							options.series[0].data = pieSeriesData;
	    	            	
							me.setChart(options);
	    	                return;
	    	            case 'bar'://柱状图
	    	            	options=json.bar;
	    	            	var max = [];
							var min = [];
							$.each(data.LIST, function(i, dom) {
								max.push(dom.max);
								min.push(dom.min);
								if (data.LIST.length - 1 == i) {
									options.series[0].data = min;
									options.series[1].data = max;
									me.setChart(options);
								}
							});
	    	                return;
	    	            case 'line'://折线图
	    	            	options=json.line;
	    	            	var max = [];
							var min = [];
							$.each(data.LIST, function(i, dom) {
								max.push(dom.max);
								min.push(dom.min);
								if (data.LIST.length - 1 == i) {
									options.series[0].data = min;
									options.series[1].data = max;
									me.setChart(options);
								}
							});
							return;
	    	            case 'linesecond'://折线图2
	    	            	options=json.linesecond;
	    	            	var series = [];
							var color = options.color;
							options.legend.data = data.LIST;
							//遍历数据组装series
							$.each(data.LIST, function(i, val) {
								var param = {
									type : 'line',
									stack : '总量'
								};
								param.name = val.name;
								param.areaStyle = {
									normal : {
										color : color[i]
									//为每一条数据区域设置颜色
									}
								};
								param.data = val.list;
								series[i] = param;
							});
							options.series = series;
							me.setChart(options);
							return;
	    	            case 'ring'://环形图
	    	            	options=json.ring;
	    	            	options.series[0].data = data.LIST;
							me.setChart(options);
							return;
						case 'radar'://环形图
	    	            	options = json.radar;
	    	            	var radarData = [];
	    	            	if(data.LIST){
	    	            		$.each(data.LIST, function(i, item) {
	    	            			
	    	            			var radarData_json = {
		    	    						value : [],
		    	    						name : '指标'
		    	    					};
	    	            			//金融资产 CUST_SD  贷款余额 CUST_LN   中间业务 CUST_MID   综合创立 CUST_CONTRIBUTE  忠诚度 CUST_LOYAL
	    	            			var _CUST_SD = Number(item.CUST_SD)?Number(item.CUST_SD):0;
	    	            			radarData_json.value.push(_CUST_SD);
	    	            			
	    	            			var _CUST_LN = Number(item.CUST_LN)?Number(item.CUST_LN):0;
	    	            			radarData_json.value.push(_CUST_LN);
	    	            			
	    	            			var _CUST_MID = Number(item.CUST_MID)?Number(item.CUST_MID):0;
	    	            			radarData_json.value.push(_CUST_MID);
	    	            			
	    	            			var _CUST_CONTRIBUTE = Number(item.CUST_CONTRIBUTE)?Number(item.CUST_CONTRIBUTE):0;
	    	            			radarData_json.value.push(_CUST_CONTRIBUTE);
	    	            			
	    	            			var _CUST_LOYAL = Number(item.CUST_LOYAL)?Number(item.CUST_LOYAL):0;
	    	            			radarData_json.value.push(_CUST_LOYAL);
	    	            			
	    	            			radarData.push(radarData_json);
								});
	    	            	}else{
	    	            		radarData = []
	    	            	}
	    	            	
	    	            	options.series[0].data = radarData;
	    	            	
	    	            	//options.series[0].data = json.radar;
	    	            	
							me.setChart(options);
	    	                return;
	    	            default:
	    	                return;
	    			}
				});
			});
		},
		/**
		 * 渲染图表
		 */
		setChart : function(option) {
			me.myChart.setOption(option);
			//用于使chart自适应高度和宽度
			window.onresize = function() {
				me.el.css("width", $(window).width());
				me.myChart.resize();
			};
			var callback = me.el.data("callback");
			me.APP[callback] && me.APP[callback](option);
		}
	};
}());
