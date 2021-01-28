var App = {
    curPage:1,
    pageSize:16,
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
        var tittle=$("#pageA").attr("tittle");
       $(".web-title").html(tittle);
       WY.ajax2(Fw.getBasePath() + '/market/listStoresForMenus.do',{"curPage":App.curPage,"pageSize":App.pageSize},function (data) {
           var tpl = $("#tpl").html();
           var html = juicer(tpl, {"data": data.storeList});
           $("#storeUl").html(html);
       })

    },

    /*去商店*/
    storeMenus: function (mainUrl,storeId) {
        Fw.redirect(mainUrl,{storeId:storeId});
    },


    search: function () {
    },

    findImg: function (url) {
        return Fw.getBasePath() + url;
    }

}

App.init();