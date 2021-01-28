var App = {
    /*pageA:$("#pageA"),
    pageB:$("#pageB"),
    pageC:$("#pageC"),*/
    init: function () {
        $(".titlebar-left-btn").bind('click', function () {
            window.history.back();
        })
        App.initPageA();
    },
    initPageA: function (data) {
     /*   var tittle=$("#pageA").attr("tittle");
       $(".web-title").html(tittle);
       WY.ajax2(Fw.getBasePath() + '/market/listStoresForMenus.do',{"curPage":App.curPage,"pageSize":App.pageSize},function (data) {
           var tpl = $("#tpl").html();
           var html = juicer(tpl, {"data": data.storeList});
           $("#storeUl").html(html);
       })*/

    },


    search: function () {
        var orderId=$("#orderId").val();
        WY.ajax2(Fw.getBasePath()+"/kuaiDi/findKuaiDi.do",{"orderId":orderId},function (data) {
            var tpl = $("#templ").html();
           var deliverystatus= data.deliverystatus;
           if(deliverystatus){
               switch (deliverystatus){
                   case '0': deliverystatus="快递收件(揽件)"; break;
                   case '1': deliverystatus="在途中"; break;
                   case '2': deliverystatus="正在派件"; break;
                   case '3': deliverystatus="已签收"; break;
                   case '4': deliverystatus="派送失败"; break;
                   case '5': deliverystatus="疑难件"; break;
                   case '6': deliverystatus="退件签收"; break;
               }
           }
            $(".title-text").html(deliverystatus);
            var html = juicer(tpl, {"list": data.list});
            $("#J_listtext2").html(html);
        })

    },


}

App.init();