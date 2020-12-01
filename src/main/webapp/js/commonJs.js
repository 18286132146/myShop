var ajax = function (url, obj, succ) {
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
            if(succ!=null){
                if(succ.indexOf("(")>0){
                    eval(succ);
                }else{
                   /* alert(succ+'('+data+')');*/
                   // eval(succ);
                    eval(succ+"("+JSON.stringify(data)+")");
                }
            }
        },
        error: function (e) {
            console.log(e.status);
            console.log(e.responseText);
        }

    })
}

var WY={}