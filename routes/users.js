var express = require('express');
var router = express.Router();
var UserService=require("../services/user_service.js");
const multer=require("multer");
const path=require("path");
//配置磁盘保存
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../public/images/upload/"));
  },
  filename: function (req, file, cb) {
	  //文件后缀
	const ext = file.originalname.slice(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + '-' + Date.now()+ext);
  }
});
var upload = multer({storage});


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/login',UserService.login);

router.get('/logout',UserService.logout);

router.post('/updatepass',UserService.updata);

router.get("/list", UserService.listByPage);

router.post('/regeister',upload.single("logo"),UserService.regeister);
module.exports = router;
