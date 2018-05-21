
$('#getVali').click(function(){


    $.ajax({
        url:target + "user/sendPhoneVerCode",
        method:"post",
        dataType:"json",
        async: true,
        data:{
            "phone":$('#userphone').val()
        },
        success:function(data){
            alert(data.msg);
        },
        error: function (data) {
			console.log(data);
			alert("erro");
		}
    });




});
function checkVali(){
    $.ajax({
        url:target + "user/verCode",
        method:"post",
        dataType:"json",
        async: true,
        data:{
            "verCode":$('#verCode').val(),
            "phone":$('#userphone').val()
        },
        success:function(data){
            $('#valiMsg').val(data.msg);
        },
        error: function (data) {
		
			alert("erro");
		}
    });

}
$('#resetPassword').click(function(){

    $.ajax({
        url:target + "user/resetPasswordByPhone",
        method:"post",
        dataType:"json",
        async: true,
        data:{
            "phone":$('#userphone').val(),
            "password":$('#password').val()
        },
        success:function(data){
            console.log(data.msg);
            alert(data.msg);
        },
        error: function (data) {
		
			alert("erro");
		}
    });


});