/*
 * @Author: Liu PengHui 
 * @Date: 2018-03-29 18:55:58 
 * @Last Modified by:   Liu PengHui 
 * @Last Modified time: 2018-03-29 18:55:58 
 */

window.onload=function(){

	$.ajax({
		type: "get",
		url: "/managerFilesManageController/getFileWithId",
		contentType: 'application/x-www-form-urlencoded',
		async: true,
		dataType: "json",
		data: {
			"id": GetQueryString("id")

		},
		success: function (data) {
			alert(data);
			console.log(data);
			$("#title").val(data.fileOtherMsg.fileName);//标题
			// $("#knowleagebelong").val();//所属知识
			confimrID=data.fileOtherMsg.folderId;//赋予已选择的文件夹id
			// $("#").val();//关键词
			// if (data.fileOtherMsg.fileStatus) {
			// 	$("input[name='optionsRadiosinline'][value=1]").attr("checked", true);
			// }
			// else { 
			// 	$("input[name='optionsRadiosinline'][value=0]").attr("checked", true);
			//  }
			// $("#").val();//知识简介
			$("#mainText").val(data.fileTextMsg);//内容
		},
		error: function (data) {
			console.log(data);
			alert("erro");
		}
	});






}

function jump(){
    window.location.href="./editKnowledge.html?id="+GetQueryString("id"); 
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