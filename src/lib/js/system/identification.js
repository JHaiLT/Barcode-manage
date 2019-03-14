/**
	系统管理:账号管理  
 */

//分页参数设置 这些全局变量关系到分页的功能
var startAllAppoint = 1; //开始页数
var limitAllAppoint = 8; //每页显示数据条数
var currentPageAllAppoint = 1; //当前页数
var dataLength = 0; //数据总条数
var EnCode = 0;
var FullName = 0;
var EnabledMark = 0;
var Description = 0;
var Struts = false;
var RoleId = 0;
var UserId=0;
$(document).ready(function() {
	//ajax请求后台数据
	getcompleteInfo();

});

function getcompleteInfo() {
	$.ajax({
		type: "post",
		async: false,
		data: {
			rows: limitAllAppoint,
			page: startAllAppoint,
			sord: "desc",
			sidx: "CreateDate",
			queryJson: "{}"
		},
		beforeSend: function(request) {
				 request.setRequestHeader("token",localStorage.getItem("token"));
			},
		dataType: "json",
		url:layui.setter.Test_url+"/BaseManage/User/GetPageListJson",
		success: function(data, status) {
			layui.use(['table', 'layedit', 'admin', 'form', 'layer', 'laypage'], function() {
				var table = layui.table,
					form = layui.form,
					laypage = layui.laypage,
					admin = layui.admin,
					layer = layui.layer; //获取当前窗口的layer对象		
					layui.form.render();
				//展示已知数据
				laypage.render({
					elem: 'user_paged',
					count: data.records, //数据总数	
					layout: ['count', 'prev', 'page', 'next', 'skip'],
					limit: 8,
					curr: startAllAppoint,
					jump: function(obj) {
					startAllAppoint = obj.curr;
						$.ajax({
							type: "post",
							async: false,
							data: {
								rows: limitAllAppoint,
								page: startAllAppoint,
								sord: "desc",
								sidx: "CreateDate",
								queryJson: "{}",
								token: localStorage.getItem("token")
							},
							dataType: "json",
							url:layui.setter.Test_url+ "/BaseManage/User/GetPageListJson",
						    beforeSend: function(request) {
								 request.setRequestHeader("token",localStorage.getItem("token"));
							  },
							success: function(data, status) {
								if(data.type == 4) {
									admin.events.logout();
								} else {}
								table.render({
									elem: '#LAY_table_user',
									cols: [[
										 {checkbox: true,fixed: true}
//									  	,{field: 'UserId',title: '用户ID',sort: true,align: 'center'}
									  	,{field: 'EnCode',title: '用户编号',align: 'center'}
									  	,{field: 'Account',title: '账号',align: 'center'}
									   	,{field: 'RealName',title: '用户姓名',align: 'center'}
									   	,{field: 'EnabledMark',title: '状态',align: 'center',toolbar:"#EnabledMarkDemo"}
									   	,{field: 'Description',title: '备注',align: 'center'	}
									   	,{field: 'CreateDate',title: '创建时间',align: 'center'}
									   	,{field: 'CreateUserName',title: '创建人',align: 'center'}
									   	,{field: 'ModifyDate',title: '修改时间',align: 'center'	}
									   	,{field: 'ModifyUserName',title: '修改人',align: 'center'}
									   	,{title:'是否启用',width:120, align:'center', toolbar:"#userbarDemo"}
										]],
									id: 'idTest',
									even: true,
									data: data.rows,
									limit: 8 //每页默认显示的数量
									,height: 'full-300'									
								});
	  
			//监听工具栏checkbox					  
				 table.on('tool(user)', function(obj){	
								 	var data = obj.data;
						if(obj.event == 'del'){
								if(data.EnabledMark==0){
									layer.msg('用户已是禁用！', {
													offset: '45px',
													icon: 5,
													time: 2000
											});											
									}else{
										layer.confirm('真的禁用么？', function(index) {
										  $.ajax({
											type:"post"
											,url:layui.setter.Test_url+"/BaseManage/User/DisabledAccount"
											,data:{
												keyValue:data.UserId
											}
										    ,beforeSend: function(request) {
												 request.setRequestHeader("token",localStorage.getItem("token"));
											  }
											,dataType: "json"
											,success:function(data){
												Struts = false;
												layer.closeAll();
											   getcompleteInfo();
									layer.msg('已禁用！', {
													offset: '45px',
													icon: 2,
													time: 2000
											});	
										   }
										 });											
										});				
									}
							   }else if(obj.event == 'do'){
								if(data.EnabledMark==1){
									layer.msg('用户已是启用！', {
													offset: '45px',
													icon: 5,
													time: 2000
											});											
									}else{
										layer.confirm('真的启用么？', function(index) {
										  $.ajax({
											type:"post"
											,url:parent.layui.setter.Test_url+"/BaseManage/User/EnabledAccount"
											,data:{
												keyValue:data.UserId
											}
										   ,beforeSend: function(request) {
												 request.setRequestHeader("token",localStorage.getItem("token"));
											  }
											,dataType: "json"
											,success:function(data){
											 Struts = false;
											 layer.closeAll();
											 getcompleteInfo();	
									layer.msg('已启用！', {
													offset: '45px',
													icon: 1,
													time: 2000
											});												 
										   }
										 });											
										});				
									}							   	
							   }
				});
								//监听checkbox									
								var $ = layui.$,
									active = {
										getCheckData: function() { //获取选中数据
											var checkStatus = table.checkStatus('idTest'),
												data = checkStatus.data;
											layer.alert(JSON.stringify(data));
										},
										getCheckLength: function() { //获取选中数目
											var checkStatus = table.checkStatus('idTest'),
												data = checkStatus.data;
											layer.msg('选中了：' + data.length + ' 个');
										},
										isAll: function() { //验证是否全选
											var checkStatus = table.checkStatus('idTest');
											layer.msg(checkStatus.isAll ? '全选' : '未全选')
										}
									};
								//监听checkbox					  
								table.on('checkbox(user)', function(obj) {
									UserId=obj.data.UserId;
									EnCode = obj.data.EnCode;
									FullName = obj.data.FullName;
									Description = obj.data.Description;
									RoleId = obj.data.RoleId;
									Struts = obj.checked;
									EnabledMark = obj.data.EnabledMark;
									radioData = EnabledMark;
								});
								//添加角色 
								$('.demoTable .add-btn').on('click', function() {
									layer.closeAll();
									var index1 = layer.open({
										type: 2,
										title: '添加用户',
										content: '../src/views/temp/add_user.html',
										shade: false,
										btnAlign: 'c',
										offset: ['100px', '30%'],
										area: ['500px', '360px'],
										maxmin: true,
										btn: ['提交', '关闭'],
										yes: function(index, layero) {
											var body = layer.getChildFrame('body', index); // 重点0
											var iframeWin = window[layero.find('iframe')[0]['name']];
											var data1 = iframeWin.document.getElementById("RealName");
											var data2 = iframeWin.document.getElementById("EnCode");
											data3 = data1.value;
											data4 = data2.value
											if(data3.length != 0 && data4.length != 0) {
												var submited = iframeWin.document.getElementById("submited");
												submited.click();												
									layer.msg('添加成功！', {
													offset: '45px',
													icon: 1,
													time: 1000
										}, function(){
											getcompleteInfo();
									        });	
											} else {
												layer.msg('未输入正确！', {
													offset: '45px',
													icon: 5,
													time: 2000
												});
											}

										},
										btn2: function() {
											layer.closeAll();
										},
									});
								});
								
								//编辑角色
								$('.demoTable .edit-btn').on('click', function() {
									
									var checkStatus = table.checkStatus('idTest'),
								      data = checkStatus.data;
								      //console.log(data[0].UserId);
									if(Struts == false) {
										layer.msg('未选择！', {
											offset: '45px',
											icon: 5,
											time: 2000
										});
									} else {
										layer.closeAll();
										var index = layer.open({
											title: '修改用户',
											maxmin: true,
											type: 2,
											btnAlign: 'c',
											btn: ['提交', '关闭'],
											content: '../src/views/temp/edit_user.html?EnabledMark='+EnabledMark,
											offset: ['100px', '30%'],
											area: ['500px', '430px'],
											yes: function(index, layero) {
												var body = layer.getChildFrame('body', index); // 重点0
												var iframeWin = window[layero.find('iframe')[0]['name']];
												var Editsubmited = iframeWin.document.getElementById("submited");
												Editsubmited.click();
												layer.closeAll();
												getcompleteInfo();
												Struts = false;
												layer.msg('修改成功！', {
													offset: '45px',
													icon: 1,
													time: 2000
												});												
											},
											btn2: function() {
												layer.closeAll();
											},
											success: function(layero, index) {
												var body = layer.getChildFrame('body', index);
												var iframeWin = window[layero.find('iframe')[0]['name']]
												body.find(".UserId").val(data[0].UserId);
												body.find(".EnCode").val(data[0].EnCode);
												body.find(".Description").val(data[0].Description);	
												body.find(".RealName").val(data[0].RealName);
											},
										});
									}
								});

								//删除角色 
								$('.demoTable .remove-btn').on('click', function() {
									if(Struts == false) {
										layer.msg('未选择', {
											offset: '45px',
											icon: 5,
											time: 2000
										});
									} else {
										layer.confirm('真的删除行么', function(index) {
											$.ajax({
												type: "post",
												url:layui.setter.Test_url+"/BaseManage/User/RemoveForm",
												data:{
													keyValue: UserId
												},											
												 beforeSend: function(request) {
													 request.setRequestHeader("token",localStorage.getItem("token"));
												 },
												dataType: "json",
												success: function() {
													layer.msg('删除成功！');
													Struts = false;
													getcompleteInfo();
												}
											});
										});
									};
								});
								//初始密码    
					$('.demoTable .return-btn').on('click', function() {
					   var checkStatus = table.checkStatus('idTest'),
								  data = checkStatus.data;
									if(Struts == false) {
										layer.msg('未选择', {
											offset: '45px',
											icon: 5,
											time: 2000
										});
									} else {									
							layer.confirm('真的初始化密码？', function(index) {
											$.ajax({
												type: "post",
												url:layui.setter.Test_url+"/BaseManage/User/InitializationPassword",
												data: {
													keyValue: data[0].UserId
												},
												beforeSend: function(request) {
													 request.setRequestHeader("token",localStorage.getItem("token"));
												 },
												dataType: "json",
												success: function() {
													layer.msg('初始化成功！');
													Struts = false;
													getcompleteInfo();
												}
											});
										});	
									}
								});
								
	//授权v
				$('.demoTable .add-role').on('click', function() {
							var checkStatus = table.checkStatus('idTest'),
								  data = checkStatus.data;
								  
							if(Struts == false) {
										layer.msg('未选择', {
											offset: '45px',
											icon: 5,
											time: 2000
										});
									} else {								      
									layer.closeAll();
									userid=data[0].UserId;
									var index1 = layer.open({
										type: 2,
										title: '设置角色',
										content: '../src/views/temp/RoleMu.html?id='+userid,
										shade: false,
										btnAlign: 'c',
										offset: ['100px', '30%'],
										area: ['500px', '350px'],
										maxmin: true,
										btn: ['提交', '关闭'],
										yes: function(index, layero) {
											var body = layer.getChildFrame('body', index); // 重点0
											var iframeWin = window[layero.find('iframe')[0]['name']];
											var submited = iframeWin.document.getElementById("submited");
											submited.click();
											Struts = false;
											getcompleteInfo();
										},
										btn2: function() {
											layer.closeAll();
										},
										success: function(layero, index) {
												var body = layer.getChildFrame('body', index);
												var iframeWin = window[layero.find('iframe')[0]['name']]
												body.find(".UserId").val(data[0].UserId);
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


//查询

$("#user_query").click(function() {
	var data1 = $("#user_boards_data").val(),
		data2 = $("#user_type").val(),
		Data = {
			condition: data1,
			keyword: data2
		};
	if(data1 == 1) {
		layer.msg('未选择查询条件！', {
			offset: '45px',
			icon: 5,
			time: 2000
		});
	} else {
		$.ajax({
			type: "post",
			async: false,
			data: {
				rows: limitAllAppoint,
				page: startAllAppoint,
				sord: "asc",
				sidx: "RoleId",
				queryJson: JSON.stringify(Data)
			},
			dataType: "json",
			url:layui.setter.Test_url+"/BaseManage/User/GetPageListJson",
		    beforeSend: function(request) {
					 request.setRequestHeader("token",localStorage.getItem("token"));
				  },
			success: function(data, status) {
				layui.use(['table', 'layedit', 'form', 'layer', 'laypage'], function() {
					var table = layui.table,
						form = layui.form,
						laypage = layui.laypage,
						layer = layui.layer; //获取当前窗口的layer对象
					//展示已知数据
					laypage.render({
						elem: 'user_paged',
						count: data.records ,
						layout: ['count', 'prev', 'page', 'next', 'skip'],
						limit: 8,
						jump: function(obj) {
							firstIndex = obj.curr;
							console.log(obj.curr);
							$.ajax({
								type: "post",
								async: false,
								data: {
									rows: limitAllAppoint,
									page: startAllAppoint,
									sord: "asc",
									sidx: "RoleId",
									queryJson: JSON.stringify(Data)
								},
							   beforeSend: function(request) {
										 request.setRequestHeader("token",localStorage.getItem("token"));
									 },
								dataType: "json",
								url:layui.setter.Test_url+"/BaseManage/User/GetPageListJson",
								success: function(data, status) {
								table.render({
									elem: '#LAY_table_user',
									cols: [[
										 {checkbox: true,fixed: true}
//									  	,{field: 'UserId',title: '用户ID',sort: true,align: 'center'}
									  	,{field: 'EnCode',title: '用户编号',align: 'center'}
									  	,{field: 'Account',title: '账号',align: 'center'}
									   	,{field: 'RealName',title: '用户姓名',align: 'center'}
									   	,{field: 'EnabledMark',title: '状态',align: 'center',toolbar:"#EnabledMarkDemo"}
									   	,{field: 'Description',title: '备注',align: 'center'	}
									   	,{field: 'CreateDate',title: '创建时间',align: 'center'}
									   	,{field: 'CreateUserName',title: '创建人',align: 'center'}
									   	,{field: 'ModifyDate',title: '修改时间',align: 'center'	}
									   	,{field: 'ModifyUserName',title: '修改人',align: 'center'}
									   	,{title:'是否启用',width:120, align:'center', toolbar:"#userbarDemo"}
										]],
									id: 'idTest',
									even: true,
									data: data.rows,
									limit: 8 //每页默认显示的数量
								    ,height: 'full-300'									
								});
								}
							})
						}
					});
				});
			}
		});
	}
});
