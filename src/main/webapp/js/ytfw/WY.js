(function () {
    var WY = {
        showPages: function (showPage, pages) {
            $(showPage).css("display", "block");
            for (var i = 0; i < pages.length; i++) {
                if (!showPage.is(pages[i])) {
                    $(pages[i]).css('display', 'none');
                }
            }
            $(".web-title").html(showPage.attr('title'));
        },
        ajax: function (url, obj, successCall) {
            var params = {};
            if (obj != null) {
                params = obj;
            }
            YT.openWaitPanel();
            $.ajax({
                type: "post",
                url: url,
                data:params,
                contentType:false,
                processData:false,
                success: function (data) {
                    successCall && successCall(data);

                 /*   if (succ != null) {
                        if (succ.indexOf("(") > 0) {
                            eval(succ);
                        } else {
                            /!* alert(succ+'('+data+')');*!/
                            // eval(succ);
                            eval(succ + "(" + JSON.stringify(data) + ")");
                        }
                    }*/
                    YT.hideWaitPanel();
                },
                error: function (e) {
                    YT.hideWaitPanel();
                    console.log(e.status);
                    console.log(e.responseText);
                }

            })
        },
        ajax2: function (url, obj, successCall) {
            var params = {};
            if (obj != null) {
                params = obj;
            }
            YT.openWaitPanel();
            $.ajax({
                type: "post",
                url: url,
                data:params,
                success: function (data) {
                    successCall && successCall(data);

                    /*   if (succ != null) {
                           if (succ.indexOf("(") > 0) {
                               eval(succ);
                           } else {
                               /!* alert(succ+'('+data+')');*!/
                               // eval(succ);
                               eval(succ + "(" + JSON.stringify(data) + ")");
                           }
                       }*/
                    YT.hideWaitPanel();
                },
                error: function (e) {
                    YT.hideWaitPanel();
                    console.log(e.status);
                    console.log(e.responseText);
                }

            })
        },
        isPhoneAvailable:function(numStr) {//号码校验
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return myreg.test(numStr);
    },
    }
    window['WY'] = WY
})()