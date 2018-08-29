function RegisterModal() {
	this.createDom();
	this.addListener();
}

RegisterModal.template = `<div class="modal fade" id="registerModal" tabindex="-1">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">用户注册</h4>
	      </div>
	      <div class="modal-body">
	        <form class="register-form">
			  <div class="form-group">
			    <label for="registerUsername">用户名</label>
			    <input type="text" name="username" class="form-control" id="registerUsername" placeholder="用户名">
			  </div>
			  <div class="form-group">
			    <label for="registerPassword">密码</label>
			    <input type="password" name="password" class="form-control" id="registerPassword" placeholder="密码">
			  </div>
			  <div class="form-group">
			    <label for="registerConfPassword">确认密码</label>
			    <input type="password" class="form-control" id="registerConfPassword" placeholder="确认密码">
			  </div>
			  <div class="form-group">
			    <label for="registerEmail">Email</label>
			    <input type="email" name="email" class="form-control" id="registerEmail" placeholder="Email">
			  </div>
			  <div class="form-group input-group">
			    <label for="registerCode">验证码</label>
			    <input type="text" class="form-control" id="registerCode" placeholder="验证码">
			    <span class="input-group-addon code-info">信息</span>
			    <p class="help-block code-img">这是个验证码图片</p>
			  </div>
			</form>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
	        <button type="button" class="btn btn-primary btn-register">注册</button>
	      </div>
	    </div>
	  </div>
	</div>`;

$.extend(RegisterModal.prototype, {
	createDom() {
		$(RegisterModal.template).appendTo("body");
	},
	// 注册事件监听
	addListener() {
		// 失去焦点校验验证码
		$("#registerCode").on("blur", this.verifyHandler);
		// 点击注册按钮
		$(".btn-register").on("click", this.registerHandler)
	},
	// 校验验证码
	verifyHandler() {
		// 输入的验证码
		var code = $("#registerCode").val();
		// ajax
		$.getJSON("/captcha/verify", {code}, (data)=>{
			console.log(data);
			if (data.res_code === 1) {
				$(".code-info").text("正确")
			} else {
				$(".code-info").text("错误")
			}
		})
	},
	// 注册业务处理
	registerHandler() {
		// 待传递到服务器的用户注册数据
		var data = $(".register-form").serialize();
		// ajax提交登录处理
		$.post("/users/register", data, (resData)=>{
			console.log(resData);
		}, "json");
	}
})