
var App={
    pageA:$("#pageA"),
    pageB:$("#pageB"),
    pageC:$("#pageC"),
    init:function(){
        App.pages=[App.pageA,App.pageB,App.pageC];
        WY.showPages(App.pageA,App.pages);
        WY.ajax('chat/findSendersMsg.do',{},'App.success');
        $(".titlebar-left-btn").bind('click',function () {
            window.history.back();
        })
    },
  success:function(data){
        var tpl=$("#tpl").html();
      var html = juicer(tpl, {"data":data});
      $("#pageA").html(html);
  },
  goChat:function(id) {
     window.location.href=Fw.getBasePath()+"/chat/goChatPan.do?receiverId="+id;
  }
}

App.init();