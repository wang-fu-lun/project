function LoginMod(){
	this.createDom();
	this.addListener();
	this.genCaptchaHander();
	this.valid=false;
}

LoginMod.template=`<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 class="modal-title" id="myModalLabel">进销管理系统->登录</h4>
							</div>
							<div class="modal-body">
								<div class="alert alert-danger hide login-err">用户名或密码错误!</div>
								<div class="alert alert-danger hide login-err1">验证码输入有误!</div>
								
								
								<form class="login_form">
									<div class="form-group">
										<label for="log_username">用户名</label>
										<input type="text" name="email" class="form-control" id="log_username" placeholder="请输入用户名">
									</div>
									<div class="form-group">
										<label for="log_password">密码</label>
										<input type="password" name="password" class="form-control" id="log_password" placeholder="请输入密码">
									</div>
									<div class="form-group">
										<label for="log_code">验证码</label>
										<input type="text" class="form-control" id="log_code" placeholder="请输入验证码">
										<span class="code_infol input-group-addon">信息</span>
										<p class="help-block code_img">验证码图片</p>
									</div>					
							</form>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default btn-primary login" data-dismiss="modal">登录</button>
								<a href="/html/regeister.html"><button type="button" class="btn btn-primary">没有账号？点此注册</button></a>
							</div>
						</div>
					</div>`;


$.extend(LoginMod.prototype,{
	//创建表单元素
  createDom(){
  	$("body").append(LoginMod.template);
  },
	//注册事件监听
	addListener(){
		$(".login").on("click",$.proxy(this.loginHandler, this));
		$("#log_code").on("blur",$.proxy(this.verifyHanlder, this));
	},
	//登录处理
	loginHandler(){
		var data=$(".login_form").serialize();
		console.log(data);
		if(this.valid){
		$.post("/users/login",data,(resData)=>{
			console.log(resData);
			if(resData.res_code==1){
				window.location.href="/html/main.html";
				$("#loginModal").modal("hide");
				$(".login_suc").removeClass("hide");
				$(".not_login").hide();
				sessionStorage.loginUser=JSON.stringify(resData.res_body);
				console.log(JSON.stringify(resData.res_body));
			}else{
				$(".login-err").removeClass("hide");
				$(".login-err1").addClass("hide");
			}
		})
		}
	},
	
	
	//生成验证码图片
	genCaptchaHander(){
		$.get("/captcha/gencode",(data)=>{
			//alert(1);
			//console.log(data);
			$(".code_img").html(data);
		},"text");
	},
	
	//验证验证码
	verifyHanlder(){
		//输入的验证码
		
		var code=$("#log_code").val();
		console.log(code);
		
		$.getJSON("/captcha/verify",{code},(data)=>{
			//alert(1);
			console.log(data);
			if(data.res_code==1){
				$(".code_infol").text("true");
				this.valid=true;

			}else{
				$(".code_infol").text("false");
				this.valid=false;				
				$(".login-err").addClass("hide");
				$(".login-err1").removeClass("hide");
			}				
		});
	},
	
});
new LoginMod();