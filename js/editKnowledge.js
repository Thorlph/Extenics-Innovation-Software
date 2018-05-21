/*
 * @Author: Liu PengHui 
 * @Date: 2018-03-29 18:55:47 
 * @Last Modified by: Liu PengHui
 * @Last Modified time: 2018-05-21 17:32:33
 */

var E = window.wangEditor;
var editor = new E('#editor');
editor.customConfig.uploadImgServer = picurl;
editor.customConfig.uploadFileName = 'file';
editor.customConfig.zIndex = 100;
editor.customConfig.debug = true
editor.create();
var list = [
	{
		"id": 18,
		"folderName": "测试文件夹",
		"folderLevel": 2,
		"folderParentId": 0,
		"folderStatus": false,
		"child": [
			{
				"id": 19,
				"folderName": "测试文件夹",
				"folderLevel": 3,
				"folderParentId": 18,
				"folderStatus": false,
				"child": [
					{
						"id": 41,
						"folderName": "测试文件夹",
						"folderLevel": 4,
						"folderParentId": 19,
						"folderStatus": false,
						"child": [

						]
					}
				]
			}
		]
	},
	{
		"id": 18,
		"folderName": "测试文件夹",
		"folderLevel": 2,
		"folderParentId": 0,
		"folderStatus": false,
		"child": [
			{
				"id": 19,
				"folderName": "测试文件夹",
				"folderLevel": 3,
				"folderParentId": 18,
				"folderStatus": false,
				"child": [
					{
						"id": 41,
						"folderName": "测试文件夹",
						"folderLevel": 4,
						"folderParentId": 19,
						"folderStatus": false,
						"child": [

						]
					}
				]
			}
		]
	}
];


var selectedFolderId;//选中文件夹id
var selectedFoldeName;//选中文件名
var confimrID;//确认选择的文件夹id


//文件夹id 测试用变量
var folderId = 0;
var fileId;



function fullrefresh(folderId) {
	getTreeSource();
	refresh();
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
			state: {
				expanded: false
			}
		});



	}

	return menu;
}

function refresh() {

	$('#selectableTree').treeview({
		data: list,
		multiSelect: $('#chk-select-multi').is(':checked'),
		onNodeSelected: function (event, node) {
			alert("选择的文件夹id为" + node.id)
			console.log(node);
			selectedFoldeName = node.text;
			selectedFolderId = node.id;
			alert("文件名" + selectedFoldeName);
			alert(selectedFolderId);


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
	fullrefresh(0);
	fileId = GetQueryString("id");
	console.log(fileId);
	$.ajax({
		type: "get",
		url:target + "managerFilesManageController/getFileWithId",
		contentType: 'application/x-www-form-urlencoded',
		async: false,
		dataType: "json",
		data: {
			"id": fileId

		},
		success: function (data) {
			alert("数据抓取成功");
			console.log(data);
			$("#title").val(data.fileOtherMsg.fileName);//标题
			$("#knowleagebelong").val(data.fileOtherMsg.folderName);//所属知识
			confimrID = data.fileOtherMsg.folderId;//赋予已选择的文件夹id
			var keyWord = data.fileOtherMsg.keyWords[0];
			for (var i = 1; i < data.fileOtherMsg.keyWords.length; i = i + 1) {
				keyWord = keyWord+"," + data.fileOtherMsg.keyWords[i];
			}
			$("#keyWord").val(keyWord);//关键词
			if (data.fileOtherMsg.vip) {
				$("input[name='optionsRadiosinline'][value=1]").attr("checked", true);
			}
			else {
				$("input[name='optionsRadiosinline'][value=0]").attr("checked", true);
			}
			$("#abstract").val(data.fileOtherMsg.fileExplain);//知识简介
			editor.txt.html(data.fileTextMsg);//内容
		},
		error: function (data) {
			console.log(data);
			alert("拉取知识信息失败");
		}
	});
}











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
		url:target + "managerFilesManageController/updateKnowledgeWithFileId",
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
			"id": fileId

		},
		success: function (data) {
			alert("修改成功");
			console.log(data);
			window.location.href = "addSuccess.html";
		},
		error: function (data) {
			console.log(data);
			alert(data);
		}
	});
});






$("#folderSelected").click(function () {

	alert("确认选中的文件夹id:" + selectedFolderId);

	$("#knowleagebelong").val(selectedFoldeName);
	confimrID = selectedFolderId;
});



