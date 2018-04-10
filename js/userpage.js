/*
 * @Author: Liu PengHui 
 * @Date: 2018-03-07 16:44:36 
 * @Last Modified by: Liu PengHui
 * @Last Modified time: 2018-03-23 21:42:24
 */

var testdata = {
    "code": 0,
    "message": "成功",
    "data": [
        {
            "id": 2,
            "userId": 1,
            "favoriteFileId": 1,
            "favoriteFileName": "收藏夹一"
        },
        {
            "id": 3,
            "userId": 1,
            "favoriteFileId": 1,
            "favoriteFileName": "收藏夹二"
        },
        {
            "id": 4,
            "userId": 1,
            "favoriteFileId": 1,
            "favoriteFileName": "收藏夹一"
        },
        {
            "id": 5,
            "userId": 1,
            "favoriteFileId": 1,
            "favoriteFileName": "收藏夹一"
        },
        {
            "id": 6,
            "userId": 1,
            "favoriteFileId": 1,
            "favoriteFileName": "我叫收藏夹"
        },
        {
            "id": 7,
            "userId": 1,
            "favoriteFileId": 1,
            "favoriteFileName": "我叫收藏夹"
        },
        {
            "id": 8,
            "userId": 1,
            "favoriteFileId": 5,
            "favoriteFileName": "ASA"
        }
    ]
}
    ;
$(document).ready(function () {
    var userId = GetQueryString("id");
    var url = "feedbackD";

    $.ajax({
        type: 'get',
        url: '/extenicsKnowledgeSys/Feedback/getFeedbackList',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: false,
        data: userId,
        success: function (data) {
            console.log(data);
            var str = $('#feedBackList').html();
            for (var i = 0; i < data.data.length; i++) {
                var feedBack;
                if (data.data[i].feedbackStatus = 1) feedBack = "审核通过";
                else if (data.data[i].feedbackStatus = 0) feedBack = "审核通过";
                else feedBack = "未审核";
                str += '<li> <a href=feedbackD.html?id=' + data.data.data[i].id + '>'
                    + data.data.data[i].feedbackName
                    + ' '
                    + feedBack
                    + '</a>'
                    + '</li>';/*发放单编号*/
            }
            $('#table').html(str);

        }
    })
    /**
     * 收藏夹拉取
     */

    $.ajax({
        type: 'get',
        url: '/extenicsKnowledgeSys/FavoriteFile/getFavoriteFile',
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        async: false,
        data: userId,
        success: function (data) {
            console.log("收藏夹数据");
            console.log(data);
            alert("收藏夹数据拉取成功");
            formList(data);
          
        },
        error: function (data) {
            alert("收藏夹数据拉取失败");
            formList(testdata);
        }

    })

})

/**
 * url参数获取函数
 * @param name
 * @returns {null}
 * @constructor
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function formList(data) {
    console.log(data);
    var str="";
    for (var i = 0; i < data.data.length; i++) {
      
        str =str+ '<li> <a href=feedbackD.html?id=' + data.data[i].favoriteFileId + '>'
            + data.data[i].favoriteFileName
        
            + '</a>'
            + '</li>';/*发放单编号*/
    }
    $('#favorite').html(str);
}