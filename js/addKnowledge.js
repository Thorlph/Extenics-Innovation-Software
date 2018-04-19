/*
 * @Author: Liu PengHui 
 * @Date: 2018-04-10 16:41:15 
 * @Last Modified by: Liu PengHui
 * @Last Modified time: 2018-04-18 21:18:18
 */




var E = window.wangEditor;
var editor = new E('#editor');
editor.customConfig.zIndex = 100;
editor.create();



var selectedFolderId;//选中文件夹id
var selectedFoldeName;//选中文件名
var confimrID;//确认选择的文件夹id


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

/**
 * url参数获取函数
 * @param name 字段参数
 * @returns {null}
 * @constructor
 */
function getParameterByName(paramName) {
	var args = new Object();
	var argsStr = decodeURI(location.search);  //获取URL参数字符串
	if (argsStr.length > 0) {
		argsStr = argsStr.substring(1);
		var nameValueArr = argsStr.split("&");  //多参数
		for (var i = 0; i < nameValueArr.length; i++) {
			var pos = nameValueArr[i].indexOf('=');
			if (pos == -1) continue; //如果没有找到就跳过
			var argName = nameValueArr[i].substring(0, pos); //提取name
			var argVal = nameValueArr[i].substring(pos + 1); //提取value
			args[argName] = unescape(argVal);
		}
		return args[paramName];
	}
	}



//文件夹id 测试用变量
var folderId = 1;

window.onload = function () {

	fullrefresh(0);
	$("#knowleagebelong").val(getParameterByName("currentFolderName"));
	confimrID=getParameterByName("currentFolder");

}

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
		url: "managerFolderManageController/getAllFolders",
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
			alert("文件名"+selectedFoldeName);
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


$(".btn2").click(function () {
	window.location.href = "adminIndex.html";
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
	alert("提交时选择的文件id为" + confimrID);
	console.log(editor.txt.html());
	$.ajax({
		type: "post",
		url: "managerFilesManageController/addKnowledgeWithParentFolderId",
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
			alert("成功:" + data);
			console.log(data);
			window.location.href = "addSuccess.html";
		},
		error: function (data) {
			alert("失败");
			console.log(data);

		}
	});
});

$("#folderSelected").click(function () {

	alert("确认选中的文件夹id:" + selectedFolderId);

	$("#knowleagebelong").val(selectedFoldeName);
	confimrID = selectedFolderId;
});





