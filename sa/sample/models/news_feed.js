
module.exports=function(sequelize,Sequelize) {
    const schema={};
    const Feed = sequelize.define('Feed', {
        id:{type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
        title:{type:Sequelize.STRING,allowNull:false},
        content:{type:Sequelize.STRING,allowNull:false},
        user_id:{type:Sequelize.INTEGER,allowNull:false},
        likes_count:{type:Sequelize.STRING,allowNull:false},
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
                Feed.belongsTo(models.USER,{foreignKey:'user_id'});
            }
        },
        freezeTableName: true,
        tableName: 'news_feed',
        timestamps: false});
      return Feed;
}


