var App = {
    init: function () {
        $("#web_titlebar").css("display", "none")
        if (Fw.getParameters("phone")) {
            $("#username").val(Fw.getParameters("phone"));

        }
    }
}
App.init();