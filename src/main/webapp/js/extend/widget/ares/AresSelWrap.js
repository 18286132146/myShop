/**
 * <code>
 * AresSelWrap 选中项
 *
 *
 * </code>
 */
define(function(require, exports) {
    var TAG = "AresSelWrap";
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
    me.init = function(widget, panel, app, json) {
        YT.log.info('init begin', TAG);  
        var callback1 = widget.find('button[data-type="reset"]').attr('data-callback');//重置回调
        var callback2 = widget.find('button[data-type="comfirm"]').attr('data-callback');//确定回调
        var checkVals= '';
        
        widget.find('button[data-type="reset"]').on('click',function(){//重置
        	widget.find('input').removeAttr('checked');	
        	if (!YT.isEmpty(callback1)) {
        		app[callback1] && app[callback1](widget);
            }
        	YT.log.info('已重置');
        });
        
        widget.find('button[data-type="comfirm"]').on('click',function(){//确定
        	widget.hide();
        	widget.find('input:checked').each(function() {
        		checkVals += $(this).val() + ",";
        	});
        	checkVals = checkVals.substring(0, checkVals.length - 1);
        	YT.log.info('选中的value值有', checkVals);
        	if (!YT.isEmpty(callback2)) {
        		app[callback2] && app[callback2](checkVals);
            }
        	widget.find('input').removeAttr('checked');	
        })
        
        YT.log.info('init finish', TAG);
    };
    me.reSet=function(widget, panel, app, json){	
    	
    }
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