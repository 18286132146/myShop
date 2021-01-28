var App = {
    pages: null,
    storeId: null,
    storeName: null,
    wareId:null,
    data: null,
    curPage: 1,
    pageSize: 16,
    init: function () {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        $("#pageB").css("display", "none");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == "storeId") {
                App.storeId = pair[1];
                localStorage.setItem("storeId", App.storeId);
            }
            if (pair[0] == "wareId") {
                App.wareId = pair[1];
                localStorage.setItem("wareId", App.wareId);
                App.showDetail(App.wareId);
            }
        }
        //获取storeID
        if (!App.storeId) {
            App.storeId = Fw.getParameters("storeId");
            if (App.storeId) {
                localStorage.setItem("storeId", App.storeId);
            }
        }
        if (!App.storeId) {
            App.storeId = localStorage.getItem("storeId");
            if (!App.storeId) {
                Fw.redirect("page/market/marketCenter.html")
            }
        }
        $(".titlebar-left-btn").bind('click', function () {
            if($("#pageB").css("display")=="block"){
                $("#pageB").css("display","none");
                $("#pageA").css("display","block");
              return
            }
            window.history.back();
        });
        var html = "<span class='titlebar-right-btn'><img style='width: 1.3rem;height: 0.8rem;' class='cust' src=''/></span>"
        $(".titlebar-right-btn").before(html);
        $(".cust").attr('src', Fw.getBasePath() + '/img/alcohol/cust.png');
        $(".cust").bind("click", function () {
            window.location = Fw.getBasePath() + "/page/merch/driCustList.html";
        })
        App.showWaresBySId(App.storeId);
    }
    ,
    showWaresBySId: function (storeId) {
        WY.ajax2(Fw.getBasePath() + "wares/listByStoreId.do", {
            "storeid": App.storeId,
            "curPage": App.curPage,
            "pageSize": App.pageSize
        }, function (data) {
            App.showPageMenus(data);
        })
    },
    showPageMenus: function (data) {
        var tpl = $("#templ").html();
        var html = juicer(tpl, {"dataList": data.wareList});
        $("#menuUl").html(html);
        //判断是不是本店店长权限
        WY.ajax2(basePath + 'sys/merIsLogin.do',{},function (data) {
           if(data.result=='yes'){
               /*localStorage.removeItem("merLoginNeeder");
               localStorage.setItem("merLoginNeeder",JSON.stringify(data.merLoginNeeder))*/
               if(!(data.merLoginNeeder.role==1||data.merLoginNeeder.role==3)){
                   $("#addWare").css("display","none");
               }
           }
        })



        /*   var warname = $("#wareName").substring(0, 4);
           $("#wareName").html(warname);*/
    },
    search: function () {
    },

    showDetail: function (id) {
        App.wareId=id;
        $("#pageA").css('display', 'none');
        $("#pageB").css('display', 'block');
        $(".web-title").html($("#pageB").attr('title'));
        var tpl = $("#templ2").html();
        WY.ajax2(Fw.getBasePath() + "wares/findById.do", {"wareId": id}, function (data) {
            var tpl = $("#templ2").html();
            var html = juicer(tpl, {"item": data.ware});
            $("#pageB").html(html);
            $("#merchId").val(data.ware.id);
            if (data.managerPhone) {
                $("#managerPhone").attr("href", "tel:" + data.managerPhone);
            } else {

            }
        })

    },

    closeLayer: function (index) {
        layer.close(index);
    },
    linkMerch: function () {
        //检查用户是否登录
        $.ajax({
            url: basePath + 'sys/merIsLogin.do',
            type: 'POST',
            data: {},
            success: function (data) {
                if (data.result == 'yes') {
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
                        var phone= $("#phone").val();
                        if(!WY.isPhoneAvailable(phone)){
                            alert("请输入正确的号码！");
                            return
                        }
                        WY.ajax2(basePath + 'merNeeders/merCheckOrRegis.do',{phone: phone},function(data){
                            layer.close(lay);
                            if (data.result == "yes") {
                                if(data.merLogiId ==$("#merchId").attr("name")){
                                    Fw.redirect("page/login/merLogin.html",{phone: $("#phone").val()});
                                  return;
                                }
                                Fw.redirect(data.chatUrl, {receiver: $("#merchId").attr("name")});
                            }
                        })
                    })
                    $("#cancel").bind("click", function () {
                        layer.close(lay);
                        return;
                    });
                }

            }
        })
    },
    goAddWare: function () {
        Fw.redirect("page/merch/addWare.html", {})
    },
    copyMyLick: function () {
        var btn = document.getElementById('copy');
        var val = window.location.href + '&storeId=' + App.storeId;
        var dis=$("#pageB").css("display");
        if(dis=='block'){
            val= val  + '&wareId=' + App.wareId;
        }
        var tempInput = document.createElement('input');
        tempInput.value = val;
        document.body.appendChild(tempInput);
        tempInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        tempInput.className = 'tempInput ';
        tempInput.style.display = 'none';
        document.body.removeChild(tempInput);//移除
       /* var la = layer.alert("当前商店连接已复制到剪贴板！", {icon: 5, title: "提示", area: ["6rem", "4rem"]});*/
       /* layer.style(la, {fontSize: '1rem'})*/
       alert("连接已复制到剪贴板！");
    }
}

App.init();