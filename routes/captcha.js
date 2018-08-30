var express = require('express');
var router = express.Router();
var Captcha=require("../services/captcha.js");
/* GET home page. */
//生成验证码
router.get('/gencode', Captcha.genCaptcha);
//校验验码
router.get('/verify', Captcha.verifyCaptcha);
module.exports = router;
