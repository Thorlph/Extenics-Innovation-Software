var target = "http://47.101.33.66:8080/extenicsKnowledgeSys/";
$('#resetPassword').click(function(){
    $.ajax({
        url:target + "user/resetPassword",
        method:"post",
        dataType:"json",
        data:{
            "userId": $.session.get('userid'),	//用户id（这里的id是加密过的）
            "account":  $.session.get('account'),//用户帐号
            "password":$('#newPassword').val()//用户密码
        },
        success:function(data){
            console.log(data.msg);
        },   
        error:function(data){
            console.log(data);
            alert("erro");
        }
    });


});