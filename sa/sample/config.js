var config={};

config.PORT=3000;

config.SECRET='applehello123';

config.db='devdb1';

config.user="root";

config.pass="francis17";

config.host='127.0.0.1';

config.dialect='mysql';

config.exp=5 * 30 * 24 * 60 * 60 * 1000;
config.resetTime=10 * 60 * 1000;
config.mailhost='smtp.gmail.com';
config.mailport=465;
config.mailuser="francisiyngaran@gmail.com";
config.mailpass='francis167.picco';
config.resetLink='http://127.0.0.1:4200/newpassword/'
module.exports=config;
