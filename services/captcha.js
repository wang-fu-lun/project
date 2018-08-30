var svgCaptcha = require('svg-captcha');

const Captcha={
	//生成
	genCaptcha(req,res,next){
		var captcha = svgCaptcha.create({color:true,noise:3});
		req.session.captcha = captcha.text;
		
		res.type('svg');
		res.status(200).send(captcha.data);
	},
	//校验
	verifyCaptcha(req,res,next){
		//获取验证码字符串
		console.log(req.query);
		const{code}=req.query;
		
		if(code.toUpperCase()==req.session.captcha.toUpperCase())
		 res.json({res_code:1,res_err:"",res_body:{valid:true}});
		else
		 res.json({res_code:-1,res_err:"",res_body:{valid:false}});

	}
}
module.exports=Captcha;