
var App={
    pageA:$("#pageA"),
    pageB:$("#pageB"),
    pageC:$("#pageC"),
    init:function(){
        App.pages=[App.pageA,App.pageB,App.pageC];
        WY.showPages(App.pageA,App.pages);
        WY.ajax('chat/senderMsg.do',{},'App.success');
    },
  success:function(data){
        alert(JSON.stringify(data));
        var tpl=$("#tpl").html();
      var html = juicer(tpl, {"data":data});
      $("#pageA").html(html);
  }
}

App.init();