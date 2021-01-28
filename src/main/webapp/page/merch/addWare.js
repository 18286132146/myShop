
var App={
    current:0,
    size:20,
    pageA:$("#pageA"),
    pageB:$("#pageB"),
    pageC:$("#pageC"),
    init:function(){
        $("#web_titlebar").css('height','2.8rem');
        $("#titlebar-left-btn").css('height','2rem');
        $("#titlebar-left-btn").css('width','2rem');
        $(".titlebar-left-btn").append("<img src='img/back.png' style='width: 2rem;height: 2rem;'/>");
        $(".titlebar-left-btn").bind('click', function () {
            window.history.back();
        });
        $(".web-title").append($("#pageA").attr('title'));
         $(".titlebar-right-btn img").css("width","2rem");
        $(".titlebar-right-btn img").css("height","2rem");
    },
/*  success:function(data){
    window.location=Fw.getBasePath()+"/page/merch/driCustList.html";
  },*/
/*   submit:function(){
       var formData = new FormData(document.getElementById("fm"));
       $.ajax({
           url: Fw.getBasePath() + '/merch/addCust.do',
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
   },*/
   result:function (data) {
       if (data.status == '201') {
           Fw.redirect("page/login/merLogin.html");
       }
       console.log(data);
       if (data.status == 'yes') {
           Fw.redirect("page/merch/storeMenus.html");
       } else {
           layer.alert(data.msg);
       }
   },
    goStorePage:function(){
        Fw.redirect("page/merch/storeMenus.html");
    }
}

App.init();