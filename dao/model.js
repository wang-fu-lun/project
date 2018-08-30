// 引入 mongoose
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect('mongodb://localhost/project', { useNewUrlParser: true } );

// 职位模型
const Position = mongoose.model("position", {
	name: String,
	remark: String,
});

module.exports = {Position};