var App = {
    storeId: null,
    wareId: null,
    imgUrl:null,
    current: 0,
    size: 20,
    pageA: $("#pageA"),
    pageB: $("#pageB"),
    pageC: $("#pageC"),
    init: function () {
        App.wareId = Fw.getParameters("wareId");
        App.storeId = Fw.getParameters("storeId");
        $("#web_titlebar").css('height', '2.8rem');
        $("#titlebar-left-btn").css('height', '2rem');
        $("#titlebar-left-btn").css('width', '2rem');
        $(".titlebar-left-btn").append("<img src='img/back.png' style='width: 2rem;height: 2rem;'/>");
        $(".titlebar-left-btn").bind('click', function () {
            window.history.back();
        });
        $(".web-title").append($("#pageA").attr('title'));
        $(".titlebar-right-btn img").css("width", "2rem");
        $(".titlebar-right-btn img").css("height", "2rem");
        if (App.wareId) {
            var file = new Image();
            WY.ajax2(Fw.getBasePath() + "wares/findById.do", {"wareId": App.wareId}, function (data) {
                $("#name").val(data.ware.name);
                $("#price").val(data.ware.price);
                if (data.ware.imgFloor) {
                    switch (data.ware.imgFloor) {
                        case "0":
                            $("#ver").attr("checked", "checked");
                            break;
                        case "1":
                            $("#row").attr("checked", "checked");
                            break;
                    }
                }
                $("#minPrice").val(data.ware.minPrice);
                file.src = Fw.getBasePath() + "/wares/findPic?fileName=" + data.ware.imgUrl;
                App.imgUrl=data.ware.imgUrl;
            })
            /*  if(userImg!=null){
                  file=userImg;
              }*/
            var imglist = document.querySelectorAll('.upload-Picitem');
            var piclist = document.getElementsByClassName('upload-piclist')[0];
            var filelist = file.length + imglist.length > picmax ? 1 - imglist.length : file.length + imglist.length;
            if (file.length + imglist.length >= 1) {
                var uploadfile = document.getElementsByClassName('upload-file')[0]
                //uploadfile.style.display = "none"
            }

            var div = document.createElement('div');
            div.className = 'upload-Picitem';
            div.appendChild(file);
            piclist.appendChild(div);
            $(".upload-Picitem").bind("click",function () {
               App.previewImg();
            });
        }
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
    result: function (data) {
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
    goStorePage: function () {
        Fw.redirect("page/merch/storeMenus.html");
    },
    submit2: function () {
        var formData = new FormData(document.getElementById("fm"));
        if (!App.wareId) {
            alert("商品id不能为空！")
            return;
        }
        formData.append("wareId", App.wareId);
       /* formData.append("imgFloor", $("input[checked='checked']").val());*/
        WY.ajax(Fw.getBasePath() + "wares/editWare.do", formData, function (data) {
            if (data.status == '202') {
               alert(data.msg);
                Fw.redirect("page/login/merLogin.html");
            }
            if (data.status == '200') {
                Fw.redirect("page/merch/storeMenus.html");
            } else {
                layer.alert(data.msg);
            }
        });

    },
    //提交
    submit1: function () {
        var piclist = document.querySelectorAll('.upload-Picitem');
        App.submit2();
    },
    //下一步
    next: function () {
        //校验数据
        var name = $("#name").val();
        if (!name || Fw.trim(name) == '') {
            layer.alert("商品名称不能为空！", {icon: 5, title: "提示"});
            return
        }
        var price = $("#price").val();
        if (!price) {
            layer.alert("请输入价格！", {icon: 5, title: "提示"});
            return
        }
        var minPrice = $("#minPrice").val();
        if (!minPrice) {
            layer.alert("请输入成本价格！", {icon: 5, title: "提示"});
            return
        }
        App.submit1();
    },
     layer:null,
    previewImg: function () {
        var content = "<div style='text-align: center;width: 100%;height: 100%'>" +
            "<img class='showImg' src='" + Fw.getBasePath() + "/wares/findPic?fileName=" + App.imgUrl + "' style='width: 100%;height: 90%'/> <br/>" +
            "<div style='width:4rem;height:2rem;font-size: 1.5rem;text-align: center; display: inline-block;line-height: normal' onclick='App.closeLayer();'>返回</div>" +
            "<div style='width:4rem;height:2rem;font-size: 1.5rem;text-align: center; display: inline-block;line-height: normal' onclick='App.clearFiles();'>删除</div>" +
            "</div>"

        App.layer = layer.open({
            type: 1,
            closeBtn: 1,
            area: ['70%', '60%'],
            skin: 'layui-layer-nobg', //没有背景色
            shadeClose: true,
            content: content
        });

    },
    closeLayer: function () {
        layer.close(App.layer);
    },
    clearFiles:function(){
    $("#file").files=null;
    $(".upload-Picitem").remove();
    App.isDelPic=true;
    App.closeLayer(App.layer);
}
}

App.init();