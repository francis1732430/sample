var config=require('../config')
var passport=require("passport");
var LocalStrategy=require("passport-local").Strategy;
var db=require('../models/index');
var check=require('../models/sequelize');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

module.exports=function(app){

    passport.serializeUser(function(user, done) {
        console.log("ttttttt",user.get('id'));
        done(null, user.get('id')); 
    });
    
    passport.deserializeUser(function(id, done) {
        console.log('id',id);
        db.User.findOne({where:{id:id}}).then((user) => {
            console.log('user',user);
            if(user){
                done(null,user);
            }else {
                done(null,false);
            }    
        })
        
    });


passport.use("local",new LocalStrategy({usernameField:'email',passwordField:'password'},function(username,password,done){

    console.log("usernameeeeeeee",username,password);
db.User.findOne({where:{email:username}}).then(user => {
   
    if(!user){
      done(null,false);
    } else {
        var email=user.get('email');
        var password_hash=user.get('password');
       var pass=check.checkPassword(password,password_hash);
       console.log("pass",pass);
       if(pass){
        return done(null,user);
       }else {
       return  done(null,false);
       }
    }
})


}))
console.log("vvvvvvvvv1");
passport.use("jwt",new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey:config.SECRET
},
function (jwtPayload, done) {
   console.log("vvvvvvvvv",jwtPayload);
    db.User.findOne({where:{id:jwtPayload.userId}}).then((user) => {
        if(user) {
            done(null,user);
        } else {
            done(null,false);
        }
    })
}
));

app.use(passport.initialize());
app.use(passport.session());
}