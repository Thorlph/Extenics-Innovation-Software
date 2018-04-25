/*
 * @Author: Liu PengHui 
 * @Date: 2018-04-10 18:09:56 
 * @Last Modified by: Liu PengHui
 * @Last Modified time: 2018-04-25 21:58:48
 */
var target = "http://47.101.33.66:8080/extenicsKnowledgeSys/";
var jumpTarget = "editKnowledge.html?id=";

window.onload=function(){
	var url = target + "managerFilesManageController/getFileWithId";
	console.log(GetQueryString("id"));
	
	$.ajax({
		type: "get",
		url:target + "managerFilesManageController/getFileWithId",
		contentType: 'application/x-www-form-urlencoded',
		async: true,
		dataType: "json",
		data: {
			"id": GetQueryString("id")

		},
		success: function (data) {

			console.log(data);
			$("#title").html(data.fileOtherMsg.fileName);//标题
			if(data.fileOtherMsg.vip){
				$("#Viptag").html("VIP知识");
			}
			
			// $("#knowleagebelong").val();//所属知识
		
			// $("#").val();//关键词
			// if (data.fileOtherMsg.fileStatus) {
			// 	$("input[name='optionsRadiosinline'][value=1]").attr("checked", true);
			// }
			// else { 
			// 	$("input[name='optionsRadiosinline'][value=0]").attr("checked", true);
			//  }
			// $("#").val();//知识简介
			$("#time").html(data.fileOtherMsg.buildingTime);
			$("#mainText").html(data.fileTextMsg);//内容
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