var App = {
    current: 0,
    size: 20,
    pages: null,
    init: function () {
        $(".titlebar-left-btn").bind('click', function () {
            window.history.back();
        });
        $("#pageB").css("display", "none");

        var html = "<img style='width: 1.3rem;height: 0.8rem;' class='cust' src=''/>"
        $(".titlebar-right-btn").html(html);
        $(".cust").attr('src', Fw.getBasePath() + '/img/alcohol/cust.png');
        $(".cust").bind("click", function () {
            window.location = Fw.getBasePath() + "/page/merch/driCustList.html";
        })
    },
    success: function (data) {
        /*     var tpl=$("#tpl").html();
           var html = juicer(tpl, {"data":data});
           $("#tbody").html(html);*/
    },
    search: function () {
    },

    showDetail: function (merchId) {
        $("#pageA").css('display', 'none');
        $("#pageB").css('display', 'block');
        $(".web-title").html($("#pageB").attr('title'));
        $("#merchId").val(merchId);
    },

    closeLayer: function (index) {
        layer.close(index);
    },
    linkMerch: function () {
        //检查用户是否登录
        $.ajax({
            url: basePath + '/sys/merIsLogin.do',
            type: 'POST',
            data: {},
            success: function (data) {
                if (data.result == 'yes') {
                    //查询是否存在手机客户
                    Fw.redirect("page/merch/chatPanel.html", {receiver: $("#merchId").attr("name")});
                } else if (data.result == 'no') {
                    //在这里面输入任何合法的js语句
                    var lay = layer.open({
                        type: 1 //Page层类型
                        ,
                        closeBtn: 0 //不显示关闭按钮
                        ,
                        title: false
                        ,
                        shade: 0.6 //遮罩透明度
                        ,
                        anim: 1 //0-6的动画形式，-1不开启
                        ,
                        area: ['6rem', '4rem'] //宽高
                        ,
                        content: '<div style="text-align: center;padding-top: 1rem;background: #a1e4ef"><span>电话：</span><input id="phone"/>' +
                        '<div style="text-align: center;display:block;margin-top:1.4rem;"><span style="margin-right: 0.2rem" id="yes">确定</span><span style="margin-left: 0.2rem" id="cancel">取消</span></div>' +
                        '' +
                        '</div>'
                    });

                    $("#yes").bind("click", function () {
                        //  alert($("#phone").val());
                        //查询数据库用户，没有就注册

                        $.ajax({
                            url: basePath + '/merNeeders/merCheckOrRegis.do',
                            type: 'POST',
                            data: {phone:$("#phone").val()},
                            success: function (data) {
                                if(data.result=="yes"){
                                    Fw.redirect("page/merch/chatPanel.html", {receiver:$("#merchId").attr("name")});
                                }

                            }
                        })


                    })
                    $("#cancel").bind("click", function () {
                        layer.close(lay);
                        return;
                    })
                }

            }
        })
    },
}

App.init();