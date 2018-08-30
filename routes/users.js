var express = require('express');
var router = express.Router();
var UserService=require("../services/user_service.js");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',UserService.login);

router.post('/regeister', UserService.regeister);
module.exports = router;
