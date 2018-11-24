
const nodemailer = require('nodemailer');
var Mailgen = require('mailgen');     

module.exports.send=function(firstname,toEmail,enc){

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, 
        auth: {
            user: 'francisiyngaran@gmail.com', 
            pass: 'francis167.picco' 
        }
    });
    var generator = new Mailgen({
        theme: "default",
        product: {
            name: firstname,
            link: " ",
            logo: " "

        },
    });
    var jsonContent = {
        body: {
            name: 'Francis',
            intro: "You have received this email because a password reset request for your account was received.",
            action: {
                instructions: "Click the button below to reset your password:",
                button: {
                    color: "red",
                    text: "Reset your password",
                    link: `http://127.0.0.1/resetPassword/${enc}`,
                },
            },
            outro: "If you did not request a password reset, no further action is required on your part.",
        },
    };
    var message = {
        from:'francisiyngaran@gmail.com',
        to: toEmail,
        subject: 'Password Reset',
        html: generator.generate(jsonContent),
    };
    console.log(message);
    try {
        transporter.sendMail(message, function(error, response) {
           console.log(error,response);
            if (error) {
                console.log("errrrrrror",error);
                return error;
            }
            response.statusHandler.once("failed", data => {
                let reason = "Failed sending email";
                let code = "EMAIL_FAILED";
                if (data.error.errno === "ENOTFOUND") {
                    reason += ",there is no mail server at this address: " + data.domain;
                    code = "EMAIL_SERVER_NOT_FOUND";
                }
                reason += ".";
                let err = new Error(reason);
                err.code = code;
                return err;
            });

            response.statusHandler.once("requeue", data => {
                var err = new Error("Message was not sent, requeued. Probably will not be sent.\nMore info: " + data.error.message);
                err.code = "EMAIL_REQUEUE";
                return err;
            });

            response.statusHandler.once("sent", () => {
                return "Message was accepted by the mail server. Make sure to check inbox and spam folders.";
            });
        });
    } catch (err) {
        return err;
    }
}