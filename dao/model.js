// 引入 mongoose
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect('mongodb://localhost/project', { useNewUrlParser: true } );

// 职位模型
const Position = mongoose.model("position", {
	name: String,
	remark: String,
});

//用户表模型
const User=mongoose.model("user",{
	email:{
		type:String,
		unique:true,
	},
	password:String,	
});

//库存模型
const Inventory = mongoose.model("inventory",{

});

module.exports = {Position,User,Inventory};