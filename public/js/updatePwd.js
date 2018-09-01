
$(".am-btn-success").on("click",function(){
	  const data1=$("#user-name1").val();
	  const data=$("#user-name").val();
		//console.log(data1,data);
		let user= sessionStorage.loginUser;
			user=JSON.parse(user);
		//console.log(user);
		console.log(user.password);
	  $.post("/users/updatepass",{password:data1,passwordNew:data,sees:user.password},(resData)=>{
			console.log(resData);
			if(resData.res_code==1){
				alert("密码修改成功");
			}else{
				alert("原密码输入有误");
			}
		});
});