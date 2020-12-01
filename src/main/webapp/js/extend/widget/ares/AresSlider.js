/**
 * <code>
 * AresSlider 栏目列表
 * 
 * 滑动轴初始化；
 * 
 * </code>
 */
define(function(require, exports) {
	var TAG = "AresSlider";
	YT.log.debug("---内部组件--init----", TAG);
	// 内部组件不提供外部调用支持
	var me = {};// me为当前控件的函数命名空间
	/**
	 * <code>
	 * 初始化控件的事件、值、展现等信息
	 * 
	 * @param widget 当前组件
	 * @param panel 当前容器作用域，通常为page容器
	 * @param app 处理器
	 * @param json 数据处理
	 * </code>
	 */
	me.sliderTpl='<input id="ex1"  type="text" style="width: 100%;" />' +
    			 '<div class="silder-fw">' +
    			 '<div class="minMoney"></div>' +
    			 '<div class="maxMoney"></div>' +
    			 '</div>';
	me.init = function(widget, panel, app, json) {
		YT.log.info('init begin', TAG);
		seajs.use('assets/css/module/bslider.css');
		seajs.use('assets/js/ytfw/module/SliderAxle.js',function(){
			var min = widget.attr('data-minMoney'),
			max = widget.attr('data-maxMoney'),
			deMoney = widget.attr('data-deMoney'),
			inputVal = widget.find('.moneyNum');
			widget.find('.silderInfo').html(me.sliderTpl);
			widget.find('.minMoney').html(YT.Format.fmtAmt(min));
			widget.find('.maxMoney').html(YT.Format.fmtAmt(max));//默认最大值
			YT.isEmpty(deMoney) && (deMoney = max);
			sliderEl = widget.find('#ex1').slider({
	            id: 'ex1Slider', //id
	            min: parseFloat(min), //最小值
	            max: parseFloat(max), //最大值  App.canAppStagAmt
	            step: 0.01, //步长
	            value: parseFloat(deMoney) //默认选中值
	            ,formatter: function(value){
	            	inputVal.val(YT.Format.fmtAmt(value));
	            },
	            enabled:true
		     });
			inputVal.on('change propertychange',function(){
				 sliderEl.slider('setValue', Number(YT.Format.unfmtAmt(inputVal.val())));
			})
		});
		
		YT.log.info('init finish', TAG);
	};
	
	/**
	 * <code>
	 * 重置控件的值、展现等信息，不含事件定义
	 * 
	 * @param widget 当前组件
	 * @param panel 当前容器作用域，通常为page容器
	 * @param app 处理器
	 * @param json 数据处理
	 * </code>
	 */
	me.reset = function(widget, panel, app, json) {
		YT.log.info('reset begin', TAG);
		YT.log.info('reset finish', TAG);
	};

	// 组件的外置接口
	exports.init = me.init;
	exports.reset = me.reset;

})