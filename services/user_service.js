const UserDao=require("../dao/user_dao.js");
const bcrypt = require('bcrypt');

const UserService={
	//登录
	login(req,res,next){
			//获取输入的用户名与密码
			const {email, password} = req.body;
	    UserDao
			.find({email})
			.then(data=>{
				console.log(data[0]._id)
				if(data.length==1){
				
				 //获取数据库中所保存的用户加密后的密码
  			const _pass=data[0].password;
 				//比较密码是否正确
  				if(bcrypt.compareSync(password,_pass)){
 					//在session中保存登录成功的用户信息
              res.json({res_code:1,res_error:"",res_body:data[0]});
  				   	req.session.loginUser=email;  						
  					
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
	//退出
		logout(req,res,next){
			req.session.loginUser=null;
			res.json({res_code:1,res_error:"",res_body:{status:true}});
		},
	
	//注册
	regeister(req,res,next){
		//res.send('用户注册处理');
		//console.log(req);
		
		const {email, password} = req.body;
		let logo="1.jpg";
		if(req.file)
		    logo=req.file.filename;
		//加密密码
		const passCrypt=bcrypt.hashSync(password, 10);
		// 保存用户用户信息
		UserDao
			.save({email, password:passCrypt,logo})
			.then((data)=>{
				res.json({res_code:1, res_error:"", res_body: data});
			})
			.catch((err)=>{
				res.json({res_code: -1, res_error: err, res_body: {}});
			});
	},
	
	//修改密码
	updata(req,res,next){
// 		const {password,passwordNew,sees}=req.body;
// 		console.log(password,passwordNew);
// 				
// 			UserDao
// 						.update({"password":sees.password}, {$set:{"password":passwordNew}})
// 						.then((data)=>{	
// 								//if(bcrypt.compareSync(password,sees.password)){
// 									res.json({res_code:1, res_error:"", res_body: data});	
// 								//}else{
// 								//	res.json({res_code:0, res_error:"原密码错误", res_body: data});	
// 								//}
// 						})				
// 						.catch((err)=>{
// 								res.json({res_code: -1, res_error: "异常"+err, res_body: {}}); 
// 						})
// 			
        const {password,passwordNew,sees}=req.body;
				console.log(password,passwordNew);
				const passNewCrypt=bcrypt.hashSync(passwordNew, 10);
				if(bcrypt.compareSync(password,sees)){
					UserDao
					       .update({"password":sees}, {$set:{"password":passNewCrypt}})
								 .then((data)=>{
									 res.json({res_code:1, res_error:"原密码相同"});
								 })
								 .catch((err)=>{
									 res.json({res_code: -1, res_error: "异常"+err, res_body: {}});
								 })
					
				}else{
					res.json({res_code:-2, res_error:"原密码错误"});
				}
	},
	listByPage(req, res, next) {
		// 获取待查询的页码
		let {page} = req.query;
		page = page || 1;
		// 调用数据库查询方法
		UserDao
			.count()
			.then((data)=>{
				UserDao
					.findByPage(page)
					.then(pageData=>{
						// 总页数
						const totalPages = Math.ceil(data / 10);
						res.json({res_code:1, res_error:"", res_body: {data: pageData, count: data, totalPages}});
					}).catch(err=>{
						res.json({res_code:-1, res_error:err, res_body: {}});
					});
			}).catch(err=>{
				res.json({res_code:-1, res_error:err, res_body: {}});
			});
	},
}
module.exports=UserService;