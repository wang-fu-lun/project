const {User}=require("./model.js");
const UserDao={
	save(userinfo){
		const user=new User(userinfo);
		return user.save();//相当于promise对象
	},
	find(userinfo){
		return User.find(userinfo);
	},
	update(updateData,data){
		return User.update(updateData,data).exec();
	},
	delete(){},
};
module.exports=UserDao;