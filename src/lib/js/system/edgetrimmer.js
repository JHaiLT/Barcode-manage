/**
	箱子管理:类型管理  
 */
//分页参数设置 这些全局变量关系到分页的功能
	   	var startAllAppoint = 1;//开始页数
	   	var limitAllAppoint = 8;//每页显示数据条数
	   	var currentPageAllAppoint = 1;//当前页数
	   	var dataLength = 0;//数据总条数
	   	//ajax请求后台数据

$(document).ready(function(){
	   		  //ajax请求后台数据
		      getBoxTypeInfo();
		     
  });	   	
	   	function  getBoxTypeInfo(){
	   		Data=JSON.stringify({Name:''}).replace(/\"/g,"'");
	   		$.ajax({
	   			type:"post",
	   			async:false,
	   			data: JSON.stringify({
	   					rows:limitAllAppoint, 
	   					page:startAllAppoint,
	   					sord:"asc",
	   					sidx:"Code"
	   					})
    			,dataType: "json"
    			,contentType:"application/json"
	   			,url:layui.setter.Test_url+"/WMSManage/wms_edgetrimmer/GetPageList"
	   			,beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				  }	
	   			,success:function(data,status){	
	   				layui.use(['table','layedit','form','layer','laypage','jquery'], function(){
					  var table = layui.table,
					  	  form = layui.form,
					  	  laypage=layui.laypage,
				  	  	  layer = layui.layer; //获取当前窗口的layer对象
					  //展示已知数据
					  laypage.render({
						    elem: 'edgetrimmer_paged'
						     ,count:data.resultdata.records //数据总数
						     ,layout: ['count', 'prev', 'page', 'next', 'skip','limit']
						     ,curr:startAllAppoint
						    ,jump: function(obj){
						    	startAllAppoint=obj.curr;
						      	$.ajax({
					   			type:"post",
					   			async:false,
					   			data: JSON.stringify({
					   					rows:obj.limit, 
					   					page:startAllAppoint,
					   					sord:"asc",
					   					sidx:"Code"
					   					})
				    			,dataType: "json"
				    			,contentType:"application/json"
					   			,url:layui.setter.Test_url+"/WMSManage/wms_edgetrimmer/GetPageList"
					   			 ,beforeSend: function(request) {
									 request.setRequestHeader("token",localStorage.getItem("token"));
								  }	
					   			,success:function(data,status){
					   				table.render({
									    elem: '#LAY_table_edgetrimmer'
									     ,cols: [[
									       {field:'Code', title: '代号',  align:'center'}
									      ,{field:'Name', title: '名称', align:'center'}
									      ,{field:'toerpstatus', title: '详情', align:'center',width:100, event:'getDetail',templet:function(d){
			        								 return '<a href="javascript:void(0);" style="color:#337ab7;text-decoration: underline;">查看详情</a>'
			        	  					}}									      
									      ,{field:'Remark', title:'备注', align:'center'}									      
									      ,{field:'CreateDate', title:'创建时间', align:'center'}
//									      ,{field:'createuserid', title: '创建人ID', align:'center'}
									      ,{field:'CreateUserName', title: '创建人名', align:'center'}								      
//									      ,{field:'modifyuserId', title: '更改人ID', align:'center'}
									      ,{field:'ModifyUserName', title: '更改人名', align:'center'}
										  ,{field:'ModifyDate', title: '更改时间', width:160, align:'center'}					      
									    ]]
									    ,id:'testReload'
									    ,even:true
									    ,data: data.resultdata.rows
										,limit: obj.limit//每页默认显示的数量
										,height: 'full-300'										
							  });
						 table.on('tool(edgetrimmer)', function(obj){
							    var data = obj.data;
							    if(obj.event === 'Detail'){
							      layer.msg('ID：'+ data.id + ' 的查看操作');
							    }else if(obj.event === 'getDetail'){
								    layer.open({
										title: '切边机详情',
										maxmin: true,
										type: 2,
										content: '../src/views/temp/edgetrimmer.html?edgetrimmerId='+data.ID,
										offset: ['100px', '30%'],
										area: ['600px', '400px'],
										success: function(layero, index) {
											var body=layer.getChildFrame('body',index);										   
										},
									});
								}
						 			});
					   		}
					    }) 
			          }
				   });
				});
	   		}
	  });
};

