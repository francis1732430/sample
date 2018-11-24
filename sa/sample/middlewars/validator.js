var _=require('underscore');

module.exports.signup=function(req,res,next) {

    req.checkBody('firstname', 'firstname is not empty').notEmpty();
    req.checkBody('lastname', 'firstname is not empty').notEmpty();
    req.checkBody('email', 'Email is not empty').notEmpty();
    req.checkBody('password', 'password is not empty').notEmpty();
    req.check("email", "email not matching").matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "i");
    var errors = req.validationErrors();
    if (errors) {
        var errorList = _.reduce(errors, function(result, error) {
            result.push({ field: error.param, message: error.msg });
            return result;
        }, []);
        return res.status(422).send({
            status:0,
            error:errorList
        });
    } else {
        // normal processing here
        return next();
    }

}

module.exports.signin=function(req,res,next) {
    req.checkBody('email', 'Email is not empty').notEmpty();
    req.checkBody('password', 'password is not empty').notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        var errorList = _.reduce(errors, function(result, error) {
            result.push({ field: error.param, message: error.msg });
            return result;
        }, []);
        return res.status(422).send({
            status:0,
            error:errorList
        });
    } else {
        // normal processing here
        return next();
    }
}