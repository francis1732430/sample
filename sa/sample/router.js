var auth=require("./controllers/user");
var validator=require('./middlewars/validator');
var jwtauthenticate=require('./middlewars/authenticate');
module.exports=function(express) {

    var router=express.Router();
router.post("/create",validator.signup,auth.create);

router.post("/signin",validator.signin,auth.signin);

router.put('/forgetPassword/:id',auth.forgetPassword);

router.post('/resetPassword/:token',auth.resetPassword);
return router;
} 