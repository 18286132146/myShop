
var App={
    current:0,
    size:20,
    pageA:$("#pageA"),
    pageB:$("#pageB"),
    pageC:$("#pageC"),
    init:function(){
        App.pages=[App.pageA,App.pageB,App.pageC];
        WY.showPages(App.pageA,App.pages);
         App.search();
        $(".titlebar-left-btn").bind('click',function () {
            window.history.back();
        })
        $(".searchImg").bind('click',function () {
           App.search();
        })
        var html = "<span class='titlebar-right-btn'><img style='height: 0.85rem;' class='addCust' src=''/></span>"
        $(".titlebar-right-btn").before(html);
        $(".addCust").attr('src',Fw.getBasePath()+'/img/alcohol/addCust.png')
        $(".titlebar-right-btn").bind('click',function () {
            window.location=Fw.getBasePath()+'/page/merch/addCust.html';
        })

    },
  success:function(data){
        var tpl=$("#tpl").html();
      var html = juicer(tpl, {"data":data});
      $("#tbody").html(html);
  },
   search:function(){
       var formData = new FormData(document.getElementById("fm"));
       formData.append("current",App.current);
       formData.append("size",App.size);
       $.ajax({
           url: Fw.getBasePath() + '/drink/listMyCust.do',
           type: 'POST',
           data: formData,
           processData: false,
           contentType: false,
           async: false,
           success: function (data) {
               console.log(data);
               App.success(data);
           }
       })
     // $.ajax('merch/listMyCust.do',$(formData),'App.success');
   }
}

App.init();