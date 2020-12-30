var App = {
    current: 0,
    size: 20,
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
        //查询集市商店列表
        $.ajax({
            url: Fw.getBasePath() + '/market/listStoresForMenus.do',
            type: 'POST',
            data: {},
            processData: false,
            contentType: false,
            async: false,
            success: function (data) {
                var tpl = $("#tpl").html();
                var html = juicer(tpl, {"data": data});
                $("#storeUl").html(html);
            }
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