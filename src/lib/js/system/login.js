

layui.use(['admin', 'form', 'user'], function(){
  var $ = layui.$
  ,setter = layui.setter
  ,admin = layui.admin
  ,form = layui.form
  ,router = layui.router()
  ,search = router.search;

  form.render();

  //提交
  form.on('submit(LAY-user-login-submit)', function(obj){
   var field = obj.field;
    //请求登入接口
    admin.req({
      url:layui.setter.Test_url+'/TokenValid/checkLogin' //实际使用请改成服务端真实接口
      ,data: JSON.stringify({
      	username:obj.field.username,
      	password:hex_md5(obj.field.password),
      	autologin:"1"
      	})
      ,type:'post'
      ,contentType:"application/json"
      ,success: function(res){
        //请求成功后，写入 access_token
        tokenvalue=res.resultdata.Token;
        UserName=res.resultdata.UserName;
        localStorage.setItem("token",tokenvalue);
        localStorage.setItem("username",UserName);
        console.log(res.resultdata.Token);
        layui.data(setter.tableName, {
          key: setter.request.tokenName
          ,value: res.resultdata.Token
        });   
        //登入成功的提示与跳转
        layer.msg('登入成功', {
          offset: '15px'
          ,icon: 1
          ,time: 1000
        }, function(){
          location.hash = search.redirect ? decodeURIComponent(search.redirect) : '/';
        });
      }
    });
    
  });