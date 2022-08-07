module.exports=(sequelize,DataTypes)=>
{
const komentarze=sequelize.define("komentarze",
{
    komentarz:{
        type:DataTypes.STRING,
        allowNull:true,
    },
}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })

  komentarze.associate = models => {
    komentarze.belongsTo(models.dziennik, {
        foreignKey: {
            allowNull: true
        }
    });
}

komentarze.associate = models => {
    komentarze.belongsTo(models.user, {
        foreignKey: {
            allowNull: true
        }
    });
}

return komentarze
}