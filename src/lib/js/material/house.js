/**
	物料管理:仓库信息  
 */

	//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
		      getcompleteInfo();
		     
   });

	  	   	
	   	function getcompleteInfo(){
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   				pagination:{
	   					rows:limitAllAppoint,
	   					page:startAllAppoint,
	   					sord:"asc",
	   					sidx:"ID"
	   					},
	   					queryJson:{}})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_warehouse/GetPageListJsonToken"
	   			,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
					   }	   			
	   			,success:function(data,status){	
	   				layui.use(['table','layedit','form','layer','laypage'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象
				  	  	  
					  //展示已知数据
					  laypage.render({
						    elem: 'Mater_house_paged'
						    ,count:data.resultdata.records //数据总数
						    ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						    ,jump: function(obj){
						    	firstIndex=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: JSON.stringify({
					   				pagination:{
					   					rows:obj.limit,
					   					page:firstIndex,
					   					sord:"asc",
					   					sidx:"ID"
					   					},
					   					queryJson:{}})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_warehouse/GetPageListJsonToken"
					   			,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }	
					   			,success:function(data,status){
					   				table.render({
									    elem: '#Mater_house'
									     ,cols: [[
									       {field:'ID', title: '仓库ID', sort: true, align:'center'}	
									      ,{field:'Name', title: '仓库名称', align:'center'}
//									      ,{field:'Remark', title: '仓库描述',align:'center'}
//									      ,{field:'WarehouserTypeID', title: '仓库类别ID',align:'center'}
									      ,{field:'CreateDate', title: '创建时间', align:'center'}
//									      ,{field:'CreateUserId', title: '创建者ID', align:'center'}
//									      ,{field:'CreateUserName', title: '创建者名称', align:'center'}
//									      ,{field:'ModifyDate', title: '修改时间', align:'center'}
//									      ,{field:'ModifyUserId', title: '修改者ID', align:'center'}
//									      ,{field:'ModifyUserName', title: '修改者名字', align:'center'}

									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,limit:obj.limit
									    ,data: data.resultdata.rows
										,height: 'full-250'										
							  });
					   		}
					    }) 
			          }
				   });
				});
	   		}
	   	});
};