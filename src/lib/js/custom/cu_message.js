/**
	客户管理:客户信息  
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
	   			,url:layui.setter.Test_url+"/WMSManage/wms_customer/GetPageListJsonToken"
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
						    elem: 'Custome_paged'
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
					   			,url:layui.setter.Test_url+"/WMSManage/wms_customer/GetPageListJsonToken"
					   			 ,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }	
					   			,success:function(data,status){
					   				table.render({
									    elem: '#Custome'
									     ,cols: [[
//									       {field:'ID', title: '客户ID', sort: true, align:'center'}	
									       {field:'NO', title: '客户编号',width:160, align:'center'}
									      ,{field:'Name', title: '客户名称',width:250,align:'center'}
									      ,{field:'Tel', title: '联系电话',width:120,align:'center'}
									      ,{field:'Type', title: '客户类型', align:'center'}
									      ,{field:'Remark', title: '备注', align:'center'}
									      ,{field:'SiteID', title: '客户简介', align:'center'}
									      ,{field:'Reference', title: '类型名称', align:'center'}
									      ,{field:'Address', title: '地址', align:'center'} 
//									      ,{field:'CreateDate', title: '创建时间', align:'center'}
//									      ,{field:'CreateUserId', title: '创建者ID', align:'center'}
//									      ,{field:'CreateUserName', title: '创建者名称', align:'center'}
//									      ,{field:'ModifyDate', title: '修改时间', align:'center'}
//									      ,{field:'ModifyUserId', title: '修改者ID', align:'center'}
//									      ,{field:'ModifyUserName', title: '修改者名字', align:'center'}

									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit //每页默认显示的数量
										,height: 'full-300'										
							  });
					   		}
					    }) 
			          }
				   });
				});
	   		}
	   	});
};
$("#QueryCustom").click(function(){
var  data1 =$("#Custom").val();
 	 Data=JSON.stringify({Name:data1}).replace(/\"/g,"'");
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
	   					queryJson:Data
	   			})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_customer/GetPageListJsonToken"
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
						    elem: 'Custome_paged'
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
					   					queryJson:Data
					   			})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_customer/GetPageListJsonToken"
					   			 ,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }	
					   			,success:function(data,status){
					   				table.render({
									    elem: '#Custome'
									     ,cols: [[
//									       {field:'ID', title: '客户ID', sort: true, align:'center'}	
									       {field:'NO', title: '客户编号',width:160, align:'center'}
									      ,{field:'Name', title: '客户名称',width:250,align:'center'}
									      ,{field:'Tel', title: '联系电话',width:120,align:'center'}
									      ,{field:'Type', title: '客户类型', align:'center'}
									      ,{field:'Remark', title: '备注', align:'center'}
									      ,{field:'SiteID', title: '客户简介', align:'center'}
									      ,{field:'Reference', title: '类型名称', align:'center'}
									      ,{field:'Address', title: '地址', align:'center'} 
//									      ,{field:'CreateDate', title: '创建时间', align:'center'}
//									      ,{field:'CreateUserId', title: '创建者ID', align:'center'}
//									      ,{field:'CreateUserName', title: '创建者名称', align:'center'}
//									      ,{field:'ModifyDate', title: '修改时间', align:'center'}
//									      ,{field:'ModifyUserId', title: '修改者ID', align:'center'}
//									      ,{field:'ModifyUserName', title: '修改者名字', align:'center'}

									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit //每页默认显示的数量
										,height: 'full-300'										
							  });
					   		}
					    }) 
			          }
				   });
				});
	   		}
	   	})
})