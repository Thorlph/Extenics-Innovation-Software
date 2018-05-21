/*
 * @Author: Liu PengHui 
 * @Date: 2018-04-10 16:41:31 
 * @Last Modified by: Liu PengHui
 * @Last Modified time: 2018-05-21 17:32:10
 */



var list = [{ "id": 18, "folderName": "testtttt", "folderLevel": 2, "folderParentId": 0, "folderStatus": false, "child": [{ "id": 19, "folderName": "@@@@测试文件夹", "folderLevel": 3, "folderParentId": 18, "folderStatus": false, "child": [{ "id": 41, "folderName": "@@@@测试文件夹", "folderLevel": 4, "folderParentId": 19, "folderStatus": false, "child": [] }] }, { "id": 64, "folderName": "ccc", "folderLevel": 4, "folderParentId": 18, "folderStatus": false, "child": [] }, { "id": 67, "folderName": "xxx", "folderLevel": 4, "folderParentId": 18, "folderStatus": false, "child": [] }, { "id": 68, "folderName": "x123", "folderLevel": 4, "folderParentId": 18, "folderStatus": false, "child": [] }, { "id": 69, "folderName": "x1234", "folderLevel": 5, "folderParentId": 18, "folderStatus": false, "child": [] }] }, { "id": 43, "folderName": "123", "folderLevel": 1, "folderParentId": 0, "folderStatus": true, "child": [] }, { "id": 44, "folderName": "456777777", "folderLevel": 1, "folderParentId": 0, "folderStatus": false, "child": [] }, { "id": 45, "folderName": "456zxasfdfasdsqdqweqwe", "folderLevel": 1, "folderParentId": 0, "folderStatus": true, "child": [] }, { "id": 46, "folderName": "abcdefg", "folderLevel": 1, "folderParentId": 0, "folderStatus": false, "child": [] }, { "id": 47, "folderName": "66666", "folderLevel": 1, "folderParentId": 0, "folderStatus": false, "child": [] }, { "id": 48, "folderName": "444444", "folderLevel": 3, "folderParentId": 0, "folderStatus": false, "child": [] }, { "id": 49, "folderName": "677777", "folderLevel": 3, "folderParentId": 0, "folderStatus": true, "child": [] }, { "id": 50, "folderName": "4444", "folderLevel": 1, "folderParentId": 0, "folderStatus": false, "child": [] }, { "id": 51, "folderName": "444", "folderLevel": 1, "folderParentId": 0, "folderStatus": false, "child": [] }, { "id": 52, "folderName": "testtt", "folderLevel": 1, "folderParentId": 0, "folderStatus": false, "child": [] }, { "id": 53, "folderName": "aaaa", "folderLevel": 1, "folderParentId": 0, "folderStatus": true, "child": [] }, { "id": 63, "folderName": "ccc", "folderLevel": 3, "folderParentId": 0, "folderStatus": false, "child": [] }, { "id": 65, "folderName": "ccc2", "folderLevel": 2, "folderParentId": 0, "folderStatus": false, "child": [] }, { "id": 66, "folderName": "ccc2", "folderLevel": 2, "folderParentId": 0, "folderStatus": true, "child": [] }];

var fileList = { "folders": [{ "id": 19, "folderName": "@@@@测试文件夹", "folderStatus": false, "child": [] }], "files": [{ "id": 1, "fileName": "文件名", "folderId": 18, "fileExplain": "这是一段文件的简述", "fileStatus": false, "vip": false, "lastResizeTime": "Jan 16, 2018 12:00:00 AM" }, { "id": 16, "fileName": "aaa", "folderId": 18, "fileStatus": false, "vip": false }] };
var currentFolderLevel = 1;
var currentFolder = 1;
var currentFolderName = "根目录";
var selectedFolderForMove;
var nodeid;
var treeformove;
window.onload = function () {
    alert("onoload");
    fullrefresh("1");
}


function fullrefresh(folderId) {
    getTreeSource();
    refresh();
    refreshfileList(folderId);
}

function refreshButton() {
    fullrefresh(currentFolder);
}


/**
 * 拉取文件夹列表
 */
function getTreeSource() {

    $.ajax({
        type: "get",
        url:target + "managerFolderManageController/getAllFolders",
        data: "",
        dataType: "json",
        async: false,
        success: function (data) {
            alert("loadFolderTreeSuccess");
            list = data;

            list = getTree(list);


        },
        error: function (data) {
            alert("拉取文件树列表失败,调用测试数据");

            list = getTree(list);

        }
    });
}
/**
 * 设置文件夹树所用的数据
 * @param {*} list 待转化的文件夹对象串
 */
