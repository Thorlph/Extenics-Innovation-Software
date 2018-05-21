

$('#searchButton').click(function () {

    $("#searchButton").attr("disabled", true);
    
    var url = target + "managerFilesManageController/searchKnowledge";
    console.log("click search button" + $("#searchInput").val());
    $('#resultHolder').html("");
    $.ajax({
        type: "get",
        url: url,
        contentType: 'application/x-www-form-urlencoded',
        async: true,
        dataType: "json",
        data: {
            "keyWords": $("#searchInput").val()

        },
        success: function (data) {
            console.log("数据长度:" + data.length);
            console.log(data);
            if (data.length != 0) {
                $ul = $("<ul></ul>");
                $span = $("<span></span>");
                $span.attr("class", "glyphicon glyphicon-usd");
                for (var i = 0; i < data.length; i++) {
                    $li = $("<li></li>");
                    $div = $("<div></div>");
                    $div.attr("class", "box");
                    $a = $("<a></a>");
                    $a.attr("href", jumpTarget + data[i].id);
                    $a.text(data[i].fileName);
                    $h6a = $("<h6></h6>");
                    $h6a.text("创建日期:" + data[i].buildingTime);
                    $h6b = $("<h6></h6>");
                    $h6b.text("修改日期:" + data[i].lastResizeTime);
                    $ul.append($li);
                    $li.append($div);
                    $div.append($a);
                    if (data[i].vip) {
                        $div.append($span);
                    }
                    $div.append($h6a);
                    $div.append($h6b);
                };
                $("#resultHolder").append($ul);
                

            }
            else {
                $("#resultHolder").html("无结果");
                
            }
            $("#searchButton").attr("disabled", false);
           
        },
        error: function (data) {
            console.log(data);
            alert("错误");
            $("#searchButton").attr("disabled", false);
           

        }
    })
});