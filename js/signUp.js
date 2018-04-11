$("#signupVali").click(



    function () {

        if ($("[name='usertype']").filter(":checked").val() == 0) {
            //管理员账户注册
            // $.ajax({
            //     type: "post",
            //     url: "login/adminlogin",
            //     contentType: 'application/x-www-form-urlencoded',
            //     dataType: "json",
            //     async: true,
            //     data: {
            //         "adminaccount": $('#username').val(),
            //         "adminpassword": $('#password').val(),
            //         "validateCodeFromWeb": $('#validateCodeFromWeb').val()	//登录验证码

            //     },
            //     success: function (data) {

            //         var msg = data.msg;
            //         if (msg == null) {
            //             //没有设置信息，直接返回相应数据
            //             if (data == "fail") {
            //                 alert("请输入相应信息");
            //                 //这里写上相应的js处理
            //             } else if (data == "validateCodeFail") {
            //                 alert("验证码不正确");
            //                 $("#validateCodeImg").attr("src", "login/validateCode?data=" + new Date() + Math.floor(Math.random() * 24));
            //             }
            //         } else if (data == "success") {

            //             window.location.href = "adminIndex.html";//跳去官网
            //         } else {
            //             alert(msg);
            //         }

            //     },
            //     error: function (json) {
            //         alert("错误");
            //     }
            // });
            alert("管理员注册未完成");
        }
        else if ($("[name='usertype']").filter(":checked").val() == 1) {
            //拉取手机验证码
            $.ajax({
                url: "user/registerVerPhone",
                method: "post",
                dataType: "json",
                data: {
                    "phone": $('#userphone').val()	//用户注册填写的手机号
                },
                success: function (data) {
                    if (data.msg == "success") { alert("验证码已发送"); }
                    else { alert(data.msg) }
                },
                error: function (data) {
                    alert("错误");
                }
            });







        }
        else {
            alert("请先选择账户类型");
        }
    });


$('#signUp').click(function () {

    if ($("[name='usertype']").filter(":checked").val() == 0) { alert("管理员注册未完成"); }
    else if ($("[name='usertype']").filter(":checked").val() == 1) {
        $.ajax({
            type: "post",
            url: "user/register",
            contentType: 'application/x-www-form-urlencoded',
            dataType: "json",
            async: true,
            data: {
                "useraccount": $('#userAccount').val(),
                "userpassword": $('#password').val(),
                "username": $('#username').val(),
                "userphone": $('#userphone').val(),
                "perCode": $('#perCode').val(),	//注册验证码（防暴力提交）
                "verCode": $('#verCode').val() //手机验证码



            },
            success: function (data) {

                console.log("登陆信息:" + data);
                var msg = data.msg;
                if (msg == null) {
                    //没有设置信息，直接返回相应数据
                    if (data == "fail") {
                        alert("系统异常");
                        //这里写上相应的js处理
                    } else if (data == "validateCodeFail") {
                        alert("验证码不正确");
                        $("#validateCodeImg").attr("src", "login/validateCode?data=" + new Date() + Math.floor(Math.random() * 24));
                    }
                } else if (data == "success") {
                    alert("注册成功");
                    window.location.href = "userIndex.html";//跳去官网
                } else {
                    alert(msg);
                }

            },
            error: function (data) {
                alert("错误");
            }
        });
    }
    else {
        alert("请先选择账户类型");
    }
});