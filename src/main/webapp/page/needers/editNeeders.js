var App = {
    neederId: 2,
    needer: null,
    isDelPic:false,
    init: function () {
        /*App.neederId= Fw.getParameters("neederId");*/
        $.post(Fw.getBasePath() + "/needers/findLoginNeeder.do", function (data) {
            App.needer = data.neederMap;
            App.showEditData(data);
        });
        if (App.neederId) {
            return
        }
    },

    showEditData: function (data) {
        //回显用户数据
        $("#name").val(App.needer.name);
        if (App.needer.sex == '0') {
            $("#boy").attr('checked', true);
        } else if (App.needer.sex == '1') {
            $("#girl").attr('checked', true);
        }

        $("#age").val(App.needer.age);
        $("#phone").val(App.needer.phone);
        $("#idCard").val(App.needer.idCard);
        $("#memo").val(App.needer.memo);
        //回显省市区
        var provinceId = App.needer.province;
        var city = App.needer.city;
        var area = App.needer.area;
        var num = area.replace(/[^0-9]/ig, "");
        var detail = area.split(num)[1];
        var basePath = Fw.getBasePath();
        if (provinceId) {
            App.findAreas('province', '0');
        }
        $("#province").change(function () {
            var proId = $("#province option:selected").val();
            App.findAreas('city', proId);
        });
        $("#city").change(function () {
            var proId = $("#city option:selected").val();
            App.findAreas('county', proId);
        });
        $("#detail").val(detail);
        var userImg = $("#userImg").attr('value');
        //alert(userImg);
        //$("#file").attr("value",basePath+"/needers/findPic?fileName="+userImg);//头像回显
        ////头像回显
        var piclist = document.getElementsByClassName('upload-piclist')[0];
        var html = document.createElement('div');
        html.className = 'upload-Picitem';
        html.innerHTML = '<img onclick="previewImg.call(this)" src=' + basePath + "/needers/findPic?fileName=" + App.needer.imgUrl + ' alt="pic">';
        piclist.appendChild(html);
    },

//初始化区县数据


    findAreas: function (grade, pid) {
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
                            if (val.id == App.needer.province) {
                                html += '<option value="' + val.id + '" selected>' + val.areaName + '</option>';
                                App.findAreas('city', val.id);
                            } else {
                                html += '<option value="' + val.id + '">' + val.areaName + '</option>';
                            }

                        })
                        $("#province").html(html);
                        break;

                    case 'city':
                        $("#city").html('');
                        var html = '<option>--请选择--</option>';
                        $.each(data, function (index, val) {
                            if (val.id == App.needer.city) {
                                html += '<option value="' + val.id + '" selected>' + val.areaName + '</option>';
                                App.findAreas('county', val.id);
                            } else {
                                html += '<option value="' + val.id + '">' + val.areaName + '</option>';
                            }
                        })
                        $("#city").html(html);
                        break;
                    case 'county':
                        $("#county").html('');
                        var html = '<option>--请选择--</option>';
                        var ar = App.needer.area.split(",");
                        $("#detail").val(ar[1]);
                        $.each(data, function (index, val) {
                            if (val.id == ar[0]) {
                                html += '<option value="' + val.id + '" selected>' + val.areaName + '</option>';
                            } else {
                                html += '<option value="' + val.id + '">' + val.areaName + '</option>';
                            }

                        });
                        $("#county").html(html);
                        break;
                }
            }
        })
    },


//提交
    submit1: function () {
        var imglist = []
        var text = document.getElementsByClassName('upload-textarea')[0].value
        var piclist = document.querySelectorAll('.upload-Picitem');
        /*	for (let i = 0; i < piclist.length; i++) {
                imglist.push(piclist[i].lastChild.src)
            }*/
        App.submit2();
    },


    submit2: function () {
        var formData = new FormData(document.getElementById("fm"));
        alert(App.isDelPic);
        formData.append('isDelPic',App.isDelPic);
        $.ajax({
            url: basePath + '/needers/editNeeders.do',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            async: false,
            success: function (data) {
                if (data.result == "success") {
                    $("#pageA").css('display', 'none');
                    $("#pageB").css('display', "block");
                } else {
                    alert("更新失败！");
                }
            }

        })
    },

    goNeederSqual: function () {
        window.location = basePath + "/needers/goNeederSqual"
    },
}

App.init();