function getTree(list) {
    // Some logic to retrieve, or generate tree structure
    var menu = new Array();//要生成的菜单数组
    for (var i = 0; i < list.length; i = i + 1) {
        console.log(list[i]);
        if (list[i].child.length != 0) {
            menu.push({
                text: list[i].folderName,
                id: list[i].id,
                folderLevel: list[i].folderLevel,
                folderParentId: list[i].folderParentId,
                nodes: getTree(list[i].child)
            });
        }
        else menu.push({
            text: list[i].folderName,
            id: list[i].id,
            folderLevel: list[i].folderLevel,
            folderParentId: list[i].folderParentId,
            state: {
                expanded: false
            }
        });



    }
    console.log("菜单格式");
    console.log(menu);

    return menu;
}

//   function insertChild(parent) {
//     var node = new Array();
//     for (var i = 0; i < parent.length; i = i + 1) {

//         if (parent[i].child != null) {
//             node.push({
//                 text: parent[i].folderName,
//                 id:parent[i].id,
//                 nodes: insertChild(parent[i].child)
//             });
//         }
//         node.push({
//             text: parent[i].folderName,
//             id:parent[i].id
//         });

//     }
//     return node;
// }

/**
 * 生成文件列表()点击文件夹打开该文件夹的功能未完成
 * @param {*} parent 
 */

function buildList(fileList) {
    console.log(fileList);

    $('#list').html("");
    if (fileList.folders.length != 0) {
        for (var i = 0; i < fileList.folders.length; i = i + 1) {
            $tr = $("<tr></tr>");
            $td = $("<td></td>");
            $td.attr("class", "tableLeft");
            $div = $("<div></div>");
            $input = $("<input>");
            $input.attr("type", "radio");
            $input.attr("name", "item");
            $input.attr("class", "ck folder");
            $input.attr("value", fileList.folders[i].id);
            $img = $("<img>");
            if (fileList.folders[i].folderStatus) { $img.attr("src", "./images/folderDeleted.png"); }
            else $img.attr("src", "./images/folder.png");
            $img.attr("alt", "文件夹")
            $a = $("<a></a>");
            $a.attr("href", "javascript:void(0)");
            $a.attr("onclick", "refreshfileList(" + fileList.folders[i].id + ")");
            $a.text(fileList.folders[i].folderName);
            $td1 = $("<td></td>");
            $td1.attr("class", "tableRight");
            $td1.text("");
            $("#list").append($tr);
            $div.append($input);
            $div.append($img);
            $div.append($a);
            $td.append($div);
            $tr.append($td);
            $tr.append($td1);

        }
    }
    if (fileList.files.length != 0) {
        for (var i = 0; i < fileList.files.length; i = i + 1) {
            $tr = $("<tr></tr>");
            $td = $("<td></td>");
            $td.attr("class", "tableLeft");
            $div = $("<div></div>");
            $input = $("<input>");
            $input.attr("type", "radio");
            $input.attr("name", "item");
            $input.attr("class", "ck file");
            $input.attr("value", fileList.files[i].id);
            $img = $("<img>");
            if (fileList.files[i].fileStatus) $img.attr("src", "./images/filesDeleted.png");
            else $img.attr("src", "./images/files.png");
            $img.attr("alt", "文件");
            $a = $("<a></a>");
            $a.attr("href", "./editKnowledge.html?id=" + fileList.files[i].id)
            $a.text(fileList.files[i].fileName);
            $td1 = $("<td></td>");
            $td1.attr("class", "tableRight");
            $td1.text(fileList.files[i].lastResizeTime);
            $("#list").append($tr);
            $div.append($input);
            $div.append($img);
            $div.append($a);
            $td.append($div);
            $tr.append($td);
            $tr.append($td1);

        }
    }

}




/**创建文件夹
 * 
 */
function createFolder() {
    var tmp = currentFolderLevel + 1
    $.ajax({
        type: "post",
        url:target + "managerFolderManageController/addFolder",
        contentType: 'application/x-www-form-urlencoded',
        async: true,
        dataType: "json",
        data: {
            "folderName": $('#newFolderName').val(),
            "folderLevel": tmp,
            "folderParentId": currentFolder
        },
        success: function (data) {
            console.log(data);
            alert("创建成功");
            fullrefresh(currentFolder);
        },
        error: function (data) {
            console.log(data);
            alert("error");

        }
    })
}

/**修改
 * 
 */
function edit() {

    if ($("input[class='ck file']:checked").val() != null) {
        //选择为文件

        window.open("./editKnowledge.html?id=" + $("input[class='ck file']:checked").val());

    }
    else if ($("input[class='ck folder']:checked").val() != null) {
        alert("选中文件夹");
        $('#myModal1').modal('show');
        $('#editedName').val($("input[class='ck folder']:checked").siblings("a").text());

    }
    else {
        alert("未选中任何对象");
    }



}
/**刷新右侧文件列表
 * 
 */
