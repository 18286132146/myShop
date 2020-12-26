
var App={
    current:0,
    size:20,
    pageA:$("#pageA"),
    pageB:$("#pageB"),
    pageC:$("#pageC"),
    init:function(){
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
        alert("dao");
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