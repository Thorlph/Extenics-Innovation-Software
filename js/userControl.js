var target1 = "http://localhost:8080/esgsmanager/";
var target = "http://47.101.33.66:8080/extenicsKnowledgeSys/";
var picurl='http://47.101.33.66:8080/extenicsKnowledgeSys/images/upload';
var jumpTarget = "knowledgePage.html?id=";
    //拉取用户信息
$(document).ready(function () {
    var userId = GetQueryString("id");
    $.ajax({
        type: 'get',
        url: target1+'user/verUserToLogin',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: false,
        data:'',
        success: function (data) {
            console.log(data);
         changeUserBar(data);
          
        },
        error: function (data) {
         
        }

    });});
    function changeUserBar(data){
        $('#userBar').html("");
        $tr = $("<li></li>");
        $a = $("<a></a>");
                $a.attr("href", "javascript:void(0)");
              
        $span = $("<span></span>");
            $span.attr("class", "glyphicon glyphicon-user");
            $a.append($span);
            $a.append(data.username);
    
        
        $tr1 = $("<li></li>");
        $a1 = $("<a></a>");
        $a1.attr("href", "/logout");
        $span1 = $("<span></span>");
        $span1.attr("class", "glyphicon glyphicon-log-in");
        $a1.append($span1);
        $a1.append(" 注销");
        
        $("#userBar").append($tr);
        $tr.append($a);
        $("#userBar").append($tr1);
        $tr1.append($a1);
    }