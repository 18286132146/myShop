
var App={
    pageA:$("#pageA"),
    pageB:$("#pageB"),
    pageC:$("#pageC"),
    init:function(){
        App.pages=[App.pageA,App.pageB,App.pageC];
        WY.showPages(App.pageA,App.pages);
        WY.ajax2(Fw.getBasePath()+'chat/findSendersMsg.do',{},function(data){
           /* var tpl=$("#tpl").html();
            var html = juicer(tpl, {"data":data});
            $("#pageA").html(html);*/
        });
        $(".titlebar-left-btn").bind('click',function () {
            window.history.back();
        })
    },
/*  success:function(data){
        var tpl=$("#tpl").html();
      var html = juicer(tpl, {"data":data});
      $("#pageA").html(html);
  },*/
  goChat:function(id) {
     /*window.location.href=Fw.getBasePath()+"/chat/goChatPan.do?receiverId="+id;*/
     Fw.redirect("/page/needers/chatPanel.html",{receiver:id})
  }
}

App.init();