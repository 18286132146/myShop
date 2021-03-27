$(function () {
    setInterval(hasNewMs, 3000);
    var TAG = "YT.Titlebar";
    YT.log.debug("--init--", TAG);
    var tpl = ['<div class="web-title-warp">', '	<h1 class="web-title"></h1>',
        '	<span class="titlebar-left-btn"></span>',
        '	<span class="titlebar-right-btn" id="chatIndex" onclick="YT.goChart2()" style="margin-right: 1.43rem">',
        '<img class="grMsg" src="img/chat/grMsg.png" style="display:none;width: 0.7rem;height:0.7rem"/>',
        '<img class="redMsg" src="img/chat/redMsg.png" style="display:none;width: 0.7rem;height:0.7rem"/>',
        '</span>',
        '</div>',
        '<div class="web-searchbar-warp"></div>'].join("");
    var titleSearch_tpl = [
        '<div class="ui-searchbar ui-border-radius">',
        '<i class="ui-icon-search"></i>',
        '<div class="ui-searchbar-input">',
        '<input value="${val}" data-name="SEARCH_NAME" type="text" placeholder="${placeholder}">',
        '</div>', '</div>'].join('');

    var mp3tpl=[
        '<audio id="audioPlay" style="display: none">',
        '<source src="js/msg/mail.mp3" type="audio/mpeg">',
        '</audio>'
    ].join('')
    $(mp3tpl).appendTo("body");

      //  $('#audioPlay')[0].play();

    /*消息相关*/
    var val = 0;
    var fla = {hasNew: false};
    var msgCach={chatUrl:'',merchId:''}
    var id = '';
    /*消息相关*/

    // 设置页面的标题栏；
    var me = YT.Titlebar = {
        divId: "web_titlebar",
        create: function () {
            YT.log.debug("---create--", TAG);
            var div = document.createElement("div");
            div.id = this.divId;
            var jqEl = $(div);
            jqEl.prependTo(document.body);
            this.div = jqEl.html(tpl);
            this.titleEl = jqEl.find(".web-title");
            this.btnLeft = jqEl.find(".titlebar-left-btn");
            this.btnRight = jqEl.find(".titlebar-right-btn");
        },
        _button: function (btn, btnConf) {
            if (!(btnConf && btnConf.exist == "true")) {
                btn.hide();
                return;
            }
            var classname = btn.attr("class");
            if ("titlebar-right-btn" == classname) {
                btn.show().html(btnConf.name);
            } else {
                btn.show();
            }
            btn.attr("onclick", btnConf.func);

        },
        changeTitle: function (cfg) {
            if (YT.isEmpty(cfg) || !YT.isObject(cfg)) {
                return;
            }
            var val = cfg.defalutVal ? cfg.defalutVal : "";
            var placeholder = cfg.placeholder ? cfg.placeholder : "请输入搜索内容";
            var callback = cfg.callback;
            var params = {
                val: val,
                placeholder: placeholder
            }
            var title = $('#' + me.divId);
            var html = YT.template(titleSearch_tpl, params);
            this.div.find('.web-title-warp').hide();
            this.div.find('.web-searchbar-warp').html(html).show();
            this.div.off('keydown', '.web-searchbar-warp input');
            this.div.on('keydown', '.web-searchbar-warp input', function () {
                var e = window.event;
                if (e.keyCode == 13) {
                    callback && callback($(this).val());
                    me.div.find('.web-searchbar-warp').empty();
                    me.div.find('.web-title-warp').show();
                }
                if (e.keyCode == 27) {
                    me.div.find('.web-searchbar-warp').empty();
                    me.div.find('.web-title-warp').show();
                }
            });
        },
    };





    function hasNewMs(){
            $.ajax({
                url: Fw.getBasePath() + '/merchChat/checkNewMsg.do',
                type: 'POST',
                data: {},
                success: function (data) {
                    if (data.hasNewMsg) {
                        fla.hasNew = true;
                        msgCach.chatUrl=data.chatUrl;
                        msgCach.merchId=data.merchId;
                        localStorage.setItem("chatUrl",data.chatUrl);
                        localStorage.setItem("merchId",data.merchId);
                        var oldastScan=localStorage.getItem("msgLastScan");
                        var oldastScanDate=null;
                        if(oldastScan){
                            oldastScanDate=new Date(Date.parse(oldastScan.replace(/-/g, "/")));
                        }
                        var scanDate = new Date(Date.parse(data.msgLastScan.replace(/-/g, "/")));
                        if(!oldastScanDate){
                            localStorage.setItem("msgLastScan",scanDate);
                        }
                        if(oldastScanDate<scanDate){
                            localStorage.removeItem("msgLastScan");
                            localStorage.setItem("msgLastScan",scanDate);
                            //新消息提醒
                            $('#audioPlay')[0].play();
                        }

                    } else {
                        fla.hasNew = false;
                    }
                }
            })
    };

    function jiaoHuan() {
        var msg = $(".redMsg");
        var grMsg = $(".grMsg");
        switch (msg.css("display")) {
            case "block":
                msg.css("display", "none");
                grMsg.css("display", "block");
                break;
            case "none":
                msg.css("display", "block");
                grMsg.css("display", "none");
        }
    };

    function flash() {
        Object.defineProperty(fla, 'hasNew', {
            /*  get:function(){alert("hh")},*/

            set: function (value) {
                if (value) {
                    if (id != '') {
                        clearInterval(id)
                    }//清楚原来的定时
                    id = setInterval(jiaoHuan, 300);
                } else {
                    //恢复不闪动
                    clearInterval(id);
                    var msg = $(".redMsg");
                    var grMsg = $(".grMsg");
                    msg.css("display", "none");
                    //grMsg.css("display","none")
                }
            }
        })

    };

    function change(conf) {
        this.div.removeClass();
        if (conf.theme == 'red') {
            this.div.addClass('theme-red');
        } else if (conf.theme == 'alpha') {
            this.div.addClass('theme-alpha');
        } else {
            this.div.addClass('theme-def');
        }
        conf.title && this.titleEl.html(conf.title);
        me._button(this.btnLeft, conf.leftButton);
        me._button(this.btnRight, conf.rightButton);
        this.div.find('.web-title-warp').show();
        this.div.find('.web-searchbar-warp').empty();

    };
    me.create();
    YT.log.debug("--end--", TAG);
    flash();
   // $("#chatIndex").bind('click',goChart(msgCach.chatUrl,msgCach.merchId))
});