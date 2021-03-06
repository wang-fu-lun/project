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
	logo:String,
});

//库存模型
const Repertory=mongoose.model("repertory", {
	name: String,
	assort: String,
	amount:Number,
	datatime:String,
});
module.exports = {Position,Repertory,User};

