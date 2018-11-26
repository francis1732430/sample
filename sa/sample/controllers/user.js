var passport=require("passport");
var crypto = require('crypto');
var config=require('../config');
var db=require('../models/index');
var async=require('async');
var jwt = require('jsonwebtoken');
var mailer=require('../libs/mail')
module.exports.create=function(req,res){

    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var email=req.body.email;
    var password=req.body.password;

    async.waterfall([function(done) {
        
        db.User.findOne({where:{email:email}}).then(function(obj) {
            if(obj == null && obj == undefined) {
               return done(null,obj);
           } else {
               res.status(200).send({message:"email is already exists"});
           }
        }).catch(err => {
            res.status(401).send(err);
        })
    },function(obj,done) {
        db.User.create({firstname:firstname,lastname:lastname,email:email,password:password}).then(function(user,err){
            console.log(err);
            res.status(200).send({status:1,message:"user created successfully"});
        }).catch(err => {
            res.status(401).send(err);
        })
    }])

}

module.exports.signin=function(req,res){
    
passport.authenticate("local",function(err,user){
    if(err) {

        res.status(401),send(err)
    }

    if(!user) {
        res.send({message:"Login failed"});
    } else {
        req.logIn(user,function(err){
        if(err) return res.status(401).send(err);
        })
        var userId=user.get('id');
        let token = jwt.sign({
            userId:userId,
            exp: config.exp, 
        }, config.SECRET);
        res.status(200).send({status:1,userId:userId,token:token});
    }

})(req,res);

}

module.exports.forgetPassword=function(req,res,next) {

    //var userId=req.params.id;

    var email=req.body.email;

    async.waterfall([function(done) {

        db.User.findOne({where:{email:email}}).then((user) => {

            if(user){
                return done(null,user);
            }else {
                return res.send({mesage:'User not found'});
            }
        })
    },function(user,done){
        var userId=user.get('id');
        var name=user.get('firstname');
        var emailObj=config.mailuser;
        let current = Date.now();
        var resetToken=jwt.sign({
            userId: userId,
            exp: current + config.resetTime,
        }, config.SECRET);
        console.log(resetToken);
    mailer.send(name,emailObj,resetToken);
    return res.status(200).send({messasge:"mail Successfully sent"});
    }])
    
}

module.exports.resetPassword=function(req,res) {

    var token=req.params.token;
    var decode=jwt.decode(token, config.SECRET);
    var password=req.body.password;
    let now = Date.now();
    console.log('deccccccccccc',decode);
    if (decode && now < decode.exp) {
        
        async.waterfall([function(done) {

            db.User.findOne({where:{id:decode.userId}}).then((obj) => {

                if(obj == null || obj == undefined) {
                        
                    res.send({message:"User Not found"});
                } else {
                    console.log(obj);
                    obj.updateAttributes({password:password}).then((obj1) => {
                        if(obj1 != null && obj1 !== undefined) {
                            res.status(200).send({message:'password updated successfully'});
                        }else {
                            res.send({message:"Password updation Failed"});
                        }
                    })
                }

            })
        }])


    } else {
        res.send({message:"Password Reset Failed"});
    }
}
