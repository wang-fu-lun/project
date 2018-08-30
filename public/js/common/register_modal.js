function RegeisterMod(){
	this.createDom();
	this.addListener();
	this.genCaptchaHander();
	this.valid=false;
}

RegeisterMod.template=`<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">进销管理系统->注册</h4>
				</div>
				<div class="modal-body">
				  <div class="alert alert-danger hide reg-err1">用户名已被注册，请重新注册！</div>
					<div class="alert alert-danger hide reg-err2">请再次确认密码！</div>
					<div class="alert alert-danger hide reg-err3">验证码输入有误！</div>
					<div class="alert alert-danger hide reg-suc">注册成功,去<a href="/index.html">登录</a>吧！</div>
					
					<form class="regeister_form">
						<div class="form-group">
							<label for="reg_username">用户名</label>
							<input type="text" name="email" class="form-control" id="log_username" placeholder="请输入用户名">
						</div>
						<div class="form-group">
							<label for="reg_password">密码</label>
							<input type="password" name="password" class="form-control" id="reg_password" placeholder="请输入密码">
						</div>
						<div class="form-group">
							<label for="reg_passwordagain">确认密码</label>
							<input type="password" class="form-control" id="reg_passwordagain" placeholder="请再次输入密码">
						</div>
						<div class="form-group">
							<label for="reg_code">验证码</label>
							<input type="text" class="form-control" id="reg_code" placeholder="请输入验证码">
							<span class="code_info input-group-addon">信息</span>
							<p class="help-block code_img">验证码图片</p>
						</div>					
				</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="regeister btn btn-default btn-primary" data-dismiss="modal">注册</button>
					<button type="button" class="btn btn-primary">关闭</button>
				</div>
			</div>
		</div>`;


$.extend(RegeisterMod.prototype,{
	//创建表单元素
  createDom(){
  	$("body").append(RegeisterMod.template);
  },
	//注册事件监听
	addListener(){
		$(".regeister").on("click",$.proxy(this.regeisterHandler, this));
		$("#reg_code").on("blur",$.proxy(this.verifyHanlder, this));
	},
	//注册处理
	regeisterHandler(){
		//console.log(1);
		var data=$(".regeister_form").serialize();
		console.log(data);
		let pass=$("#reg_password").val();
		let passAga=$("#reg_passwordagain").val();
		if(pass!=passAga){
			this.valid=false;
			$(".reg-err1").addClass("hide");
			$(".reg-err2").removeClass("hide");
			$(".reg-err3").addClass("hide");
			$(".reg-suc").addClass("hide");
		}else{
			this.valid=true;
			$(".reg-err2").addClass("hide");
		}
		console.log(pass,passAga);
		if(this.valid){
		$.post("/users/regeister",data,(resData)=>{
			console.log(resData);	
				if(resData.res_code==-1){
					$(".reg-err1").removeClass("hide");
					$(".reg-err2").addClass("hide");
					$(".reg-err3").addClass("hide");
					$(".reg-suc").addClass("hide");
				}else{
						$(".reg-err1").addClass("hide");
						$(".reg-err2").addClass("hide");
						$(".reg-err3").addClass("hide");
						$(".reg-suc").removeClass("hide");
				}
				
		},"json");
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
		
		var code=$("#reg_code").val();
		console.log(code);
		
		$.getJSON("/captcha/verify",{code},(data)=>{
			//alert(1);
			console.log(data);
			if(data.res_code==1){
				$(".code_info").text("true");
				this.valid=true;

			}else{
				this.valid=false;				
				$(".reg-err1").addClass("hide");
				$(".reg-err2").addClass("hide");
				$(".reg-err3").removeClass("hide");
				$(".reg-suc").addClass("hide");
				$(".code_info").text("false");
			}				
		});
	},
	
});
new RegeisterMod();