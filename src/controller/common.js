/**

 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL
    
 */
 
layui.define(function(exports){
  var $ = layui.$
  ,layer = layui.layer
  ,laytpl = layui.laytpl
  ,setter = layui.setter
  ,view = layui.view
  ,admin = layui.admin
  
  //公共业务的逻辑处理可以写在此处，切换任何页面都会执行
  //……
  var common={
    	//公共接口  	
			 loadTable:function (){
			   		$.ajax({
			   			type:"post",
			   			async:false,
			   			data: JSON.stringify({
			   				pagination:{
			   					rows:10,
			   					page:1,
			   					sord:"asc",
			   					sidx:"ID"
			   					},
			   					queryJson:{}})
		    			,dataType: "json"
		    			,contentType:"application/json"
			   			,url:layui.setter.Test_url+"/WMSManage/wms_productiontype/GetPageListJsonToken"
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
								    elem: 'Mater_classify_paged'
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
							   			,url:layui.setter.Test_url+"/WMSManage/wms_productiontype/GetPageListJsonToken"
							   			 ,beforeSend: function(request) {
												 request.setRequestHeader("token",localStorage.getItem("token"));
											  }	
							   			,success:function(data,status){
							   				table.render({
											    elem: '#Mater_classify'
											     ,cols: [[
		//									       {field:'ID', title: '产品类型ID', sort: true, align:'center'}	
											       {field:'Name', title: '产品类型名称', align:'center'}
											      ,{field:'Remark', title: '产品类型说明',align:'center'}
											      ,{field:'CreateDate', title: '创建时间', align:'center'}
		//									      ,{field:'CreateUserId', title: '创建者ID', align:'center'}
		//									      ,{field:'CreateUserName', title: '创建者名称', align:'center'}
		//									      ,{field:'ModifyDate', title: '修改时间', align:'center'}
		//									      ,{field:'ModifyUserId', title: '修改者ID', align:'center'}
		//									      ,{field:'ModifyUserName', title: '修改者名字', align:'center'}
											    ]]
											    ,id:'testReload'
											    ,even:true
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
		}    	
    } 
  
  //退出
  admin.events.logout = function(){
    //执行退出接口
    $.ajax({
      url: layui.setter.Test_url+'/TokenValid/OutLogin'
      ,type: 'post'
      ,data:{  	
      	token:localStorage.getItem("token")
      }
//    ,beforeSend: function(request) {
//			 request.setRequestHeader("token",localStorage.getItem("token"));
//			  }
      ,response:{
      	 statusName:'errorcode'
	     ,msgName: 'message' //状态信息的字段名称，默认：msg
		 ,dataName: 'resultdata' //数据列表的字段名称，默认：data
			   }
      ,success: function(res){ //这里要说明一下：done 是只有 response 的 code 正常才会执行。而 succese 则是只要 http 为 200 就会执行
        console.log(res)
        //清空本地记录的 token，并跳转到登入页
        admin.exit();
      }
    });
  };

  
  //对外暴露的接口
  exports('common', common);
});