function refreshfileList(id) {
    $.ajax({
        type: "get",
        url:target + "managerFilesManageController/showAllFilesByParentId",
        contentType: 'application/x-www-form-urlencoded',
        async: true,
        dataType: "json",
        data: {
            "id": id,
            "tempPara": Math.random()
        },
        success: function (data) {
            console.log(data);
            alert("拉取文件夹下的数据成功");
            var tree = $('#selectableTree');
            buildList(data);//生成列表，测试用位置 //buildList应调用位置
        },
        error: function (data) {
            console.log(data);

            alert("拉取文件夹下的数据失败,调用测试数据");
            buildList(fileList);//生成列表，测试用位置 //buildList应调用位置
        }
    });
}
/**
* 设置/刷新文件夹列表
*/
function refresh() {
    treeformove = list;
    $('#selectableTree').treeview({
        data: list,
        multiSelect: $('#chk-select-multi').is(':checked'),
        onNodeSelected: function (event, node) {


            currentFolderLevel = node.folderLevel;
            currentFolder = node.id;
            currentFolderName = node.text;
            refreshfileList(node.id);

            if (node.state.expanded) {
                //折叠  
                $('#selectableTree').treeview('collapseNode', [node.nodeId, { silent: true, ignoreChildren: true }]);
            } else {
                //展开  
                $('#selectableTree').treeview('expandNode', [node.nodeId, { silent: true, ignoreChildren: true }]);

            }


        }


    });
    $('#selectableTree').treeview('collapseAll', { silent: true });


    /**
     * 设置移动文件夹的树
     */
    $('#TreeForMove').treeview({
        data: treeformove,
        multiSelect: $('#chk-select-multi').is(':checked'),
        onNodeSelected: function (event, node) {
            alert(node.id);


            selectedFolderForMove = node.id;


            $('#TreeForMove').treeview('expandNode', node);
        },

    });
    $('#TreeForMove').treeview('collapseAll', { silent: true });
}

/**
 * 修改文件夹名称
 */
function editFolder() {
    $.ajax({
        type: "post",
        url:target + "managerFolderManageController/updateFolder",
        contentType: 'application/x-www-form-urlencoded',
        async: true,
        dataType: "json",
        data: {
            "folderName": $('#editedName').val(),
            "id": $("input[class='ck folder']:checked").val()

        },
        success: function (data) {
            console.log(data);
            alert("修改成功");
            fullrefresh(currentFolder);
        },
        error: function (data) {
            console.log(data);
            alert("error");

        }
    })
}



/**移动
 * 
 */
function move() {

    if ($("input[class='ck folder']:checked").val() != null) {
        alert("选中文件夹");
        $('#move').modal('show');


    }
    else if ($("input[class='ck file']:checked").val() != null) {

        alert("选中文件");
        $('#move').modal('show');
    }
    else {
        alert("请选择文件夹");
    }
}







/**
 * 移动文件
 */

$("#folderSelected").click(function () {

    alert("确认选中的id:" + selectedFolderForMove);


    if ($("input[class='ck folder']:checked").val() != null) {
        $.ajax({
            type: "get",
            url:target + "managerFolderManageController/moveFolder",
            contentType: 'application/x-www-form-urlencoded',
            async: true,
            dataType: "json",
            data: {
                "newParentId": selectedFolderForMove,
                "id": $("input[class='ck folder']:checked").val()

            },
            success: function (data) {
                console.log(data);
                alert("移动成功");
                fullrefresh(currentFolder);

            },
            error: function (data) {
                console.log(data);
                alert("移动失败");

            }
        })
    }
    else if ($("input[class='ck file']:checked").val() != null) {
        $.ajax({
            type: "post",
            url:target + "managerFilesManageController/updateKnowledgeWithFileId",
            contentType: 'application/x-www-form-urlencoded',
            async: true,
            dataType: "json",
            data: {
                "id": $("input[class='ck file']:checked").val(),
                "folderId": selectedFolderForMove,
            },
            success: function (data) {
                console.log(data);
                alert("移动成功");
                fullrefresh(currentFolder);

            },
            error: function (data) {
                console.log(data);
                alert("移动失败");

            }
        })

    }
    else alert("请选择对象");
});


/**
 * 删除按钮
 */
