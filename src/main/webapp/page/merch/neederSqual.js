
var App = {
    pageNo: 1,
}

var basePath =Fw.getBasePath();
var neederImpFolder = "";
var pageNo = App.pageNo;
/*    Object.defineProperty(App, "pageNo", {
        get: function () {
            alert("get:"+pageNo);
            return pageNo
        },
        set: function (pageNo) {
            if (pageNo <= 0) {
                App.pageNo = 1;
            } else {
                alert("set:"+pageNo);
                goPage(pageNo);
            }
        }
    });*/
$(function () {
    goPage(pageNo);
})
var index = null;

function previewImg() {
    $("#neederId").val($(this).attr('id'));
    $("#pageA").css('display','none');
    $("#pageB").css('display','block');
    $("#neederDetail").css('background','url('+$(this).attr('src')+')');
}

/*去聊天*/
function goMsgToNeeder() {
    var id = $(this).attr('class');
    window.location = basePath + "/needers/goMsgToNeeder?id=" + id;
}


function goChat() {
    var id = $(this).attr('class');
    if(id=='neederDetail'){
        id=$("#neederId").val();
    }
    Fw.redirect("/page/needers/chatPanel.html",{receiver:id});
}

function brightHeart() {
    /* 心动切换*/
    var heartPath = $(this).attr('src');
    if (heartPath.indexOf("heart") != -1) {
        $(this).attr('src', basePath + "/img/needers/xindong.png")
    } else {
        $(this).attr('src', basePath + "/img/needers/heart.png")
    }
}

function closeLayer() {
    layer.close(index);
}

function goPage(pageNo) {
    $("#neederImgs").html("");
    $.ajax({
            url: basePath + '/needers/neederImpFolder',
            type: 'POST',
            data: {"neederName": "neederImpFolder"},
            success: function (data1) {
                var neederImpFolder = data1.neederImpFolder;
                $.ajax({
                        url: basePath + '/needers/listNeeders',
                        type: 'POST',
                        data: {"pageNo": pageNo, "pageSize": 9},
                        success: function (data2) {
                            /*onclick='previewImg.call(this)'*/
                            var needersLi = "";
                            $.each(data2.records, function (index, val) {
                                needersLi += "<li class='neederLi'>" +
                                    "<div class='imgDiv' >" +
                                    "" + "<img class='neederImg' " +
                                    "src='" + basePath + "/needers/findPic?fileName=" + val.imgUrl +
                                    "' onclick='previewImg.call(this)'" +
                                    "id='" + val.id + "'/><br/>" +

                                    "</div>" +
                                    "<div>" + val.name + "</div>" +
                                    "</li>"
                                $('#neederImgs').html(needersLi);
                            });
                        }
                    }
                );
            }
        }
    )
}

function changePage() {
    var id = $(this).attr("id");
    switch (id) {
        case 'uPage':
            App.pageNo = App.pageNo - 1;
            if(App.pageNo<1){
                App.pageNo=1;
            }
            goPage(App.pageNo);
            break;
        case 'dPage':
            App.pageNo = App.pageNo + 1;
            goPage(App.pageNo);
    }
}

function back() {
    var id = $(this).attr("id");
    if(id=='backA'){
        $("#pageB").css('display','none');
        $("#pageA").css('display','block');
        return
    }
    window.history.back();
}

function goMyCenter() {
    window.location = basePath + "/page/needers/editNeeders.html";
}

///消息闪烁
var val = 0;
var fla={hasNew:false};
function hasNewMsg(data){
    if(data.hasNewMsg){
        fla.hasNew=true;
    }else{
        fla.hasNew=false;
    }

}
$(function () {
    setInterval('ajax("'+basePath+'/chat/checkNewMsg.do",{},"hasNewMsg")', 3000);
})

var id='';
function flash() {
    Object.defineProperty(fla,'hasNew',{
        /*  get:function(){alert("hh")},*/

        set:function(value){
            if(value){
                if(id!=''){clearInterval(id)}//清楚原来的定时
                id=setInterval(jiaoHuan,300);
            }else{
                //恢复不闪动
                clearInterval(id);
                var msg = $(".redMsg");
                var grMsg = $(".grMsg");
                msg.css("display","none");
                //grMsg.css("display","none")
            }
        }
    })

}
function jiaoHuan(){
    var msg = $(".redMsg");
    var grMsg = $(".grMsg");
    switch (msg.css("display")){
        case "block": msg.css("display","none");grMsg.css("display","block");break;
        case "none":  msg.css("display","block");grMsg.css("display","none");
    }
}

// message();
flash();
//消息闪烁

//跳转消息中心
function goMsgCenter(){
    window.location = basePath + "/page/chart/msgCenter.html";
}
//跳转集市中心
function goMarketCenter(){
    window.location = basePath + "/page/market/marketCenter.html";
}
