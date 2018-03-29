


var E = window.wangEditor;
var editor = new E('#editor');
editor.customConfig.zIndex = 100;
editor.create();



var selectedFolderId;//选中文件夹id
var selectedFoldeName;//选中文件名
var confimrID;//确认选择的文件夹id


//文件夹id 测试用变量
var folderId = 0;
var fileId;



function getTreeData() {
	var list = [{ "id": 18, "folderName": "测试文件夹", "folderLevel": 2, "folderParentId": 0, "folderStatus": false, "child": [{ "id": 19, "folderName": "测试文件夹", "folderLevel": 3, "folderParentId": 18, "folderStatus": false, "child": [{ "id": 41, "folderName": "测试文件夹", "folderLevel": 4, "folderParentId": 19, "folderStatus": false, "child": [] }] }] }, { "id": 18, "folderName": "测试文件夹", "folderLevel": 2, "folderParentId": 0, "folderStatus": false, "child": [{ "id": 19, "folderName": "测试文件夹", "folderLevel": 3, "folderParentId": 18, "folderStatus": false, "child": [{ "id": 41, "folderName": "测试文件夹", "folderLevel": 4, "folderParentId": 19, "folderStatus": false, "child": [] }] }] }]
	//测试数据待替换
	return list;
}

/**
 * url参数获取函数
 * @param name 字段参数
 * @returns {null}
 * @constructor
 */
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
//页面载入
window.onload = function () {
	fileId = GetQueryString("id");
	console.log(fileId);
	$.ajax({
		type: "get",
		url: "/managerFilesManageController/addKnowledgeWithParentFolderId",
		contentType: 'application/x-www-form-urlencoded',
		async: true,
		dataType: "json",
		data: {
			"id": fileId

		},
		success: function (data) {
			alert(data);
			console.log(data);
			$("#title").val(data.fileOtherMsg.fileName);//标题
			$("#knowleagebelong").val();//所属知识
			confimrID=data.fileOtherMsg.folderId;//赋予已选择的文件夹id
			$("#").val();//关键词
			if (data.fileOtherMsg.fileStatus) {
				$("input[name='optionsRadiosinline'][value=1]").attr("checked", true);
			}
			else { 
				$("input[name='optionsRadiosinline'][value=0]").attr("checked", true);
			 }
			$("#").val();//知识简介
			editor.txt.html(data.fileTextMsg);//内容
		},
		error: function (data) {
			console.log(data);
			alert("erro");
		}
	});
}



function getTree(list) {
	// Some logic to retrieve, or generate tree structure
	var menu = new Array();//要生成的菜单数组
	for (var i = 0; i < list.length; i = i + 1) {
		console.log(list[i]);
		if (list[i].child.length != 0) {
			menu.push({
				text: list[i].folderName,
				id: list[i].id,
				nodes: getTree(list[i].child)
			});
		}
		else menu.push({
			text: list[i].folderName,
			id: list[i].id,
			state: {
				expanded: false
			}
		});



	}

	return menu;
}


$('#selectableTree').treeview({
	data: getTree(getTreeData()),
	multiSelect: $('#chk-select-multi').is(':checked'),
	onNodeSelected: function (event, node) {
		selectedFolderId = node.id;
		selectedFolderName = node.text;
	},

});
$('#selectableTree').treeview('collapseAll', { silent: true });







$(".btn2").click(function () {
	window.location.href = "allFile.html";
});
$(".btn1").click(function () {

	// 获取知识属性
	var type = document.getElementsByName("optionsRadiosinline");
	var result;
	for (var i = 0; i < type.length; i++) {
		if (type[i].checked) {
			if (type[i].value == 0) result = false;
			else result = true;
		}
	}//执行时间有问题
	console.log(editor.txt.html());
	$.ajax({
		type: "post",
		url: "/managerFilesManageController/addKnowledgeWithParentFolderId",
		contentType: 'application/x-www-form-urlencoded',
		async: true,
		dataType: "json",
		data: {
			"keyWords": $('#keyWord').val(),
			"fileName": $('#title').val(),
			"folderId": confimrID,
			"fileExplain": $('#abstract').val(),
			"vip": result,
			// "buildingTime": ,
			"file": editor.txt.html(),


		},
		success: function (data) {
			alert(data);
			console.log(data);
			window.location.href = "addSuccess.html";
		},
		error: function (data) {
			console.log(data);
			alert(data);
		}
	});
});



function confirm() {
	alert(selectedFolderId);
	var fff = document.getElementById("knowleagebelong")
	// fff.value = selectedFolderName;
	$("#knowleagebelong").val(selectedFolderName);
	confimrID = selectedFolderId;
	// 

};





