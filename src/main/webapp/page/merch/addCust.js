
var App={
    current:0,
    size:20,
    pageA:$("#pageA"),
    pageB:$("#pageB"),
    pageC:$("#pageC"),
    init:function(){
        $(".titlebar-left-btn").bind('click', function () {
            window.history.back();
        });
        App.pages=[App.pageA];
        WY.showPages(App.pageA,App.pages);
        //初始化区县数据
        $(function () {
           App.findAreas('province', '0');
            $("#province").change(function () {
                var proId = $("#province option:selected").val();
                App.findAreas('city', proId);
            })
            $("#city").change(function () {
                var proId = $("#city option:selected").val();
                App.findAreas('county', proId);
            });
        })
    },
  success:function(data){
    window.location=Fw.getBasePath()+"/page/merch/driCustList.html";
  },
   submit:function(){
       var phone= $("#phone").val();
        if(!WY.isPhoneAvailable(phone)){
            alert("请输入正确的号码！");
           return
        }
       var formData = new FormData(document.getElementById("fm"));
        //号码校验
       var is=WY.isPhoneAvailable($("#phone").val());
       if(!is){
           alert("手机号码错误，请检查手机号码！");
           return;
       }
       WY.ajax(Fw.getBasePath() + 'drink/addCust.do',formData,
            function (data) {
               console.log(data);
               if(data.status=='500'){
                   alert(data.msg);
                   return;
               }
               App.success(data);
           }
       )
   },

    findAreas:function(grade, pid) {
    $.ajax({
        url: basePath + '/common/findAreaData',
        type: 'POST',
        data: {'pId': pid},
        success: function (data) {
            switch (grade) {
                case 'province':
                    $("#province").html('');
                    var html = '<option>--请选择--</option>';
                    $.each(data, function (index, val) {
                        html += '<option value="' + val.id + '">' + val.areaName + '</option>';
                    })
                    $("#province").html(html);
                    break;

                case 'city':
                    $("#city").html('');
                    var html = '<option>--请选择--</option>';
                    $.each(data, function (index, val) {
                        html += '<option value="' + val.id + '">' + val.areaName + '</option>';
                    })
                    $("#city").html(html);
                    break;
                case 'county':
                    $("#county").html('');
                    var html = '<option>--请选择--</option>';
                    $.each(data, function (index, val) {
                        html += '<option value="' + val.id + '">' + val.areaName + '</option>';
                    })
                    $("#county").html(html);
                    break;
            }
        }
    })
},

}

App.init();