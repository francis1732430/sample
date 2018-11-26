var auth=require("./controllers/user");
var news=require("./controllers/news_feed");
var validator=require('./middlewars/validator');
var jwtauthenticate=require('./middlewars/authenticate');
module.exports=function(express) {

    var router=express.Router();
router.post("/create",validator.signup,auth.create);

router.post("/signin",validator.signin,auth.signin);

router.post('/forgetPassword',auth.forgetPassword);

router.put('/resetPassword/:token',auth.resetPassword);

router.post('/newsCreate',jwtauthenticate.isAuthenticated,validator.newsFeed,news.create);

router.put('/newsUpdate',jwtauthenticate.isAuthenticated,validator.newsFeed,news.update);

router.get('/postedlist/:id',jwtauthenticate.isAuthenticated,news.postedlists);

router.get('/newslist/:id',jwtauthenticate.isAuthenticated,news.newslists);

router.get('/news/view/:id',jwtauthenticate.isAuthenticated,news.view);

//router.delete('/newsdelete/:id',jwtauthenticate.isAuthenticated,news.delete);

return router;
} 