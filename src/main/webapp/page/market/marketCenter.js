
var App={
    current:0,
    size:20,
    /*pageA:$("#pageA"),
    pageB:$("#pageB"),
    pageC:$("#pageC"),*/
    init:function(){

        $(".titlebar-left-btn").bind('click',function () {
            window.history.back();
        })
    },
  success:function(data){
   /*     var tpl=$("#tpl").html();
      var html = juicer(tpl, {"data":data});
      $("#tbody").html(html);*/
  },
   search:function(){}

}

App.init();