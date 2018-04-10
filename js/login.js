var username
var usernameMsg
var password
var passwordMsg

window.onload = function () {
    username = document.getElementById("username");
    usernameMsg = document.getElementById("usernameMsg");
    password = document.getElementById("password");
    passwordMsg = document.getElementById("passwordMsg");

}

function checkform() {

    var checkedusername = checkUsername();
    var checkedpassword = checpassword();
    return checkedusername && checkedpassword;
}
function checkUsername() {

    var regex = /^[a-zA-Z_]\w{0,9}$/;
    var value = username.value;
    var msg;
    if (!value) {
        msg = "用户名不能为空";
        usernameMsg.title = msg;
        return false;
    }
    else if (!regex.test(value)) {
        msg = "用户名不合法";
        usernameMsg.title = msg;
        usernameMsg.style.color = "red";
        return false;
    }
    else {
        msg = "格式正确";
        usernameMsg.title = msg;
        usernameMsg.style.color = "white";
        return true;
    }


}


function checpassword() {
    var regex = /^.{6,16}$/;
    var value = password.value;
    var msg = "";
    if (!value) {
        msg = "密码必须填写";
        passwordMsg.title = msg;
        passwordMsg.style.color = "red";
        return false;
    }
    else if (!regex.test(value)) {
        msg = "密码不合法";
        passwordMsg.title = msg;
        passwordMsg.style.color = "red";
        return false;
    }
    else {
        msg = "";
        passwordMsg.title = msg;
        passwordMsg.style.color = "white";
        return true;
    }
}
$("#changecode").click(function () {
    //更改验证码代码
    $("#validateCodeImg").attr("src", "login/validateCode?data=" + new Date() + Math.floor(Math.random() * 24));
});


$("#login").click(



    function () {
        console.log($("[name='usertype']").filter(":checked").val());
        if ($("[name='usertype']").filter(":checked").val() == 0) {
            $.ajax({
                type: "post",
                url: "login/adminlogin",
                contentType: 'application/x-www-form-urlencoded',
                dataType: "json",
                async: true,
                data: {
                    "adminaccount": $('#username').val(),
                    "adminpassword": $('#password').val(),
                    "validateCodeFromWeb": $('#validateCodeFromWeb').val()	//登录验证码

                },
                success: function (data) {

                    var msg = data.msg;
                    if (msg == null) {
                        //没有设置信息，直接返回相应数据
                        if (data == "fail") {
                            alert("请输入相应信息");
                            //这里写上相应的js处理
                        } else if (data == "validateCodeFail") {
                            alert("验证码不正确");
                            $("#validateCodeImg").attr("src", "login/validateCode?data=" + new Date() + Math.floor(Math.random() * 24));
                        }
                    } else if (data == "success") {
                        window.location.href = "adminIndex.html";//跳去官网
                    } else {
                        alert(msg);
                    }

                },
                error: function (json) {
                    alert("错误");
                }
            });
        }
        else if($("[name='usertype']").filter(":checked").val() == 1){
            $.ajax({
                type: "post",
                url: "login/adminlogin",
                contentType: 'application/x-www-form-urlencoded',
                dataType: "json",
                async: true,
                data: {
                    "useraccount": $('#username').val(),
                    "userpassword": $('#password').val(),
                    "validateCodeFromWeb": $('#validateCodeFromWeb').val()	//登录验证码

                },
                success: function (data) {

                    var msg = data.msg;
                    if (msg == null) {
                        //没有设置信息，直接返回相应数据
                        if (data == "fail") {
                            alert("请输入相应信息");
                            //这里写上相应的js处理
                        } else if (data == "validateCodeFail") {
                            alert("验证码不正确");
                            $("#validateCodeImg").attr("src", "login/validateCode?data=" + new Date() + Math.floor(Math.random() * 24));
                        }
                    } else if (data == "success") {
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
        else{
            alert("登陆账户类型错误");
        }
    });
