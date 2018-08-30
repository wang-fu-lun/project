const UserDao=require("../dao/user_dao.js");
const bcrypt = require('bcrypt');

const UserService={
	//登录
	
	login(req,res,next){
			//获取用户名与密码
			const {email, password} = req.body;
	    UserDao
			.find({email})
			.then(data=>{
				
				if(data.length==1){
				
				 //比较密码是否正确
  				const _pass=data[0].password;
 				
  				if(bcrypt.compareSync(password,_pass)){
 					//在session中保存登录成功的用户信息
                    res.json({res_code:1,res_error:"",res_body:data[0]});
  					req.session.loginUser=username;  						
  					
  				}
				else{
 					res.json({res_code:0,res_error:"not exist",res_body:{}});
 				}
 			 }else{
				 res.json({res_code:2,res_error:"not exist",res_body:{}});
			 }
			})
			.catch(err=>{
				res.json({res_code:3,res_error:err,res_body:{}});
			});
		},
		
	
	//注册
	regeister(req,res,next){
		//res.send('用户注册处理');
		//console.log(req);
		const {email, password} = req.body;
		// 验证用户名是否已被注册
		// ...
		//加密密码
		const passCrypt=bcrypt.hashSync(password, 10);
		// 保存用户用户信息
		UserDao
			.save({email, password:passCrypt})
			.then((data)=>{
				res.json({res_code:1, res_error:"", res_body: data});
			})
			.catch((err)=>{
				res.json({res_code: -1, res_error: err, res_body: {}});
			});
	},
}
module.exports=UserService;