$('#delete').click(function () {
    if ($("input[class='ck file']:checked").val() != null) {
        //选择为文件
        alert("选中文件,id为" + $("input[class='ck file']:checked").val());
        $.ajax({
            type: "post",
            url:target + "managerFilesManageController/updateKnowledgeWithFileId",
            contentType: 'application/x-www-form-urlencoded',
            async: true,
            dataType: "json",
            data: {
                "id": $("input[class='ck file']:checked").val(),
                "fileStatus": true
            },
            success: function (data) {
                console.log(data);
                alert("该知识已被删除");
                fullrefresh(currentFolder);

            },
            error: function (data) {
                console.log(data);
                alert("error");

            }
        })

    }
    else if ($("input[class='ck folder']:checked").val() != null) {
        alert("选中文件夹,id为" + $("input[class='ck folder']:checked").val());
        $.ajax({
            type: "post",
            url:target + "managerFolderManageController/deleteFolderById",
            contentType: 'application/x-www-form-urlencoded',
            async: true,
            dataType: "json",
            data: {
                "id": $("input[class='ck folder']:checked").val()
            },
            success: function (data) {

                alert("该文件夹已被删除");
                fullrefresh(currentFolder);
            },
            error: function (data) {
                console.log(data);

                alert("错误");

            }
        })
    }
    else {
        alert("未选中任何对象");
    }


}

);

function realDelete() {
    if ($("input[class='ck folder']:checked").val() != null) {
        var exist = $("input[class='ck folder']:checked").next("img")[0].src;
        if (exist.indexOf("folderDeleted") != -1) {
            alert("选中被删除的文件夹");
            $.ajax({
                type: "post",
                url:target + "managerFolderManageController/deleteFolderByIdWithReal",
                contentType: 'application/x-www-form-urlencoded',
                async: true,
                dataType: "json",
                data: {
                    "id": $("input[class='ck folder']:checked").val()
                },
                success: function (data) {

                    alert("该文件夹已被彻底删除");
                    fullrefresh(currentFolder);
                },
                error: function (data) {
                    console.log(data);

                    alert("错误");

                }
            })


        }
    }
    else if ($("input[class='ck file']:checked").val() != null) {
        var exist = $("input[class='ck file']:checked").next("img")[0].src;
        if (exist.indexOf("filesDeleted") != -1) {

            alert("选中被删除的文件");
            $.ajax({
                type: "post",
                url:target + "managerFilesManageController/deleteKnowledgeWithFileId",
                contentType: 'application/x-www-form-urlencoded',
                async: true,
                dataType: "json",
                data: {
                    "id": $("input[class='ck file']:checked").val()
                },
                success: function (data) {

                    alert("该文件已被彻底删除");
                    fullrefresh(currentFolder);
                },
                error: function (data) {
                    console.log(data);

                    alert("错误");

                }
            })
        }
    }
    else {
        alert("请选择被删除后的文件或文件夹");
    }
}

function resume() {
    if ($("input[class='ck folder']:checked").val() != null) {
        var exist = $("input[class='ck folder']:checked").next("img")[0].src;
        if (exist.indexOf("folderDeleted") != -1) {
            alert("选中被删除的文件夹");
            $.ajax({
                type: "get",
                url:target + "managerFolderManageController/recoverFolderByFolderId",
                contentType: 'application/x-www-form-urlencoded',
                async: true,
                dataType: "json",
                data: {
                    "id": $("input[class='ck folder']:checked").val()
                },
                success: function (data) {

                    alert("该文件夹已被恢复");
                    fullrefresh(currentFolder);
                },
                error: function (data) {
                    console.log(data);

                    alert("错误");

                }
            })


        }
    }
    else if ($("input[class='ck file']:checked").val() != null) {
        var exist = $("input[class='ck file']:checked").next("img")[0].src;
        if (exist.indexOf("filesDeleted") != -1) {

            alert("选中被删除的文件");

            $.ajax({
                type: "get",
                url:target + "managerFilesManageController/getParentStatus",
                contentType: 'application/x-www-form-urlencoded',
                async: true,
                dataType: "json",
                data: {
                    "id": $("input[class='ck file']:checked").val()
                },
                success: function (data) {
                    if (!data) {
                        $.ajax({
                            type: "post",
                            url:target + "managerFilesManageController/updateKnowledgeWithFileId",
                            contentType: 'application/x-www-form-urlencoded',
                            async: true,
                            dataType: "json",
                            data: {
                                "id": $("input[class='ck file']:checked").val(),
                                "fileStatus": false
                            },
                            success: function (data) {
            
                                alert("该文件已被恢复");
                                fullrefresh(currentFolder);
                            },
                            error: function (data) {
                                console.log(data);
            
                                alert("错误");
            
                            }
                        })
                    }
                    else{alert("该文件父文件夹已被删除，要恢复此文件请先恢复父文件夹");}
                },
                error: function (data) {
                    console.log(data);

                    alert("错误");

                }
            })

        }
    }
    else {
        alert("请选择被删除后的文件或文件夹");
    }
}



$("#newKnowledge").click(function () {
    window.location.href = "addKnowledge.html" + "?currentFolder=" + currentFolder + "&currentFolderName=" + encodeURI(currentFolderName);

});