module.exports=(sequelize,DataTypes)=>
{
const firma=sequelize.define("firma",
{
    nazwa:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    opis:{
        type:DataTypes.STRING,
        allowNull:true,
    },

}, {
    charset: 'utf8',
    collate: 'utf8_general_ci',
  })



  firma.associate = models => {
    firma.hasOne(models.user, {
        onDelete:"cascade"
    });
  }



return firma
}