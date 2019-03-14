	layui.use(['layer', 'form'], function() {
		var layer = layui.layer,
			form = layui.form;  
		   is_radio(getquery("EnabledMark"));	
		   $("#ClientType").val(getquery("ClientType"));
		   layui.form.render();			 
		form.on('submit(form_role)', function(data) {
			if(data.field.EnabledMark == 1) {
				data1 = 1
			} else {
				data1 = 0
			};
			$.ajax({
				type: "post",
				url: parent.layui.setter.Test_url+"/BaseManage/Role/SaveFormV1",
				data: {
					RoleId: data.field.RoleId,
					EnCode: data.field.EnCode,
					FullName: data.field.FullName,
					Description: data.field.Description,
					EnabledMark: data1,
					ClientType:data.field.ClientType,
				},
				beforeSend: function(request) {
						 request.setRequestHeader("token",localStorage.getItem("token"));
					  },				
				dataType: "json",
				success: function() {
					var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
					parent.layer.close(index);
				}
			});
			return false;
		});

	function is_radio(rValue) {
			var rObj = $('input[name="EnabledMark"')
			for(var i = 0; i < rObj.length; i++) {
				if(rObj[i].value == rValue) {
					$(rObj[i]).prop("checked", true)
				}
			}
		}
	function getquery(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
			r = window.location.search.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	});