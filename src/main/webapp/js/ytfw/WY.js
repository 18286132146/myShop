(function () {
    var WY = {
        showPages: function (showPage, pages) {
            $(showPage).css("display", "block");
            for (var i = 0; i < pages.length; i++) {
                if (!showPage.is(pages[i])) {
                    pages[i].css("display", "none");
                }
            }
            $(".web-title").html(showPage.attr('title'));
        },
        ajax: function (url, obj, succ) {
            this.params = {};
            if (obj != null) {
                this.params = obj;
            }
            $.ajax({
                type: "post",
                contentType: "application/json;charset=UTF-8",
                url: url,
                data: JSON.stringify(this.params.list),
                success: function (data) {
                    if (succ != null) {
                        if (succ.indexOf("(") > 0) {
                            eval(succ);
                        } else {
                            /* alert(succ+'('+data+')');*/
                            // eval(succ);
                            eval(succ + "(" + JSON.stringify(data) + ")");
                        }
                    }
                },
                error: function (e) {
                    console.log(e.status);
                    console.log(e.responseText);
                }

            })
        }
    }
    window['WY'] = WY
})()