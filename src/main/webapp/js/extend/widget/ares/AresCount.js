/**
 * <code>
 * AresCount 购买加减数量
 *
 *
 * </code>
 */
define(function(require, exports) {
    var TAG = "AresCount";
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

        var minus = widget.find(".icon-jian");// 减
        var callback1=minus.attr("data-callback");// 减 回调
        var num = minus.next();//值
        var add = widget.find(".icon-jia");// 加
        var callback2=minus.attr("data-callback");// 加 回调
        minus.on('click',function () {
            if((parseInt(num.text())-1)>=0){
                num.text(parseInt(num.text())-1);
            }else{
                num.text(0);
            }
            YT.log.info('val值为', num.text());
            if (!YT.isEmpty(callback1)) {
                app[callback1] && app[callback1](num.text());
            }
        })
        add.on('click',function () {
            num.text(parseInt(num.text())+1);
            YT.log.info('val值为', num.text());
            if (!YT.isEmpty(callback2)) {
                app[callback2] && app[callback2](num.text());
            }
        })
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