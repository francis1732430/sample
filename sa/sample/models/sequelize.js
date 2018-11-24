var bcrypt=require('bcrypt');

module.exports=function(sequelize,Sequelize) {
    const schema={};
    const User = sequelize.define('User', {
        id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
        firstname:{type:Sequelize.STRING,allowNull:false},
        lastname:{type:Sequelize.STRING,allowNull:false},
        password:{type:Sequelize.STRING,allowNull:false,set(value){

            var salt=bcrypt.genSaltSync(10);
   
            var hash=bcrypt.hashSync(value,salt);
   
            this.setDataValue('password',hash);
        }},
        email:{
          type    : Sequelize.STRING,
          isUnique :true,
          allowNull:false,
          validate:{
              isEmail : true
          }
      },
        is_active:{type:Sequelize.INTEGER,allowNull:false,defaultValue:1},
        created_date: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('NOW()'),
            allowNull: false
          },
          updated_date: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('NOW()'),
            allowNull: false
          }
    
      },{
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Feed,{foreignKey:'user_id'});
            }
        },
        freezeTableName: true,
        tableName: 'user_schema',
        timestamps: false});
      return User;
}


module.exports.checkPassword=function(password,password_hash) {

    return bcrypt.compareSync(password,password_hash);

}

