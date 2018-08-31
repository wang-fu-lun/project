const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost/project',{ useNewUrlParser: true });

//用户表模型
const User=mongoose.model("user",{
	email:{
		type:String,
		unique:true,
	},
	password:String,	
});
//其他模型

module.exports={User};